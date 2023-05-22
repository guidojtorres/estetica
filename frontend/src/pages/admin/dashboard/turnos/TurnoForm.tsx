import React from "react";
import Swal from "sweetalert2";
import Button from "../../../../components/Button";
import TextInput from "../../../../components/TextInput";
import { fetchFromServer } from "../../../../utils/APICalls";
import { ITurno } from "../../../../utils/types";

const TurnoForm = ({
  turnos,
  turno,
  setActiveTurno,
  setShouldReRender,
}: {
  turno: string;
  setActiveTurno: Function;
  turnos: ITurno[];
  setShouldReRender: Function;
}) => {
  const [turnObj, setTurnObj] = React.useState<ITurno>({} as ITurno);

  React.useEffect(() => {
    if (turno !== "nuevo") {
      fetchFromServer(`/turnos/${turno}`, "GET")
        .then((res: any) => setTurnObj(res.data.info[0]))
        .catch((e) => alert(e));
    }
  }, [turno]);

  const handleMetodoDePago = (mdp: number) => {
    Swal.fire({
      title: "Desea cambiar el metodo de pago?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ed6ea7",
    }).then((result) =>
      result.isConfirmed ? setTurnObj({ ...turnObj, metodoDePago: mdp }) : null
    );
  };

  const handlePagado = () => {
    Swal.fire({
      title: "Desea cambiar el estado de pago?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ed6ea7",
    }).then((result) =>
      result.isConfirmed
        ? setTurnObj({ ...turnObj, fuePagado: !turnObj.fuePagado })
        : null
    );
  };

  const handleModify = async () => {
    const res = await fetchFromServer(`/turnos/${turnObj._id}`, "PUT", turnObj);

    if (res?.data.status === "OK") {
      Swal.fire({
        title: "Modificado con exito!",
        icon: "success",
        confirmButtonColor: "#e288a3",
        confirmButtonText: "Volver a agenda",
      }).then((result) => {
        if (result.isConfirmed) {
          setShouldReRender((prevState: boolean) => !prevState);
          setActiveTurno(null);
        }
      });
    }
  };

  const handleSave = async () => {
    if (
      turnObj.apellido !== "" &&
      turnObj.asunto !== "" &&
      turnObj.celular !== "" &&
      turnObj.email !== "" &&
      turnObj.fecha !== "" &&
      turnObj.modalidad !== "" &&
      turnObj.nombre !== ""
    ) {
      const res = await fetchFromServer("/turnos", "POST", turnObj);
      if (res?.data.status === "OK") {
        Swal.fire({
          title: "Nuevo turno creado!",
          text: `Se ha creado el turno: "${turnObj.asunto}"`,
          icon: "success",
          confirmButtonColor: "#e288a3",
        }).then((result) => {
          if (result.isConfirmed) {
            setShouldReRender((prevState: boolean) => !prevState);
            setActiveTurno(null);
          }
        });
        return true;
      }
    } else {
      return Swal.fire(
        "Campos faltantes",
        "Debe completar todos los campos.",
        "question"
      );
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Estas seguro?",
      text: `Estas por eliminar el tratamiento: "${turnObj.asunto}"`,
      icon: "warning",
      confirmButtonColor: "red",
      confirmButtonText: "Eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetchFromServer(`/turnos/${turnObj._id}`, "DELETE");

        if (res?.data.status !== "OK") {
          Swal.fire(
            "Error eliminando turno",
            `Error status: ${res?.data.errDesc}`,
            "error"
          );
          return false;
        }
        setShouldReRender((prevState: boolean) => !prevState);
        setActiveTurno(null);
      }
    });
  };

  return (
    <div className="tform-wrapper">
      <div className="tf-options">
        <Button variant="pink" noArrow onClick={() => setActiveTurno(null)}>
          Volver
        </Button>
        <span className="identificador-tratamiento">
          Identificador de turno: {turnObj._id}
        </span>
      </div>
      <div className="tform">
        <div className="row g-4">
          <div className="col-lg-12">
            <div className="fh-turno">
              <label htmlFor="" className="tf-label">
                Fecha de la consulta:
              </label>
              <input
                value={turnObj.fecha && turnObj.fecha.slice(0, -1)}
                type="datetime-local"
                onChange={(e) =>
                  setTurnObj({ ...turnObj, fecha: e.target.value + "Z" })
                }
              />
            </div>
          </div>
          <div className="col-lg-6">
            <label className="tf-label">Nombre</label>
            <TextInput
              placeholder={turnObj.nombre}
              setForm={setTurnObj}
              value={"nombre"}
            />
          </div>
          <div className="col-lg-6">
            <label className="tf-label">Apellido</label>
            <TextInput
              placeholder={turnObj.apellido}
              setForm={setTurnObj}
              value={"apellido"}
            />
          </div>
          <div className="col-lg-12">
            <label className="tf-label">Asunto</label>
            <TextInput
              placeholder={turnObj.asunto}
              setForm={setTurnObj}
              value={"asunto"}
            />
          </div>
          <div className="col-lg-6">
            <label className="tf-label">Email</label>
            <TextInput
              placeholder={turnObj.email}
              setForm={setTurnObj}
              value={"email"}
            />
          </div>
          <div className="col-lg-6">
            <label className="tf-label">Celular</label>
            <TextInput
              placeholder={turnObj.celular}
              setForm={setTurnObj}
              value={"celular"}
            />
          </div>
          <div className="col-lg-4 mt-5">
            <div className="fp-flex">
              <label htmlFor="" className="fp-label">
                Fue pagado?
              </label>
              <img
                src={"./img/checkmark.png"}
                alt=""
                className={!turnObj.fuePagado ? "disabled" : ""}
                onClick={() => !turnObj.fuePagado && handlePagado()}
              />
              <img
                src={"./img/multiply.png"}
                alt=""
                className={turnObj.fuePagado ? "disabled" : ""}
                onClick={() => turnObj.fuePagado && handlePagado()}
              />
            </div>
          </div>
          <div className="col-lg-4 mt-5">
            <div className="fp-flex">
              <label htmlFor="" className="fp-label">
                Metodo de pago:
              </label>
              {turno === "nuevo" ? (
                <>
                  <img
                    src="./img/banco.png"
                    alt=""
                    className={`mdp-icon ${
                      turnObj.metodoDePago === 0 && "active"
                    }`}
                    onClick={() => handleMetodoDePago(0)}
                  />
                  <img
                    src="./img/mp.png"
                    alt=""
                    className={`mdp-icon ${
                      turnObj.metodoDePago === 1 && "active"
                    }`}
                    onClick={() => handleMetodoDePago(1)}
                  />
                </>
              ) : (
                <img
                  src={
                    turnObj.metodoDePago ? "./img/mp.png" : "./img/banco.png"
                  }
                  alt=""
                  className="mdp-icon"
                />
              )}
            </div>
          </div>

          <div className="col-lg-4 mt-5">
            <div className="fp-flex">
              <label htmlFor="" className="fp-label">
                Modalidad:
              </label>
              {turno === "nuevo" ? (
                <>
                  <span
                    className={`fp-p ${
                      turnObj.modalidad === "Presencial" && "active"
                    }`}
                    onClick={() =>
                      setTurnObj({ ...turnObj, modalidad: "Presencial" })
                    }
                  >
                    Presencial
                  </span>
                  <span
                    className={`fp-p ${
                      turnObj.modalidad === "Virtual" && "active"
                    }`}
                    onClick={() =>
                      setTurnObj({ ...turnObj, modalidad: "Virtual" })
                    }
                  >
                    Virtual
                  </span>
                </>
              ) : (
                <p className="fp-p">{turnObj.modalidad}</p>
              )}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="tform-btn-flex">
              <Button
                variant="filled-pink"
                onClick={turno === "nuevo" ? handleSave : handleModify}
              >
                Guardar
              </Button>
              <Button
                variant="filled-red"
                noArrow
                onClick={
                  turno === "nuevo" ? () => setActiveTurno(null) : handleDelete
                }
              >
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurnoForm;
