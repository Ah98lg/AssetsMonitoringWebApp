import Router from "./routes";
import { GlobalStyles } from "./styles/global";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Router />
    </BrowserRouter>
  );
}

export default App;
