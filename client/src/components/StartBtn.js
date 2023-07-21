import React, { useState } from "react";
import socket from "../socketConfig";
import { useContext } from "react";
import buttonContext from "./ButtonContext";

const StartBtn = ({ player, gameID }) => {
  const  setButtonState = useContext(buttonContext);
  console.log(setButtonState);
  const [showBtn, setShowBtn] = useState(true);
  const { isPartyLeader } = player;

  const onClickHandler = (e) => {
    setButtonState(true);
    socket.emit("timer", { playerID: player._id, gameID });
    setShowBtn(false);
  };

  return isPartyLeader && showBtn ? (
    <button
      type="button"
      onClick={onClickHandler}
      className="btn btn-primary"
      style={{ cursor: "pointer" }}
    >
      Start Game
    </button>
  ) : null;
};

export default StartBtn;
