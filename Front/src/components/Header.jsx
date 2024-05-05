import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserTokenContext } from "../contexts/UserTokenContext";

const Header = () => {
  const { token, setToken } = useContext(UserTokenContext);

  const handleLogout = () => {
    // Borra el token del estado
    setToken(null);
    // Borra el token del localStorage
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (token) {
    return (
      <header className="w-full shadow-sm fixed bg-white">
        <nav className="flex p-4 items-center gap-4 max-w-screen-xl m-auto">
          <li className="flex-grow list-none">
            <NavLink to="/">
              <img src="/images/logo-vitalapp.svg" alt="Logo" />
            </NavLink>
          </li>
          <li className="bg-primary px-4 py-1 rounded-md list-none">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </nav>
      </header>
    );
  } else {
    return (
      <header className="w-full shadow-sm fixed bg-white">
        <nav>
          <ul className="flex p-4 items-center gap-4 max-w-screen-xl m-auto">
            <li className="flex-grow">
              <NavLink to="/">
                <img src="/images/logo-vitalapp.svg" alt="Logo" />
              </NavLink>
            </li>
            <li className="bg-primary px-4 py-1 rounded-md">
              <NavLink to="/register" className="text-white font-bold">
                Registro
              </NavLink>
            </li>
            <li className="bg-primary px-4 py-1 rounded-md">
              <NavLink to="/login" className="text-white font-bold">
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
};

export default Header;
