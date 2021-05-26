import { Grommet } from "grommet";
import VideoUploader from "./components/VideoUploader";
import { GlobalContextProvider } from "./context/GlobalContext";


function App() {



  return (
    <GlobalContextProvider>
      <Grommet plain>
        <VideoUploader />
      </Grommet>
    </GlobalContextProvider>
  );
}

export default App;
