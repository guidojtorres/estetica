import React from "react";
import { Link, useLocation } from "react-router-dom";
const Navegacion = () => {
  const { pathname } = useLocation();
  return (
    <nav
      className={`${!(pathname === "/") && "pink-bg"} ${
        pathname.includes("/admin") && "d-none"
      }`}
    >
      <div className="navegacion">
        <Link to={"/"}>
          <img src="./img/logo.png" alt="" />
        </Link>
        <div className="navegacion-items">
          <Link to={"/nosotros"}>
            <span>Quienes somos</span>
          </Link>

          <Link to={"/tratamientos"}>
            <span>Tratamientos</span>
          </Link>
          <Link to={"/contacto"}>
            <span>Contacto</span>
          </Link>
          <Link to={"/turnos"}>
            <span>Turno</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navegacion;
