import React from 'react';
import FormUpload from './components/FormUpload';
import Playback from './components/Playback';
import { Provider } from 'react-redux';
import store from './store';

function App() {

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    sources: [{
      src: '/path/to/video.mp4',
      type: 'video/mp4'
    }]
  }


  return (
    <div style={{ margin: '25px' }}>
      <Provider store={store}>
        <div>
          <FormUpload />
        </div>
        <div>
          <Playback />
        </div>
      </Provider>
    </div>
  );
}

export default App;
