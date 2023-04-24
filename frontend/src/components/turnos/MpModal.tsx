import React, { useState } from "react";
import { fetchFromServer } from "../../utils/APICalls";
import Button from "../Button";
import { SpinnerCircular } from "spinners-react";
import { Wallet } from "@mercadopago/sdk-react";

const MpModal = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [orderData, setOrderData] = useState({
    quantity: "1",
    price: "3000",
    amount: 1,
    description: "Some book",
  });

  React.useEffect(() => {
    setIsLoading(true);
    fetchFromServer("/crear-preferencia", "POST", orderData)
      .then((res) => setPreferenceId(res?.data.id))
      .catch((error) => alert(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [orderData]);

  const renderSpinner = () => {
    if (isLoading) {
      return (
        <div className="spinner-wrapper">
          <SpinnerCircular color="#009EE3" />
        </div>
      );
    }
  };

  const renderCheckoutButton = (preferenceId: any) => {
    if (!preferenceId) return null;

    return (
      <Wallet
        initialization={{ preferenceId: preferenceId }}
        onReady={handleReady}
      />
    );
  };

  const handleReady = () => {
    setIsReady(true);
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
