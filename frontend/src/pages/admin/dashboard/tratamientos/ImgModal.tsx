import Button from "../../../../components/Button";

export const ImgModal = ({
  img,
  isVisible,
  setIsVisible,
  handleDelete,
}: {
  img: string;
  isVisible: boolean;
  setIsVisible: Function;
  handleDelete: Function;
}) => {
  if (isVisible) {
    return (
      <div className="modal-overlay-trat">
        <div className="modal-content-trat">
          <img src={img} alt="" className="trtm-modal-img" />
          <img
            src="./img/close.png"
            alt=""
            onClick={() => setIsVisible(false)}
            className="mot-close"
          />
          <div style={{ flexBasis: "100%", width: "0" }}></div>
          <Button
            variant="filled-red"
            noArrow
            onClick={() => handleDelete(img)}
          >
            Borrar
          </Button>
        </div>
      </div>
    );
  }

  return null;
};
