import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full shadow-sm">
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
