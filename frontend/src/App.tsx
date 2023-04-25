import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import "./assets/css/App.css";
import Footer from "./components/Footer";
import Navegacion from "./components/Navegacion";
import AnimatedRoutes from "./pages/AnimatedRoutes";
import { fetchFromServer } from "./utils/APICalls";
import { AuthContext, useAuthProvider } from "./utils/Hooks";
import moment from "moment";
import { initMercadoPago } from "@mercadopago/sdk-react";

initMercadoPago("TEST-dbf122f3-63ea-48f9-8242-c23cc78e142e");

export const AppContext = React.createContext({
  categorias: [],
  tratamientos: [],
  setCategorias: (prevState: any) => {},
  setTratamientos: (prevState: any) => {},
  shouldContextUpdate: false,
  setShouldContextUpdate: (prevState: boolean) => {},
});

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const [tratamientos, setTratamientos] = React.useState([]);
  const [categorias, setCategorias] = React.useState([]);
  const [shouldContextUpdate, setShouldContextUpdate] = React.useState(false);
  const value = useAuthProvider();
  const Auth = AuthContext;

  moment.tz.setDefault("GMT0");

  React.useEffect(() => {
    fetchFromServer("/tratamientos", "GET")
      .then((json) => setTratamientos(json?.data.info))
      .catch();

    fetchFromServer("/categorias", "GET")
      .then((json) => setCategorias(json?.data.info))
      .catch();
  }, [shouldContextUpdate]);
  return (
    <Auth.Provider value={value}>
      <BrowserRouter>
        <Navegacion />
        <ScrollToTop />
        <AppContext.Provider
          value={{
            categorias,
            tratamientos,
            setCategorias,
            setTratamientos,
            shouldContextUpdate,
            setShouldContextUpdate,
          }}
        >
          <AnimatedRoutes />
        </AppContext.Provider>
        <Footer />
      </BrowserRouter>
    </Auth.Provider>
  );
};

export default App;
