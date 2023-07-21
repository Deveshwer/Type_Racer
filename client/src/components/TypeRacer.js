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

async function handleExit(gameID, socketID){
    socket.emit('remove-user', {gameID, socketID});
    history.push('/');
    window.location.reload();
}
const TypeRacer = ({ gameState }) => {
    const [buttonState,setButtonState ] = useState(false);
  const { _id, players, words, isOpen, isOver, mode } = gameState;
  const player = findPlayer(players);
  if (_id === "") return <Redirect to="/" />;
  return (
    <div className="text-center container">
      <DisplayWords words={words} player={player} />
      <br />
      <br />
      <br />
      / <h3>{player.nickName}</h3> 
      <ProgressBar
        players={players}
        player={player}
        wordsLength={words.length}
      />
      <p>{player.nickName}'s Words Per Minute:  {player.WPM === -1 ? 0 : player.WPM}</p>
      <br />
      <Form isOpen={isOpen} isOver={isOver} gameID={_id} />
      <CountDown />
      <buttonContext.Provider value={setButtonState}>
        <StartBtn player={player} gameID={_id} />
      </buttonContext.Provider>

      {isOpen && mode === "invite" ? <DisplayGameCode gameID={_id} /> : null}
      <ScoreBoard players={players} />
      {(buttonState || !isOpen) && <button onClick={() => handleExit(_id, player.socketID)} className="btn btn-danger">Exit</button>}
    </div>
  );
};

export default TypeRacer;