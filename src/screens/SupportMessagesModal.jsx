import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CustomerDetailsModal.css";
import { BASE_URL } from "../API/API";
import SuccessModal from "./SuccessModal"; // Import the standalone SuccessModal

const SupportMessagesModal = ({ isOpen, onClose, customer }) => {
  const [customerDetails, setCustomerDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && customer) {
      const fetchCustomerDetails = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/getCustomerDetails/${customer.customerID}`
          );
          setCustomerDetails(response.data);
        } catch (err) {
          console.error("Error fetching customer details:", err);
          setError("Failed to load customer details. Please try again.");
        }
      };
      fetchCustomerDetails();
    }
  }, [isOpen, customer]);

  if (!isOpen || !customer) {
    return null;
  }

  return (
    <>
      <div className="custom-modal-overlay" onClick={onClose}>
        <div
          className="custom-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="custom-close-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
          <h2 className="customer-name">
            {customerDetails?.name || "Customer Details"}
          </h2>

          <div className="custom-profile-section">
            {customerDetails ? (
              <div className="customer-details" style={{ lineHeight: "1" }}>
                <p>
                  <strong>Full Name:</strong> {customerDetails.name}
                </p>
                <p>
                  <strong>Email:</strong> {customerDetails.email}
                </p>
                <p>
                  <strong>Phone:</strong> {customerDetails.phoneNumber}
                </p>
                <p>
                  <strong>Address:</strong> {customerDetails.address}
                </p>
                <p>
                  <strong>Registered On:</strong>{" "}
                  {new Date(customerDetails.registeredOn).toLocaleString()}
                </p>
                <p>
                  <strong>Verified:</strong>{" "}
                  {customerDetails.verified ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Last Login:</strong>{" "}
                  {new Date(customerDetails.lastLogin).toLocaleString()}
                </p>
                <p style={{ color: "blue" }}>
                  <strong>Message:</strong>
                  <br />
                  {customer.message}
                </p>
              </div>
            ) : (
              <p style={{ color: "red" }}>Error Loading customer details...</p>
            )}
          </div>

          {/* Improved Error Display */}
          {error && (
            <div className="error-message">
              <span role="img" aria-label="error">
                ❌
              </span>{" "}
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SupportMessagesModal;
