import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import {
  OpacityStaggerVariants,
  OpacityVariants,
} from "../../utils/animations";
import Button from "../Button";
import TextInput from "../TextInput";
import { TurnosContext } from "./TurnoForm";
import Swal from "sweetalert2";

const PasoDos = ({ paso, setPaso }: { paso: number; setPaso: Function }) => {
  const { turnoForm, setTurnoForm } = React.useContext(TurnosContext);

  const handleSubmit = () => {
    if (
      !turnoForm.nombre ||
      !turnoForm.apellido ||
      !turnoForm.celular ||
      !turnoForm.email ||
      !turnoForm.asunto ||
      !turnoForm.modalidad
    ) {
      Swal.fire({
        title: "Error",
        text: "Debe completar todos los campos antes de continuar",
        icon: "error",
      });
    } else {
      setPaso(3);
    }
  };

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
              <input
                type="radio"
                name="modalidad"
                id="presencial"
                onClick={() =>
                  setTurnoForm({ ...turnoForm, modalidad: "Presencial" })
                }
              />
            </div>
            <div className="checkbox-flex">
              <label htmlFor="online">Online</label>
              <input
                type="radio"
                name="modalidad"
                id="online"
                onClick={() =>
                  setTurnoForm({ ...turnoForm, modalidad: "Online" })
                }
              />
            </div>
          </div>

          <AnimatePresence>
            <motion.div className="continuar-button" variants={OpacityVariants}>
              <Button variant="filled-pink" onClick={handleSubmit}>
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
