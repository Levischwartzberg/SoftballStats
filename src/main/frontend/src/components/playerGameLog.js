import API from "../utils/API";
import React, { useEffect, useState } from 'react';

function PlayerGameLog(props) {
    const [games, setGames] = useState([]);
    useEffect(() => {
        loadGames();
    }, [])

    function loadGames() {
        console.log(props.playerId);
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
            <h1>WHEP</h1>
            <table>
                <tbody>
                   <tr>
                       <th>AB</th>
                       <th>Hits</th>
                   </tr>
                   {games.map((game) => (
                        <tr>
                            <td>
                                {game.atBats}
                            </td>
                            <td>
                                {game.hits}
                            </td>
                        </tr>
                   ))}
                </tbody>
            </table>
        </div>
    )
}

export default PlayerGameLog;