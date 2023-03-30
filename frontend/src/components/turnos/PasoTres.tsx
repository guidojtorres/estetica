import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import {
  OpacityStaggerVariants,
  OpacityVariants,
} from "../../utils/animations";
import Button from "../Button";

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
  return (
    <motion.div
      variants={OpacityVariants}
      className={`metodo-de-pago ${mdp === id && "active"}`}
      onClick={() => setMdp(id)}
    >
      <label htmlFor="mdp">{nombre}</label>
      <input type="radio" name="mdp" id="transferencia" checked={mdp === id} />
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
              >
                Continuar
              </Button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
      {paso === 3 && selectedMdp && (
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
                  Podés realizar la transferencia del monto a abonar a la
                  siguiente cuenta
                </p>
              </motion.div>
              <motion.div className="monto" variants={OpacityVariants}>
                <span>Monto a pagar:</span>
                <span>$4500</span>
              </motion.div>
              <motion.div className="datos" variants={OpacityVariants}>
                <div className="un-dato">
                  <p>Nombre</p>
                  <span>Viviana Garcia</span>
                </div>
                <div className="un-dato">
                  <p>CBU</p>
                  <span>001234567 00123456700000</span>
                </div>

                <div className="un-dato">
                  <p>Alias de CBU</p>
                  <span>XXX.XXXX.XXXXX</span>
                </div>
              </motion.div>
              <motion.div className="icono-imagen" variants={OpacityVariants}>
                <img src="./img/file.png" alt="" />
                <span>Envío de comprobante</span>
              </motion.div>

              <p className="info-comprobante">
                Una vez que realices la trasferencia por favor envianos el
                comprobante a ejemplo@gmail.com, o por Whatsapp a 11 0000 1122
              </p>
            </div>
          </motion.div>
          <AnimatePresence mode="popLayout">
            <motion.div
              className="continuar-button"
              variants={OpacityVariants}
              onClick={() => setPaso(4)}
            >
              <Button variant="filled-pink">Ya realicé el pago</Button>
            </motion.div>
          </AnimatePresence>
        </AnimatePresence>
      )}
    </AnimatePresence>
  );
};

export default PasoTres;
