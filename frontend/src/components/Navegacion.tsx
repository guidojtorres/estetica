import React from "react";
import { Link, useLocation } from "react-router-dom";
const Navegacion = () => {
  const { pathname } = useLocation();
  return (
    <nav
      className={`${!(pathname === "/") && "pink-bg"} ${
        pathname.includes("/miad") && "d-none"
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
          <a href="https://wiri.la/profesional/garcia-viviana/6af85fe6">
            <span>Turno</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navegacion;
