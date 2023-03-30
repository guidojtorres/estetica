import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import {
  OpacityStaggerVariants,
  OpacityVariants,
} from "../../utils/animations";
import Button from "../Button";

const Congratulations = ({ paso }: { paso: number }) => {
  return (
    <AnimatePresence mode="popLayout">
      {paso === 4 && (
        <motion.div
          className="reserva-exitosa"
          variants={OpacityStaggerVariants}
          initial="hidden"
          animate="visible"
          exit={"exit"}
        >
          <motion.div className="center" variants={OpacityVariants}>
            <img src="./img/calendar-check.png" alt="" />
          </motion.div>
          <motion.h2 variants={OpacityVariants}>
            ¡Turno reservado para vos!
          </motion.h2>
          <motion.div
            className="reserva-especificaciones"
            variants={OpacityVariants}
          >
            <p>
              Hemos reservado tu turno para el día y horario que seleccionaste.
            </p>
            <p>
              Para finalizar solo debes esperar la{" "}
              <span className="fw700">confirmación del turno.</span>
            </p>
            <p>
              Te enviaremos un e-mail y un mensaje para avisarte que confirmamos
              tu turno.
            </p>
          </motion.div>
          <motion.div className="fecha-reserva" variants={OpacityVariants}>
            <span>TURNO RESERVADO:</span>
            <h6>Martes 27 de Nombiembre, 12:00 AM</h6>
          </motion.div>
          <AnimatePresence>
            <motion.div className="continuar-button" variants={OpacityVariants}>
              <Link to={"/"}>
                <Button variant="filled-pink">Volver al home</Button>
              </Link>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Congratulations;
