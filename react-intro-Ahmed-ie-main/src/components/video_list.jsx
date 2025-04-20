import React from 'react';
import VideoListItem from './video_list_item';

function VideoList(props) {
  return (
    <ul id="video-section">
      {props.videos.map((video) => (
        <VideoListItem
          key={video.etag}
          video={video}
          onVideoSelect={props.onVideoSelect}
        />
      ))}
    </ul>
  );
}

export default VideoList;
