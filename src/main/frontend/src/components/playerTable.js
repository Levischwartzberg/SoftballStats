import React, { useEffect, useState } from 'react';
import API from '../utils/API';

function PlayerTable() {

    const [players, setPlayers] = useState([]);
    useEffect(() => {
        loadPlayers();
    }, []);

    function loadPlayers() {
        API.getPlayers()
            .then((res) => {
                let playerArray = res.data;
                playerArray.forEach(element => {
                    console.log(element.name);
                });
                return playerArray;
            })
            .then((playerArray) => setPlayers(playerArray))
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <h1>
                Ballplayers
            </h1>
            <table>
                <tbody>
                    <tr>
                        <th>Player Name</th>
                        <th>Hits</th>
                        <th>At Bats</th>
                    </tr>
                    {players.map((player) => (
                        <tr>
                            <td>
                                {player.name}
                            </td>
                            <td>
                                {player.hits}
                            </td>
                            <td>
                                {player.atBats}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PlayerTable;