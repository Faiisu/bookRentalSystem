import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import App from "./App";
import "./index.css"; // Import Tailwind styles



ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BrowserRouter>
        <vinci make this></vinci>
        <App />
      </BrowserRouter>
    </StrictMode>
);