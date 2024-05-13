import { useHeader } from "../hooks/useHeader.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { VITE_BASE_URL } from "../config/env.js";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";
import axios from "axios";
// Asumiendo que getAvatar es la función que has definido anteriormente

const Header = () => {
  const [avatarUrl, setAvatarUrl] = useState("/images/default-avatar.jpg");

  const { user } = useContext(UserTokenContext);
  const {
    dropdownOpen,
    dropdownRef,
    isModalOpen,
    setIsModalOpen,
    handleImageClick,
    handleLogout,
    handleAvatar,
    handleFileChange,
    handleUpload,
  } = useHeader();

  async function getAvatar() {
    if (!user) {
      // user es null, no intentes acceder a user_id
      return;
    }

    // Reemplaza esta URL con la URL real que necesitas usar
    const url = `${VITE_BASE_URL}/uploads/users/${user.user_id}/${user.avatar}`;

    try {
      // Realiza la petición GET y devuelve la respuesta
      const response = await axios.get(url);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el avatar:", error);
    }
  }
  useEffect(() => {
    const fetchAvatar = async () => {
      const url = await getAvatar();
      if (url) {
        setAvatarUrl(url);
      }
    };
    fetchAvatar();
  }, [user]);
  return user ? (
    <header className="z-20 w-full shadow-sm fixed bg-primary  bg-menu-lines bg-cover bg-center lg:max-w-60 lg:h-dvh ">
      <ToastContainer />
      <nav>
        <ul className="flex p-4 items-end gap-4 max-w-screen-xl m-auto h-32 lg:flex-col lg:items-start  ">
          <li className="flex-grow list-none lg:hidden ">
            <NavLink to="/">
              <img
                className="rounded-xl shadow-lg size-14"
                src="/images/logo-white.svg"
                alt="Logo"
              />
            </NavLink>
          </li>
          <li className="list-none max-lg:hidden ">
            <NavLink to="/">
              <img
                className="rounded-xl w-36 py-4"
                src="/images/logo-wide-white.svg"
                alt="Logo"
              />
            </NavLink>
          </li>

          <li className="list-none font-light text-right text-lg lg:text-left order-1 lg:order-2 lg:flex gap-2">
            <p className="text-white ">
              {user.role === "patient" ? "Paciente" : "Médico"}
            </p>
            <p className="text-white font-semibold text-right">
              {user.first_name}, {user.first_surname}
            </p>
          </li>

          <li
            className="list-none size-14 bg-white rounded-full order-2 lg:order-1"
            onClick={handleImageClick}
          >
            <img src={avatarUrl} alt="User avatar" />
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-5 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              >
                <div
                  className=" flex flex-col gap-2 p-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    onClick={handleAvatar}
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
          <hr className="max-lg:hidden border w-full lg:order-3" />
          <li className="list-none max-lg:hidden order-3 flex gap-2">
            <img src="/images/icon-consultations-white.svg" alt="" />

            <NavLink
              to="/consultations"
              className="text-white font-semibold text-lg list-none"
            >
              Consultas
            </NavLink>
          </li>
          <li className="list-none max-lg:hidden order-4 flex gap-2">
            <img src="/images/icon-search-white.svg" alt="" />
            <NavLink
              to="/search"
              className="text-white font-semibold text-lg list-none"
            >
              Buscar
            </NavLink>
          </li>
          <li className="list-none max-lg:hidden order-5 flex gap-2">
            <img src="/images/icon-profile-white.svg" alt="" />
            <NavLink
              to="/profile"
              className="text-white font-semibold text-lg list-none"
            >
              Perfil
            </NavLink>
          </li>
        </ul>
      </nav>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Cambiar avatar
                    </h3>
                    <div>
                      <input type="file" onChange={handleFileChange} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleUpload}
                >
                  Subir
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  ) : (
    <header className="w-full shadow-sm fixed bg-white">
      <nav>
        <ul className="flex p-4 items-center gap-4 max-w-screen-xl m-auto ">
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
