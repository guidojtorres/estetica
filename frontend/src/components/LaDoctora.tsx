import React from "react";

const LaDoctora = () => {
  return (
    <section className="la-doctora">
      <img src="./img/big-star.png" alt="" className="la-doctora-vector" />
      <div className="la-doctora-container">
        <div className="row row-cols-1 row-cols-lg-2">
          <div className="col first-col">
            <img src="./img/la-doctora.png" alt="" />
          </div>
          <div className="col second-col">
            <div className="doctora-title">
              <h4>Doctora Viviana García</h4>
              <p>Médica especialista en Dermatología y Medicina Estética</p>
            </div>
            <div className="la-doctora-line"></div>
            <p className="matricula">M.N. 112996 / M.P. 9656</p>
            <p className="doctora-descripcion">
              Estética Vg es un centro de medicina estética con más de 15 años
              de trayectoria. Nuestra intención es mejorar la salud, las formas
              corporales y la estética, tanto de mujeres como de varones. Nos
              destacamos por el asesoramiento y la atención personalizada que
              brinda nuestra médica especialista, que junto con nuestro equipo
              de profesionales, lleva a cabo tratamientos de estética con la
              tecnología de más alto rendimiento. Ofrecemos una gran variedad de
              tratamientos, como por ejemplo, tratamientos para reducir la
              celulitis, las manchas en la piel, las arrugas y la flacidez.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LaDoctora;
