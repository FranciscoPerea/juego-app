import React, { useState, useEffect } from "react";

const Fireball = ({ direction, position, onFireballEnd }) => {
  const [fireballPosition, setFireballPosition] = useState({
    x: position.x + 40,
    y: position.y + 40,
  });
  const [isActive, setIsActive] = useState(true);
  const [scale, setScale] = useState(1); // Escala dinámica para el efecto de crecimiento
  const [rotation, setRotation] = useState(0); // Ángulo de rotación
  const [opacity, setOpacity] = useState(1); // Opacidad dinámica

  useEffect(() => {
    const interval = setInterval(() => {
      setFireballPosition((prev) => {
        switch (direction) {
          case "up":
            return { x: prev.x, y: prev.y - 10 };
          case "down":
            return { x: prev.x, y: prev.y + 10 };
          case "left":
            return { x: prev.x - 10, y: prev.y };
          case "right":
            return { x: prev.x + 10, y: prev.y };
          default:
            return prev;
        }
      });

      // Actualizamos efectos visuales dinámicos
      setScale((prev) => Math.min(prev + 0.05, 1.5)); // Crece hasta un límite
      setOpacity((prev) => Math.max(prev - 0.02, 0)); // Se desvanece lentamente
      setRotation((prev) => prev + 10); // Rotación continua
    }, 50);

    return () => clearInterval(interval);
  }, [direction]);

  // Detectar si la bola de fuego se sale de los límites de la pantalla
  useEffect(() => {
    if (
      fireballPosition.x < 0 ||
      fireballPosition.x > window.innerWidth ||
      fireballPosition.y < 0 ||
      fireballPosition.y > window.innerHeight
    ) {
      setIsActive(false);
      onFireballEnd(); // Notificamos que terminó
    }
  }, [fireballPosition, onFireballEnd]);

  const fireballStyle = {
    position: "absolute",
    top: fireballPosition.y,
    left: fireballPosition.x,
    width: `${20 * scale}px`, // Tamaño ajustable con el "crecimiento"
    height: `${20 * scale}px`, // Tamaño ajustable con el "crecimiento"
    background: `radial-gradient(circle, rgba(255, 140, 0, 1) 0%, rgba(255, 69, 0, 0.8) 50%, rgba(255, 0, 0, 0.6) 100%)`, // Gradiente mágico
    borderRadius: "50%",
    opacity: opacity,
    transform: `rotate(${rotation}deg)`, // Efecto de rotación
    transition: "all 0.05s ease",
    boxShadow: `0 0 ${10 * scale}px rgba(255, 69, 0, 0.8), 0 0 ${20 * scale}px rgba(255, 140, 0, 0.6)`, // Resplandor mágico
  };

  return isActive ? <div style={fireballStyle} /> : null;
};

export default Fireball;
