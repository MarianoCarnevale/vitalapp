import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="pt-4 h-24 shadow-sup w-full fixed bottom-0">
      <nav className="w-4/5 m-auto pt-2 flex justify-between">
        <NavLink
          to="/"
          className="rounded-2xl py-2 focus:bg-secondary-light flex-grow"
        >
          <img className="m-auto" src="/images/icon-home.svg" alt="Home" />
        </NavLink>

        <NavLink
          to="/profile"
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
  );
};

export default Footer;
