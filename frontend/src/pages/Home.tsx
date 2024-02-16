import { motion } from "framer-motion";
import React, { useState } from "react";
import Button from "../components/Button";

import CategoriasDestacadas from "../components/CategoriasDestacadas";
import DondeEstamos from "../components/DondeEstamos";
import FullWidthBanner from "../components/FullWidthBanner";
import HeaderBanner from "../components/HeaderBanner";
import Novedades from "../components/Novedades";
import TratamientosDestacados from "../components/TratamientosDestacados";
import { Modal } from "../components/Modal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        redirectUrl="https://wiri.la/profesional/garcia-viviana/6af85fe6"
        title="Wiri"
      />
      <HeaderBanner />
      <TratamientosDestacados />
      <CategoriasDestacadas />
      <FullWidthBanner>
        <div className="content">
          <div className="home-title">
            <h1>¿Necesitás hacer una consulta?</h1>
            <h4>Podes sacar tu turno online o presencial desde esta web.</h4>
          </div>
          <Button variant="white" onClick={handleModalOpen}>
            Agendá tu consulta
          </Button>
        </div>
      </FullWidthBanner>
      <DondeEstamos />
      <Novedades />
    </motion.main>
  );
};

export default Home;
