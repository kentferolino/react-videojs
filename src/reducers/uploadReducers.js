/* eslint-disable no-underscore-dangle */
import { UPLOAD_LOADING, UPLOAD_SUCCESS, UPLOAD_FAIL } from '../actions/types';

const initialState = {
  files: [],
  loading: false,
  error: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPLOAD_LOADING:
      return { ...state, loading: true, error: "" };
    case UPLOAD_SUCCESS: {
      return { ...state, loading: false, files: [...state.files, action.payload], error: "" }
    }
    case UPLOAD_FAIL: {
      return { ...state, loading: false, error: action.payload }
    }
    default:
      return state;
  }
}
