import React from "react";
import { Box, FileInput, Meter, Image } from "grommet";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { CloudUpload, Close, Update } from "grommet-icons";
import videoLogo from "../assets/imgs/videoLogo.jpg";

const VideoInputHeader = styled(Box)`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
  background: #a7a7a705;
  transition: background 1s ease-out;
  :hover {
    background: #a7a7a770;
    .videoUploaderButton {
      background: #2da8ff;
      svg {
        stroke: blue;
      }
    }
    .closeButton {
      background: #fdd0d0;
      svg {
        stroke: red;
      }
    }
  }
`;

const LabelWrapper = styled.label`
  div:not(.videoUploaderButton) {
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

const IconButtonDiv = styled.div`
  padding: 5px;
  display: flex;
  transition: background 1s ease-out;
  background: transparent;
  border-radius: 100px;
  cursor: pointer;
    svg { 
      transition: stroke 1s ease-out;
    }
  }
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

// video exist and size between 10kB and 50mB
const isProperFile = (video) =>
  video?.name && video?.size > 10000 && video.size < 50000000;

export default function VideoInput({
  value = null,
  percentage = 0,
  onChange = () => {},
}) {
  const loadVideoHandler = (e) => {
    const video = e?.target.files[0];
    onChange(isProperFile(video) ? video : null);
  };

  const clearVideoHandler = () => {
    onChange(null);
  };

  return (
    <Box
      border={"all"}
      direction={"column"}
      style={{ position: "relative", maxWidth: "480px", width: "100%" }}
    >
      <VideoInputHeader direction="row">
        {!value && (percentage === 0 || percentage === 100) && (
          <Box style={{ marginRight: "10px" }}>
            <LabelWrapper>
              <IconButtonDiv className={"videoUploaderButton"}>
                <CloudUpload color={"2da8ff0f"} />
              </IconButtonDiv>
              <FileInput // the same as if we where using the native <input type='file />
                accept=".mp4,.avi"
                type="file"
                onChange={loadVideoHandler}
              />
            </LabelWrapper>
          </Box>
        )}
        {percentage > 0 && percentage < 100 && (
          <Box>
            <SpinnerIcon style={{ margin: "5px" }} color={"cornflowerblue"} />
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
        </Box>
        {value && (
          <IconButtonDiv onClick={clearVideoHandler} className="closeButton">
            <Close color={"#ff000017"} />
          </IconButtonDiv>
        )}
      </VideoInputHeader>

      <PlayerWrapper>
        {value ? (
          <ReactPlayer
            url={value}
            controls
            playsinline
            className="videoPlayer"
            width={"100%"}
            height={"100%"}
          />
        ) : (
          <Image
            fit="cover"
            className="videoPlayer"
            width={"100%"}
            height={"100%"}
            src={videoLogo}
            fill={"horizontal"}
          />
        )}
      </PlayerWrapper>
    </Box>
  );
}
