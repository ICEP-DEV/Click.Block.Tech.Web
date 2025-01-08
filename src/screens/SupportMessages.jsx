import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./style.css";
import SupportMessagesModal from "./SupportMessagesModal.jsx";

const SupportMessages = ({ supportMessages }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewClick = (msg) => {
    setSelectedMessage(msg);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
    setIsModalOpen(false);
  };

  return (
    <div className="support-messages-section">
      <div className="support-messages-container">
        {supportMessages.map((msg, index) => (
          <div className="support-card" key={index}>
            <div className="support-card-header">
              <FaUserCircle className="support-card-icon" />
              <div>
                <h3 className="support-card-name">
                  {msg.initials} {msg.surname}
                </h3>
              </div>
            </div>
            <div className="support-card-body">
              <p>
                <strong>Full Name:</strong> {msg.fullName}
              </p>
              <p>
                <strong>Phone Number:</strong> {msg.phoneNumber}
              </p>
              <p>
                <strong>Email Address:</strong> {msg.email}
              </p>
              <p className="support-card-message">{msg.message}</p>
              <p className="support-card-status">
                <strong>Status:</strong> {msg.status}
              </p>
            </div>
            <div className="support-buttons">
              <button className="resolve-btn">Resolve</button>
              <button
                className="view-btn"
                onClick={() => handleViewClick(msg)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      <SupportMessagesModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        customer={selectedMessage}
      />
    </div>
  );
};

export default SupportMessages;
