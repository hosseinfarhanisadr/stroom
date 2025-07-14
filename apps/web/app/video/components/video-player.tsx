type VideoPlayer = {
  source: string;
};

function VideoPlayer({ source }: VideoPlayer) {
  return (
    <video
      src={source}
      className="relative h-screen w-screen overflow-hidden bg-black"
      controls
      autoPlay
    />
  );
}

export default VideoPlayer;
