import { Box } from "grommet";
import { transform, compose, sortBy, reverse } from "lodash/fp";
import React, { useEffect, useState } from "react";
import { database } from "../services/firebase";
import VideoCard from "./VideoCard";

const fullTransform = transform.convert({
  cap: false,
});

export default function VideoGrid() {
  const [dataVideos, setDataVideos] = useState([]);

  useEffect(() => {
    database.on("value", (snapshot) => {
      compose([
        setDataVideos,
        reverse,
        sortBy("timeSpan"),
        fullTransform((acc, value, id) => {
          acc.push({ ...value, id });
        }, []),
      ])(snapshot.val());
    });

    return () => {
      database.off();
    };
  }, []);

  console.log(dataVideos);

  return (
    <Box direction={"row"} wrap justify={"between"}>
      {dataVideos.map((item) => (
        <VideoCard item={item} key={item.id} />
      ))}
    </Box>
  );
}
