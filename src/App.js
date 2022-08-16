import { Routes, Route } from "react-router-dom";
import DashBoard from "./Components/Dashboard/DashBoard";
import Path from "./Path";
import Home from "./Components/HomeComponent/Home";
import Login from "./Components/LoginComponent/Login";
import Signup from "./Components/SignupComponent/Signup";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={Path.home} element={<Home />} />
        <Route path={Path.login} element={<Login />} />
        <Route path={Path.signup} element={<Signup />} />
        <Route path={Path.dashboard} element={<DashBoard />} />
      </Routes>
    </div>
  );
}

export default App;
