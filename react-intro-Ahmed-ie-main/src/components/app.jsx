import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import SearchBar from './search_bar';
import youtubeSearch from '../services/youtube-api';
import VideoList from './video_list';
import VideoDetail from './video_detail';

function App(props) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelected] = useState(null);

  const search = (text) => {
    youtubeSearch(text).then((result) => {
      setVideos(result);
      setSelected(result[0]);
    });
  };

  // Create a debounced version of the search function
  const debouncedSearch = useCallback(debounce(search, 500), []);

  useEffect(() => {
    search('pixar');
    //   <VideoDetail video={selectedVideo} />;
  }, []);

  return (
    <div>
      <SearchBar onSearchChange={debouncedSearch} />
      <VideoDetail video={selectedVideo} />

      <div id="video-section">

        <VideoList
          videos={videos}
          onVideoSelect={(selection) => setSelected(selection)}
        />
      </div>
    </div>
  );
}

export default App;
