import React, { useEffect, useState } from 'react';
import SeasonForm from './seasonForm';
import ResultForm from './resultForm';
import GenerateLineup from './generateLineup';
import ValidationPopup from './validationPopup';
import API from "../utils/API";
import { useHistory } from 'react-router-dom';

function GameForm() {
    const [lineup, setLineup] = useState([]);
    const [season, setSeason] = useState({});
    const [result, setResult] = useState({});
    const [gameStats, setGameStats] = useState([]);
    const [validationAlert, setValidationAlert] = useState({open: false, message: ""});

    let history = useHistory();

    const redirect = () => {
        history.push(`/seasonPage/${season.id}`);
    }

    function saveGame(event) {
        event.preventDefault();
        let message = validate();
        if(message === true) {
            saveFromBoxscoreVO();
        }
        else {
            setValidationAlert({open: true, message: message});
        }
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
            if(game.atBats > 0 || game.walks > 0) {
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
        .then(() => redirect())
        .catch((err) => console.log(err));
    }

    function validate() {
        const playerIds = [];
        lineup.forEach((player) => {
            if(player.id) {
                playerIds.push(player.id);
            }
        })
        if(playerIds.length < 9) {
            return "You must enter in a lineup of at least 9 real players, either by choosing existing players from the dropdown menu or creating new ones.";
        }
        if(new Set(playerIds).size !== playerIds.length) {
            return "You may not include duplicate players in the lineup. Create a new player or choose an existing player who is not already in the lineup.";
        }
        if(!season.id) {
            return "You must choose a season for the game. Either choose an existing one or create a new one.";
        }
        if(!result.result) {
            return "You must enter in the runs for and runs against for the game to be saved.";
        }
        if(!result.date) {
            return "You must use the calendar and select the date and time of the game.";
        }
        return true;
    }
    

    return (
        <div>
            <SeasonForm setSeason={setSeason}></SeasonForm>
            <ResultForm setResult={setResult}></ResultForm>
            <GenerateLineup setLineup={setLineup} setGameStats={setGameStats}></GenerateLineup>
            <button onClick={saveGame}>Save Game</button>
            <ValidationPopup setValidationAlert={setValidationAlert} open={validationAlert.open} message={validationAlert.message}></ValidationPopup>
        </div>
    )
}
export default GameForm;