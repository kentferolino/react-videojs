import axios from 'axios';
import { UPLOAD_LOADING, UPLOAD_SUCCESS, UPLOAD_FAIL } from './types';

export const setUploadFileLoading = () => {
  return {
    type: UPLOAD_LOADING,
  };
};

export const uploadFile = (file) => async (dispatch) => {
  dispatch({ type: UPLOAD_LOADING });

  await axios.post("https://ntgjgbhu8d.execute-api.ap-southeast-2.amazonaws.com/dev/requestUploadURL", { "name": file.name })
    .then(res => {
      const { data } = res;
      var options = {
        headers: {
          'Content-Type': file.type
        }
      };
      const formData = new FormData();
      formData.append("file", file);

      return axios.put(data.uploadURL, file, options);
    })
    .then(function (result) {
      const { config: { url } } = result;
      const bucketUrl = url.split(file.name)[0];
      dispatch({ type: UPLOAD_SUCCESS, payload: { fileName: file.name, type: file.type, src: `${bucketUrl}${file.name}` } });
    })
    .catch(function (err) {
      dispatch({ type: UPLOAD_FAIL, payload: "Failed to upload file." });
    });
};
