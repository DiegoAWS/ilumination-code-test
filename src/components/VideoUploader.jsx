import React from "react";
import { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { storage } from "../services/firebase";
import { useGlobalContext } from "../context/GlobalContext";
import VideoInput from "./VideoInput ";
import { saveVideoData } from "../services/saveDataToRealTimeDatabase";
import { Box } from "grommet";

export default function VideoUploader() {
  const [video, setVideo] = useState(null);

  const [percentUploaded, setPercentUploaded] = useState(0);

  const { setVideoUrl } = useGlobalContext();

  const videoChangeHandler = (video) => {
    if (!video) {
      setVideo(null);
      setPercentUploaded(0);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(video);
    reader.onload = function () {
      setVideo(reader.result); // Use Local Video to have faster local PreviewView
    };
    const videoUniqueId = uuidv4();
    const videoTitle = videoUniqueId + "_|_" + video?.name;
    const videoPath = `videos/${videoTitle}`;
    const uploadTask = storage.ref(videoPath).put(video);

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
      null,

      //On Complete
      () => {
        storage
          .ref("videos")
          .child(videoTitle)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setVideoUrl(fireBaseUrl);
            saveVideoData(video.name, videoUniqueId, video.size, fireBaseUrl);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    );
  };

  return (
    <Box justify={"center"} direction={'row'}>
      <VideoInput
        style={{ maxWidth: "480px",width:'100%' }}
        value={video}
        percentage={percentUploaded}
        onChange={videoChangeHandler}
      />
    </Box>
  );
}
