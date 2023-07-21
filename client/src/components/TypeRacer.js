import React from "react";
import { Redirect } from "react-router-dom";
import CountDown from "./CountDown";
import StartBtn from "./StartBtn";
import socket from "../socketConfig";
import DisplayWords from "./DisplayWords";
import Form from "./Form";
import ProgressBar from "./ProgressBar";
import ScoreBoard from "./ScoreBoard";
import DisplayGameCode from "./DisplayGameCode";
import history from "../history";
import {useState} from 'react'
import buttonContext from './ButtonContext'

const findPlayer = (players) => {
  return players.find((player) => player.socketID === socket.id);
};

const TypeRacer = ({ gameState }) => {
    const [buttonState,setButtonState ] = useState(false);
  const { _id, players, words, isOpen, isOver, mode } = gameState;
  const player = findPlayer(players);
  if (_id === "") return <Redirect to="/" />;
  return (
    <div className="text-center">
      <DisplayWords words={words} player={player} />
      <br />
      <br />
      <br />
      <h3>{player.nickName}</h3>
      <ProgressBar
        players={players}
        player={player}
        wordsLength={words.length}
      />
      <br />
      <Form isOpen={isOpen} isOver={isOver} gameID={_id} />
      <CountDown />
      <buttonContext.Provider value={setButtonState}>
        <StartBtn player={player} gameID={_id} />
      </buttonContext.Provider>

      {isOpen && mode === "invite" ? <DisplayGameCode gameID={_id} /> : null}
      <ScoreBoard players={players} />
      {(buttonState || !isOpen) && <button onClick={() => history.push("/")}>Exit</button>}
    </div>
  );
};

export default TypeRacer;