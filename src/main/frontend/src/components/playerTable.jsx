import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import API from '../utils/API';

function PlayerTable() {

    const [players, setPlayers] = useState([]);
    useEffect(() => {
        loadPlayers();
    }, []);

    function loadPlayers() {
        API.getPlayers()
            .then((res) => {
                let playerArray = res.data.sort(function(player1, player2) {
                    let p1Last = player1.lastName;
                    let p1First = player1.firstName;
                    let p2Last = player2.lastName;
                    let p2First = player2.firstName;

                    if (p1Last < p2Last) {
                        return -1;
                    } else if (p1Last > p2Last) {
                        return 1;
                    } else {
                        if (p1First < p2First) {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    }
                });
                return playerArray;
            })
            .then((playerArray) => setPlayers(playerArray))
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <h1 className="table-header">
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
                        <tr key={player.id}>
                            <td>
                                <Link to={`/playerPage/${player.id}`}>
                                    {player.firstName}
                                </Link>
                            </td>
                            <td>
                                <Link to={`/playerPage/${player.id}`}>
                                    {player.lastName}
                                </Link>
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