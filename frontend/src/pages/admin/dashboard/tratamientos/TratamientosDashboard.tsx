import React from "react";
import { AppContext } from "../../../../App";
import Button from "../../../../components/Button";
import CardTratamiento from "../../../../components/CardTratamiento";
import Heading from "../../../../components/Heading";
import { fileServer } from "../../../../utils/APICalls";
import TratamientoForm from "./TratamientoForm";
import { ITratamiento } from "../../../../utils/types";

const TratamientosDashboard = () => {
  const { tratamientos, setShouldContextUpdate } = React.useContext(AppContext);

  const [activeTratamiento, setActiveTratamiento] = React.useState<
    string | null
  >(null);

  const handleCrearNuevo = () => {
    setActiveTratamiento("nuevo");
  };

  return (
    <>
      <div className={`${activeTratamiento && "d-none"}`}>
        <Heading title="Tratamientos" />
        <Button
          variant="filled-pink"
          style={{ margin: "0 auto", marginTop: "50px" }}
          onClick={handleCrearNuevo}
        >
          Crear Nuevo
          <img
            src="./img/imas.png"
            alt=""
            style={{ width: "25px", height: "25px" }}
          />
        </Button>
        <div className={`card-tratamiento-flex`}>
          {tratamientos &&
            !activeTratamiento &&
            tratamientos.map((tratamiento: any) => (
              <CardTratamiento
                titulo={tratamiento.titulo}
                descripcion={tratamiento.descripcion}
                id={tratamiento._id}
                pathFoto={tratamiento.pathFotos[0]}
                categorias={tratamiento.categorias}
                key={tratamiento._id}
                setActive={setActiveTratamiento}
                tratamiento={tratamiento}
              />
            ))}
        </div>
      </div>

      {activeTratamiento && (
        <TratamientoForm
          activeItem={activeTratamiento}
          setActiveItem={setActiveTratamiento}
          updateContext={setShouldContextUpdate}
        />
      )}
    </>
  );
};

export default TratamientosDashboard;
