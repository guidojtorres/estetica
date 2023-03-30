import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { AccordionTextVariants } from "../utils/animations";

const Accordion = ({ title, children }: { title: string; children: any }) => {
  const [isActive, setIsActive] = React.useState(false);
  return (
    <div
      className={`acordeon-item ${isActive ? "active" : ""}`}
      onClick={() => setIsActive(!isActive)}
    >
      <span>{title}</span>{" "}
      <img
        src="./img/chevron-down-nosotros.png"
        alt=""
        className={`accordion-chevron ${isActive ? "reverse" : ""}`}
      />
      <AnimatePresence>
        {isActive && (
          <motion.p
            className="acordeon-descripcion"
            variants={AccordionTextVariants}
            animate="visible"
            initial="hidden"
            exit="exit"
          >
            {children}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const InfoNosotros = () => {
  return (
    <section className="info-nosotros-bg">
      <div className="info-nosotros">
        <div className="columna-accordion">
          <h1 className="mas-info-title">Más información </h1>
          <div className="info-line"></div>
          <div className="accordion-flex">
            <Accordion title="Trayectoria">
              La doctora tiene más de 20 años de experiencia en el rubro de la
              medicina estética, y más de 40 años en la profesión médica,
              ofreciendo una variedad de tratamientos con técnicas que adecuamos
              a las necesidades de cada paciente. Centro Estético Vg abrió sus
              puertas en el 2008 con la intención de mejorar la estética y la
              salud de sus pacientes. La dedicación y constante especialización
              de Viviana y su equipo en el rubro de la medicina estética nos
              permite estar actualizados en las técnicas vigentes y utilizar las
              más modernas tecnologías.
            </Accordion>
            <Accordion title="Títulos">
              <ul>
                <li style={{ listStyleType: "circle" }}>
                  Medicina Estética, Instituto Pinto, 2004.
                </li>
                <li style={{ listStyleType: "circle" }}>
                  Dermatología Quirúrgica, Universidad Nacional de Rosario,
                  1991.
                </li>
                <li style={{ listStyleType: "circle" }}>
                  Médica, Universidad Nacional de Rosario, 1986.
                </li>
              </ul>
            </Accordion>
          </div>
        </div>
        <div className="columna" style={{ marginLeft: "auto" }}>
          <img src="./img/nosotros-info.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default InfoNosotros;
