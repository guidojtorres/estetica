import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import {
  OpacityStaggerVariants,
  OpacityVariants,
} from "../../utils/animations";
import Button from "../Button";

const UnaFecha = ({
  fechaElegida,
  id,
  setFechaElegida,
}: {
  id: number;
  fechaElegida: number;
  setFechaElegida: Function;
}) => {
  return (
    <motion.div
      className={`una-fecha ${fechaElegida === id && "active"}`}
      onClick={() => setFechaElegida(id)}
      variants={OpacityVariants}
    >
      <span>NOV</span>
      <p>Lun</p>
      <p>26</p>
    </motion.div>
  );
};

const UnHorario = ({
  id,
  horarioElegido,
  setHorarioElegido,
}: {
  id: number;
  horarioElegido: number;
  setHorarioElegido: Function;
}) => {
  return (
    <motion.div
      className={`pill-horario ${horarioElegido === id && "active"}`}
      onClick={() => setHorarioElegido(id)}
      variants={OpacityVariants}
    >
      <span>11:00 AM</span>
    </motion.div>
  );
};

const PasoUno = ({ paso, setPaso }: { paso: number; setPaso: Function }) => {
  const [fechaElegida, setFechaElegida] = React.useState(0);
  const [horarioElegido, setHorarioElegido] = React.useState(0);

  return (
    <AnimatePresence mode="wait">
      {paso === 1 && (
        <div className="paso-uno">
          <AnimatePresence>
            <div className="selector-dia">
              <h4 className="selector-dia-title">Seleccioná una fecha</h4>
              <motion.div
                className="fechas-flex"
                variants={OpacityStaggerVariants}
                initial="hidden"
                animate="visible"
                exit={"exit"}
              >
                <UnaFecha
                  fechaElegida={fechaElegida}
                  id={1}
                  setFechaElegida={setFechaElegida}
                />
                <UnaFecha
                  fechaElegida={fechaElegida}
                  id={2}
                  setFechaElegida={setFechaElegida}
                />
                <UnaFecha
                  fechaElegida={fechaElegida}
                  id={3}
                  setFechaElegida={setFechaElegida}
                />
                <UnaFecha
                  fechaElegida={fechaElegida}
                  id={4}
                  setFechaElegida={setFechaElegida}
                />
                <UnaFecha
                  fechaElegida={fechaElegida}
                  id={5}
                  setFechaElegida={setFechaElegida}
                />
                <UnaFecha
                  fechaElegida={fechaElegida}
                  id={6}
                  setFechaElegida={setFechaElegida}
                />
                <UnaFecha
                  fechaElegida={fechaElegida}
                  id={7}
                  setFechaElegida={setFechaElegida}
                />
                <UnaFecha
                  fechaElegida={fechaElegida}
                  id={8}
                  setFechaElegida={setFechaElegida}
                />
                <UnaFecha
                  fechaElegida={fechaElegida}
                  id={9}
                  setFechaElegida={setFechaElegida}
                />
                <UnaFecha
                  fechaElegida={fechaElegida}
                  id={10}
                  setFechaElegida={setFechaElegida}
                />
                <UnaFecha
                  fechaElegida={fechaElegida}
                  id={11}
                  setFechaElegida={setFechaElegida}
                />
                <UnaFecha
                  fechaElegida={fechaElegida}
                  id={12}
                  setFechaElegida={setFechaElegida}
                />
              </motion.div>
            </div>
          </AnimatePresence>
          {fechaElegida ? (
            <AnimatePresence>
              <motion.div
                className="selector-horario"
                variants={OpacityStaggerVariants}
                initial="hidden"
                animate="visible"
                exit={"exit"}
              >
                <h4 className="selector-dia-title">Seleccioná un horario</h4>
                <div className="horarios-flex">
                  <UnHorario
                    id={1}
                    horarioElegido={horarioElegido}
                    setHorarioElegido={setHorarioElegido}
                  />
                  <UnHorario
                    id={2}
                    horarioElegido={horarioElegido}
                    setHorarioElegido={setHorarioElegido}
                  />
                  <UnHorario
                    id={3}
                    horarioElegido={horarioElegido}
                    setHorarioElegido={setHorarioElegido}
                  />
                  <UnHorario
                    id={4}
                    horarioElegido={horarioElegido}
                    setHorarioElegido={setHorarioElegido}
                  />
                  <UnHorario
                    id={5}
                    horarioElegido={horarioElegido}
                    setHorarioElegido={setHorarioElegido}
                  />
                  <UnHorario
                    id={6}
                    horarioElegido={horarioElegido}
                    setHorarioElegido={setHorarioElegido}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            ""
          )}
          {fechaElegida && horarioElegido ? (
            <AnimatePresence>
              <motion.div
                className="continuar-button"
                variants={OpacityVariants}
                initial="hidden"
                animate="visible"
                exit={"exit"}
              >
                <Button variant="filled-pink" onClick={() => setPaso(2)}>
                  Continuar
                </Button>
              </motion.div>
            </AnimatePresence>
          ) : (
            ""
          )}
        </div>
      )}
    </AnimatePresence>
  );
};

export default PasoUno;
