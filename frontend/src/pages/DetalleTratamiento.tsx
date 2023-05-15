import { motion } from "framer-motion";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../App";
import Breadcrumbs from "../components/Breadcrumbs";
import Button from "../components/Button";
import { fetchFromServer, fileServer } from "../utils/APICalls";
import { ITratamiento } from "../utils/types";

const DetalleTratamiento = () => {
  const { pathname } = useLocation();
  const { tratamientos } = React.useContext(AppContext);
  const [verMas, setVerMas] = React.useState(false);

  let idPath = new URL("http://localhost:3000" + pathname).pathname
    .split("/")
    .slice(-1)[0];
  const tratamiento: ITratamiento = tratamientos.filter(
    (trat: ITratamiento) => idPath === trat._id
  )[0];

  const [currentImg, setCurrentImg] = React.useState<string>();

  React.useEffect(() => {
    if (tratamiento) setCurrentImg(fileServer + tratamiento.pathFotos[0]);
  }, [tratamiento]);

  if (tratamiento) {
    return (
      <motion.main
        className="detalle-tratamiento"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="estetica-container">
          <Breadcrumbs />
          <div className="row row-cols-1 row-cols-lg-2 gx-5 gy-5">
            <div className="col">
              <img src={currentImg} alt="" className="col-img" />
              <div className="imagenes-flex">
                {tratamiento.pathFotos.map((fotoSrc: string) => (
                  <img
                    src={fileServer + fotoSrc}
                    alt=""
                    onClick={() => setCurrentImg(fileServer + fotoSrc)}
                  />
                ))}
              </div>
            </div>
            <div className="col">
              <div className="detalle-title">
                <h4>{tratamiento.titulo}</h4>
                <div>
                  <p>{tratamiento.subtitulo}</p>
                </div>
              </div>
              <div className="detalle-button">
                <Button variant="filled-pink">
                  <Link to={"/turnos"}>Agendá tu consulta</Link>
                </Button>
              </div>
              <div className="detalle-descripcion">
                <h6>Detalles del tratamiento</h6>
                <p
                  dangerouslySetInnerHTML={{ __html: tratamiento.descripcion }}
                ></p>
              </div>
              <div className="detalle-especificacion">
                <p>¿En donde se puede emplear?</p>
                <p>{tratamiento.dondeEmplear}</p>
              </div>
              <div className="detalle-especificacion">
                <span
                  className={`vm-btn ${verMas && "active"}`}
                  onClick={() => setVerMas((prevState: boolean) => !prevState)}
                >
                  Ver más <img src="./img/cv-down.png" alt="" />
                </span>
                <div className={`vm-content ${verMas && "active"}`}>
                  <p
                    dangerouslySetInnerHTML={{ __html: tratamiento.verMas }}
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.main>
    );
  }

  return null;
};

export default DetalleTratamiento;
