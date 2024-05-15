import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";

const Footer = () => {
  const { user } = useContext(UserTokenContext);
  return user ? (
    <footer className="bg-white pt-4 h-24 shadow-sup w-full fixed bottom-0 lg:hidden">
      <nav className="w-4/5 m-auto pt-2 flex justify-between">
        <NavLink
          to="/"
          className="rounded-2xl py-2 focus:bg-secondary-light flex-grow"
        >
          <img className="m-auto" src="/images/icon-home.svg" alt="Home" />
        </NavLink>
        <NavLink
          to="/consultations"
          className="rounded-2xl py-2 focus:bg-secondary-light flex-grow"
        >
          <img className="m-auto" src="/images/icon-consults.svg" alt="Logo" />
        </NavLink>

        <NavLink
          to="/search"
          className="rounded-2xl py-2 focus:bg-secondary-light flex-grow"
        >
          <img className="m-auto" src="/images/icon-search.svg" alt="Logo" />
        </NavLink>

        <NavLink
          to="/profile"
          className="rounded-2xl py-2 focus:bg-secondary-light flex-grow"
        >
          <img className="m-auto" src="/images/icon-profile.svg" alt="Logo" />
        </NavLink>
      </nav>
    </footer>
  ) : (
    <div>Footer</div>
  );
};

export default Footer;
