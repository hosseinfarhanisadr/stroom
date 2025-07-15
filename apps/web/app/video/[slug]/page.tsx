import VideoPlayer from "../components/video-player";

function page() {
  return (
    <div>
      <VideoPlayer source="/video.mp4" title="Mad Max" />
    </div>
  );
}

export default page;
