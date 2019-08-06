import axios from 'axios';
import AWS from 'aws-sdk';
import { UPLOAD_LOADING, UPLOAD_SUCCESS, UPLOAD_FAIL } from './types';

export const setUploadFileLoading = () => {
  return {
    type: UPLOAD_LOADING,
  };
};

export const uploadFile = (file) => async (dispatch) => {
  dispatch({ type: UPLOAD_LOADING });
  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS,
    region: 'ap-southeast-2'
  });
  const formData = new FormData();
  formData.append("file", file);

  const params = { Key: file.name, Bucket: "subterra-practice-task", Body: file };
  var options = { partSize: 5 * 1024 * 1024, queueSize: 1 }
  const upload = s3.upload(params, options);
  upload.send(function (err, data) {
    if (err) {
      console.log('Error in upload =>', err);
      dispatch({ type: UPLOAD_FAIL, payload: "Failed to upload file." });
    } else {
      console.log('Success in upload =>', data);
      dispatch({ type: UPLOAD_SUCCESS, payload: { fileName: data.Key, type: file.type, src: data.Location } });
    }
  });
};
