import { NavLink } from "react-router-dom";
import { useContext, useState, useRef } from "react";
import { UserTokenContext } from "../contexts/UserTokenContext";
import UseOutsideClick from "../hooks/useOutsideClick";

const Header = () => {
  const { setToken, user } = useContext(UserTokenContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  UseOutsideClick(dropdownRef, () => setDropdownOpen(false));

  const handleImageClick = (event) => {
    event.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };
  const handleLogout = () => {
    // Borra el token del estado
    setToken(null);
    // Borra el token del localStorage
    localStorage.removeItem("token");
    window.location.reload();
  };

  return user ? (
    <header className="z-20 w-full shadow-sm fixed bg-primary  bg-menu-lines bg-cover bg-center">
      <nav className="flex p-4 items-end gap-4 max-w-screen-xl m-auto h-32 ">
        <li className="flex-grow list-none">
          <NavLink to="/">
            <img
              className="rounded-xl shadow-lg size-14"
              src="/images/logo-white.svg"
              alt="Logo"
            />
          </NavLink>
        </li>
        {/* <li className="bg-primary px-4 py-1 rounded-md list-none shadow-md">
          <button onClick={handleLogout}>Logout</button>
        </li> */}
        <li className="list-none font-light text-right text-lg">
          <p className="text-white ">
            {user.role === "patient" ? "Paciente" : "Médico"}
          </p>
          <p className="text-white font-semibold text-right">
            {user.first_name}, {user.first_surname}
          </p>
        </li>
        <li
          className="list-none size-14 bg-white rounded-full"
          onClick={handleImageClick}
        >
          <img src={user.avatar} alt="" />
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-20  w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            >
              <div
                className=" flex flex-col gap-2 p-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  onClick={() => {
                    // Aquí va tu lógica para cambiar la imagen
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Cambiar imagen
                </button>
                <button
                  onClick={handleLogout}
                  className=" text-white font-semibold bg-primary p-2 rounded-md list-none shadow-md"
                  role="menuitem"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </li>
      </nav>
    </header>
  ) : (
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
};

export default Header;
