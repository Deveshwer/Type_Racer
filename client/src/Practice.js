import React, { useState } from "react";
import socket from "./socketConfig";

function Practice() {
  const [difficulty, setDifficulty] = useState("");
  
  const beginRound = () => {
    socket.emit("practice-game", { nickName: "Guest", difficulty });
  };
  
  return (
    <div className="container">
      <h1 className="mb-4">PRACTICE</h1>
      <div className="form-group">
        <label htmlFor="difficultySelect">Select Difficulty:</label>
        <select
          className="form-control"
          id="difficultySelect"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          required
        >
          <option value="">-- Choose Difficulty --</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button 
        className="btn btn-primary" 
        onClick={beginRound} 
        disabled={!difficulty}
      >
        Start the game
      </button>
    </div>
  );
}

export default Practice;