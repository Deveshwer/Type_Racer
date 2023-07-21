const express = require("express");
const app = express();
const socketio = require("socket.io");
const mongoose = require("mongoose");
const url = require("url");

const expressServer = app.listen(3001);
const io = socketio(expressServer);

const Game = require("./Models/Game");
const QuotableAPI = require("./QuotableAPI");
const { exit } = require("process");

mongoose.connect(
  "mongodb+srv://suraj:j9dr8ecLqwgW5epK@selab.n0utwej.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("successfully connected to database");
  }
);

IDs = {};

// mongoose.connect('mongodb://localhost:27017/typeracerTutorial',
//                  {useNewUrlParser : true, useUnifiedTopology : true, socketTimeoutMS: 30000},
//                  ()=>{ console.log('successfully connected to database')});

io.on("connect", (socket) => {
  socket.on("userInput", async ({ userInput, gameID }) => {
    try {
      // find the game
      let game = await Game.findById(gameID);
      // if game has started and game isn't over
      if (!game.isOpen && !game.isOver) {
        // get player making the request
        let player = game.players.find(
          (player) => player.socketID === socket.id
        );
        // get current word the user has to type
        let word = game.words[player.currentWordIndex];
        // if player typed word correctly
        if (word === userInput) {
          // advance player to next word
          player.currentWordIndex++;

          let curtime = new Date().getTime();

          let { startTime } = game;
          //   calculate Words Per Minute
          player.WPM = calculateWPM(curtime, startTime, player);
          // if user hasn't finished typing the sentence
          if (player.currentWordIndex !== game.words.length) {
            // save the game
            game = await game.save();
            // send updated game to all sockets within game
            io.to(gameID).emit("updateGame", game);
          }
          // player is done typing sentence
          else {
            // get timestamp of when the user finished
            let endTime = new Date().getTime();
            // get timestamp of when the game started
            let { startTime } = game;
            // calculate Words Per Minute
            player.WPM = calculateWPM(endTime, startTime, player);

            player.te = elapsedtime(endTime, startTime);
            // save game
            game = await game.save();
            // stops timer for that player
            socket.emit("done1");
            // send updated game to all sockets within game
            io.to(gameID).emit("updateGame", game);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("timer", async ({ gameID, playerID }) => {
    // time in seconds
    let countDown = 5;
    // find game
    let game = await Game.findById(gameID);
    // find player who made request
    let player = game.players.id(playerID);
    // check if player has permission to start game
    if (player.isPartyLeader) {
      // start time countdown
      let timerID = setInterval(async () => {
        // keep counting down until we hit 0
        if (countDown >= 0) {
          // emit countDown to all players within game
          game.isOpen = false;
          io.to(gameID).emit("timer", { countDown, msg: "Starting Game" });
          countDown--;
        }
        // start time clock over, now time to start game
        else {
          // close game so no one else can join
          game.isOpen = false;
          // save the game
          game = await game.save();
          // send updated game to all sockets within game
          io.to(gameID).emit("updateGame", game);
          // start game clock
          startGameClock(gameID);
          clearInterval(timerID);
        }
      }, 1000);
    }
  });

  socket.on("join-game", async ({ gameID: _id, nickName }) => {
    try {
      // get game
      // let game = await Game.findById(_id);
      let game = await Game.find({ _id: _id, active: { $lt: 5 } });
      // check if game is allowing users to join
      if (game.length && game[0].isOpen) {
        // make players socket join the game room
        const gameID = game[0]._id.toString();
        clearInterval(IDs[gameID]);
        socket.join(gameID);
        // create our player
        let player = {
          socketID: socket.id,
          nickName,
          te: 0,
        };
        game[0].active += 1;
        // add player to the game
        game[0].players.push(player);
        // save the game
        game = await game[0].save();
        // send updated game to all sockets within game
        io.to(gameID).emit("updateGame", game);
      } else {
        socket.emit("no-game", "Room full, try again later.");
      }
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("joinLobby", async ({ difficulty, nickName }) => {
    let game = await Game.find({
      difficulty: difficulty,
      isOpen: true,
      isOver: false,
      mode: { $ne: "practice" },
      active: { $lt: 5 },
    });

    //   console.log(game[0].isOpen);
    if (game.length) {
      const gameID = game[0]._id.toString();
      clearInterval(IDs[gameID]);
      socket.join(gameID);
      // create our player
      let player = {
        socketID: socket.id,
        nickName,
        te: 0,
      };
      // add player to the game
      game[0].players.push(player);
      game[0].active += 1;

      // save the game
      game = await game[0].save();
      // send updated game to all sockets within game
      io.to(gameID).emit("updateGame", game);
    } else if (!game.length) {
      socket.emit(
        "joinLobbyError",
        "An error occurred while trying to join the lobby."
      );
    }
  });
  // socket.on("joinLobby", async ({ difficulty, nickName }) => {
  //     const joinLobbyWithInterval = async (totalTime, currentTime) => {
  //       if (currentTime >= totalTime) {
  //         socket.emit(
  //           "joinLobbyError",
  //           "An error occurred while trying to join the lobby after multiple attempts."
  //         );
  //         return;
  //       }

  //       let game = await Game.find({ difficulty: difficulty, isOpen: true });

  //       if (game.length) {
  //         const gameID = game[0]._id.toString();
  //         socket.join(gameID);

  //         // create our player
  //         let player = {
  //           socketID: socket.id,
  //           nickName,
  //         };
  //         // add player to the game
  //         game[0].players.push(player);
  //         // save the game
  //         game = await game[0].save();
  //         // send updated game to all sockets within game
  //         io.to(gameID).emit("updateGame", game);
  //       } else {
  //         // Wait for a random interval between 1 and 5 seconds before the next attempt
  //         const interval = Math.floor(Math.random() * 5000) + 1000;
  //         setTimeout(() => {
  //           joinLobbyWithInterval(totalTime, currentTime + interval);
  //         }, interval);
  //       }
  //     };

  //     const totalTime = 5000; // Total time in milliseconds (5 seconds)
  //     joinLobbyWithInterval(totalTime, 0); // Start the recursive function with currentTime as 0
  //   });

  socket.on("create-game", async ({ nickName, difficulty }) => {
    try {
      // get words that our users have to type out
      // console.log("create game connected");
      const quotableData = await QuotableAPI(difficulty);
      //   console.log(difficulty);
      // create game
      let game = new Game();

     // await Game.deleteMany({});
      // set words
      game.words = quotableData;
      game.mode = "invite";
      game.active = 1;
      game.difficulty = difficulty;
      // create player
      let player = {
        socketID: socket.id,
        isPartyLeader: true,
        nickName,
        te: 0,
      };
      // console.log(player.socketID);
      // add player
      game.players.push(player);
      // save the game
      game = await game.save();
      // make players socket join the game room
      const gameID = game._id.toString();
      clearInterval(IDs[gameID]);
      socket.join(gameID);
      // send updated game to all sockets within game
      io.to(gameID).emit("updateGame", game);
    } catch (err) {
      console.log("This is the error", err);
    }
  });

  // socket.on("WPM-count", async ({game}) => {
  //   try {
  //     console.log(game._id);
  //     game = await game.save();
  //   } catch (err) {
  //     console.err("Error!");
  //   }
  // });

  socket.on("remove-user", async ({ gameID, socketID }) => {
    let game = await Game.findById(gameID);
    socket.emit("done");
    io.to(gameID).emit("updateGame", game);
    game.active -= 1;
    console.log(game.players.length);
    for (let i = 0; i < game.players.length; i += 1) {
      if (game.players[i].socketID === socketID) {
        game.players.splice(i, 1);
        break;
      }
    }
    console.log(game.players.length);
    game = await game.save();
    if (!game.active) {
      clearInterval(IDs[gameID]);
    }
  });

  socket.on("practice-game", async ({ nickName, difficulty }) => {
    try {
      // get words that our users have to type out
      // console.log("create game connected");
      const quotableData = await QuotableAPI(difficulty);
      //   console.log(difficulty);
      // create game
      let game = new Game();
      // set words
      game.words = quotableData;
      game.mode = "practice";
      game.difficulty = difficulty;
      //   game.active = 1;
      // create player
      let player = {
        socketID: socket.id,
        isPartyLeader: true,
        nickName,
        te: 0,
      };
      // console.log(player.socketID);
      // add player
      game.players.push(player);
      // save the game
      game = await game.save();
      // make players socket join the game room
      const gameID = game._id.toString();
      socket.join(gameID);
      // send updated game to all sockets within game
      io.to(gameID).emit("updateGame", game);
    } catch (err) {
      console.log("This is the error", err);
    }
  });
});

// const startGameClock = async (gameID) => {
//   // get the game
//   let game = await Game.findById(gameID);
//   // get time stamp of when the game started
//   game.startTime = new Date().getTime();
//   // save teh game
//   game = await game.save();
//   // time is in seconds
//   let time = 120;
//   // Start the Game Clock
//   let timerID = setInterval(
//     (function gameIntervalFunc() {
//       // keep countdown going
//       if (time >= 0) {
//         const formatTime = calculateTime(time);
//         io.to(gameID).emit("timer", {
//           countDown: formatTime,
//           msg: "Time Remaining",
//         });
//         time--;
//       }
//       // game clock has run out, game is over
//       else {
//         (async () => {
//           // get time stamp of when the game ended
//           let endTime = new Date().getTime();
//           // find the game
//           let game = await Game.findById(gameID);
//           // get the game start time
//           let { startTime } = game;
//           // game is officially over
//           game.isOver = true;
//           // calculate all players WPM who haven't finished typing out sentence
//           game.players.forEach((player, index) => {
//             if (player.WPM === -1)
//               game.players[index].WPM = calculateWPM(
//                 endTime,
//                 startTime,
//                 player
//               );
//           });
//           // save the game
//           game = await game.save();
//           // send updated game to all sockets within game
//           io.to(gameID).emit("updateGame", game);
//           clearInterval(timerID);
//         })();
//       }
//       return gameIntervalFunc;
//     })(),
//     1000
//   );
// };

const startGameClock = async (gameID) => {
  // get the game
  let game = await Game.findById(gameID);
  // get time stamp of when the game started
  game.startTime = new Date().getTime();
  // save teh game
  game = await game.save();
  // time is in seconds
  let time = 120;
  let val = time;
  // Start the Game Clock
  let timerID = setInterval(
    (function gameIntervalFunc() {
      // keep countdown going
      if (time >= 0) {
        // curTime = new Date().getTime();
        // game.players.forEach((player, index) => {
        //   player.WPM = calculateWPM(curTime, game.startTime, player);
        // });
        // io.to(gameID).emit("WPM-count", { game: game });
        const formatTime = calculateTime(time);
        io.to(gameID).emit("timer", {
          countDown: formatTime,
          msg: "Time Remaining",
        });
        time--;
      }
      // game clock has run out, game is over
      else {
        (async () => {
          // get time stamp of when the game ended
          let endTime = new Date().getTime();
          // find the game
          let game = await Game.findById(gameID);
          // get the game start time
          let { startTime } = game;
          // game is officially over
          game.isOver = true;
          // calculate all players WPM who haven't finished typing out sentence
          game.players.forEach((player, index) => {
            if (player.WPM === -1)
              game.players[index].WPM = calculateWPM(
                endTime,
                startTime,
                player
              );
            console.log(player.te);
            if (player.te === 0) player.te = val;
          });

          // save the game
          game = await game.save();
          // send updated game to all sockets within game
          io.to(gameID).emit("updateGame", game);
          clearInterval(timerID);
        })();
      }
      return gameIntervalFunc;
    })(),
    1000
  );
  IDs[gameID] = timerID;
  console.log(timerID);
};

// time is in seconds
// convert it into minutes and seconds
const calculateTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

const calculateWPM = (endTime, startTime, player) => {
  let numOfWords = player.currentWordIndex;
  const timeInSeconds = (endTime - startTime) / 1000;
  const timeInMinutes = timeInSeconds / 60;
  const WPM = Math.floor(numOfWords / timeInMinutes);
  return WPM;
};

const elapsedtime = (endTime, startTime) => {
  const te = (endTime - startTime) / 1000;
  return te;
};
