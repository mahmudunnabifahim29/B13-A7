import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { KeenKeeperProvider } from "./context/KeenKeeperContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <KeenKeeperProvider>
      <HashRouter>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2600,
            style: {
              borderRadius: "12px",
              border: "1px solid #d5dde4",
              padding: "10px 14px",
              color: "#1f2937",
              background: "#ffffff"
            }
          }}
        />
      </HashRouter>
    </KeenKeeperProvider>
  </React.StrictMode>
);
