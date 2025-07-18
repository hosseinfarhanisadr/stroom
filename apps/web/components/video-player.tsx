"use client";
import { ArrowLeft } from "lucide-react";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaVolumeRange,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaPlaybackRateButton,
  MediaFullscreenButton,
  MediaMuteButton,
} from "media-chrome/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import hls from "hls.js";
import { Button } from "@stroom/ui/components/button";
import { cn } from "@stroom/ui/lib/utils";

type VideoPlayerProps = {
  source: string;
  backUrl: string;
};

function VideoPlayer({ source, backUrl }: VideoPlayerProps) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showHeader, setShowHeader] = useState(true);
  const { slug } = useParams<{ slug: string }>();
  const title = slug.replace("-", " ") || "Video Title";

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

    if (hls.isSupported() && source.endsWith(".m3u8")) {
      const hlsInstance = new hls();
      hlsInstance.loadSource(source);
      hlsInstance.attachMedia(videoRef.current);

      return () => {
        hlsInstance.destroy();
      };
    } else {
      videoRef.current.src = source;
    }
  }, [source]);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div
        className={cn(
          "absolute left-0 top-0 z-10 flex w-full items-center justify-between p-10 transition-opacity duration-500",
          showHeader ? "opacity-100" : "opacity-0",
          "bg-gradient-to-b from-black/70 to-transparent",
        )}
      >
        <Button
          variant={"ghost"}
          className="cursor-pointer hover:bg-transparent"
          onClick={() => router.push(backUrl)}
        >
          <ArrowLeft className="size-10 text-gray-100" strokeWidth={3} />
        </Button>
        <h1 className="text-2xl font-bold capitalize text-gray-100">{title}</h1>
      </div>

      <MediaController className="relative flex">
        <video
          ref={videoRef}
          suppressHydrationWarning={true}
          slot="media"
          className="relative h-screen w-screen bg-black object-cover"
          preload="auto"
          autoPlay={true}
        />
        <MediaControlBar className="grid">
          <MediaTimeRange className="left-0 top-0 h-1 w-full" />
          <div className="flex w-full items-center justify-between bg-black/70">
            <div className="flex">
              <MediaPlayButton className="size-20 bg-transparent transition-transform hover:scale-[1.3]" />
              <MediaSeekBackwardButton
                className="size-20 bg-transparent transition-transform hover:scale-[1.3]"
                seekOffset={10}
              />
              <MediaSeekForwardButton
                className="size-20 bg-transparent transition-transform hover:scale-[1.3]"
                seekOffset={10}
              />
            </div>
            <div>
              <MediaMuteButton
                mediaVolumeLevel="off"
                className="size-20 bg-transparent transition-transform hover:scale-[1.3]"
              />
              <MediaVolumeRange className="bg-transparent" />
              <MediaPlaybackRateButton
                className="bg-transparent pl-5 text-xl transition-transform hover:scale-[1.3]"
                rates={[0.5, 1, 2]}
              />
              <MediaFullscreenButton className="size-20 bg-transparent transition-transform hover:scale-[1.3]" />
            </div>
          </div>
        </MediaControlBar>
      </MediaController>
    </div>
  );
}

export default VideoPlayer;
