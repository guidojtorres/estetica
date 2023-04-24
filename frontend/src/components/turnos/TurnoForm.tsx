import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import PasoUno from "./PasoUno";
import { SliderOpacityVariants } from "../../utils/animations";
import PasoDos from "./PasoDos";
import StepperBar from "../StepperBar";
import PasoTres from "./PasoTres";
import Congratulations from "./Congratulations";
import { eachDayOfInterval } from "date-fns";
import { fetchFromServer } from "../../utils/APICalls";
import { ITurno } from "../../utils/types";

export const TurnosContext = React.createContext({
  turnoForm: {},
  setTurnoForm: (prevState: any) => {},
});

const TurnoForm = ({
  step,
  paso,
  setPaso,
}: {
  step: number;
  paso: number;
  setPaso: Function;
}) => {
  const [turnoForm, setTurnoForm] = React.useState<ITurno>({} as ITurno);
  const [fechasArray, setFechasArray] = React.useState<Date[]>([new Date()]);
  const [turnos, setTurnos] = React.useState<ITurno[]>([{} as ITurno]);
  const [horarioConfig, setHorarioConfig] = React.useState();

  const generateFechasArray = () => {
    let masUnAno = new Date(
      new Date(new Date().setMonth(new Date().getMonth() + 4))
    );

    let intervalo = eachDayOfInterval({
      start: new Date(),
      end: masUnAno,
    });

    let intervaloFiltrado = intervalo.filter(
      (unaFecha: Date) => unaFecha.getDay() === 1 || unaFecha.getDay() === 5
    );
    setFechasArray(intervaloFiltrado);
  };

  React.useEffect(() => {
    fetchFromServer("/turnos", "GET")
      .then((res: any) => setTurnos(res.data.info))
      .catch((e) => alert(e));

    fetchFromServer("/horarios", "GET")
      .then((res: any) => {
        generateFechasArray();
        setHorarioConfig(res.data.info[0]);
      })
      .catch((e) => alert(e));
  }, []);
  return (
    <TurnosContext.Provider
      value={{
        turnoForm,
        setTurnoForm,
      }}
    >
      <AnimatePresence mode="popLayout">
        {step === 2 && (
          <motion.section
            className="turno-form"
            variants={SliderOpacityVariants}
            initial="hidden"
            animate="visible"
            exit={"exit"}
          >
            <StepperBar paso={paso} setPaso={setPaso} />
            <PasoUno
              paso={paso}
              setPaso={setPaso}
              fechasArray={fechasArray}
              turnos={turnos}
              horarioConfig={horarioConfig}
            />
            <PasoDos paso={paso} setPaso={setPaso} />
            <PasoTres paso={paso} setPaso={setPaso} />
            <Congratulations paso={paso} />
          </motion.section>
        )}
      </AnimatePresence>
    </TurnosContext.Provider>
  );
};

export default TurnoForm;
