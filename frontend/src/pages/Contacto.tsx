import React from "react";
import Button from "../components/Button";
import ContactoForm from "../components/ContactoForm";
import Heading from "../components/Heading";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Contacto = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Heading title="Contacto"></Heading>
      <section className="contacto">
        <div className="estetica-container">
          <div className="row row-cols-1 row-cols-lg-2">
            <div className="col contacto-padding-1">
              <div className="contacto-form-title">
                <h4>¿Necesitás ayuda?</h4>
                <span className="gray-line"></span>
              </div>
              <p className="contacto-form-desc">
                Completá este formulario con tus datos, dejanos tu mensaje y te
                responderemos a la brevedad.
              </p>
              <ContactoForm />
            </div>
            <div className="col contacto-padding-2">
              <div className="datos-de-contacto">
                <div className="contacto-form-title small">
                  <h4> Datos de contacto</h4>
                  <span className="gray-line"></span>
                </div>
                <div className="datos-flex">
                  <div className="icono-texto">
                    <img src="./img/telefono-gris.png" alt="" />
                    <p>+011 3111-2105</p>
                  </div>
                  <div className="icono-texto">
                    <img src="./img/mail-gris.png" alt="" />
                    <p>info@dravivianagarcia.com.ar</p>
                  </div>
                  <div className="icono-texto">
                    <img src="./img/location-gris.png" alt="" />
                    <p>Charcas 2737. - CABA</p>
                  </div>
                </div>
              </div>
              <div className="contacto-turno">
                <div className="contacto-form-title small">
                  <h4>¿Necesitás un turno?</h4>
                  <span className="gray-line"></span>
                </div>
                <p>
                  Si estás interesado/a en tener una consulta con la Dra.
                  Viviana García podés agendar tu consulta desde esta web.
                </p>
                <Button
                  noArrow
                  variant="gray middle-mobile"
                  style={{ marginTop: "80px" }}
                  onClick={() => navigate("/turnos")}
                >
                  Agendar consulta ahora
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contacto;
