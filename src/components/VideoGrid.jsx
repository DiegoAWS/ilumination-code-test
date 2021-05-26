import { Box } from "grommet";
import { transform } from "lodash";
import React, { useEffect } from "react";
import { database } from "../services/firebase";

export default function VideoGrid() {
//   const [dataVideos, setDataVideos] = useState([]);
  useEffect(() => {
    database.on("value", (snapshot) => {
      const data = snapshot.val();

      console.log(data);

      const iteratee = (accumulator, value, key) => {
        return [...accumulator, { ...value, id: key }];
      };

      const dataOK = transform(data, iteratee, []);
      console.log(dataOK);
    });
  }, []);
  return <Box></Box>;
}
