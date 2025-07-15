import VideoPlayer from "../components/video-player";

function page() {
  return (
    <div>
      <VideoPlayer source="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" />
    </div>
  );
}

export default page;
