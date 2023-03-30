import React from "react";
import Swal from "sweetalert2";
import { AppContext } from "../../../../App";
import Button from "../../../../components/Button";
import Heading from "../../../../components/Heading";
import TextInput from "../../../../components/TextInput";
import {
  fetchFromServer,
  fetchFromServerWithFile,
  fileServer,
  getFormData,
} from "../../../../utils/APICalls";
import { ICategoria } from "../../../../utils/types";

const CategoriaForm = ({
  activeItem,
  setActiveItem,
  updateContext,
}: {
  activeItem: string;
  setActiveItem: Function;
  updateContext: Function;
}) => {
  const { categorias } = React.useContext(AppContext);
  const [selectedFile, setSelectedFile] = React.useState<File>();

  const CategoriaFactory = (): ICategoria => {
    return { esDestacada: false, nombre: "", pathIcono: "", __v: 0, _id: "" };
  };

  const CategoriaFinder = () => {
    return categorias.filter((cat: any) => cat._id === activeItem)[0];
  };

  const selectedItem =
    activeItem === "nuevo" ? CategoriaFactory() : CategoriaFinder();

  const [form, setForm] = React.useState<ICategoria>({
    ...selectedItem,
    pathIcono: selectedItem.pathIcono,
  });

  const [preview, setPreview] = React.useState<string>();

  React.useEffect(() => {
    if (!selectedFile && !form.pathIcono) {
      setPreview("./img/una-categoria.png");
    } else if (!selectedFile) {
      setPreview(fileServer + selectedItem.pathIcono);
    } else {
      const objectUrl = URL.createObjectURL(selectedFile as File);
      setPreview(objectUrl);
    }
  }, [form.pathIcono, selectedFile, selectedItem.pathIcono]);

  const handleModify = async () => {
    const fd: any = getFormData(form);
    fd.append("images", selectedFile);

    const res = await fetchFromServer(
      `/categorias/${selectedItem._id}`,
      "PUT",
      fd
    );

    if (res?.data.status === "OK") {
      Swal.fire({
        title: "Modificado con exito!",
        icon: "success",
        confirmButtonColor: "#e288a3",
        confirmButtonText: "Volver a categorias",
      }).then((result) => {
        if (result.isConfirmed) {
          updateContext((prevState: boolean) => !prevState);
          setActiveItem(null);
        }
      });
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Estas seguro?",
      text: `Estas por eliminar la categoria: "${selectedItem.nombre}"`,
      icon: "warning",
      confirmButtonColor: "red",
      confirmButtonText: "Eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetchFromServer(
          `/categorias/${selectedItem._id}`,
          "DELETE"
        );

        if (res?.data.status !== "OK") {
          Swal.fire(
            "Error eliminando categoria",
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
    const fd: any = getFormData(form);
    fd.append("images", selectedFile);
    let check = typeof selectedFile !== "undefined";

    if (form.nombre && check) {
      const res = await fetchFromServer("/categorias", "POST", fd);
      if (res?.data.status === "OK") {
        Swal.fire({
          title: "Nueva categoria creada!",
          text: `Se ha creado la categoria: "${form.nombre}"`,
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
    <>
      <Heading title="Nueva categoria" />
      <div className="tf-wrapper" style={{ paddingTop: "70px" }}>
        <div className="tf-content">
          <div className="tf-options">
            <Button variant="pink" noArrow onClick={() => setActiveItem(null)}>
              Volver
            </Button>
            <span className="identificador-tratamiento">
              Identificador de categoria: {selectedItem._id}
            </span>
          </div>
          <div className="tf-form">
            <div className="row g-4">
              <div className="col-lg-12">
                <label className="tf-label">Titulo</label>
                <TextInput
                  placeholder={selectedItem.nombre}
                  setForm={setForm}
                  value={"nombre"}
                />
              </div>

              <div className="col-lg-12">
                <div className="checkbox-flex" style={{ gap: "20px" }}>
                  <label
                    htmlFor="presencial"
                    className="tf-label"
                    style={{ fontSize: "18px" }}
                  >
                    Es destacada?
                  </label>
                  <input
                    type="checkbox"
                    onChange={() =>
                      setForm({
                        ...form,
                        esDestacada: !form.esDestacada,
                      })
                    }
                    checked={form.esDestacada}
                  />
                </div>
              </div>

              <div className="col-lg-12">
                <h4 className="cf-icon-title">Icono</h4>
                <div className="una-categoria">
                  <label htmlFor="fileToUpload">
                    <div className="highlight-container">
                      <input
                        id="fileToUpload"
                        accept="image/jpeg,image/webp,image/png"
                        name="fileToUpload"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          e.target.files && setSelectedFile(e.target.files[0]);
                        }}
                      />
                      <img src={preview} alt="" className="highlight" />
                      <div className="highlight-content">
                        <div className="highlight-text">
                          <img
                            src="./img/iedit.png"
                            alt=""
                            style={{ border: "none", borderRadius: "none" }}
                          />
                        </div>
                      </div>
                    </div>
                  </label>
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
    </>
  );
};

export default CategoriaForm;
