import { motion } from "framer-motion";
import React from "react";
import { OpacityVariants } from "../utils/animations";

const TextInput = ({
  placeholder,
  isTextArea,
  setForm,
  value,
  isPassword,
}: {
  placeholder: string;
  isTextArea?: boolean;
  isPassword?: boolean;
  setForm: Function;
  value: string;
}) => {
  const handleChange = (event: any) => {
    setForm((prevState: any) => ({
      ...prevState,
      [value]: event.target.value,
    }));
  };

  if (isTextArea) {
    return (
      <motion.div variants={OpacityVariants}>
        <textarea
          className="est-input"
          placeholder={placeholder}
          rows={5}
          onChange={(e) => handleChange(e)}
        ></textarea>
      </motion.div>
    );
  }

  return (
    <motion.div variants={OpacityVariants}>
      <input
        type={`${isPassword ? "password" : "text"}`}
        className="est-input"
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
      />
    </motion.div>
  );
};

export default TextInput;
