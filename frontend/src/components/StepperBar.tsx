const Step = ({
  paso,
  setPaso,
  numPaso,
}: {
  paso: number;
  setPaso: Function;
  numPaso: number;
}) => {
  const handleStepChange = () => {
    if (paso >= 4) {
      return;
    }

    if (paso > numPaso) {
      setPaso(numPaso);
    }
  };
  return (
    <div
      className={`step ${
        paso === numPaso ? "active" : paso > numPaso ? "completed" : ""
      }`}
      onClick={handleStepChange}
    >
      <div className="step-circle">
        <span>{numPaso}</span>
      </div>
      <p>{numPaso === 1 ? "Horario" : numPaso === 2 ? "Datos" : "Pago"}</p>
    </div>
  );
};

const StepperBar = ({ paso, setPaso }: { paso: number; setPaso: Function }) => {
  return (
    <div className="stepper-bar">
      <Step paso={paso} setPaso={setPaso} numPaso={1} />
      <div className={`line ${paso > 1 && "active"}`}></div>
      <Step paso={paso} setPaso={setPaso} numPaso={2} />
      <div className={`line ${paso > 2 && "active"}`}></div>
      <Step paso={paso} setPaso={setPaso} numPaso={3} />
    </div>
  );
};

export default StepperBar;
