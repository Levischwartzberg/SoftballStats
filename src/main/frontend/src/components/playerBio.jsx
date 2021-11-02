import { useEffect, useState } from "react";
import API from "../utils/API";

function PlayerBio(props) {
    const [player, setPlayer] = useState({});
    useEffect(() => {
        loadPlayer();
    },[])

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
            <p>Height: {player.height}</p>
            <p>Weight: {player.weight}</p>
            <p>Bats: {player.batHand} Throws: {player.throwHand}</p>
        </div>
    )
}

export default PlayerBio;