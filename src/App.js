import { Routes, Route } from "react-router-dom";

import DashBoard from "./Components/Dashboard/DashBoard";
import PATH from "./Constants/Path";
import Home from "./Components/HomeComponent/Home";
import Login from "./Components/LoginComponent/Login";
import Signup from "./Components/SignupComponent/Signup";
import PrivateRoutes from "./PrivateRoutes";
import CreateSurvey from "./Components/CreateSurvey/CreateSurvey";
import EditSurvey from "./Components/EditSurvey/EditSurvey";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import Join from "./Components/JoinSurvey/Join";
import JoinSurvey from "./Components/JoinSurvey/JoinSurvey";
import Responses from "./Components/Responses/Responses";

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

        <Route
          path={`${PATH.EDITSURVEY}/:surveyId`}
          element={<PrivateRoutes component={EditSurvey} />}
        />

        <Route path={PATH.JOIN} element={<PrivateRoutes component={Join} />} />
        <Route
          path={`${PATH.JOINSURVEY}/:surveyId`}
          element={<PrivateRoutes component={JoinSurvey} />}
        />

        <Route
          path={`${PATH.RESPONSES}/:surveyId`}
          element={<PrivateRoutes component={Responses} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
