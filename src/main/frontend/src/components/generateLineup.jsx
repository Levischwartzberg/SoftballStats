import React, { useEffect, useState } from 'react';
import { Dropdown } from "react-bootstrap";
import API from "../utils/API";

function GenerateLineup() {
    const [numPlayers, setNumPlayers] = useState([1,2,3,4,5,6,7,8,9]);
    const [players, setPlayers] = useState([]);
    
    useEffect(() => {
        loadPlayers();
    },[]);

    function loadPlayers() {
        API.getPlayers()
            .then((res) => {
                return res.data;
            })
            .then((players) => setPlayers(players))
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <form action="">
                <table>
                    <tbody>
                        <tr>
                            <th>Lineup Spot</th>
                            <th>Player</th>
                            <th>AB</th>
                            <th>Hits</th>
                            <th>1B</th>
                            <th>2B</th>
                            <th>3B</th>
                            <th>HR</th>
                            <th>BB</th>
                            <th>R</th>
                            <th>RBI</th>
                        </tr>
                        {numPlayers.map((lineupSpot) => (
                            <tr>
                                <td>{lineupSpot}</td>
                                <td>
                                    <select name="players" id="">
                                        {players.map((player) => (
                                            <option>{player.lastName + " " + player.firstName}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <input type="number" name="atBats" min="0" id="" />
                                </td>
                                <td>
                                    <input type="number" name="hits" min="0" id="" />
                                </td>
                                <td>
                                    <input type="number" name="singles" min="0" id="" />
                                </td>
                                <td>
                                    <input type="number" name="doubles" min="0" id="" />
                                </td>
                                <td>
                                    <input type="number" name="triples" min="0" id="" />
                                </td>
                                <td>
                                    <input type="number" name="homeruns" min="0" id="" />
                                </td>
                                <td>
                                    <input type="number" name="walks" min="0" id="" />
                                </td>
                                <td>
                                    <input type="number" name="runs" min="0" id="" />
                                </td>
                                <td>
                                    <input type="number" name="rbi" min="0" id="" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
    )
}
export default GenerateLineup;