import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { fileServer } from "../utils/APICalls";

export const UnaCategoria = ({
  id,
  pathIcono,
  nombre,
  setActive,
}: {
  id: string;
  pathIcono: string;
  nombre: string;
  setActive?: Function;
}) => {
  const handleClick = () => {
    setActive && setActive(id);
  };

  const currentIcono =
    pathIcono === "./img/una-categoria.png"
      ? "./img/una-categoria.png"
      : fileServer + pathIcono;

  return (
    <div className="una-categoria" onClick={handleClick}>
      <img src={currentIcono} alt="" />
      <p>{nombre}</p>
    </div>
  );
};

const CategoriasDestacadas = () => {
  const { categorias } = React.useContext(AppContext);

  return (
    <section className="categorias-destacadas">
      <div className="estetica-container">
        <h4>¿Necesitás ayuda para alguno de estos temas?</h4>
        <hr />
        <div className="cat-flex">
          {categorias &&
            categorias.map((categoria: any) => {
              if (categoria.esDestacada) {
                return (
                  <Link
                    to={"/tratamientos"}
                    state={{ categoria: categoria._id }}
                    key={categoria._id}
                  >
                    <UnaCategoria
                      nombre={categoria.nombre}
                      pathIcono={categoria.pathIcono}
                      id={categoria._id}
                    />
                  </Link>
                );
              }

              return null;
            })}
        </div>
      </div>
    </section>
  );
};

export default CategoriasDestacadas;
