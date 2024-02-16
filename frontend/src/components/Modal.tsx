import React, { useEffect, useState } from "react";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  redirectUrl?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  redirectUrl,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(3);

  useEffect(() => {
    if (isOpen) {
      const intervalId = setInterval(() => {
        setSecondsRemaining((prev) => Math.max(0, prev - 1));
        if (secondsRemaining === 0) {
          if (redirectUrl) {
            window.location.href = redirectUrl;
          }
          onClose();
          clearInterval(intervalId);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isOpen, onClose, redirectUrl, secondsRemaining]);
  return (
    <div className={`modal-view ${isOpen ? "active" : ""}`}>
      <div className="modal-cnt">
        <div className="modal-head">
          <h2>Redireccionando...</h2>
          <button onClick={onClose}>
            <img src="./img/close.png" alt="" />
          </button>
        </div>
        <div className="modal-b">
          <img src="./img/wiri.png" alt="wiri" />
          <div className="countdown">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
