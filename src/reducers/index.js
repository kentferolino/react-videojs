import { combineReducers } from 'redux';

import uploadReducers from './uploadReducers';

export default combineReducers({
  uploads: uploadReducers
});
