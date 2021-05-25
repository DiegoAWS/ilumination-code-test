import { Grommet } from "grommet";
import VideoInput from "./components/VideoInput ";
import VideoView from "./components/VideoView";
import { GlobalContextProvider } from "./context/GlobalContext";

function App() {
  return (
    <GlobalContextProvider>
      <Grommet plain>
        <VideoInput />
        <VideoView />
      </Grommet>
    </GlobalContextProvider>
  );
}

export default App;
