import Home from "./Home";
import Nav from "./Nav";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SCPItems from "./SCPItems";

function App() {
  return (
    <div className="App container">
      <Router>
        <Nav />
        <Routes>
          <Route path="/scp-react" element={<Home />}/>
          <Route path="/scp-react/scp-items/:1" element={<SCPItems />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
