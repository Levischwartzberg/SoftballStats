import API from "../utils/API";
import React, { useEffect, useState } from 'react';

function PlayerGameLog(props) {
    const [games, setGames] = useState([]);
    useEffect(() => {
        loadGames();
    }, [])

    function loadGames() {
        API.getGamesByPlayer(props.playerId)
            .then((res) => {
                let gameArray = res.data;
                return gameArray;
            })
            .then((gameArray) => setGames(gameArray))
            .catch((err) => console.log(err));
    }
    
    return (
        <div>
            <h3>Game Log</h3>
            <table>
                <tbody>
                   <tr>
                       <th>Game</th>
                       <th>AB</th>
                       <th>Hits</th>
                       <th>1B</th>
                       <th>2B</th>
                       <th>3B</th>
                       <th>HR</th>
                       <th>BB</th>
                       <th>R</th>
                       <th>RBI</th>
                       <th>AVG</th>
                       <th>OBP</th>
                       <th>SLG</th>
                       <th>OPS</th>
                   </tr>
                   {games.map((game) => (
                        <tr>
                            <td>{game.gameId}</td>
                            <td>{game.atBats}</td>
                            <td>{game.hits}</td>
                            <td>{game.singles}</td>
                            <td>{game.doubles}</td>
                            <td>{game.triples}</td>
                            <td>{game.homeruns}</td>
                            <td>{game.walks}</td>
                            <td>{game.runs}</td>
                            <td>{game.rbi}</td>
                            <td>{game.avg}</td>
                            <td>{game.obp}</td>
                            <td>{game.slg}</td>
                            <td>{game.ops}</td>
                        </tr>
                   ))}
                </tbody>
            </table>
        </div>
    )
}

export default PlayerGameLog;