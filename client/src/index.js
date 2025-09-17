import React from "react";
import ReactDOM from "react-dom/client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <PayPalScriptProvider
    options={{
      "client-id":
        "AQGE4hEVXuAyRU9dx_IlPC_AT3YBzNHd5dVMQF4Prm2sEklR_ELF9AZ59DiyXHv9M3hbLiLhuoomz_24",
      currency: "USD",
    }}
  >
    <App />
  </PayPalScriptProvider>
);

