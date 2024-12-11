import React, { useState, useEffect } from "react";
import mageFront from "../sprites/mage-front.png";
import Fireball from "./Fireball";
import Enemy from "./Enemy";
import Shield from "./Shield";
import EnemyCounter from "./EnemyCounter";
import backgroundImage from "../sprites/fondo..webp"; // Importa la imagen del fondo

const Wizard = () => {
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [direction, setDirection] = useState("front");
  const [fireballs, setFireballs] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [enemiesKilled, setEnemiesKilled] = useState(0);
  const [shieldActive, setShieldActive] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" && position.y > 0) {
      setPosition((prev) => ({ ...prev, y: prev.y - 10 }));
      setDirection("up");
    } else if (e.key === "ArrowDown" && position.y < window.innerHeight - 80) {
      setPosition((prev) => ({ ...prev, y: prev.y + 10 }));
      setDirection("down");
    } else if (e.key === "ArrowLeft" && position.x > 0) {
      setPosition((prev) => ({ ...prev, x: prev.x - 10 }));
      setDirection("left");
    } else if (e.key === "ArrowRight" && position.x < window.innerWidth - 80) {
      setPosition((prev) => ({ ...prev, x: prev.x + 10 }));
      setDirection("right");
    } else if (e.key === "x") {
      setFireballs((prevFireballs) => [
        ...prevFireballs,
        { id: Date.now(), direction, position: { ...position } },
      ]);
    } else if (e.key === "z") {
      setShieldActive(true);
      setTimeout(() => setShieldActive(false), 3000); // El escudo dura 3 segundos
    }
  };

  const handleEnemyOffScreen = (enemyIndex) => {
    setEnemies((prevEnemies) => prevEnemies.filter((_, i) => i !== enemyIndex));
  };

  const handleEnemyDefeated = () => {
    setEnemiesKilled((prevCount) => prevCount + 1);
  };

  const handleFireballEnd = (fireballIndex) => {
    setFireballs((prev) => prev.filter((_, i) => i !== fireballIndex));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Actualizar la posición de las bolas de fuego
      setFireballs((prevFireballs) =>
        prevFireballs.map((fireball) => {
          let newX = fireball.position.x;
          let newY = fireball.position.y;

          // Mover la bola de fuego según la dirección
          if (fireball.direction === "up") {
            newY -= 10;
          } else if (fireball.direction === "down") {
            newY += 10;
          } else if (fireball.direction === "left") {
            newX -= 10;
          } else if (fireball.direction === "right") {
            newX += 10;
          }

          return { ...fireball, position: { x: newX, y: newY } };
        })
      );

      // Filtrar enemigos golpeados por bolas de fuego
      setEnemies((prevEnemies) =>
        prevEnemies.filter((enemy, index) => {
          const isHit = fireballs.some((fireball) => {
            const dx = fireball.position.x - enemy.position.x;
            const dy = fireball.position.y - enemy.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < 60; // Ajusta la distancia para la colisión
          });

          if (isHit) {
            // Si la bola de fuego golpeó al enemigo, lo eliminamos inmediatamente
            handleEnemyDefeated(); // Aumenta el contador de enemigos derrotados
            return false; // Elimina al enemigo de la lista
          }

          return true; // Mantén al enemigo si no fue golpeado
        })
      );

      // Filtrar bolas de fuego fuera de la pantalla
      setFireballs((prevFireballs) =>
        prevFireballs.filter((fireball) => {
          const offScreen =
            fireball.position.x < 0 ||
            fireball.position.x > window.innerWidth ||
            fireball.position.y < 0 ||
            fireball.position.y > window.innerHeight;
          return !offScreen; // Elimina bolas de fuego fuera de pantalla
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [fireballs, enemies]);

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      setEnemies((prevEnemies) => [
        ...prevEnemies,
        {
          id: Date.now(),
          position: {
            x: Math.random() > 0.5 ? 0 : window.innerWidth - 100,
            y: Math.random() * window.innerHeight,
          },
        },
      ]);
    }, 8000); // Disminuir la frecuencia de aparición de los enemigos (aumentar el intervalo)

    return () => clearInterval(spawnInterval);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [position]);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Fondo */}
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
          zIndex: -1,
        }}
      ></div>

      {/* Mago */}
      <div
        style={{
          position: "absolute",
          top: position.y,
          left: position.x,
          width: "125px",
          height: "125px",
          backgroundImage: `url(${mageFront})`,
          backgroundSize: "cover",
        }}
      />
      {shieldActive && <Shield position={position} />}
      {fireballs.map((fireball, index) => (
        <Fireball
          key={fireball.id}
          direction={fireball.direction}
          position={fireball.position}
          onFireballEnd={() => handleFireballEnd(index)}
        />
      ))}
      {enemies.map((enemy, index) => (
        <Enemy
          key={enemy.id}
          wizardPosition={position}
          position={enemy.position}
          onEnemyOffScreen={() => handleEnemyOffScreen(index)}
          onEnemyDefeated={handleEnemyDefeated}
        />
      ))}
      <EnemyCounter enemiesKilled={enemiesKilled} />
    </div>
  );
};

export default Wizard;
