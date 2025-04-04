import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route} from "react-router-dom"; 
import App from "./App";
import "./index.css"; // Import Tailwind styles



ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BrowserRouter>     
        <App />  
      </BrowserRouter>
    </StrictMode>
);