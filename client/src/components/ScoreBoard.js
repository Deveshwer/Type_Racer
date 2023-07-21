import React from 'react';

const getScoreboard = (players)=>{
    const scoreBoard = players.filter(player => player.WPM !== -1);
    return scoreBoard.sort((a,b)=> a.WPM > b.WPM ? -1 : b.WPM > a.WPM ? 1 : 0);
}

const ScoreBoard = ({players})=>{
    const scoreBoard = getScoreboard(players);
    if(scoreBoard.length === 0)
        return null;
    return (
        <table className="table table-striped my-3">
            <thead>
                <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">User</th>
                    <th scope="col">WPM</th>
                    <th scope="col">Time taken</th>
                </tr>
            </thead>
            <tbody>
                {
                    scoreBoard.map((player,index)=>{
                        return <tr keyey={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{player.nickName}</td>
                                    <td>{player.WPM}</td>
                                    <td>{player.te}</td>
                               </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default ScoreBoard;