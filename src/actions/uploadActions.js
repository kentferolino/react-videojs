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
      var config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      const formData = new FormData();

      const bucketUrl = `${data.uploadURL.split(file.name)[0]}/${file.name}?uploads`;

      const params = data.uploadURL.split('?')[1];
      const fields = params.split('&');

      formData.append("key", `uploads/${file.name}`);
      formData.append("bucket", "subterra-practice-task");

      fields.forEach(field => {
        const keyValue = field.split('=');
        const key = keyValue[0];
        const value = keyValue[1];
        formData.append(key, decodeURIComponent(value));
      });
      formData.append("file", file);

      return axios.post(`https://subterra-practice-task.s3.ap-southeast-2.amazonaws.com/${file.name}?uploads`, formData, config);
    })
    .then(function (result) {
      console.log(result);
      const { config: { url } } = result;
      const bucketUrl = url.split(file.name)[0];
      dispatch({ type: UPLOAD_SUCCESS, payload: { fileName: file.name, type: file.type, src: `${bucketUrl}${file.name}` } });
    })
    .catch(function (err) {
      console.log(err);
      dispatch({ type: UPLOAD_FAIL, payload: "Failed to upload file." });
    });
};
