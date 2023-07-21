import React, { useState } from "react";
import socket from "./socketConfig";

function Practice() {
  const [difficulty, setDifficulty] = useState("");
  const beginRound = () => {
    socket.emit("practice-game", { nickName: "Guest", difficulty });
  };
  return (
    <div>
      <label>
        Select Difficulty:
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">-- Choose Difficulty --</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
      <button onClick={beginRound} disabled={!difficulty}>
        Start the game
      </button>
    </div>
  );
}

export default Practice;
