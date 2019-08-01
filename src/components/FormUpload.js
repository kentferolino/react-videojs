import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { uploadFile } from '../actions/uploadActions';

const buttonStyle = {
  flex: 1,
  alignSelf: 'stretch',
  backgroundColor: '#fff',
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#007aff',
  padding: '5px 10px',
}

const FormUpload = ({ uploadFileAction, uploadedFiles }) => {

  const [file, setFile] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      uploadFileAction(file);
    }
  };

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            File: <input type="file" onChange={handleOnChange} style={buttonStyle} />
          </label>
          <input type="submit" value="Submit" style={buttonStyle} />
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  uploadedFiles: state.uploads.files
});

export default connect(
  mapStateToProps,
  {
    uploadFileAction: uploadFile,
  },
)(FormUpload);