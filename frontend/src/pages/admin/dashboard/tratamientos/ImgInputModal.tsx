import React from "react";
import Button from "../../../../components/Button";
import { isValidHttpUrl } from "../../../../utils/functions";
import Swal from "sweetalert2";

const ImgInputModal = ({
  isVisible,
  setIsVisible,
  saveHandler,
}: {
  isVisible: boolean;
  setIsVisible: Function;
  saveHandler: (e: string) => Promise<any>;
}) => {
  const [imgInput, setImgInput] = React.useState<string>("");

  const handleInputChange = (e: any) => {
    setImgInput(e.target.value);
  };

  const handleSave = () => {
    if (!isValidHttpUrl(imgInput)) {
      setIsVisible(false);
      setImgInput("");
      return Swal.fire("Debe ingresar una URL valida.", "", "error");
    }

    saveHandler(imgInput).then(() => setImgInput(""));
  };
  const handleClose = React.useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  return isVisible ? (
    <div className="iim-wrapper">
      <div className="iim-content">
        <div className="iim-head">
          <h4>Agregar imagenes</h4>
          <img
            src="./img/close.png"
            alt=""
            className="iim-close"
            onClick={handleClose}
          />
        </div>
        <div className="iim-body">
          <input
            className="est-input"
            type="text"
            value={imgInput}
            onChange={(e) => handleInputChange(e)}
            placeholder="Ingresar url"
          />
        </div>
        <div className="iim-foot">
          <Button variant="filled-pink" noArrow onClick={() => handleSave()}>
            Guardar
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ImgInputModal;
