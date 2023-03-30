import React from "react";
import { AppContext } from "../../../../App";
import Button from "../../../../components/Button";
import { UnaCategoria } from "../../../../components/CategoriasDestacadas";
import Heading from "../../../../components/Heading";
import { ICategoria } from "../../../../utils/types";
import CategoriaForm from "./CategoriaForm";

const CategoriasDashboard = () => {
  const { categorias, setShouldContextUpdate } = React.useContext(AppContext);
  const [activeCategoria, setActiveCategoria] = React.useState<string | null>(
    null
  );

  const handleCrearNuevo = () => {
    setActiveCategoria("nuevo");
  };

  return (
    <>
      <div className={`${activeCategoria && "d-none"}`}>
        <Heading title="Categorias" />
        <Button
          variant="filled-pink"
          style={{ margin: "50px auto" }}
          onClick={handleCrearNuevo}
        >
          Crear Nueva
          <img
            src="./img/imas.png"
            alt=""
            style={{ width: "25px", height: "25px" }}
          />
        </Button>
        <div className="admin-cat-flex">
          {categorias.map((cat: ICategoria) => (
            <UnaCategoria
              id={cat._id}
              nombre={cat.nombre}
              pathIcono={cat.pathIcono}
              key={cat._id}
              setActive={setActiveCategoria}
            />
          ))}
        </div>
      </div>
      {activeCategoria && (
        <CategoriaForm
          activeItem={activeCategoria}
          setActiveItem={setActiveCategoria}
          updateContext={setShouldContextUpdate}
        />
      )}
    </>
  );
};

export default CategoriasDashboard;
