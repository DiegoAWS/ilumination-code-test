import { Grommet } from "grommet";
import VideoGrid from "./components/VideoGrid";
import VideoUploader from "./components/VideoUploader";
import { GlobalContextProvider } from "./context/GlobalContext";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const theme = { global: { focus: { outline: { size: "0px" } } } };

  return (
    <GlobalContextProvider>
      <Grommet theme={theme}>
        <VideoUploader />
        <VideoGrid />
      </Grommet>
    </GlobalContextProvider>
  );
}

export default App;
