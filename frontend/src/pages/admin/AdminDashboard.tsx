import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/Admin.css";
import { titleCase } from "../../utils/functions";
import AdminView from "./AdminView";

const SidebarLink = ({
  section,
  iconPath,
  setActive,
  ...props
}: {
  section: string;
  iconPath: string;
  setActive: Function;
}) => {
  return (
    <div className="sb-link" onClick={() => setActive(section)} {...props}>
      <img src={iconPath} alt="" />
      <p>{titleCase(section)}</p>
    </div>
  );
};

const AdminDashboard = () => {
  const [active, setActive] = React.useState<
    "tratamientos" | "contactos" | "categorias" | "turnos"
  >("tratamientos");

  return (
    <main className="admin-dashboard">
      <div className="row g-0">
        <div className="col-lg-2">
          <div className="sidebar-wrapper">
            <div className="sidebar-content">
              <Link to={"/"}>
                <img src="./img/logo.png" alt="" />
              </Link>
              <div className="sidebar-links">
                <SidebarLink
                  section="tratamientos"
                  iconPath="./img/itratamientos.png"
                  setActive={setActive}
                />
                <SidebarLink
                  section="contactos"
                  iconPath="./img/icontactos.png"
                  setActive={setActive}
                />
                <SidebarLink
                  section="turnos"
                  iconPath="./img/iturnos.png"
                  setActive={setActive}
                />
                <SidebarLink
                  section="categorias"
                  iconPath="./img/icategorias.png"
                  setActive={setActive}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-10">
          <AdminView active={active} />
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
