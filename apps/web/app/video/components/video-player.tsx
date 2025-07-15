"use client";
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

type VideoPlayer = {
  source: string;
};

function VideoPlayer({ source }: VideoPlayer) {
  return (
    <MediaController style={{ display: "flex" }}>
      <video
        suppressHydrationWarning={true}
        slot="media"
        src={source}
        className="relative h-screen w-screen overflow-hidden bg-black"
        preload="auto"
        muted
        crossOrigin=""
      />
      <MediaControlBar>
        <MediaPlayButton></MediaPlayButton>
        <MediaSeekBackwardButton
          style={{ paddingLeft: "4px", paddingRight: "4px" }}
          seekOffset={10}
        ></MediaSeekBackwardButton>
        <MediaSeekForwardButton
          style={{ paddingLeft: "4px", paddingRight: "4px" }}
          seekOffset={10}
        ></MediaSeekForwardButton>
        <MediaTimeRange></MediaTimeRange>
        <MediaTimeDisplay showDuration mediaDuration={134}></MediaTimeDisplay>
        <MediaMuteButton
          mediaVolumeLevel="off"
          style={{ paddingLeft: "4px", paddingRight: "4px" }}
        ></MediaMuteButton>
        <MediaVolumeRange
          style={{ paddingLeft: "4px", paddingRight: "4px" }}
        ></MediaVolumeRange>
        <MediaPlaybackRateButton rates={[0.5, 1, 2]}></MediaPlaybackRateButton>
        <MediaFullscreenButton
          style={{ paddingLeft: "4px", paddingRight: "4px" }}
        ></MediaFullscreenButton>
      </MediaControlBar>
    </MediaController>
  );
}

export default VideoPlayer;
