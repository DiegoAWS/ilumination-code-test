import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  const [videoToPlay, setVideoToPlay] = useState("");

  const instanceContext = {
    videoToPlay,
    setVideoToPlay,
  };

  return (
    <GlobalContext.Provider value={instanceContext}>
      {props.children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("Missing GlobalContextProvider Wrapper");
  }
  return context;
};

export { GlobalContextProvider, GlobalContext, useGlobalContext };
