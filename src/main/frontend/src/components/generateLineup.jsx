import React, { useEffect, useState } from 'react';
import API from "../utils/API";
import styled from 'styled-components';
import PlayerPopup from './playerPopup';
import { propTypes } from 'react-bootstrap/esm/Image';

function GenerateLineup(props) {
    const Input = styled.input`
        padding: 0.5em;
        margin: 0.5em;
        border: solid black .05em;
        border-radius: 3px;
        width: 50px;
        padding-right: 1px;
        `;

    const PlayerDisplay = styled.h6`
        padding: 0.5em;
        margin: 0.5em;
        border: solid black .05em;
        min-width: 5em;
        display: inline;
    `;

    const [lineup, setLineup] = useState([{lineupSpot: 1}, {lineupSpot: 2}, {lineupSpot: 3}, {lineupSpot: 4}, {lineupSpot: 5} ,{lineupSpot: 6},{lineupSpot: 7}, {lineupSpot: 8},{lineupSpot: 9}])
    const [playerPopup, setPlayerPopup] = useState(false);
    const [spot, setSpot] = useState(0);

    useEffect(() => {
        let newArr = [...lineup]
        lineup.forEach((spot) => {
            spot.firstName = spot.lineupSpot;
            spot.lastName = "Player";
        })
        setLineup(newArr);
    },[])
    useEffect(() => {
        props.setLineup(lineup);
    },[lineup])

    function addLineupSpot(event) {
        event.preventDefault();
        let newArr = [...lineup];
        let num = parseInt(lineup[lineup.length-1].lineupSpot) + 1
        newArr.push({
            lineupSpot: num,
            firstName: num,
            lastName: "Player"
        });
        setLineup(newArr);
    }

    function showPlayerPopup() {
        setPlayerPopup(true);
    }

    function relaySpot(lineupSpot) {
        setSpot(lineupSpot);
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
                        {lineup.map((spot) => (
                            <tr key={spot.lineupSpot}>
                                <td>{spot.lineupSpot}</td>
                                <td>
                                    <span>
                                        <PlayerDisplay>{spot.lastName + ", " + spot.firstName}</PlayerDisplay>
                                        <button onClick={(event) => {event.preventDefault(); showPlayerPopup(); relaySpot(spot.lineupSpot);}}>+</button>
                                    </span>
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
                <PlayerPopup setLineup={setLineup} open={playerPopup} setPlayerPopup={setPlayerPopup} lineup={lineup} spot={spot}></PlayerPopup>
            )}
        </div>
    )
}
export default GenerateLineup;