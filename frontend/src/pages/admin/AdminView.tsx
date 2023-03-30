import React from "react";
import CategoriasDashboard from "./dashboard/categorias/CategoriasDashboard";
import ContactosDashboard from "./dashboard/contactos/ContactosDashboard";
import TratamientosDashboard from "./dashboard/tratamientos/TratamientosDashboard";
import TurnosDashboard from "./dashboard/turnos/TurnosDashboard";

const AdminView = ({
  active,
}: {
  active: "tratamientos" | "contactos" | "categorias" | "turnos";
}) => {
  switch (active) {
    case "tratamientos":
      return <TratamientosDashboard />;
    case "contactos":
      return <ContactosDashboard />;
    case "categorias":
      return <CategoriasDashboard />;
    case "turnos":
      return <TurnosDashboard />;
    default:
      return null;
  }
};

export default AdminView;
