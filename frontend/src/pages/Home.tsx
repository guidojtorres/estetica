import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

import CategoriasDestacadas from "../components/CategoriasDestacadas";
import DondeEstamos from "../components/DondeEstamos";
import FullWidthBanner from "../components/FullWidthBanner";
import HeaderBanner from "../components/HeaderBanner";
import Novedades from "../components/Novedades";
import TratamientosDestacados from "../components/TratamientosDestacados";

const Home = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <HeaderBanner />
      <TratamientosDestacados />
      <CategoriasDestacadas />
      <FullWidthBanner>
        <div className="content">
          <div className="home-title">
            <h1>¿Necesitás hacer una consulta?</h1>
            <h4>Podes sacar tu turno online o presencial desde esta web.</h4>
          </div>
          <Button variant="white">
            <Link to={"/turnos"}>Agendá tu consulta</Link>
          </Button>
        </div>
      </FullWidthBanner>
      <DondeEstamos />
      <Novedades />
    </motion.main>
  );
};

export default Home;
