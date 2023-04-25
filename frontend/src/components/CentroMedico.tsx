import React from "react";

const CentroMedico = () => {
  return (
    <section className="centro-medico">
      <div className="estetica-container">
        <div className="row row-cols-1 row-cols-lg-2 g-0">
          <div className="col centro-medico-imagenes">
            <img src="./img/qs-1.jpg" alt="" />
            <img src="./img/qs-2.jpg" alt="" />
          </div>
          <div className="col centro-medico-descripcion">
            <img
              src="./img/centro-medico-circulo.png"
              alt=""
              className="vector"
            />
            <div>
              <h4>Nuestro centro médico</h4>
              <p>
                Estamos ubicados en Palermo, zona de gran accesibilidad en la
                Ciudad de Buenos Aires, donde ofrecemos un espacio cálido y
                cordial, con experiencia en el cuidado de la salud y la estética
                tanto de mujeres como de varones.
              </p>
            </div>
            <p className="mb-5">
              Estética Vg es uno de los centros de estética más reconocidos en
              Capital Federal para el cuidado de tu piel, dirigido por la Dra.
              Viviana A. García, junto con un equipo de profesionales de la
              salud avocados en forma interdisciplinaria al área de la Estética
              Médica desde un enfoque integral y personalizado.
            </p>
            <div className="centro-medico-direccion">
              <div className="direccion-box">
                <div className="icono-texto">
                  <img src="./img/clock.png" alt="" />
                  <span>DIRECCIÓN</span>
                </div>
                <p>Charcas 2737, CABA.</p>
              </div>
              <hr />
              <div className="direccion-box"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CentroMedico;
