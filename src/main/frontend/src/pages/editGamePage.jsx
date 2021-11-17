import { useParams } from 'react-router-dom';
import API from '../utils/API';
import React, { useEffect, useState } from 'react';
import EditGameLineup from '../components/editGameLineup';
import EditResult from '../components/editResult';

function EditGamePage() {
    const { id } = useParams();

    const [game, setGame] = useState({});
    
    const [lineup, setLineup] = useState([]);
    const [season, setSeason] = useState({});
    const [result, setResult] = useState({});

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
            .then((games) => {
                setGame(games);
                setResult(games[0].result);
            })
            .catch((error) => console.log(error))
    }

    function saveGame() {
        console.log(lineup);
        let adjustedLineup = [];
        lineup.forEach((spot) => {
            if(spot.player.id) {
                spot.player.gameList = [];
                adjustedLineup.push(spot.player);
            }
        })
        let adjustedGames = [];
        lineup.forEach((game) => {
            if(game.atBats || game.walks) {
                game.player = {};
                adjustedGames.push(game);
            }
        })
        let boxscoreVO = {
            playerList: adjustedLineup,
            season: result.season,
            result: result,
            gameList: adjustedGames
        }
        console.log(boxscoreVO);
        API.updateExistingFromSingleGameBoxscore(boxscoreVO, result.season.id)
        .catch((err) => console.log(err));
    }

    return (
        <div>
            {result.id && (
                <EditResult setResult={setResult} result={result}></EditResult>
            )}
            <EditGameLineup setLineup={setLineup} game={game}></EditGameLineup>
            <button onClick={saveGame}>Save Game</button>
        </div>
    )
}
export default EditGamePage;