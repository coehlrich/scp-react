import Home from "./Home";
import Nav from "./Nav";
import { HashRouter as Router, Routes, Route} from "react-router-dom";
import SCPItems from "./SCPItems";

function App() {
  return (
    <div className="App container">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/scp-items/:1" element={<SCPItems />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
