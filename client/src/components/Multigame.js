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
    // Handle the error message received from the server
    history.push("/");
  //  window.alert("No game found! Try again later");
    // Your custom code to display an error message to the user
  });
  //   socket.on("startGame", ({ lobby }) => {
  //     setGameStarted(true);
  //     console.log("Game started with lobby:", lobby);
  //   });
  return (
    <div>
      <h1>Typeracer Lobby</h1>
      {gameStarted ? (
        <div>Game Started!</div>
      ) : (
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
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
          <button onClick={handleJoinLobby} disabled={!difficulty}>
            Join Lobby
          </button>
          <button
            onClick={() => {
              history.push("/");
            }}
          >
            Leave Lobby
          </button>
        </div>
      )}
    </div>
  );
}

export default Multigame;
