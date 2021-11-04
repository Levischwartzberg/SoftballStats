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
                // console.log(gameArray);
                return gameArray;
            })
            .then((gameArray) => setGames(gameArray))
            .catch((err) => console.log(err));
    }

    function roundRates(rate) {
        return (rate >= 1) ? Number.parseFloat(rate).toPrecision(4) : Number.parseFloat(rate).toPrecision(3);
    }
    function convertDateTime(dateTime) {
        return dateTime.split("T")[0] + " " + dateTime.split("T")[1].split(".")[0];
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
                            <td>{convertDateTime(game.result.date)}</td>
                            <td>{game.atBats}</td>
                            <td>{game.hits}</td>
                            <td>{game.singles}</td>
                            <td>{game.doubles}</td>
                            <td>{game.triples}</td>
                            <td>{game.homeruns}</td>
                            <td>{game.walks}</td>
                            <td>{game.runs}</td>
                            <td>{game.rbi}</td>
                            <td>{roundRates(game.avg)}</td>
                            <td>{roundRates(game.obp)}</td>
                            <td>{roundRates(game.slg)}</td>
                            <td>{roundRates(game.ops)}</td>
                        </tr>
                   ))}
                </tbody>
            </table>
        </div>
    )
}

export default PlayerGameLog;