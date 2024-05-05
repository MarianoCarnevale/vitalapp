import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Validate from "../pages/Validate";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";
import { useContext } from "react";
import Consultation from "../pages/Consultation.jsx";
import Search from "../pages/Search.jsx";
import Profile from "../pages/Profile.jsx";

const Main = () => {
  const { token } = useContext(UserTokenContext);
  console.log(token);
  return (
    <main
      className={`bg-cover pt-32 ${
        token ? "bg-white" : "bg-hero-pattern bg-no-repeat"
      }`}
    >
      <Routes>
        {/* //* Rutas públicas */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        {/* //* Rutas ocultas */}

        <Route path="/users/validate/:validationCode" element={<Validate />} />
        {/* //* Rutas privadas */}
        <Route element={<PrivateRoute />}>
          {" "}
          <Route path="/" element={<Home />} />
          <Route path="/consultations" element={<Consultation />} />
          <Route path="/search" element={<Search />} />
          <Route path="/user" element={<Profile />} />
        </Route>
      </Routes>
    </main>
  );
};

export default Main;
