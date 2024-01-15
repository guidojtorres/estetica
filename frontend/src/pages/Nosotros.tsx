import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import CentroMedico from "../components/CentroMedico";
import FullWidthBanner from "../components/FullWidthBanner";
import Heading from "../components/Heading";
import InfoNosotros from "../components/InfoNosotros";
import LaDoctora from "../components/LaDoctora";

const Nosotros = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Heading title="Quienes somos"></Heading>
      <LaDoctora />
      <InfoNosotros />
      <FullWidthBanner>
        <div className="qs-fwb-text">
          <img src="./img/star.png" alt="" />
          <h4>Tu salud es lo primero</h4>
          <p>
            En VG te asesoramos para elegir el tratamiento más adecuado para tu
            salud.
            <br /> Antes de realizar cualquier tratamiento te ofrecemos asistir
            a una consulta (online o presencial) para informarte mejor sobre
            nuestro trabajo.
          </p>
          <Button variant="white" noArrow>
            <a href="https://wiri.la/profesional/garcia-viviana/6af85fe6">
              Agendar consulta
            </a>
          </Button>
        </div>
      </FullWidthBanner>
      <CentroMedico />
    </motion.main>
  );
};

export default Nosotros;
