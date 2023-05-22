import { AnimatePresence, motion } from "framer-motion";
import React, { useContext } from "react";
import {
  OpacityStaggerVariants,
  OpacityVariants,
} from "../../utils/animations";
import Button from "../Button";
import { TurnosContext } from "./TurnoForm";
import MpModal from "./MpModal";
import { fetchFromServer } from "../../utils/APICalls";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PagoRealizado = ({ setPaso }: { setPaso: Function }) => {
  const [turnoReservado, setTurnoReservado] = React.useState();
  const { turnoForm } = useContext(TurnosContext);
  const navigate = useNavigate();

  console.log(turnoForm);

  const handlePost = async () => {
    const postObj = turnoForm as any;
    postObj.fuePagado = false;
    postObj.fecha.setHours(postObj.fecha.getHours() - 3);
    console.log(typeof turnoForm.fecha);

    const res = await fetchFromServer("/turnos", "POST", postObj);
    return res?.data;
  };

  const handleClick = async () => {
    handlePost().then((res) => {
      if (res.status === "OK") {
        setTurnoReservado(res.info);
        setPaso(4);
      } else {
        Swal.fire({
          title: "Error",
          text: `Error creando nuevo turno ${res.errDesc}`,
          icon: "error",
        }).then(() => navigate("/"));
      }
    });
  };

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        variants={OpacityStaggerVariants}
        initial="hidden"
        animate="visible"
        exit={"exit"}
      >
        <div className="pago-por-transferencia">
          <motion.div variants={OpacityVariants}>
            <h4>Pago por trasferencia bancaria</h4>
            <p className="ppt-subtitle">
              Podés realizar la transferencia del monto a abonar a la siguiente
              cuenta
            </p>
          </motion.div>
          <motion.div className="monto" variants={OpacityVariants}>
            <span>Monto a pagar:</span>
            <span>$3000</span>
          </motion.div>
          <motion.div className="datos" variants={OpacityVariants}>
            <div className="un-dato">
              <p>Titular</p>
              <span>Garcia Viviana Alejandra</span>
            </div>
            <div className="un-dato">
              <p>CBU</p>
              <span>0720163588000037158354</span>
            </div>

            <div className="un-dato">
              <p>Alias de CBU</p>
              <span>bairesbaires</span>
            </div>
          </motion.div>
          <motion.div className="icono-imagen" variants={OpacityVariants}>
            <img src="./img/file.png" alt="" />
            <span>Envío de comprobante</span>
          </motion.div>

          <p className="info-comprobante">
            Una vez que realices la trasferencia por favor envianos el
            comprobante a estetivadravg@gmail.com, o por Whatsapp a 11 3111 2105
          </p>
        </div>
      </motion.div>
      <motion.div
        className="continuar-button"
        variants={OpacityVariants}
        onClick={handleClick}
      >
        <Button variant="filled-pink">Ya realicé el pago</Button>
      </motion.div>
    </AnimatePresence>
  );
};
const UnMetodo = ({
  mdp,
  nombre,
  setMdp,
  id,
}: {
  mdp: number;
  nombre: string;
  setMdp: Function;
  id: number;
}) => {
  const { turnoForm, setTurnoForm } = React.useContext(TurnosContext);

  const handleClick = () => {
    if (id === 1) {
      setTurnoForm({ ...turnoForm, mdp: 1 });
    } else {
      setTurnoForm({ ...turnoForm, mdp: 0 });
    }

    setMdp(id);
  };

  return (
    <motion.div
      variants={OpacityVariants}
      className={`metodo-de-pago ${mdp === id && "active"}`}
      onClick={handleClick}
    >
      <label htmlFor="mdp">{nombre}</label>
      <input
        type="radio"
        name="mdp"
        id="transferencia"
        checked={mdp === id}
        onChange={handleClick}
      />
    </motion.div>
  );
};

const PasoTres = ({ paso, setPaso }: { paso: number; setPaso: Function }) => {
  const [mdp, setMdp] = React.useState(0);
  const [selectedMdp, setSelectedMdp] = React.useState(false);

  return (
    <AnimatePresence mode="popLayout">
      {paso === 3 && !selectedMdp && (
        <motion.div
          variants={OpacityStaggerVariants}
          initial="hidden"
          animate="visible"
          exit={"exit"}
          className="paso-tres"
        >
          <h4 className="selector-dia-title">
            Seleccioná cómo querés abonar la consuta
          </h4>
          <div className="abono-container">
            <UnMetodo
              nombre="Transferencia bancaria"
              id={1}
              mdp={mdp}
              setMdp={setMdp}
            />
            <UnMetodo nombre="Mercado pago" id={2} mdp={mdp} setMdp={setMdp} />
          </div>
          <AnimatePresence>
            <motion.div className="continuar-button" variants={OpacityVariants}>
              <Button
                variant={`filled-pink ${mdp === 0 && "disabled"}`}
                onClick={() => {
                  setSelectedMdp(true);
                }}
                disabled={mdp === 0}
              >
                Continuar
              </Button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
      {paso === 3 && selectedMdp && mdp === 1 && (
        <PagoRealizado setPaso={setPaso} />
      )}
      {paso === 3 && selectedMdp && mdp === 2 && <MpModal />}
    </AnimatePresence>
  );
};

export default PasoTres;
