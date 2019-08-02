import React from 'react';
import FormUpload from './components/FormUpload';
import Playback from './components/Playback';
import { Provider } from 'react-redux';
import store from './store';

function App() {
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
