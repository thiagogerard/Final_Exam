import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DogDetails from "./pages/DogDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dogs/:id" element={<DogDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
