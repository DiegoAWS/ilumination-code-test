import { Grommet } from "grommet";
import VideoGrid from "./components/VideoGrid";
import VideoUploader from "./components/VideoUploader";
import { GlobalContextProvider } from "./context/GlobalContext";


function App() {



  return (
    <GlobalContextProvider>
      <Grommet plain>
        <VideoUploader />
        <VideoGrid/>
      </Grommet>
    </GlobalContextProvider>
  );
}

export default App;
