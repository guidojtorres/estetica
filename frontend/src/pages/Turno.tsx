import React from "react";
import Heading from "../components/Heading";
import InfoTurnos from "../components/turnos/InfoTurnos";
import TurnoForm from "../components/turnos/TurnoForm";
import VolverBtn from "../components/VolverBtn";

const Turno = () => {
  const [step, setStep] = React.useState(1);
  const [paso, setPaso] = React.useState(1);

  const handleVolverButton = () => {
    if (step === 2 && paso === 1) {
      setStep(1);
      return;
    }
    setPaso(paso - 1);
  };

  return (
    <main className="turnos">
      <Heading title="Solicitá tu turno"></Heading>
      <div className="estetica-container">
        <div className="turnos-container" style={{ minHeight: "600px" }}>
          {step > 1 && paso < 4 && <VolverBtn onClick={handleVolverButton} />}
          <InfoTurnos step={step} setStep={setStep} />
          <TurnoForm step={step} paso={paso} setPaso={setPaso} />
        </div>
      </div>
    </main>
  );
};

export default Turno;
