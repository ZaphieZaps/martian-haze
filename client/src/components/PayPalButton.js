// src/components/PayPalButton.js
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

const PayPalButton = () => {
  // State to hold the download link after successful payment
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState(null);

  // This function is called when the user clicks the PayPal button.
  const createOrder = (data, actions) => {
    // We'll call our server's /api/orders endpoint
    return fetch("/api/orders", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };

  // This function is called after the user approves the payment on PayPal's site.
  const onApprove = (data, actions) => {
    // We'll call our server's /api/orders/:orderID/capture endpoint
    return fetch(`/api/orders/${data.orderID}/capture`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((details) => {
        // Payment was successful!
        console.log("Payment successful!", details);
        // Set the download URL that our server sent back
        setDownloadUrl(details.downloadUrl);
      })
      .catch((err) => {
        console.error("Payment failed to capture:", err);
        setError("There was an error processing your payment. Please try again.");
      });
  };

  return (
    <div>
      {/* If there's an error, show it to the user */}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* If payment is successful, show the download link */}
      {downloadUrl ? (
        <div className="download-confirmation">
          <h3>Thank you for your purchase!</h3>
          <a href={downloadUrl} download>
            Click here to download your music
          </a>
        </div>
      ) : (
        // Otherwise, show the PayPal button
        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
      )}
    </div>
  );
};

export default PayPalButton;