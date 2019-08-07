import React, { useState, useEffect } from 'react';
import Evaporate from "evaporate";
import AWS from "aws-sdk";
const S3Upload = ({ render, pending }) => {

  const [evaporate, setEvaporate] = useState([]);

  useEffect(() => {
    Evaporate.create({
      aws_key: process.env.REACT_APP_ACCESS_ID, // REQUIRED -- set this to your AWS_ACCESS_KEY
      bucket: "subterra-practice-task", // REQUIRED -- set this to your s3 bucket name
      awsRegion: "ap-southeast-2", // s3 region
      signerUrl: '/signv4_auth', // endpoint of your server
      awsSignatureVersion: "4",
      computeContentMd5: true,
      cryptoMd5Method: function (data) {
        return AWS.util.crypto.md5(data, "base64");
      },
      cryptoHexEncodedHash256: function (data) {
        return AWS.util.crypto.sha256(data, "hex");
      }
    }).then(evaporate => setEvaporate(evaporate));
  }, []);


  return (
    evaporate ? render(evaporate) : pending()
  );
}


export default S3Upload;