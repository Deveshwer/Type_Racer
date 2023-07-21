import React from "react";
import { useHistory } from "react-router-dom";

const GameMenu = (props) => {
  let history = useHistory();

  return (
    <div
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1574192324001-ee41e18ed679?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
      }}
    >
      <nav className="navbar navbar-expand-lg mx-3">
        <div className="container-fluid">
          <h1 className="navbar-brand">
            <img
              src="https://png.pngtree.com/png-vector/20191011/ourmid/pngtree-keyboard-icon-png-image_1818176.jpg"
              alt="Logo"
              width="38"
              height="30"
              className="d-inline-block align-text-top mr-2"
            />
            Type Racer
          </h1>
        </div>
      </nav>

      <div
        className="card float-start m-5"
        style={{ width: "31%", border: "0.8px solid #333", padding: "1rem", borderRadius: "1rem"}}
      >
        <div className="card-body">
          <h1 className="my-5">Welcome to Type Racer</h1>
          <button
            type="button"
            onClick={() => history.push("/game/create")}
            className="btn btn-secondary btn-lg mr-5"
            style={{ cursor: "pointer" }}
          >
            Create a new game
          </button>
          <button
            type="button"
            onClick={() => history.push("/game/join")}
            className="btn btn-dark btn-lg"
          >
            Join using code
          </button>
          <br />
          <button
            type="button"
            onClick={() => history.push("/game/multi")}
            className="btn btn-dark btn-lg mt-5 mr-5"
            style={{ cursor: "pointer" }}
          >
            Join using difficulty
          </button>
          <button
            type="button"
            onClick={() => history.push("/game/practice")}
            className="btn btn-secondary btn-lg mt-5"
            style={{ cursor: "pointer" }}
          >
            Practice Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameMenu;