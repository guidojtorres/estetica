import React from "react";

const DondeEstamos = () => {
  return (
    <section className="donde-estamos">
      <div className="row g-0 row-cols-1 row-cols-lg-2">
        <div className="col first-col">
          <div className="first-col-content">
            <h1>Dónde estamos</h1>
            <p>
              Estamos ubicados en Palermo, zona de gran accesibilidad en la
              Ciudad de Buenos Aires, donde ofrecemos un espacio cálido y
              cordial, con experiencia en el cuidado y mejoramiento de las
              formas corporales y la estética tanto de mujeres como de varones.
            </p>
            <div
              className="icono-texto"
              style={{ padding: "34px 0px 13px 0px" }}
            >
              <img src="./img/location.svg" alt="" />
              <span>Charcas 2737, CABA. </span>
            </div>
            <hr />
            {/* <div className="horarios">
              <h6>HORARIOS:</h6>
              <div>
                <span>Lun a Vie.</span>
                <span className="divider"></span>
                <span>De 9:00 a 18:00 hs</span>
              </div>
            </div> */}
          </div>
        </div>
        <div className="col">
          <img src="./img/Mapa.png" alt="mapa" style={{ width: "100%" }} />
        </div>
      </div>
    </section>
  );
};

export default DondeEstamos;
