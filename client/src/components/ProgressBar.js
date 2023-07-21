import React from 'react';

const calculatePercentage = (player, wordsLength) => {
  if (player.currentWordIndex !== 0) {
    return ((player.currentWordIndex / wordsLength) * 100).toFixed(2) + "%";
  }
  return 0;
};

const ProgressBar = ({ player, players, wordsLength }) => {
  const percentage = calculatePercentage(player, wordsLength);

  return (
    <div>
      <div className="progress mb-3">
        <div
          className="progress-bar bg-info"
          role="progressbar"
          style={{ width: percentage }}
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {percentage}
        </div>
      </div>

      {players.map((playerObj) => {
        const percentage = calculatePercentage(playerObj, wordsLength);
        return playerObj._id !== player._id ? (
          <div key={playerObj._id}>
            <h5>{playerObj.nickName}</h5>
            <div className="progress mb-3">
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: percentage }}
                aria-valuenow={percentage}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {percentage}
              </div>
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default ProgressBar;