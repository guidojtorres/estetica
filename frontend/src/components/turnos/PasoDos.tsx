import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import {
  OpacityStaggerVariants,
  OpacityVariants,
} from "../../utils/animations";
import Button from "../Button";
import TextInput from "../TextInput";
import { TurnosContext } from "./TurnoForm";

const PasoDos = ({ paso, setPaso }: { paso: number; setPaso: Function }) => {
  const { setTurnoForm } = React.useContext(TurnosContext);
  return (
    <AnimatePresence mode="popLayout">
      {paso === 2 && (
        <motion.div
          variants={OpacityStaggerVariants}
          initial="hidden"
          animate="visible"
          exit={"exit"}
          className="paso-dos"
        >
          <h4 className="selector-dia-title">Completá los siguientes datos:</h4>
          <div className="row gy-3 gx-3 pb-3">
            <div className="col-md-6">
              <TextInput
                placeholder="Nombre"
                value="nombre"
                setForm={setTurnoForm}
              />
            </div>
            <div className="col-md-6">
              <TextInput
                placeholder="Apellido"
                value="apellido"
                setForm={setTurnoForm}
              />
            </div>
            <div className="col-md-12">
              <TextInput
                placeholder="Nro. Celular"
                value="celular"
                setForm={setTurnoForm}
              />
            </div>
            <div className="col-md-12">
              <TextInput
                placeholder="Correo electrónico"
                value="email"
                setForm={setTurnoForm}
              />
            </div>
            <div className="col-md-12">
              <TextInput
                placeholder="Asunto de consulta"
                value="asunto"
                setForm={setTurnoForm}
              />
            </div>
          </div>
          <div className="modalidad-flex">
            <p style={{ margin: "0" }}>Modalidad de consulta:</p>
            <div className="checkbox-flex">
              <label htmlFor="presencial">Presencial</label>
              <input type="radio" name="modalidad" id="presencial" />
            </div>
            <div className="checkbox-flex">
              <label htmlFor="online">Online</label>
              <input type="radio" name="modalidad" id="online" />
            </div>
          </div>

          <AnimatePresence>
            <motion.div className="continuar-button" variants={OpacityVariants}>
              <Button variant="filled-pink" onClick={() => setPaso(3)}>
                Continuar
              </Button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PasoDos;
