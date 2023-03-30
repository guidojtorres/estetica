import React from "react";
import { fetchFromServer } from "../utils/APICalls";
import Button from "./Button";
import TextInput from "./TextInput";
interface IContactoForm {
  nombre: string;
  apellido: string;
  email: string;
  asunto: string;
  mensaje: string;
  fecha: Date;
}
const ContactoForm = () => {
  const [contacoForm, setContactoFrom] = React.useState<IContactoForm>();

  return (
    <div className="contacto-form">
      <TextInput
        setForm={setContactoFrom}
        placeholder="Nombre"
        value="nombre"
      />
      <TextInput
        setForm={setContactoFrom}
        placeholder="Apellido"
        value="apellido"
      />
      <TextInput
        setForm={setContactoFrom}
        placeholder="Correo electrónico"
        value="email"
      />
      <TextInput
        setForm={setContactoFrom}
        placeholder="Asunto"
        value="asunto"
      />
      <TextInput
        setForm={setContactoFrom}
        placeholder="Mensaje"
        isTextArea
        value="mensaje"
      />
      <Button
        variant="filled-gray"
        noArrow
        style={{ marginRight: "auto", padding: "8px 62px" }}
        onClick={() => fetchFromServer("/contactos", "POST", contacoForm)}
      >
        Enviar
      </Button>
    </div>
  );
};

export default ContactoForm;
