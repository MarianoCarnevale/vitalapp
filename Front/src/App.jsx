import { Route, Routes } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserTokenProvider } from "./contexts/UserTokenContext.jsx";

function App() {
  return (
    <>
      <UserTokenProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </UserTokenProvider>
    </>
  );
}

export default App;
