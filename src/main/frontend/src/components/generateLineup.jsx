import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlayerPopup from './playerPopup';

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
        min-width: 5em;
        display: inline;
    `;
    const PlusButton = styled.button`
        border: solid black 1px;
        border-radius: 5px;
        margin-right: 10px;
        font-weight: bold;
        &:hover {
            background-color: rgb(211, 209, 97);
        }
    `

    const [lineup, setLineup] = useState([{lineupSpot: 1}, {lineupSpot: 2}, {lineupSpot: 3}, {lineupSpot: 4}, {lineupSpot: 5} ,{lineupSpot: 6},{lineupSpot: 7}, {lineupSpot: 8},{lineupSpot: 9}])
    const [playerPopup, setPlayerPopup] = useState(false);
    const [spot, setSpot] = useState(0);
    const [gameStats, setGameStats] = useState([{lineupSpot: 1}, {lineupSpot: 2}, {lineupSpot: 3}, {lineupSpot: 4}, {lineupSpot: 5} ,{lineupSpot: 6},{lineupSpot: 7}, {lineupSpot: 8},{lineupSpot: 9}])

    useEffect(() => {
        let newArr = [...lineup]
        lineup.forEach((spot) => {
            spot.firstName = spot.lineupSpot;
            spot.lastName = "Player";
            spot.gameList = [];
        })
        setLineup(newArr);
        initializeStats();
    },[])

    function initializeStats() {
        let newArr = [];
        gameStats.forEach((statline) => {
            let newStatline = {...statline};
            newStatline.atBats = 0;
            newStatline.hits = 0;
            newStatline.singles = 0;
            newStatline.doubles = 0;
            newStatline.triples = 0;
            newStatline.homeruns = 0;
            newStatline.walks = 0;
            newStatline.runs = 0;
            newStatline.rbi = 0;

            newArr.push(newStatline);
        })
        setGameStats(newArr);
    }

    useEffect(() => {
        props.setLineup(lineup);
    },[lineup])

    useEffect(() => {
        props.setGameStats(gameStats);
    },[gameStats])

    function handleChange(event) {
		const { name, id, value } = event.target;
		let gameStatsCopy = [...gameStats];
        let playerObjCopy = {...gameStats[id-1]}
        playerObjCopy = { ...playerObjCopy, [name]: value };
        gameStatsCopy[id-1] = playerObjCopy;
        setGameStats(gameStatsCopy);
	}

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
        let newStats = [...gameStats];
        newStats.push({lineupSpot: num});
        setGameStats(newStats);
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
                                        <PlusButton onClick={(event) => {event.preventDefault(); showPlayerPopup(); relaySpot(spot.lineupSpot);}}>+</PlusButton>
                                    </span>
                                </td>
                                <td>
                                    <Input onChange={handleChange} id={spot.lineupSpot} value={gameStats[spot.lineupSpot-1].atBats} type="number" name="atBats" min="0" placeholder="0"></Input>
                                </td>
                                <td>
                                    <Input onChange={handleChange} id={spot.lineupSpot} value={gameStats[spot.lineupSpot-1].hits} type="number" name="hits" min="0" max={gameStats[spot.lineupSpot-1].atBats} placeholder="0"></Input>
                                </td>
                                <td>
                                    <Input onChange={handleChange} id={spot.lineupSpot} value={gameStats[spot.lineupSpot-1].singles} type="number" name="singles" min="0" max={gameStats[spot.lineupSpot-1].hits - gameStats[spot.lineupSpot-1].doubles - gameStats[spot.lineupSpot-1].triples - gameStats[spot.lineupSpot-1].homeruns} placeholder="0"></Input>
                                </td>
                                <td>
                                    <Input onChange={handleChange} id={spot.lineupSpot} value={gameStats[spot.lineupSpot-1].doubles} type="number" name="doubles" min="0" max={gameStats[spot.lineupSpot-1].hits - gameStats[spot.lineupSpot-1].singles - gameStats[spot.lineupSpot-1].triples - gameStats[spot.lineupSpot-1].homeruns} placeholder="0"></Input>
                                </td>
                                <td>
                                    <Input onChange={handleChange} id={spot.lineupSpot} value={gameStats[spot.lineupSpot-1].triples} type="number" name="triples" min="0" max={gameStats[spot.lineupSpot-1].hits - gameStats[spot.lineupSpot-1].singles - gameStats[spot.lineupSpot-1].doubles - gameStats[spot.lineupSpot-1].homeruns} placeholder="0"></Input>
                                </td>
                                <td>
                                    <Input onChange={handleChange} id={spot.lineupSpot} value={gameStats[spot.lineupSpot-1].homeruns} type="number" name="homeruns" min="0" max={gameStats[spot.lineupSpot-1].hits - gameStats[spot.lineupSpot-1].singles - gameStats[spot.lineupSpot-1].doubles - gameStats[spot.lineupSpot-1].triples} placeholder="0"></Input>
                                </td>
                                <td>
                                    <Input onChange={handleChange} id={spot.lineupSpot} value={gameStats[spot.lineupSpot-1].walks} type="number" name="walks" min="0" placeholder="0"></Input>
                                </td>
                                <td>
                                    <Input onChange={handleChange} id={spot.lineupSpot} value={gameStats[spot.lineupSpot-1].runs} type="number" name="runs" min="0" placeholder="0"></Input>
                                </td>
                                <td>
                                    <Input onChange={handleChange} id={spot.lineupSpot} value={gameStats[spot.lineupSpot-1].rbi} type="number" name="rbi" min="0" placeholder="0"></Input>
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