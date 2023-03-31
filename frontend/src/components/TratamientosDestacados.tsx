import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { fileServer } from "../utils/APICalls";

const CardDestacada = ({
  titulo,
  descripcion,
  id,
  pathFoto,
}: {
  titulo: string;
  descripcion: string;
  id: string;
  pathFoto: string;
}) => {
  return (
    <div className="card-destacada">
      <img src={fileServer + pathFoto} alt="" />
      <div className="card-destacada-texto">
        <h5>{titulo}</h5>
        <p>{descripcion}</p>
      </div>
      <div className="mas-info">
        <Link to={`/tratamientos/${id}`}>Ver más información</Link>
      </div>
    </div>
  );
};

const TratamientosDestacados = () => {
  const { tratamientos } = React.useContext(AppContext);
  return (
    <section className="tratamientos-destacados ">
      <img
        src="./img/tratamientos-destacados-vector.png"
        alt=""
        className="tdv"
      />
      <div className="estetica-container">
        <h1>Tratamientos destacados</h1>
        <div className="tratamientos-destacados-cards">
          {tratamientos &&
            tratamientos.map((tratamiento: any) => {
              if (tratamiento.esDestacado) {
                return (
                  <CardDestacada
                    titulo={tratamiento.titulo}
                    descripcion={tratamiento.descripcion}
                    id={tratamiento._id}
                    key={tratamiento._id}
                    pathFoto={tratamiento.pathFotos[0]}
                  />
                );
              }

              return null;
            })}
        </div>
      </div>
    </section>
  );
};

export default TratamientosDestacados;
