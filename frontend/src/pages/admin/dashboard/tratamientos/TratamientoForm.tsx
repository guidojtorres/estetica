import React from "react";
import Swal from "sweetalert2";
import { AppContext } from "../../../../App";
import Button from "../../../../components/Button";
import TextInput from "../../../../components/TextInput";
import {
  fetchFromServer,
  fileServer,
  getFormData,
} from "../../../../utils/APICalls";
import { popValue } from "../../../../utils/functions";
import { ITratamiento, ICategoria } from "../../../../utils/types";

const ImgModal = ({
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

const tratamientoFactory = (): ITratamiento => {
  return {
    categorias: [],
    descripcion: "",
    esDestacado: false,
    subtitulo: "",
    titulo: "",
    pathFotos: [],
    dondeEmplear: "",
    verMas: "",
    _id: "",
    _v: 0,
  };
};

const TratamientoForm = ({
  activeItem,
  setActiveItem,
  updateContext,
}: {
  activeItem: string;
  setActiveItem: Function;
  updateContext: Function;
}) => {
  const { tratamientos, categorias } = React.useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [modalImg, setModalImg] = React.useState("");

  const handleModal = (img: string) => {
    setModalImg(img);
    setIsModalVisible(true);
  };

  const tratamientoFinder = (): ITratamiento => {
    return tratamientos.filter(
      (tratamiento: any) => tratamiento._id === activeItem
    )[0];
  };

  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [previews, setPreviews] = React.useState<string[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<ITratamiento>(
    activeItem === "nuevo" ? tratamientoFactory() : tratamientoFinder()
  );

  const [form, setForm] = React.useState<ITratamiento>({
    ...selectedItem,
  });

  React.useEffect(() => {
    setSelectedItem((prevState: ITratamiento) => ({
      ...prevState,
      pathFotos: prevState.pathFotos.map((foto) => fileServer + foto),
    }));
  }, []);

  React.useEffect(() => {
    setPreviews(selectedItem.pathFotos);
  }, [selectedItem.pathFotos]);

  const handleFileAdd = (event: any) => {
    if (selectedFiles.length + selectedItem.pathFotos.length > 5) {
      return Swal.fire("Maximo 5 fotos.", "", "error");
    }

    setPreviews((prevState) => [
      ...prevState,
      URL.createObjectURL(event.target.files[0]),
    ]);
    setSelectedFiles((prevState) => [...prevState, event.target.files[0]]);
  };

  const handleFileDelete = (fileUrl: string) => {
    let index = previews.indexOf(fileUrl);
    console.log(selectedFiles);

    if (index <= selectedItem.pathFotos.length - 1) {
      setForm((prevState: ITratamiento) => ({
        ...prevState,
        pathFotos: prevState.pathFotos.filter((v, i) => i !== index),
      }));

      setPreviews((prevState: any) =>
        prevState.filter((v: string, i: number) => i !== index)
      );
    } else {
      setSelectedFiles((prevState: File[]) =>
        prevState.filter(
          (v: File, i: number) => i !== index - selectedItem.pathFotos.length
        )
      );
      setPreviews((prevState: any) =>
        prevState.filter((v: string, i: number) => i !== index)
      );
    }

    setIsModalVisible(false);
  };

  const handleCheckboxChange = (event: any, categoria: string) => {
    if (event.currentTarget.checked) {
      form.categorias.push(categoria);
      setForm({
        ...form,
        categorias: form.categorias,
      });
    } else {
      let filteredArray = popValue(form.categorias, categoria);
      setForm({
        ...form,
        categorias: filteredArray,
      });
    }
  };

  const handleModify = async () => {
    const fd: any = getFormData(form);
    selectedFiles.forEach((selectedFile) => fd.append("images", selectedFile));

    const res = await fetchFromServer(
      `/tratamientos/${selectedItem._id}`,
      "PUT",
      fd
    );

    if (res?.data.status === "OK") {
      Swal.fire({
        title: "Modificado con exito!",
        icon: "success",
        confirmButtonColor: "#e288a3",
        confirmButtonText: "Volver a tratamientos",
      }).then((result) => {
        if (result.isConfirmed) {
          updateContext((prevState: boolean) => !prevState);
          setActiveItem(null);
        }
      });
    } else {
      Swal.fire({
        title: "Error!",
        icon: "error",
        confirmButtonColor: "#e288a3",
        text: "Revisar todos los campos.",
        confirmButtonText: "Volver",
      });
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Estas seguro?",
      text: `Estas por eliminar el tratamiento: "${selectedItem.titulo}"`,
      icon: "warning",
      confirmButtonColor: "red",
      confirmButtonText: "Eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetchFromServer(
          `/tratamientos/${selectedItem._id}`,
          "DELETE"
        );

        if (res?.data.status !== "OK") {
          Swal.fire(
            "Error eliminando tratamiento",
            `Error status: ${res?.data.errDesc}`,
            "error"
          );
          return false;
        }
        updateContext((prevState: boolean) => !prevState);
        setActiveItem(null);
      }
    });
  };

  const handleSave = async () => {
    let check = typeof selectedFiles[0] !== "undefined";

    if (
      form.descripcion !== "" &&
      form.titulo !== "" &&
      form.descripcion !== "" &&
      selectedFiles.length > 0 &&
      check
    ) {
      const fd: any = getFormData(form);
      selectedFiles.forEach((selectedFile) =>
        fd.append("images", selectedFile)
      );

      const res = await fetchFromServer("/tratamientos", "POST", fd);
      if (res?.data.status === "OK") {
        Swal.fire({
          title: "Nuevo tratamiento creado!",
          text: `Se ha creado el tratamiento: "${form.titulo}"`,
          icon: "success",
          confirmButtonColor: "#e288a3",
        }).then((result) => {
          if (result.isConfirmed) {
            updateContext((prevState: boolean) => !prevState);
            setActiveItem(null);
          }
        });
        return true;
      }
    } else {
      return Swal.fire(
        "Campos faltantes",
        "Debe completar todos los campos de texto y agregar una imagen",
        "question"
      );
    }
  };

  return (
    <div className="tf-wrapper">
      <ImgModal
        isVisible={isModalVisible}
        img={modalImg}
        setIsVisible={setIsModalVisible}
        handleDelete={handleFileDelete}
      />
      <div className="tf-content">
        <div className="tf-options">
          <Button variant="pink" noArrow onClick={() => setActiveItem(null)}>
            Volver
          </Button>
          <span className="identificador-tratamiento">
            Identificador de tratamiento: {selectedItem._id}
          </span>
        </div>
        <div className="tf-form">
          <div className="row g-4">
            <div className="col-lg-6">
              <label className="tf-label">Titulo</label>
              <TextInput
                placeholder={selectedItem.titulo}
                setForm={setForm}
                value={"titulo"}
              />
            </div>
            <div className="col-lg-6">
              <label className="tf-label">Subtitulo</label>

              <TextInput
                placeholder={selectedItem.subtitulo}
                setForm={setForm}
                value={"subtitulo"}
              />
            </div>

            <div className="col-lg-12">
              <label className="tf-label">Descripcion</label>

              <TextInput
                placeholder={selectedItem.descripcion}
                setForm={setForm}
                value={"descripcion"}
                isTextArea
              />
            </div>
            <div className="col-lg-6">
              <div className="checkbox-flex" style={{ gap: "20px" }}>
                <label
                  htmlFor="presencial"
                  className="tf-label"
                  style={{ fontSize: "18px" }}
                >
                  Es destacado?
                </label>
                <input
                  type="checkbox"
                  onChange={() =>
                    setForm({
                      ...form,
                      esDestacado: !form.esDestacado,
                    })
                  }
                  checked={form.esDestacado}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <label className="tf-label">Donde emplear</label>

              <TextInput
                placeholder={selectedItem.dondeEmplear}
                setForm={setForm}
                value={"dondeEmplear"}
              />
            </div>
            <div className="col-lg-6"></div>
            <div className="col-lg-6">
              <label className="tf-label">Ver mas</label>

              <TextInput
                placeholder={selectedItem.verMas}
                setForm={setForm}
                value={"verMas"}
              />
            </div>
            <div className="col-lg-12">
              <label className="tf-label">Categorias</label>
              <div className="tf-categorias">
                {categorias.map((unaCategoria: ICategoria) => (
                  <div className="checkbox-flex" key={unaCategoria._id}>
                    <label htmlFor="presencial">{unaCategoria.nombre}</label>
                    <input
                      type="checkbox"
                      name="modalidad"
                      id="presencial"
                      value={unaCategoria._id}
                      defaultChecked={selectedItem.categorias.includes(
                        unaCategoria._id
                      )}
                      onClick={(e) => handleCheckboxChange(e, unaCategoria._id)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-12">
              <label className="tf-label">Imagenes</label>

              <div className="tf-imagenes-flex">
                {previews.map((pre, i) => (
                  <img
                    alt=""
                    src={pre}
                    key={i}
                    onClick={() => handleModal(pre)}
                  />
                ))}
                <label htmlFor="fileToPush">
                  <img src="./img/mas.png" alt="" className="mas-icon" />
                </label>
                <input
                  type="file"
                  name="fileToPush"
                  id="fileToPush"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileAdd(e)}
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="tf-btn-group">
                {activeItem === "nuevo" ? (
                  <Button
                    noArrow
                    variant="filled-pink"
                    style={{
                      width: "300px",
                      margin: "0 auto",
                    }}
                    onClick={handleSave}
                  >
                    Guardar
                  </Button>
                ) : (
                  <>
                    <Button
                      noArrow
                      variant="filled-pink"
                      style={{
                        width: "300px",

                        margin: "0 auto",
                      }}
                      onClick={handleModify}
                    >
                      Modificar
                    </Button>
                    <Button
                      noArrow
                      variant="filled-red"
                      style={{
                        width: "300px",
                        margin: "0 auto",
                      }}
                      onClick={handleDelete}
                    >
                      Eliminar
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TratamientoForm;
