import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const HeaderBanner = () => {
  return (
    <header className="header-banner">
      <div className="estetica-container">
        <div className="row row-cols-1 row-cols-lg-2">
          <div className="col header-banner-textos">
            <div>
              <h6>Dra Viviana García</h6>
              <h1>Centro de estética</h1>
            </div>
            <p>
              En Estética VG recibirás atención personalizada con nuestra médica
              especialista en Dermatología y Medicina Estética para elegir el
              tratamiento que mejor se adapte a vos y así conseguir resultados
              increíbles ¡Te esperamos!
            </p>
            <Button variant="pink">
              <Link to={"/turnos"}>Agendar consulta</Link>
            </Button>
          </div>
          <div className="col">
            <div className="imagen-falsa"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBanner;
