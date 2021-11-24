import { useEffect, useState } from "react";
import API from "../utils/API";

function PlayerBio(props) {
    const [player, setPlayer] = useState({});
    useEffect(() => {
        loadPlayer();
    },[props.playerId])

    function loadPlayer() {
        API.getPlayerById(props.playerId)
            .then((res) => {
                let person = res.data;
                return person;
            })
            .then((person) => setPlayer(person))
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <h1>{player.firstName} {player.lastName}</h1>
            <ul className="player-attributes">
                <li>
                    <span style={{fontWeight: "bold"}}>Height: </span> {player.height}
                </li>
                <li>
                    <span style={{fontWeight: "bold"}}>Weight: </span> {player.weight}
                </li>
                <li>
                    <span style={{fontWeight: "bold"}}>Bats: </span> {player.batHand}
                </li>
                <li>
                    <span style={{fontWeight: "bold"}}>Throws: </span> {player.throwHand}
                </li>
            </ul>
        </div>
    )
}

export default PlayerBio;