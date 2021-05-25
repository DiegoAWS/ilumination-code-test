import React from "react";
import ReactPlayer from "react-player";
import { useGlobalContext } from "../context/GlobalContext";
import styled from "styled-components";

const DivBordered = styled.div`
  border: 1px solid black;
  width: min-content;
`;
export default function VideoView() {
  const { videoUrl } = useGlobalContext();
  return (
    <DivBordered>
      {videoUrl && <ReactPlayer url={videoUrl} controls />}
    </DivBordered>
  );
}
