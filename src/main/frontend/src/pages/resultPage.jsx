import { useParams } from 'react-router-dom';
import API from '../utils/API';
import React, { useEffect, useState } from 'react';
import Boxscore from '../components/boxscore';

function ResultPage() {
    const { id } = useParams();

    const [games, setGames] = useState([]);
    useEffect(() => {
        loadGames(id);
    },[])

    function loadGames(id) {
        API.getGamesByResult(id)
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
            .then((games) => setGames(games))
            .catch((error) => console.log(error))
    }
    
    return (
        <div>
            <Boxscore resultId={id} games={games}></Boxscore>
        </div>
    )
}
export default ResultPage;