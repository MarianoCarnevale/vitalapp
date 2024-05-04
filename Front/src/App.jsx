import { Route, Routes } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Validate from "./pages/Validate";
import { PublicRoute } from "./components/PublicRoute.jsx";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserTokenProvider } from "./contexts/UserTokenContext.jsx";
import RecoverPassword from "./pages/RecoverPassword.jsx";

function App() {
  return (
    <>
      <UserTokenProvider>
        <Header />
        <main>
          <Routes>
            {/* //* Rutas públicas */}
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/recoverPassword" element={<RecoverPassword />} />
            </Route>

            {/* //* Rutas ocultas */}

            <Route
              path="/users/validate/:validationCode"
              element={<Validate />}
            />
            {/* //* Rutas privadas */}
            {/* <Route element={<PrivateRoute />}>
              <Route path="/Home" element={<Profile />} />
              <Route path="/consultas" element={<Consultas />} />
              <Route path="/buscar" element={<Buscar />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/doctor" element={<DoctorProfile />} />
              <Route path="/paciente" element={<PatientProfile />} />
            </Route> */}

            {/* <Route path="/users" element={<Users />}>
              <Route path="/users/:userId" element={<UserInfo />} />
            </Route> */}
          </Routes>
        </main>
        <Footer />
      </UserTokenProvider>
    </>
  );
}

export default App;
