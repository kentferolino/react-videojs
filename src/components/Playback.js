import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import VideoPlayer from './VideoPlayer';

const Playback = ({ uploadedFiles }) => {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(uploadedFiles);
  }, [uploadedFiles]);

  const sampleSource = [
    {
      "type": "video/mp4",
      "src": "https://subterra-practice-task.s3.ap-southeast-2.amazonaws.com/kent3.mp4"
    },
    {
      "type": "video/mp4",
      "src": "https://subterra-practice-task.s3.ap-southeast-2.amazonaws.com/kent1.mp4"
    },
  ]


  return (
    <div>
      <div>
        Here are the uploaded files: {JSON.stringify(uploadedFiles)}
      </div>
      <div style={{ padding: '20px' }}>
        Uploaded Video:
        <VideoPlayer autoplay={true} controls={true} sources={videos} />
      </div>
      <div style={{ padding: '20px' }}>
        Hard coded Video:
        <VideoPlayer autoplay={true} controls={true} sources={sampleSource} />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  uploadedFiles: state.uploads.files
});

export default connect(
  mapStateToProps,
  {}
)(Playback);