import { NavLink } from "react-router-dom";
const Error404 = () => {
  return (
    <div className="w-full h-dvh bg-primary">
      <h1 className="text-3xl text-white text-center pt-10 mb-10">
        Estas perdido?
      </h1>
      <NavLink to="/">
        <img
          className="rounded-xl shadow-lg size-96 m-auto "
          src="/images/404.svg"
          alt="Logo"
        />
      </NavLink>
    </div>
  );
};

export default Error404;
