import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CustomerDetailsModal.css";
import { BASE_URL } from "../API/API";

const SupportMessagesModal = ({ isOpen, onClose, customer }) => {
  const [customerDetails, setCustomerDetails] = useState(null);

  useEffect(() => {
    if (isOpen && customer) {
      const fetchCustomerDetails = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/getCustomerDetails/${customer.customerID}`
          );
          setCustomerDetails(response.data);
        } catch (error) {
          console.error("Error fetching customer details:", error);
        }
      };
      fetchCustomerDetails();
    }
  }, [isOpen, customer]);

  if (!isOpen || !customer) {
    return null;
  }

  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      <div
        className="custom-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="custom-close-button" onClick={onClose}>
          X
        </button>
        <div className="top-left-section">
          <button className="action-button blue-button">Overview</button>
          
        </div>
        <div className="custom-profile-section">
          {customerDetails ? (
            <>
              <h2 className="customer-name blue-text">
                {customerDetails.name}
              </h2>
              <div className="customer-details">
                <p>
                  <strong>Fullname(s):</strong> {customerDetails.name}
                </p>
                <p>
                  <strong>Email Address:</strong> {customerDetails.email}
                </p>
                <p>
                  <strong>Phone Number:</strong> {customerDetails.phoneNumber}
                </p>
                <p>
                  <strong>Physical Address:</strong> {customerDetails.address}
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
                <p>
                  <strong>Message:</strong> {customer.message}
                </p>
              </div>
            </>
          ) : (
            <p>Loading customer details...</p>
          )}
        </div>

        <div className="action-button-section">
          <button className="action-button resolve">Resolve</button>
          <button className="action-button important">
            Mark as Important
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportMessagesModal;
