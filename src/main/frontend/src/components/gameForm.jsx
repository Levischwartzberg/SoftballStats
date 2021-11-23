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
        let message1 = validate();
        let message2 = validateLineup();
        if(message1 === true && message2 === true) {
            saveFromBoxscoreVO();
        }
        else {
            if (message1 !== true) {
                setValidationAlert({open: true, message: message1});
            }
            else {
                setValidationAlert({open: true, message: message2});
            }
        }
    }

    function saveFromBoxscoreVO() {
        let adjustedLineup = [];
        lineup.forEach((player, index) => {
            if(player.id && (gameStats[index].atBats > 0 || gameStats[index].walks > 0)) {
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

    function validateLineup() {
        const errorMessages = [];
        let runs = 0;
        gameStats.forEach((statline, index) => {
            let atBats = parseInt(statline.atBats);
            let hits = parseInt(statline.hits);
            let singles = parseInt(statline.singles);
            let doubles = parseInt(statline.doubles);
            let triples = parseInt(statline.triples);
            let homeruns = parseInt(statline.homeruns);
            if (atBats < hits) {
                errorMessages.push(`The hits cannot exceed the total at bats. Error first appears in lineup spot ${index+1}.`);
            }
            if((singles + doubles + triples + homeruns) !== hits) {
                errorMessages.push(`The sum of each hit type (1B, 2B, 3B, HR) must be equal to the total amount of hits. Error first appears in lineup spot ${index+1}.`);
            }
            runs += parseInt(statline.runs);
        })
        let runsFor = 0;
        if(result.score) {
            runsFor = (result.result === "Win") ? parseInt(result.score.split("-")[0]) : parseInt(result.score.split("-")[1]);
        }
        if(runs !== runsFor) {
            errorMessages.push("The total amount of runs scored (sum of R column) must match the Runs For field.")
        }
        errorMessages.push(true);
        return errorMessages[0];
    }

    function validate() {
        // console.log(result);
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