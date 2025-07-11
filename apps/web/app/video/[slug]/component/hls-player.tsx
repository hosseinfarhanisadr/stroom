"use client";

import { useRef, useEffect, forwardRef } from "react";
import Hls from "hls.js";

type HLSPlayerProps = {
  src: string;
  poster: string;
};

const HLSPlayer = forwardRef<HTMLVideoElement, HLSPlayerProps>(
  ({ src, poster }, ref) => {
    const internalRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
      const video = internalRef.current;
      if (!video) return;

      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
      } else if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
        return () => {
          hls.destroy();
        };
      }
    }, [src]);

    return (
      <video
        ref={(node) => {
          internalRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        controls
        poster={poster}
        className="h-screen w-screen object-cover"
      />
    );
  },
);

HLSPlayer.displayName = "HLSPlayer";

export default HLSPlayer;
