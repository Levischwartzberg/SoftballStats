import React, { useEffect, useState } from 'react';
import SeasonForm from './seasonForm';
import ResultForm from './resultForm';
import GenerateLineup from './generateLineup';
import API from "../utils/API";
import { useHistory } from 'react-router-dom';

function GameForm() {
    const [lineup, setLineup] = useState([]);
    const [season, setSeason] = useState({});
    const [result, setResult] = useState({});
    const [gameStats, setGameStats] = useState([]);

    let history = useHistory();

    const redirect = () => {
        history.push(`/seasonPage/${season.id}`);
    }

    function saveGame(event) {
        event.preventDefault();
        saveFromBoxscoreVO();
        redirect();
    }

    function saveFromBoxscoreVO() {
        let adjustedLineup = [];
        lineup.forEach((player) => {
            if(player.id) {
                player.gameList = [];
                adjustedLineup.push(player);
            }
        })
        let adjustedGames = [];
        gameStats.forEach((game) => {
            if(game.atBats || game.walks) {
                adjustedGames.push(game);
            }
        })

        let boxscoreVO = {
            playerList: adjustedLineup,
            season: season,
            result: result,
            gameList: adjustedGames
        }
        console.log(boxscoreVO);
        API.saveNewFromSingleGameBoxscore(boxscoreVO)
        .catch((err) => console.log(err));
    }
    

    return (
        <div>
            <SeasonForm setSeason={setSeason}></SeasonForm>
            <ResultForm setResult={setResult}></ResultForm>
            <GenerateLineup setLineup={setLineup} setGameStats={setGameStats}></GenerateLineup>
            <button onClick={saveGame}>Save Game</button>
        </div>
    )
}
export default GameForm;