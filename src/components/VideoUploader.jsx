import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../services/firebase";
import { useGlobalContext } from "../context/GlobalContext";
import VideoInput from "./VideoInput";
import { saveVideoData } from "../services/databaseFunctions";
import { Box } from "grommet";
import { FILENAME_UNION } from "../utils/constants";
import { ToastContainer, toast } from "react-toastify";

export default function VideoUploader() {
  const { videoToPlay, setVideoToPlay } = useGlobalContext();

  const [percentUploaded, setPercentUploaded] = useState(0);

  const videoChangeHandler = (video) => {
    if (!video) {
      setVideoToPlay(null);
      setPercentUploaded(0);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(video);
    reader.onload = function () {
      setVideoToPlay(reader.result); // Use Local Video to have faster local PreviewView
    };
    const videoUniqueId = uuidv4();
    const videoTitle = videoUniqueId + FILENAME_UNION + video?.name;
    const videoPath = `${videoTitle}`;
    const uploadTask = storage.child(videoPath).put(video);

    uploadTask.on(
      //Method of Firebase Upload
      "state_changed",

      // On Progress
      (snap) => {
        setPercentUploaded(
          Math.round((100 * snap.bytesTransferred) / snap.totalBytes)
        );
      },

      // On Error
      null,

      //On Complete
      () => {
        toast.success("Video Uploaded", {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });

        storage
          .child(videoTitle)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            saveVideoData(video.name, videoUniqueId, video.size, fireBaseUrl);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    );
  };

  return (
    <Box justify={"center"} direction={"row"}>
      <VideoInput
        value={videoToPlay}
        percentage={percentUploaded}
        onChange={videoChangeHandler}
      />

      <ToastContainer />
    </Box>
  );
}
