import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import VideoPlayer from './VideoPlayer';

const Playback = ({ uploadedFiles, loading }) => {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(uploadedFiles);
  }, [uploadedFiles]);


  return (
    <div>
      <div>
        Here are the uploaded files: {JSON.stringify(uploadedFiles)}
      </div>
      <div style={{ padding: '20px' }}>
        Uploaded Video:
        {(videos.length > 0 && !loading) && <VideoPlayer autoplay={true} controls={true} sources={videos} key={`videos-key-${videos.length}`} />}
        {loading && <div style={{ padding: '20px' }}>Uploading video...<div className="loader" /> </div>}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  uploadedFiles: state.uploads.files,
  loading: state.uploads.loading
});

export default connect(
  mapStateToProps,
  {}
)(Playback);