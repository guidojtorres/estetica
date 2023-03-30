import React from "react";
import { ICategoria } from "../utils/types";

const SearchDropdown = ({
  search,
  result,
  isVisible,
  setCategoriaElegida,
  setComponentVisible,
}: {
  search: string | null;
  result: ICategoria[] | null;
  isVisible: boolean;
  setCategoriaElegida?: Function;
  setComponentVisible?: Function;
}) => {
  const handleClick = (categoria: string) => {
    setCategoriaElegida && setCategoriaElegida(categoria.toLowerCase());
    setComponentVisible && setComponentVisible(false);
  };

  if (result && result?.length > 0 && search && isVisible) {
    return (
      <div className="search-dropdown" id="search-dropdown">
        {result.map((unResultado: any) => (
          <span
            onClick={() => handleClick(unResultado._id)}
            id="search-link"
            key={unResultado._id}
          >
            <img alt="Lupa" src="./img/lupa.png" />
            {unResultado.nombre}
          </span>
        ))}
      </div>
    );
  }
  return null;
};

export default SearchDropdown;
