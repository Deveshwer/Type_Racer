import React from "react";
import { useHistory } from "react-router-dom";

const GameMenu = (props) => {
  const history = useHistory();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card">
            <div className="card-body text-center">
              <h1 className="mb-4">Welcome to Type Racer</h1>
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  onClick={() => history.push("/game/create")}
                  className="btn btn-primary btn-lg mr-3"
                >
                  Create a new game
                </button>
                <button
                  type="button"
                  onClick={() => history.push("/game/join")}
                  className="btn btn-danger btn-lg"
                >
                  Join using code
                </button>
              </div>
              <div className="mt-4 d-flex justify-content-between">
                <button
                  type="button"
                  onClick={() => history.push("/game/multi")}
                  className="btn btn-primary btn-lg mr-3"
                >
                  Join using difficulty
                </button>
                <button
                  type="button"
                  onClick={() => history.push("/game/practice")}
                  className="btn btn-primary btn-lg"
                >
                  Practice Game
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameMenu;