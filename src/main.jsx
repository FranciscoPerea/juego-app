import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Importamos el componente principal
import './style.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App /> {/* Renderizamos la aplicación */}
  </React.StrictMode>
);
