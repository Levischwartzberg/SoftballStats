import React, { useEffect, useState } from 'react';
import API from "../utils/API";
import styled from 'styled-components';
import PlayerPopup from './playerPopup';

function GenerateLineup() {
    const Input = styled.input`
        padding: 0.5em;
        margin: 0.5em;
        border: solid black .05em;
        border-radius: 3px;
        width: 50px;
        padding-right: 1px;
        `;
    const [numPlayers, setNumPlayers] = useState([1,2,3,4,5,6,7,8,9]);
    const [players, setPlayers] = useState([]);
    const [playerPopup, setPlayerPopup] = useState(false);
    
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

    function addLineupSpot(event) {
        event.preventDefault();
        let newArr = [...numPlayers];
        newArr.push(numPlayers[numPlayers.length-1]+1)
        setNumPlayers(newArr);
    }

    function showPlayerPopup(event) {
        event.preventDefault();
        setPlayerPopup(true);
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
                                    {/* <select name="players" id="">
                                        <option disabled="true">
                                            Choose Existing Player 
                                        </option>
                                        {players.map((player) => (
                                            <option>{player.lastName + ", " + player.firstName}</option>
                                        ))}
                                    </select> */}
                                    <button onClick={showPlayerPopup}>Select/Create Player</button>
                                </td>
                                <td>
                                    <Input type="number" name="atBats" min="0" placeholder="0"></Input>
                                </td>
                                <td>
                                    <Input type="number" name="hits" min="0" placeholder="0"></Input>
                                </td>
                                <td>
                                    <Input type="number" name="singles" min="0" placeholder="0"></Input>
                                </td>
                                <td>
                                    <Input type="number" name="doubles" min="0" placeholder="0"></Input>
                                </td>
                                <td>
                                    <Input type="number" name="triples" min="0" placeholder="0"></Input>
                                </td>
                                <td>
                                    <Input type="number" name="homeruns" min="0" placeholder="0"></Input>
                                </td>
                                <td>
                                    <Input type="number" name="walks" min="0" placeholder="0"></Input>
                                </td>
                                <td>
                                    <Input type="number" name="runs" min="0" placeholder="0"></Input>
                                </td>
                                <td>
                                    <Input type="number" name="rbi" min="0" placeholder="0"></Input>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <button onClick={addLineupSpot}> 
                                    Add Player
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            {playerPopup === true && (
                <PlayerPopup open={playerPopup} setPlayerPopup={setPlayerPopup}></PlayerPopup>
            )}
        </div>
    )
}
export default GenerateLineup;