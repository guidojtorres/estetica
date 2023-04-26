import axios from "axios";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchFromServer } from "../utils/APICalls";
import { SpinnerCircular } from "spinners-react";
import Button from "../components/Button";
const Feedback = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let [loading, setLoading] = React.useState(true);
  let [turno, setTurno] = React.useState<any>();
  let navigate = useNavigate();
  const renderSpinner = () => {
    if (loading) {
      return (
        <div className="spinner-wrapper">
          <SpinnerCircular color="#009EE3" />
        </div>
      );
    }
  };

  React.useEffect(() => {
    async function updateTurno() {
      const res = await fetchFromServer("/crear-turno-mp", "POST", {
        ref_id: searchParams.get("preference_id"),
        paymentId: searchParams.get("payment_id"),
        status: searchParams.get("status"),
      });

      return res?.data;
    }

    updateTurno()
      .then((res) => setTurno(res?.info))
      .then(() => setLoading(false));
  }, [searchParams]);

  return (
    <div>
      {renderSpinner()}
      {!loading && turno && (
        <div className="feedback-wrapper">
          <h1>
            {searchParams.get("status") === "approved"
              ? "Turno reservado."
              : "Error en el pago."}
          </h1>
          <p>
            {searchParams.get("status") === "approved"
              ? `Tu turno fue reservado en la fecha: ${turno.fecha.toString()}`
              : "Error de pago, por favor intente de nuevo en unos minutos."}
          </p>
          <Button noArrow variant="filled-pink" onClick={() => navigate("/")}>
            Inicio
          </Button>
        </div>
      )}
    </div>
  );
};

export default Feedback;
