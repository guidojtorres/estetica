import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import {
  OpacityStaggerVariants,
  OpacityVariants,
} from "../../utils/animations";
import Button from "../Button";
import { ITurno } from "../../utils/types";
import {
  convertIntToDay,
  convertIntToMonth,
  generateHorariosArray,
} from "../../utils/functions";
import { TurnosContext } from "./TurnoForm";

function addHours(date: Date, h: number) {
  date.setTime(date.getTime() + h * 60 * 60 * 1000);
  return date;
}

const UnaFecha = ({
  fecha,
  fechaElegida,
  id,
  setFechaElegida,
}: {
  fecha: Date;
  id: number;
  fechaElegida: Date | null;
  setFechaElegida: Function;
}) => {
  const month = convertIntToMonth(fecha.getMonth());
  const day = convertIntToDay(fecha.getDay() - 1);
  const num = fecha.getUTCDate();

  return (
    <motion.div
      className={`una-fecha ${fechaElegida === fecha && "active"}`}
      onClick={() => setFechaElegida(fecha)}
      variants={OpacityVariants}
    >
      <span>{month}</span>
      <p>{day}</p>
      <p>{num}</p>
    </motion.div>
  );
};

const UnHorario = ({
  id,
  horarioElegido,
  setHorarioElegido,
  horario,
  isDisabled,
  fecha,
}: {
  id: number;
  horarioElegido: number;
  setHorarioElegido: Function;
  horario: string;
  isDisabled: boolean;
  fecha: any;
}) => {
  const { turnoForm, setTurnoForm } = React.useContext(TurnosContext);

  const handleClick = () => {
    !isDisabled && setHorarioElegido(id);
    setTurnoForm({ ...turnoForm, fecha: fecha });
  };

  return (
    <motion.div
      className={`pill-horario ${horarioElegido === id && "active"} 
      ${isDisabled && "disabled"}`}
      onClick={handleClick}
      variants={OpacityVariants}
    >
      <span>{horario}</span>
    </motion.div>
  );
};

const PasoUno = ({
  paso,
  setPaso,
  fechasArray,
  turnos,
  horarioConfig,
}: {
  paso: number;
  setPaso: Function;
  fechasArray: Date[];
  turnos: ITurno[];
  horarioConfig: any;
}) => {
  const [fechaElegida, setFechaElegida] = React.useState<Date | null>(null);
  const [horarioElegido, setHorarioElegido] = React.useState(0);

  const arrayDeFechas = turnos.map((unTurno: ITurno) =>
    addHours(new Date(unTurno.fecha), 3).getTime()
  );
  const horariosArray = generateHorariosArray(
    horarioConfig.duracion,
    horarioConfig.turno
  );

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
                {fechasArray.map((unaFecha, i) => (
                  <UnaFecha
                    fecha={unaFecha}
                    fechaElegida={fechaElegida}
                    setFechaElegida={setFechaElegida}
                    id={i}
                    key={i}
                  />
                ))}
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
                  {horariosArray.map((horario: string, i: number) => {
                    const toParse = horario
                      .split(":")
                      .map((unHo) => parseInt(unHo));
                    const hoursInMs = toParse[0] * 60 * 60 * 1000;
                    const minInMs = toParse[1] * 60 * 1000;
                    const total = fechaElegida.getTime() + hoursInMs + minInMs;
                    const nuevaFecha = new Date(+fechaElegida);
                    nuevaFecha.setTime(total);

                    return (
                      <UnHorario
                        id={i + 1}
                        horarioElegido={horarioElegido}
                        setHorarioElegido={setHorarioElegido}
                        horario={horario}
                        key={i}
                        isDisabled={arrayDeFechas.includes(
                          nuevaFecha.getTime()
                        )}
                        fecha={nuevaFecha}
                      />
                    );
                  })}
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
