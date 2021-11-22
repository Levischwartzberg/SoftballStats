import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import API from '../utils/API';

function EditPlayerList() {
    const [players, setPlayers] = useState([]);
    useEffect(() => {
        loadPlayers();
    }, []);

    function loadPlayers() {
        API.getPlayers()
            .then((res) => {
                let playerArray = res.data;
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
                    </tr>
                    {players.map((player) => (
                        <tr key={player.id}>
                            <td>
                                <Link to={`/admin/playerEditPage/${player.id}`}>
                                    {player.firstName}
                                </Link>
                            </td>
                            <td>
                                <Link to={`/admin/playerEditPage/${player.id}`}>
                                    {player.lastName}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default EditPlayerList