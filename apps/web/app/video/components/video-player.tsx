"use client";
import { ArrowLeft } from "lucide-react";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaPlaybackRateButton,
  MediaFullscreenButton,
  MediaMuteButton,
} from "media-chrome/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import hls from "hls.js";

type VideoPlayer = {
  source: string;
  title: string;
};

function VideoPlayer({ source, title }: VideoPlayer) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showHeader, setShowHeader] = useState(true);
  const [videoSrc] = useState(source);

  useEffect(() => {
    const videoElement = videoRef.current;
    let timeoutId: ReturnType<typeof setTimeout>;
    if (!videoElement) return;

    const toggleHeader = () => {
      setShowHeader(true);
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (!videoElement.paused && !videoElement.ended) {
          setShowHeader(false);
        }
      }, 2000);
    };
    videoElement.addEventListener("play", toggleHeader);
    videoElement.addEventListener("pause", toggleHeader);
    videoElement.addEventListener("ended", toggleHeader);
    window.addEventListener("mousemove", toggleHeader);

    return () => {
      videoElement.removeEventListener("play", toggleHeader);
      videoElement.removeEventListener("pause", toggleHeader);
      videoElement.removeEventListener("ended", toggleHeader);
      window.removeEventListener("mousemove", toggleHeader);
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    if (hls.isSupported() && videoSrc.endsWith(".m3u8")) {
      const hlsInstance = new hls();
      hlsInstance.loadSource(videoSrc);
      hlsInstance.attachMedia(videoRef.current);

      return () => {
        hlsInstance.destroy();
      };
    } else {
      videoRef.current.src = videoSrc;
    }
  }, [videoSrc]);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div
        className={`absolute left-0 top-0 z-10 flex w-full items-center justify-between p-10 transition-opacity duration-500 ${
          showHeader ? "opacity-100" : "opacity-0"
        } bg-gradient-to-b from-black/70 to-transparent`}
      >
        <p className="cursor-pointer" onClick={() => router.back()}>
          <ArrowLeft
            size={40}
            color="oklch(87.2% 0.01 258.338)"
            strokeWidth={3}
          />
        </p>
        <p className="text-2xl font-bold text-gray-300">{title}</p>
      </div>

      <MediaController style={{ display: "flex", position: "relative" }}>
        <video
          ref={videoRef}
          suppressHydrationWarning={true}
          slot="media"
          className="relative h-screen w-screen bg-black object-cover"
          preload="auto"
          muted
          crossOrigin=""
        />
        <MediaControlBar>
          <MediaPlayButton
            style={{ paddingLeft: "8px", paddingRight: "4px" }}
          />
          <MediaSeekBackwardButton
            style={{ paddingLeft: "4px", paddingRight: "4px" }}
            seekOffset={10}
          />
          <MediaSeekForwardButton
            style={{ paddingLeft: "4px", paddingRight: "4px" }}
            seekOffset={10}
          />
          <MediaTimeRange />
          <MediaTimeDisplay showDuration mediaDuration={134} />
          <MediaMuteButton
            mediaVolumeLevel="off"
            style={{ paddingLeft: "4px", paddingRight: "4px" }}
          />
          <MediaVolumeRange
            style={{ paddingLeft: "4px", paddingRight: "4px" }}
          />
          <MediaPlaybackRateButton rates={[0.5, 1, 2]} />
          <MediaFullscreenButton
            style={{ paddingLeft: "4px", paddingRight: "4px" }}
          />
        </MediaControlBar>
      </MediaController>
    </div>
  );
}

export default VideoPlayer;
