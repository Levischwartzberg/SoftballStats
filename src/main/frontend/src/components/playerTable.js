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
                    console.log(element.firstName);
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
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Height</th>
                        <th>Weight</th>
                    </tr>
                    {players.map((player) => (
                        <tr>
                            <td>
                                {player.firstName}
                            </td>
                            <td>
                                {player.lastName}
                            </td>
                            <td>
                                {player.height}
                            </td>
                            <td>
                                {player.weight}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PlayerTable;