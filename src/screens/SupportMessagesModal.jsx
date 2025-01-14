import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CustomerDetailsModal.css";
import { BASE_URL } from "../API/API";
import SuccessModal from "./SuccessModal"; // Import the standalone SuccessModal

const SupportMessagesModal = ({ isOpen, onClose, customer }) => {
  const [customerDetails, setCustomerDetails] = useState(null);
  const [isResolving, setIsResolving] = useState(false);
  const [adminResponse, setAdminResponse] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  const handleResolveClick = () => {
    setIsResolving(true);
  };

  const handleResponseChange = (e) => {
    setAdminResponse(e.target.value);
  };

  const handleSubmitResponse = () => {
    console.log("Admin Response Submitted:", adminResponse);
    setIsResolving(false);
    setShowSuccessModal(true); // Show success modal on submission
  };

  const handleViewMessage = () => {
    setIsResolving(false); // Return to the original message view
  };

  return (
    <>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message="Message sent and notification pushed successfully!"
      />

      <div className="custom-modal-overlay" onClick={onClose}>
        <div
          className="custom-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="custom-close-button" onClick={onClose}>
            &times;
          </button>
          <h2 className="customer-name">{customerDetails?.name || "Customer Details"}</h2>

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
                {isResolving ? (
                  <div>
                    <label style={{ color: "blue" }}>
                      <strong>Write Response:</strong>
                    </label>
                    <textarea
                      value={adminResponse}
                      onChange={handleResponseChange}
                      placeholder="Type your response here..."
                      rows="4"
                      style={{ width: "100%", marginTop: "10px" }}
                    ></textarea>
                    <button
                      onClick={handleSubmitResponse}
                      className="action-button submit"
                      style={{ marginTop: "10px" }}
                    >
                      Submit Response
                    </button>
                    <button
                      onClick={handleViewMessage}
                      className="action-button view-message"
                      style={{
                        backgroundColor: "lightgreen",
                        marginTop: "10px",
                        marginLeft: "10px",
                      }}
                    >
                      View Message
                    </button>
                  </div>
                ) : (
                  <p style={{ color: "blue" }}>
                    <strong>Message:</strong>
                    <br />
                    {customer.message}
                  </p>
                )}
              </div>
            ) : (
              <p>Loading customer details...</p>
            )}
          </div>

          {!isResolving && (
            <div className="action-button-section">
              <button
                className="action-button resolve"
                onClick={handleResolveClick}
              >
                Resolve
              </button>
              <button className="action-button important">Mark as Important</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SupportMessagesModal;
