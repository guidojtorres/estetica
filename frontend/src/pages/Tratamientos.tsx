import { motion } from "framer-motion";
import React from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../App";
import CardTratamiento from "../components/CardTratamiento";
import Heading from "../components/Heading";
import SearchDropdown from "../components/SearchDropdown";
import { fileServer } from "../utils/APICalls";
import useComponentVisible from "../utils/Hooks";

const CategoriaPill = ({
  categoriaElegida,
  setCategoriaElegida,
  id,
  title,
}: {
  categoriaElegida: string;
  setCategoriaElegida: Function;
  id: string;
  title: string;
}) => {
  const handleClick = () => {
    if (categoriaElegida === id) {
      setCategoriaElegida("");
      return false;
    }
    setCategoriaElegida(id);
  };

  return (
    <div
      className={`pill ${categoriaElegida === id && "active"}`}
      onClick={handleClick}
    >
      {title}
    </div>
  );
};

const Tratamientos = () => {
  const location = useLocation();
  const [categoriaElegida, setCategoriaElegida] = React.useState(
    location.state && location.state.categoria
  );
  const [search, setSearch] = React.useState<null | string>(null);
  const [result, setResult] = React.useState([]);
  const { categorias, tratamientos } = React.useContext(AppContext);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  React.useEffect(() => {
    if (search) {
      setResult(
        categorias.filter((cat: any) =>
          cat.nombre.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [categorias, search]);

  return (
    <motion.main
      className="tratamientos"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Heading title="Nuestros tratamientos"></Heading>
      <div className="est-select">
        <div className="ref" ref={ref}>
          <input
            type="text"
            placeholder="¿Qué tipo de tratamiento estás buscando? "
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsComponentVisible(true)}
            id="search-input"
          />
          <SearchDropdown
            search={search}
            result={result}
            isVisible={isComponentVisible}
            setCategoriaElegida={setCategoriaElegida}
            setComponentVisible={setIsComponentVisible}
          />
        </div>
      </div>

      <div className="problematicas-flex">
        <span>Buscar por problemática a tratar:</span>
        <div className="pills-flex">
          {categorias &&
            categorias.map((categoria: any) => (
              <CategoriaPill
                title={categoria.nombre}
                id={categoria._id}
                categoriaElegida={categoriaElegida}
                setCategoriaElegida={setCategoriaElegida}
                key={categoria._id}
              />
            ))}
        </div>
      </div>

      <div className="estetica-container">
        <div className="card-tratamiento-flex">
          {tratamientos &&
            tratamientos.map((tratamiento: any) => (
              <CardTratamiento
                titulo={tratamiento.titulo}
                descripcion={tratamiento.descripcion}
                id={tratamiento._id}
                pathFoto={tratamiento.pathFotos[0]}
                categoriaElegida={categoriaElegida}
                categorias={tratamiento.categorias}
                key={tratamiento._id}
                tratamiento={tratamiento}
              />
            ))}
        </div>
      </div>
    </motion.main>
  );
};

export default Tratamientos;
