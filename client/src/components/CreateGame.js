import React, { useState } from "react";
import socket from "../socketConfig";

const CreateGame = (props) => {
  const [nickName, setNickName] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const onChange = (e) => {
    setNickName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(difficulty);
    socket.emit("create-game", { nickName, difficulty });
  };

  return (
    <div className="container my-5"> {/* Add spacing to the card */}
      <div className="card border border-dark d-flex justify-content-center"> {/* Remove p-3 class */}
        <h1 className="card-header text-center">Create Game</h1> {/* Use card-header class */}
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="nickName">Nick Name</label>
              <input
                type="text"
                name="nickName"
                value={nickName}
                onChange={onChange}
                placeholder="Enter Nick Name"
                className="form-control"
                style={{ maxWidth: '350px' }}
                required 
              />
              <br />
              <div className="form-group">
              <label>Difficulty:</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="form-control"
                style={{ maxWidth: '350px' }}
                required
              >
                <option value="">-- Choose Difficulty --</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => setDifficulty("easy")}
                    >
                      Easy
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => setDifficulty("medium")}
                    >
                      Medium
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => setDifficulty("hard")}
                    >
                      Hard
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="btn justify-content-center w-100">
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ maxWidth: '200px', cursor: "pointer"}}  // w-100 to make it full-width
            >
              Submit
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGame;