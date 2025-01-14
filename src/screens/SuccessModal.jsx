import React from "react";
import "./SuccessModal.css";

const SuccessModal = ({ isOpen, onClose, message = "Operation successful!" }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="success-modal-overlay" onClick={onClose}>
      <div className="success-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="line"></div>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        <div className="modal-header">

        <h3>{message}</h3>
        </div>
        <button onClick={onClose} className="action-button success">
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
