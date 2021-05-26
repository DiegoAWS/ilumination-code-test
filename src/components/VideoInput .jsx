import React from "react";
import { Button, Box, FileInput, Meter, Image } from "grommet";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { NewWindow, Sync, ClearOption, Update } from "grommet-icons";
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

const SpinnerIcon = styled(Update)`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }

  animation: spin 2s linear infinite;
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
        {(percentage === 0 || percentage === 100) && (
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
        )}
        {percentage > 0 && percentage < 100 && (
          <Box>
            <SpinnerIcon
              style={{ margin: "5px" }}
              color={"cornflowerblue"}
            />
          </Box>
        )}
        <Box
          flex={{ grow: 1, position: "relative" }}
          justify={"center"}
          align={"center"}
        >
          {percentage > 0 && percentage < 100 && (
            <>
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
            </>
          )}
          {percentage === 100 && (
            <Box
              style={{
                position: "absolute",
                backgroundColor: "springgreen",
                color: "white",
                padding:'0 5px',
                borderRadius:'5px'
              }}
            >
              UPLOADED
            </Box>
          )}
        </Box>
        <IconButton onClick={clearVideoHandler} disabled={!value}>
          <ClearOption color={"red"} />
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
