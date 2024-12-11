import React, { useEffect, useState } from "react";
import enemySprite from "../sprites/enemy.png";

const Enemy = ({ wizardPosition, position: initialPosition, onEnemyOffScreen, onEnemyDefeated }) => {
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    const interval = setInterval(() => {
      const dx = wizardPosition.x - position.x;
      const dy = wizardPosition.y - position.y;
      const angle = Math.atan2(dy, dx);
      const speed = 1.5;

      setPosition((prev) => ({
        x: prev.x + Math.cos(angle) * speed,
        y: prev.y + Math.sin(angle) * speed,
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [wizardPosition, position]);

  useEffect(() => {
    const dx = wizardPosition.x - position.x;
    const dy = wizardPosition.y - position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 40) {
      onEnemyDefeated();
      onEnemyOffScreen();
    }
  }, [wizardPosition, position, onEnemyOffScreen, onEnemyDefeated]);

  return (
    <div
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        width: "80px",
        height: "80px",
        backgroundImage: `url(${enemySprite})`,
        backgroundSize: "cover",
      }}
    ></div>
  );
};

export default Enemy;
