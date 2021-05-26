import React from "react";
import { Button, Box, FileInput, Meter, Image } from "grommet";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { NewWindow, Sync, Trash } from "grommet-icons";
import videoLogo from "../assets/imgs/videoLogo.png";

const LabelWrapper = styled.label`
  div:not(.videoPlayer) {
    display: none;
  }
`;

const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
  .videoPlayer {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
const IconButton = styled(Button)`
  padding: 5px;
`;

/// video existed and between 10kB and 5mB
const isProperFile = (video) =>
  video?.name && video?.size > 10000 && video.size < 5000000;

export default function VideoInput({
  value = null,
  percentage = 0,
  onChange = () => {},
  ...props
}) {
  const loadVideoHandler = (e) => {
    const video = e?.target.files[0];

    onChange(isProperFile(video) ? video : null);
  };

  const clearVideoHandler = () => {
    onChange(null);
  };

  return (
    <Box border={"all"} direction={"column"} {...props}>
      <Box direction="row">
        <Box style={{ marginRight: "10px" }}>
          <LabelWrapper>
            {value ? (
              <Sync
                style={{ margin: "5px", cursor: "pointer" }}
                color={"cornflowerblue"}
              />
            ) : (
              <NewWindow
                style={{ margin: "5px", cursor: "pointer" }}
                color={"cornflowerblue"}
              />
            )}

            <FileInput // the same if we where use the native <input type='file />
              accept=".mp4,.avi"
              type="file"
              onChange={loadVideoHandler}
            />
          </LabelWrapper>
        </Box>
        <Box
          flex={{ grow: 1, position: "relative" }}
          justify={"center"}
          align={"center"}
        >
          <Box style={{ position: "absolute" }}>{percentage + " %"}</Box>
          <Meter
            alignSelf={"center"}
            margin={"5px"}
            style={{ width: "100%" }}
            thickness={"small"}
            values={[
              {
                value: percentage,
                color: "cornflowerblue",
                highlight: false,
              },
            ]}
            max={100}
          />
        </Box>
        <IconButton onClick={clearVideoHandler} disabled={!value}>
          <Trash color={"red"} />
        </IconButton>
      </Box>
      {value ? (
        <PlayerWrapper>
          <ReactPlayer
            url={value}
            controls
            playsinline
            className="videoPlayer"
            width={"100%"}
            height={"100%"}
          />
        </PlayerWrapper>
      ) : (
        <Image fit="cover" src={videoLogo} fill={"horizontal"} />
      )}
    </Box>
  );
}
