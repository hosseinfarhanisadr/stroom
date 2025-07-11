"use client";

import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense, use, useEffect, useRef, useState } from "react";

const HLSPlayer = dynamic(() => import("./component/hls-player"), {
  ssr: false,
});

type ParamsProps = {
  params: Promise<{ slug: string }>;
};

export default function Page({ params }: ParamsProps) {
  const router = useRouter();
  const { slug } = use(params);
  const title = decodeURIComponent(slug);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleMouseMove = () => {
      setShowControls(true);
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        const video = videoRef.current;
        if (video && !video.paused && !video.ended) {
          setShowControls(false);
          console.log("Hiding controls due to inactivity");
        }
      }, 3000);
    };

    const setupListeners = () => {
      const video = videoRef.current;
      if (!video) return;

      video.addEventListener("pause", handleMouseMove);
      video.addEventListener("ended", handleMouseMove);
      video.addEventListener("play", handleMouseMove);
      window.addEventListener("mousemove", handleMouseMove);
    };

    const cleanupListeners = () => {
      const video = videoRef.current;
      if (video) {
        video.removeEventListener("pause", handleMouseMove);
        video.removeEventListener("ended", handleMouseMove);
        video.removeEventListener("play", handleMouseMove);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeout) clearTimeout(timeout);
    };

    // Delay setup until videoRef is ready
    if (videoRef.current) {
      setupListeners();
    }

    const interval = setInterval(() => {
      if (videoRef.current) {
        setupListeners();
        clearInterval(interval);
      }
    }, 100);

    return () => {
      cleanupListeners();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <div
        className={`absolute left-0 top-0 z-10 flex w-full items-center gap-4 px-7 py-10 transition-opacity duration-500 ${
          showControls ? "opacity-100" : "opacity-0"
        } bg-gradient-to-b from-black/70 to-transparent`}
      >
        <span onClick={() => router.back()} className="cursor-pointer">
          <ArrowLeft size={40} color="white" />
        </span>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
      </div>

      <Suspense fallback={<Image src="/poster.jpg" alt="video poster" fill />}>
        <HLSPlayer
          ref={videoRef}
          src="https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
          poster="/poster.jpg"
        />
      </Suspense>
    </div>
  );
}
