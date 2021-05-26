import React from "react";

import styled from "styled-components";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "grommet";
import Swal from "sweetalert2";
import { database, storage } from "../services/firebase";
import videoLogo from "../assets/imgs/videoLogo2.png";
import { CirclePlay, Trash } from "grommet-icons";
import { useGlobalContext } from "../context/GlobalContext";
import showFileSize from "../utils/showFileSize";
import showTimeFromSpan from "../utils/showTimeFromSpan";
import { FILENAME_UNION } from "../utils/constants";

const VideoImagenWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
  .videoImagen {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
const VideoImageCard = styled(Card)`
  width: 240px;
  margin: 20px;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const VideoCardHeader = styled(CardHeader)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
  text-align: center;
  width: 100%;
  display: block;
`;
export default function VideoCard({ item }) {
  const { setVideoToPlay } = useGlobalContext();

  const selectVideoHandler = (item) => {
    setVideoToPlay(item.downloadURL);
  };

  const deleteVideoHandler = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this video file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        storage
          .child(item.id + FILENAME_UNION + item.fileName)
          .delete()
          .then(function () {
            database.child(item.id).remove();
          });
      }
    });
  };

  return (
    <VideoImageCard background="light-1" border="all">
      <VideoCardHeader
        pad="small"
        justify="center"
        border="bottom"
        background="cornflowerblue"
      >
        {item.fileName}
      </VideoCardHeader>
      <CardBody>
        <VideoImagenWrapper>
          <Image
            className="videoImagen"
            src={videoLogo}
            width={"100%"}
            height={"100%"}
          />
        </VideoImagenWrapper>
      </CardBody>

      <CardFooter pad={{ horizontal: "small" }} border="top">
        <Box fill>
          <Box direction={"row"} justify={"between"} pad={"top"}>
            <Button
              icon={<CirclePlay color="blue" />}
              hoverIndicator
              onClick={() => {
                selectVideoHandler(item);
              }}
            />
            <Button
              icon={<Trash color="red" />}
              hoverIndicator
              onClick={() => {
                deleteVideoHandler(item);
              }}
            />
          </Box>
          <Box direction={"row"} justify={"between"}>
            <Box>{showFileSize(item.size)}</Box>
            <Box>{showTimeFromSpan(item.timeSpan)}</Box>
          </Box>
        </Box>
      </CardFooter>
    </VideoImageCard>
  );
}
