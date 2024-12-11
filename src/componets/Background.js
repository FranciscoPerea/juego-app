import React from "react";
import backgroundImage from "../assets/dark-ruins.png";

const Background = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1, // Mantiene el fondo detrás de otros elementos
      }}
    ></div>
  );
};

export default Background;
