import React, { useState, useEffect } from "react";
import socket from "../socketConfig";
import { useHistory } from "react-router-dom";

const JoinGame = (props) => {
  let history = useHistory();
  const [userInput, setUserInput] = useState({ gameID: "", nickName: "" });
  const [shown, setShown] = useState(false);
  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(userInput);
    socket.emit("join-game", userInput);
  };
useEffect(() => {
    socket.on("no-game", (errorMessage) => {
        if(!shown){
            setShown(true);
            alert("No game found, try again.");
            setUserInput({gameID: "",nickName: ""});
        }
      });
}, []);
//   socket.on("no-game", (errorMessage) => {
//     if(!shown){
//         setShown(true);
//         alert(":(");
//     }
//   });

  return (
    <div className="row">
      <div className="col-sm"></div>
      <div className="col-sm-8">
        <div className="card border border-dark mt-5">
          <div className="card-body">
            <h1 className="text-center">JOIN GAME</h1>
            <br />
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="gameID" className="form-label">
                  Game ID
                </label>
                <input
                  type="text"
                  name="gameID"
                  value={userInput.gameID}
                  onChange={onChange}
                  placeholder="Enter Game ID"
                  className="form-control"
                  style={{ maxWidth: "350px" }} // Adjust the width
                />
              </div>
              <div className="form-group">
                <label htmlFor="nickName" className="form-label">
                  Nick Name
                </label>
                <input
                  type="text"
                  name="nickName"
                  value={userInput.nickName}
                  onChange={onChange}
                  placeholder="Enter Nick Name"
                  className="form-control"
                  style={{ maxWidth: "350px" }} // Adjust the width
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                onClick={() => {
                  history.push("/");
                }}
                className="btn btn-secondary ml-2"
              >
                Leave Lobby
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-sm"></div>
    </div>
  );
};

export default JoinGame;
