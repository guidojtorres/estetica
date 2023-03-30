import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  return (
    <footer className={`est-footer ${pathname.includes("/admin") && "d-none"}`}>
      <div className="footer-flex">
        <Link to={"/"}>
          <img src="./img/logo-footer.png" alt="" />
        </Link>
        <div className="footer-redes">
          <p>Encontranos en:</p>
          <img src="./img/face.png" alt="" />
          <img src="./img/ig.png" alt="" />
        </div>
      </div>
      <hr />
      <p className="copyright">
        © Copyright 2017 Estetica VGTodos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
