import React, { useEffect, useState } from "react";

const Shield = ({ position }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: position.y - 10, // Ajusta hacia arriba
        left: position.x - 10, // Ajusta hacia la izquierda
        width: "145px", // Aumenta el tamaño para cubrir completamente al mago
        height: "145px",
        borderRadius: "50%",
        border: "4px solid rgba(0, 123, 255, 0.6)", // Borde más definido
        background: "rgba(0, 123, 255, 0.3)", // Efecto translúcido
        boxShadow: "0 0 20px rgba(0, 123, 255, 0.8)", // Resplandor mágico
        zIndex: -1, // Detrás del mago
      }}
    ></div>
  );
};

export default Shield;
