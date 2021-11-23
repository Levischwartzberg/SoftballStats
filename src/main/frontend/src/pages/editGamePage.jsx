import { useParams } from 'react-router-dom';
import API from '../utils/API';
import React, { useEffect, useState } from 'react';
import EditGameLineup from '../components/editGameLineup';
import EditResult from '../components/editResult';
import DeletePopup from '../components/areYouSurePopup';
import { useHistory } from 'react-router-dom';
import ValidationPopup from '../components/validationPopup';

function EditGamePage() {
    const { id } = useParams();

    const [deletePopup, setDeletePopup] = useState(false);
    const [game, setGame] = useState({});
    
    const [lineup, setLineup] = useState([]);
    const [result, setResult] = useState({});

    const [validationAlert, setValidationAlert] = useState({open: false, message: ""});

    let history = useHistory();

    const redirect = (page) => {
        history.push(`/${page}`);
    }

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

    function returnBoxscoreVO() {
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
        return boxscoreVO;
    }

    function saveGame(event) {
        event.preventDefault();
        let message1 = validate();
        let message2 = validateLineup();
        if(message1 === true && message2 === true) {
            let boxscoreVO = returnBoxscoreVO();
            console.log(boxscoreVO);
            API.updateExistingFromSingleGameBoxscore(boxscoreVO, result.season.id)
            .then(() => redirect(`boxscore/${result.id}`))
            .catch((err) => console.log(err));
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

    function deleteGame() {
        setDeletePopup(true);
    }

    function validateLineup() {
        const errorMessages = [];
        let runs = 0;
        lineup.forEach((statline, index) => {
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
                errorMessages.push(`The sum of each hit type (1B, 2B, 3B HR) must be equal to the total amount of hits. Error first appears in lineup spot ${index+1}.`);
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
        lineup.forEach((statline) => {
            if(statline.player.id) {
                playerIds.push(statline.player.id);
            }
        })
        if(playerIds.length < 9) {
            return "You must enter in a lineup of at least 9 real players, either by choosing existing players from the dropdown menu or creating new ones.";
        }
        if(new Set(playerIds).size !== playerIds.length) {
            return "You may not include duplicate players in the lineup. Create a new player or choose an existing player who is not already in the lineup.";
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
            {result.id && (
                <EditResult setResult={setResult} result={result}></EditResult>
            )}
            <EditGameLineup setLineup={setLineup} game={game}></EditGameLineup>
            <DeletePopup setDeletePopup={setDeletePopup} open={deletePopup} result={result}></DeletePopup>
            <button onClick={saveGame}>Save Game</button>
            <button onClick={deleteGame}>Delete Game</button>
            <ValidationPopup setValidationAlert={setValidationAlert} open={validationAlert.open} message={validationAlert.message}></ValidationPopup>
        </div>
    )
}
export default EditGamePage;