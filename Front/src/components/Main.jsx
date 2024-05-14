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
import Error404 from "../pages/Error404.jsx";
import RecoverPassword from "../pages/RecoverPassword.jsx";
import UpdatePassword from "../pages/UpdatePassword.jsx";
import { DateNow } from "./DateNow.jsx";

const Main = () => {
  const { user } = useContext(UserTokenContext);
  return (
    <main
      className={`bg-cover  pb-16  ${
        user
          ? "bg-white lg:ml-60 max-lg:pt-32"
          : "bg-hero-pattern bg-no-repeat pt-32  "
      }`}
    >
      <div className={`max-lg:hidden text-left ${!user && "hidden"}`}>
        <h1 className=" pt-8 m-auto w-5/6 max-w-md text-primary font-bold text-3xl jus ">
          Hoy
        </h1>
        <DateNow />
        <hr className="mt-6 mx-auto mb-20  border-primary w-5/6 lg:order-3" />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Tus rutas existentes */}
        <Route path="*" element={<Error404 />} />

        {/* //* Rutas públicas */}
        <Route element={<PublicRoute />}>
          <Route path="/recover" element={<RecoverPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/users/validate/:validationCode"
            element={<Validate />}
          />
        </Route>
        <Route
          path="/updatePassword/:recoveryCode"
          element={<UpdatePassword />}
        />
        {/* //* Rutas ocultas */}

        {/* //* Rutas privadas */}
        <Route element={<PrivateRoute />}>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/consultations" element={<Consultation />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile/" element={<Profile />} />
        </Route>
      </Routes>
    </main>
  );
};

export default Main;
