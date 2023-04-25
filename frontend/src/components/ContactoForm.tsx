import React from "react";
import { fetchFromServer } from "../utils/APICalls";
import Button from "./Button";
import TextInput from "./TextInput";
import Swal from "sweetalert2";
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

  const handleSubmit = async () => {
    if (
      !contacoForm?.apellido ||
      !contacoForm.nombre ||
      !contacoForm.asunto ||
      !contacoForm.mensaje ||
      !contacoForm.email
    ) {
      Swal.fire({
        title: "Error",
        text: "Debe completar todos los campos.",
        icon: "error",
      });
    } else {
      const res = await fetchFromServer("/contactos", "POST", contacoForm);
      if (res?.data.status === "OK") {
        Swal.fire({
          title: "Muchas gracias",
          text: "Hemos recibido tu contacto y estaremos comunicandonos pronto.",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: `Hubo un error enviando su contacto. ${res?.data.errDesc}`,
          icon: "error",
        });
      }
    }
  };

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
        onClick={handleSubmit}
      >
        Enviar
      </Button>
    </div>
  );
};

export default ContactoForm;
