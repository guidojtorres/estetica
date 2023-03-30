import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const VolverBtn = ({ onClick }: { onClick: Function }) => {
  return (
    <AnimatePresence>
      <motion.button className="volver-btn" onClick={() => onClick()}>
        <img src="./img/chevron-left.png" alt="" />
        <span> Volver</span>
      </motion.button>
    </AnimatePresence>
  );
};

export default VolverBtn;
