import React, { useState } from "react";
import socket from "../socketConfig";
import { useHistory } from "react-router-dom";

function Multigame() {
  let history = useHistory();
  const [nickName, setNickName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const handleJoinLobby = () => {
    socket.emit("joinLobby", { difficulty, nickName });
  };
  socket.on("joinLobbyError", (errorMessage) => {
    socket.emit("create-game", {nickName, difficulty});
  });
  
  return (
    <div className="container">
      <div className="card border border-dark mt-5 p-4">
        <h1 className="text-center">Join Typeracer Lobby</h1>
        {gameStarted ? (
          <div className="text-center mt-3">Game Started!</div>
        ) : (
          <div className="mt-4">
            <div className="form-group">
              <label>Name: </label>
              <input
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                className="form-control"
                style={{ maxWidth: '350px' }}
              />
            </div>
            <div className="form-group">
              <label>Difficulty:</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="form-control"
                style={{ maxWidth: '350px' }}
              >
                <option value="">-- Choose Difficulty --</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <br />
            <button
              onClick={handleJoinLobby}
              disabled={!difficulty}
              className="btn btn-primary mr-3"
            >
              Join Lobby
            </button>
            <button
              onClick={() => {
                history.push("/");
              }}
              className="btn btn-secondary"
            >
              Leave Lobby
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Multigame;