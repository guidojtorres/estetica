import React from "react";
import Heading from "../../../../components/Heading";
import "../../../../assets/css/table.css";
import "../../../../assets/css/util.css";
import { fetchFromServer } from "../../../../utils/APICalls";
import { IContacto } from "../../../../utils/types";

const ContactosDashboard = () => {
  const [contactos, setContactos] = React.useState<IContacto[]>(
    [] as IContacto[]
  );
  React.useLayoutEffect(() => {
    fetchFromServer("/contactos", "GET").then((res: any) =>
      setContactos(res.data.info)
    );
  }, []);

  return (
    <div className="ct">
      <Heading title="Contactos" />
      <div className="ct-table-container">
        <div className="container-table100">
          <div className="wrap-table100">
            <div className="table100 ver1 m-b-110">
              <div className="table100-head">
                <table>
                  <thead>
                    <tr className="row100 head">
                      <th className="cell100 column1">Asunto</th>
                      <th className="cell100 column2">Nombre</th>
                      <th className="cell100 column3">Email</th>
                      <th className="cell100 column4">Mensaje</th>
                      <th className="cell100 column5">Recibido</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="table100-body js-pscroll ps ps--active-y">
                <table>
                  <tbody>
                    {contactos &&
                      contactos.map((contacto) => (
                        <tr className="row100 body" key={contacto._id}>
                          <td className="cell100 column1">{contacto.asunto}</td>
                          <td className="cell100 column2">{contacto.nombre}</td>
                          <td className="cell100 column3">{contacto.email}</td>
                          <td className="cell100 column4">
                            {contacto.mensaje}
                          </td>
                          <td className="cell100 column5">
                            {new Date(contacto.fecha).toDateString()}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactosDashboard;
