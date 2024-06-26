import React from "react";
import { Link } from "react-router-dom";
import { ITratamiento } from "../utils/types";
import { fileServer } from "../utils/APICalls";

const CardTratamiento = ({
  titulo,
  descripcion,
  pathFoto,
  id,
  categoriaElegida,
  categorias,
  setActive,
  tratamiento,
}: {
  categorias: string[];
  titulo: string;
  descripcion: string;
  pathFoto: string;
  id: string;
  setActive?: Function;
  categoriaElegida?: string;
  tratamiento: ITratamiento;
}) => {
  const isVisible = categoriaElegida
    ? categorias.includes(categoriaElegida) || !categoriaElegida
      ? true
      : false
    : true;

  const fotoUrl =
    pathFoto && pathFoto.startsWith("/") ? fileServer + pathFoto : pathFoto;

  if (isVisible && typeof categoriaElegida !== "undefined") {
    return (
      <Link to={`/tratamientos/${id}`} state={{ tratamiento }}>
        <div className="card-tratamiento">
          <img src={fotoUrl} alt="" />
          <h4>{titulo}</h4>
          <div dangerouslySetInnerHTML={{ __html: descripcion }}></div>
        </div>
      </Link>
    );
  } else if (isVisible && !categoriaElegida) {
    return (
      <div
        className="card-tratamiento"
        onClick={() => setActive && setActive(id)}
      >
        <img src={fotoUrl} alt="" />
        <h4>{titulo}</h4>
        <div dangerouslySetInnerHTML={{ __html: descripcion }}></div>
      </div>
    );
  }
  return null;
};

export default CardTratamiento;
