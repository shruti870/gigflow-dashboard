import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            padding: "16px",
            fontWeight: "500",
          },
        }}
      />

      <App />
    </BrowserRouter>
  </React.StrictMode>
);