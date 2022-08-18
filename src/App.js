import { Routes, Route } from "react-router-dom";

import DashBoard from "./Components/Dashboard/DashBoard";
import PATH from "./Path";
import Home from "./Components/HomeComponent/Home";
import Login from "./Components/LoginComponent/Login";
import Signup from "./Components/SignupComponent/Signup";
import PrivateRoutes from "./PrivateRoutes";
import CreateSurvey from "./Components/CreateSurvey/CreateSurvey";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={PATH.home} element={<Home />} />
        <Route path={PATH.login} element={<Login />} />
        <Route path={PATH.signup} element={<Signup />} />
        <Route
          path={PATH.dashboard}
          element={<PrivateRoutes component={DashBoard} />}
        />
        <Route
          path={PATH.createsurvey}
          element={<PrivateRoutes component={CreateSurvey} />}
        />
      </Routes>
    </div>
  );
}

export default App;
