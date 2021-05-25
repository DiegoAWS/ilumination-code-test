import React from "react";
import { useState } from "react";
import { Box, Button, FileInput, Meter } from "grommet";

import mime from "mime-types";
import { v4 as uuidv4 } from "uuid";
import { storage } from "./services/firebase";

export default function VideoInput() {
  const [file, setFile] = useState(null);
  const [uploadState, setUploadState] = useState(null);

  const [percentUploaded, setPercentUploaded] = useState(0);
  const [uploadErrors, setUploadErrors] = useState([]);
  const authorizedFileTypes = ["video/mp4", "video/x-msvideo"]; // MP4 and AVI

  /*video/x-flv
.mp4	video/mp4
.m3u8	application/x-mpegURL
.ts	  video/MP2T
.3gp	video/3gpp
.avi	video/x-msvideo
.wmv	video/x-ms-wmv
*/

  /// file existed and between 10kB and 5mB
  const isProperFile = (file) =>
    file?.name &&
    authorizedFileTypes.includes(mime.lookup(file.name)) &&
    file?.size > 10000 &&
    file.size < 5000000;

  const loadFile = (event) => {
    console.log("loaded");
    const fileSelected = event?.target?.files[0];

    setFile(isProperFile(fileSelected) ? fileSelected : null);
  };

  const uploadFile = () => {
    const videoTitle = uuidv4() + "_|_" + file?.name;
    const filePath = `videos/${videoTitle}`;

    setUploadState("uploading");
    const uploadTask = storage.ref(filePath).put(file);

    uploadTask.on(
      //Method of Firebase Upload
      "state_changed",

      // On Progress
      (snap) => {
        const uploadedPercent = Math.round(
          (snap.bytesTransferred / snap.totalBytes) * 100
        );
        setPercentUploaded(uploadedPercent);
      },

      // On Error
      (err) => {
        console.error(err);
        setUploadErrors([...uploadErrors, err]);
        setUploadState("error");
      },

      //On Complete
      () => {
        storage
          .ref("videos")
          .child(videoTitle)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            console.log({ fireBaseUrl });
            setUploadState("done");
          })
          .catch((err) => {
            console.error(err);
            setUploadErrors([...uploadErrors, err]);
            setUploadState("error");
          });
      }
    );
  };

  return (
    <div>
      <Box>
        <FileInput
          accept=".mp4,.avi"
          onChange={loadFile}
          disabled={uploadState === "uploading"}
        />
      </Box>

      <Button
        primary
        label="Upload"
        onClick={uploadFile}
        disabled={!file && uploadState === "uploading"}
      />

      {uploadState === "uploading" && (
        <span>
          <Meter
            values={[
              {
                value: percentUploaded,
              },
            ]}
          />
          {percentUploaded + " %"}
        </span>
      )}
    </div>
  );
}
