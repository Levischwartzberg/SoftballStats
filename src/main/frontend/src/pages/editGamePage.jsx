import { useParams } from 'react-router-dom';
import API from '../utils/API';
import React, { useEffect, useState } from 'react';
import EditGameLineup from '../components/editGameLineup';

function EditGamePage() {
    const { id } = useParams();

    const [game, setGame] = useState({});

    useEffect(() => {
        loadGame(id)
    },[])

    function loadGame(gameId) {
        API.getGamesByResult(gameId)
            .then((res) => {
                let sorted = res.data.sort(function (game1, game2) {
					let player1 = game1.lineupSpot;
					let player2 = game2.lineupSpot;

					if (player1 < player2) {
						return -1;
					}
					else {
						return 1;
					}
				});
                return sorted;
            })
            .then((games) => setGame(games))
            .catch((error) => console.log(error))
    }

    return (
        <EditGameLineup game={game}></EditGameLineup>
    )
}
export default EditGamePage;