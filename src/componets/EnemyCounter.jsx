import React from "react";

const EnemyCounter = ({ enemiesKilled }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        color: "white",
        fontSize: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      Enemigos eliminados: {enemiesKilled}
    </div>
  );
};

export default EnemyCounter;
