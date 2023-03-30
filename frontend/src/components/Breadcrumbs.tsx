import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = () => {
  return (
    <div className="breadcrumbs">
      <Link to={"/tratamientos"}>Tratamientos</Link>
      <span>/</span>
      <Link to={""}>Laser CO2 Fraccionado</Link>
    </div>
  );
};

export default Breadcrumbs;
