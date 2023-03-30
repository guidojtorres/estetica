import React from "react";
import Swal from "sweetalert2";
import Button from "../../../../components/Button";
import { fetchFromServer } from "../../../../utils/APICalls";

const HorariosModal = ({
  isVisible,
  setModalVisible,
}: {
  isVisible: boolean;
  setModalVisible: Function;
}) => {
  const [horariosForm, setHorariosForm] = React.useState({
    duracion: "",
    turno: "",
  });
  const handleSave = async () => {
    const res = await fetchFromServer("/horarios", "PUT", horariosForm);
    if (res?.data.status === "KO") {
      alert(res?.data.errDesc.message);
    } else {
      setModalVisible(false);
      Swal.fire("Horarios actualizados con exito", "", "success");
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setHorariosForm({
      ...horariosForm,
      turno: (e.target as HTMLInputElement).value,
    });
  };
  return isVisible ? (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <div className="modal-body">
          <div
            className="close-btn"
            onClick={() => {
              setModalVisible(false);
            }}
          >
            <img src="./img/close.png" alt="" />
          </div>
          <div className="modal-title">
            <h4>Definir horarios de atencion</h4>
          </div>
          <div className="modal-content">
            <div className="group-input">
              <label htmlFor="">Turno</label>
              <select
                name=""
                id=""
                onChange={(e) => {
                  setHorariosForm({
                    ...horariosForm,
                    duracion: e.target.value,
                  });
                }}
              >
                <option value="manana">Manana</option>
                <option value="tarde">Tarde</option>
                <option value="noche">Noche</option>
              </select>
            </div>
            <div className="group-input">
              <div className="radios-flex">
                <label htmlFor="" className="radios-label">
                  Duracion
                </label>
                <div className="checkbox-flex">
                  <label htmlFor="">15 minutos</label>
                  <input
                    type="radio"
                    value="15"
                    name="duracion"
                    onClick={(e) => handleClick(e)}
                  />
                </div>
                <div className="checkbox-flex">
                  <label htmlFor="">30 minutos</label>
                  <input
                    type="radio"
                    value="30"
                    name="duracion"
                    onClick={(e) => handleClick(e)}
                  />
                </div>
                <div className="checkbox-flex">
                  <label htmlFor="">1 hora</label>
                  <input
                    type="radio"
                    value="60"
                    name="duracion"
                    onClick={(e) => handleClick(e)}
                  />
                </div>
              </div>
            </div>
            <Button variant="filled-pink" onClick={handleSave}>
              Guardar
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
export default HorariosModal;
