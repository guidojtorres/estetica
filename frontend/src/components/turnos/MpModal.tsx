import React, { useState } from "react";
import { fetchFromServer } from "../../utils/APICalls";
import { SpinnerCircular } from "spinners-react";
import { Wallet } from "@mercadopago/sdk-react";
import { TurnosContext } from "./TurnoForm";

const MpModal = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const { turnoForm } = React.useContext(TurnosContext);

  React.useEffect(() => {
    setIsLoading(true);

    let orderData = turnoForm as any;
    orderData.price = "3000";
    orderData.quantity = "1";
    orderData.descripcion = "Consulta con la Dra. Viviana garcia";

    fetchFromServer("/crear-preferencia", "POST", orderData)
      .then((res) => setPreferenceId(res?.data.id))
      .catch((error) => alert(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [turnoForm]);

  const renderSpinner = () => {
    if (isLoading || !preferenceId) {
      return (
        <div className="spinner-wrapper">
          <SpinnerCircular color="#009EE3" />
        </div>
      );
    }
  };

  const handleReady = () => {
    setIsReady(true);
  };

  const renderCheckoutButton = (preferenceId: any) => {
    if (!preferenceId) return null;

    return (
      <Wallet
        initialization={{ preferenceId: preferenceId, redirectMode: "modal" }}
        onReady={handleReady}
      />
    );
  };

  return (
    <div className="mp-modal">
      {renderSpinner()}
      {!isLoading && (
        <>
          <div className="mp-title">
            <h1>Pagar con mercadopago</h1>
            <h4>Precio de la consulta: $3000</h4>
            <p>
              Aclaración: Podrás cancelar o modificar tu consulta hasta 48hs.
              antes de la fecha y hora asignada.
            </p>
          </div>
          <div className="mp-button">{renderCheckoutButton(preferenceId)}</div>
        </>
      )}
    </div>
  );
};

export default MpModal;
