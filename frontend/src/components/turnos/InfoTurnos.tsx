import { AnimatePresence } from "framer-motion";
import React from "react";
import Button from "../Button";
import { motion } from "framer-motion";
import { SliderOpacityVariants } from "../../utils/animations";

const InfoTurnos = ({ step, setStep }: { step: number; setStep: Function }) => {
  return (
    <AnimatePresence mode="popLayout">
      {step === 1 && (
        <motion.div
          className="turnos-info"
          variants={SliderOpacityVariants}
          initial="hidden"
          animate="visible"
          exit={"exit"}
        >
          <div className="turnos-info-title">
            <img
              src="./img/circulo-turnos.png"
              alt=""
              className="turnos-vector"
            />
            <h6>¿Cómo sacar un turno?</h6>
            <p>
              Si estás interesado en realizar una consulta online o presencial
              con la Dra. Viviana buscá un turno disponible en la agenda.
            </p>
            <p>
              Elegí la fecha y horario que desees y hacé tu reserva. Luego de
              reservar tu turno debes abonar la consulta para que tu turno quede
              confirmado. Aclaración: Podrás cancelar o modificar tu consulta
              hasta 48hs. antes de la fecha y hora asignada.
            </p>
          </div>
          <div className="formas-de-pago">
            <div className="una-forma">
              <img src="./img/icon-precio.png" alt="" />
              <div>
                <p>Precio de la consulta:</p>
                <p>$4.300</p>
              </div>
            </div>
            <div className="una-forma">
              <img src="./img/icon-tarjeta.png" alt="" />
              <div>
                <p>Formas de pago:</p>
                <p>
                  Mercado Pago <br />
                  Transferencia bancaria
                </p>
              </div>
            </div>
          </div>
          <div className="info-button">
            <Button
              variant="filled-pink"
              style={{ padding: "6px 70px" }}
              onClick={() => setStep(2)}
            >
              Reservar un turno
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoTurnos;
