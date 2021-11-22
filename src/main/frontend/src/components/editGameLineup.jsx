import { useEffect, useState } from "react";
import styled from "styled-components";

function EditGameLineup(props) {
    const Input = styled.input`
        padding: 0.5em;
        margin: 0.5em;
        border: solid black .05em;
        border-radius: 3px;
        width: 50px;
        padding-right: 1px;
        `;

    const [lineup, setLineup] = useState([]);

    useEffect(() => {
        props.setLineup(lineup);
    },[lineup])

    useEffect(() => {
        if(props.game.length) {
            let gameArray = [...props.game];
            let newLineup = [];
            gameArray.forEach((stats) => {
                newLineup.push(stats);
                setLineup(newLineup);
            })
        }
    },[props.game])

    function handleChange(event) {
		const { name, id, value } = event.target;
		let lineupCopy = [...lineup];
        lineupCopy.forEach((spot, index) => {
            if(parseInt(id) === spot.lineupSpot) {
                let playerObjCopy = {...spot};
                playerObjCopy = {...playerObjCopy, [name]: value };
                lineupCopy[index] = playerObjCopy;
            }
        })
        setLineup(lineupCopy);
	}

    return (
        <div>
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
                    {lineup.map((playerGame) => (
                        <tr key={playerGame.lineupSpot}>
                            <td style={{textAlign: "center"}}>
                                {playerGame.lineupSpot}
                            </td>
                            <td>
                                {playerGame.player.lastName + ", " + playerGame.player.firstName}
                            </td>
                            <td>
                                <Input onChange={handleChange} value={playerGame.atBats} id={playerGame.lineupSpot} type="number" name="atBats" min="0" placeholder="0"></Input>
                            </td>
                            <td>
                                <Input onChange={handleChange} value={playerGame.hits} id={playerGame.lineupSpot} type="number" name="hits" min="0" placeholder="0"></Input>
                            </td>
                            <td>
                                <Input onChange={handleChange} value={playerGame.singles} id={playerGame.lineupSpot} type="number" name="singles" min="0" placeholder="0"></Input>
                            </td>
                            <td>
                                <Input onChange={handleChange} value={playerGame.doubles} id={playerGame.lineupSpot} type="number" name="doubles" min="0" placeholder="0"></Input>
                            </td>
                            <td>
                                <Input onChange={handleChange} value={playerGame.triples} id={playerGame.lineupSpot} type="number" name="triples" min="0" placeholder="0"></Input>
                            </td>
                            <td>
                                <Input onChange={handleChange} value={playerGame.homeruns} id={playerGame.lineupSpot} type="number" name="homeruns" min="0" placeholder="0"></Input>
                            </td>
                            <td>
                                <Input onChange={handleChange} value={playerGame.walks} id={playerGame.lineupSpot} type="number" name="walks" min="0" placeholder="0"></Input>
                            </td>
                            <td>
                                <Input onChange={handleChange} value={playerGame.runs} id={playerGame.lineupSpot} type="number" name="runs" min="0" placeholder="0"></Input>
                            </td>
                            <td>
                                <Input onChange={handleChange} value={playerGame.rbi} id={playerGame.lineupSpot} type="number" name="rbi" min="0" placeholder="0"></Input>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default EditGameLineup;