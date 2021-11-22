import { useParams } from 'react-router-dom';
import API from '../utils/API';
import React, { useEffect, useState } from 'react';
import Boxscore from '../components/boxscore';
import ResultDescription from '../components/resultDescription';

function ResultPage() {
    const { id } = useParams();

    const [games, setGames] = useState([]);
    const [result, setResult] = useState({});
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
            .then((games) => {setGames(games); setResult(games[0].result)})
            .catch((error) => console.log(error))
    }
    
    return (
        <div>
            <ResultDescription result={result}></ResultDescription>
            <Boxscore resultId={id} games={games}></Boxscore>
        </div>
    )
}
export default ResultPage;