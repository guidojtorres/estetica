import React, { useState } from "react";
import Button from "./Button";
import { Modal } from "./Modal";

const HeaderBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
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
            <Button variant="pink" onClick={handleModalOpen}>
              Agendar consulta
            </Button>
          </div>
          <div className="col">
            <img
              src="./img/header-banner.png"
              alt=""
              style={{ maxWidth: "100%" }}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        redirectUrl="https://wiri.la/profesional/garcia-viviana/6af85fe6"
        title="Wiri"
      />
    </header>
  );
};

export default HeaderBanner;
