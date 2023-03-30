import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import PasoUno from "./PasoUno";
import { SliderOpacityVariants } from "../../utils/animations";
import PasoDos from "./PasoDos";
import StepperBar from "../StepperBar";
import PasoTres from "./PasoTres";
import Congratulations from "./Congratulations";

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
  const [turnoForm, setTurnoForm] = React.useState({});
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
            <PasoUno paso={paso} setPaso={setPaso} />
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
