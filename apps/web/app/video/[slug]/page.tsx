import VideoPlayer from "@/components/video-player";

function page() {
  return (
    <div>
      <VideoPlayer
        backUrl="/"
        source="https://stream.mux.com/A3VXy02VoUinw01pwyomEO3bHnG4P32xzV7u1j1FSzjNg/high.mp4"
      />
    </div>
  );
}

export default page;
