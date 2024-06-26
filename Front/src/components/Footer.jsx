import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";

const Footer = () => {
  const { user } = useContext(UserTokenContext);
  return user ? (
    <footer className="bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-sky-800 pt-4 h-24 shadow-sup w-full fixed bottom-0 lg:hidden z-10">
      <nav className="w-4/5 max-w-md m-auto flex justify-between ">
        <NavLink
          to="/"
          onFocus={(e) => (e.target.style.backgroundColor = "#F3F4F6")}
          onBlur={(e) => (e.target.style.backgroundColor = "")}
          className="rounded-2xl  focus:bg-secondary-light  "
        >
          {/* <img className="m-auto" src="/images/icon-home.svg" alt="Home" /> */}
          <HomeRoundedIcon
            color="secondary"
            className=" m-4 hover:fill-primary"
          />
        </NavLink>
        <NavLink
          to="/consultations"
          className="rounded-2xl focus:bg-secondary-light "
          onFocus={(e) => (e.target.style.backgroundColor = "#F3F4F6")}
          onBlur={(e) => (e.target.style.backgroundColor = "")}
        >
          <EventNoteRoundedIcon
            color="secondary"
            className=" m-4 hover:fill-primary"
          />
        </NavLink>

        <NavLink to="/search" className="rounded-2xl focus:bg-secondary-light ">
          <PersonSearchRoundedIcon
            color="secondary"
            className="  m-4 hover:fill-primary"
          />
        </NavLink>

        <NavLink
          to="/profile"
          className="rounded-2xl focus:bg-secondary-light "
          onFocus={(e) => (e.target.style.backgroundColor = "#F3F4F6")}
          onBlur={(e) => (e.target.style.backgroundColor = "")}
        >
          <AccountCircleRoundedIcon
            color="secondary"
            className=" m-4 hover:fill-primary"
          />
        </NavLink>
      </nav>
    </footer>
  ) : (
    <footer className="bg-primary pt-10">
      <div className="max-w-6xl m-auto  flex flex-wrap justify-left">
        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12 text-white">
          <div className="text-xs uppercase text-slate-900 font-bold mb-6">
            Nuestra App
          </div>

          <a
            href="#"
            className="my-3 block  hover:text-gray-100 text-sm font-medium duration-700"
          >
            Instalación
          </a>
          <a
            href="#"
            className="my-3 block  hover:text-gray-100 text-sm font-medium duration-700"
          >
            Notas de la versión
          </a>
          <a
            href="#"
            className="my-3 block  hover:text-gray-100 text-sm font-medium duration-700"
          >
            Guía de uso
          </a>
        </div>

        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12 text-white">
          <div className="text-xs uppercase text-slate-900 font-bold mb-6">
            Comunidad
          </div>

          <a
            href="#"
            className="my-3 block  hover:text-gray-100 text-sm font-medium duration-700"
          >
            GitHub
          </a>
        </div>

        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12 text-white">
          <div className="text-xs uppercase text-slate-900 font-bold mb-6">
            Sobre nosotros
          </div>

          <a
            href="#"
            className="my-3 block hover:text-gray-100 text-sm font-medium duration-700"
          >
            Equipo
          </a>
          <a
            href="#"
            className="my-3 block hover:text-gray-100 text-sm font-medium duration-700"
          >
            Contacto
          </a>
          <a
            href="#"
            className="my-3 block hover:text-gray-100 text-sm font-medium duration-700"
          >
            Compañía
          </a>
        </div>
      </div>

      <div className="pt-2">
        <div className="flex pb-5 px-3 m-auto pt-5 border-t border-slate-900 text-gray-400 text-sm flex-col md:flex-row max-w-6xl">
          <div className="mt-2 text-white ">Grupo D || VitalApp</div>

          <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
            <a href="#" className="w-6 mx-1">
              <i className="uil uil-facebook-f"></i>
            </a>
            <a href="#" className="w-6 mx-1">
              <i className="uil uil-twitter-alt"></i>
            </a>
            <a href="#" className="w-6 mx-1">
              <i className="uil uil-youtube"></i>
            </a>
            <a href="#" className="w-6 mx-1">
              <i className="uil uil-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
