import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./Components/HomeComponent/Home";
import Login from "./Components/LoginComponent/Login";
import Signup from "./Components/SignupComponent/Signup";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
