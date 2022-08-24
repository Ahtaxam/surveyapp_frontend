import { Routes, Route } from "react-router-dom";

import DashBoard from "./Components/Dashboard/DashBoard";
import PATH from "./Constants/Path";
import Home from "./Components/HomeComponent/Home";
import Login from "./Components/LoginComponent/Login";
import Signup from "./Components/SignupComponent/Signup";
import PrivateRoutes from "./PrivateRoutes";
import CreateSurvey from "./Components/CreateSurvey/CreateSurvey";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={PATH.HOME} element={<Home />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.SIGNUP} element={<Signup />} />
        <Route
          path={PATH.DASHBOARD}
          element={<PrivateRoutes component={DashBoard} />}
        />
        <Route
          path={PATH.SURVEY}
          element={<PrivateRoutes component={CreateSurvey} />}
        />
      </Routes>
    </div>
  );
}

export default App;
