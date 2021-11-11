import React, { useEffect, useState } from 'react';
import SeasonForm from './seasonForm';
import ResultForm from './resultForm';
import GenerateLineup from './generateLineup';
import API from "../utils/API";

function GameForm() {
    const [lineup, setLineup] = useState([]);
    const [season, setSeason] = useState({});
    const [result, setResult] = useState({});
    const [gameStats, setGameStats] = useState([]);

    function saveGame(event) {
        event.preventDefault();
        // saveSeason();
        // savePlayers();
        saveFromBoxscoreVO();
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
        API.updateFromSingleGameBoxscore(boxscoreVO)
        .catch((err) => console.log(err));
    }

    // function savePlayer(playerObject) {
    //     API.updatePlayer(playerObject)
    //     .catch((err) => console.log(err));
    // }

    // function savePlayers() {
    //     let players = saveGamesToPlayers();
    //     players.forEach((player) => {
    //         if(player.id) {
    //             console.log(player);
    //             savePlayer(player);
    //         }
    //     })
    // }

    // function saveGamesToResult() {
    //     let resultCopy = {...result};
    //     resultCopy.gamesList = [];
    //     gameStats.forEach((game) => {
    //         if(game.walks || game.atBats) {
    //             resultCopy.gamesList.push(game);
    //         }
    //     })
    //     return resultCopy;
    // }

    // function saveGamesToPlayers() {
    //     let lineupCopy = [...lineup];
    //     lineupCopy.forEach((player) => {
    //         if(player.gameList) {
    //             let gameListCopy = [...player.gameList];
    //             let playerGame = gameStats[player.lineupSpot-1];
    //             playerGame.result = result;
    //             let seasonRef = {...season};
    //             seasonRef.resultList = [];
    //             playerGame.result.season = seasonRef;
    //             gameListCopy.push(playerGame);
    //             player.gameList = gameListCopy;
    //         }
    //         else {
    //             let gameList = [];
    //             gameList.push(gameStats[player.lineupSpot-1]);
    //             player.gameList = gameList;
    //         }
    //     })
    //     return lineupCopy;
    // }

    // function saveSeason() {
    //     let resultWithGames = saveGamesToResult();
    //     let seasonCopy = {...season}
    //     if(!season.resultList) {
    //         seasonCopy.resultList = [];
    //         seasonCopy.resultList.push(resultWithGames);
    //         API.addSeason(seasonCopy).catch((err) => console.log(err));
    //     }
    //     else {
    //         seasonCopy.resultList.push(resultWithGames);
    //         console.log(seasonCopy);
    //         API.updateSeason(seasonCopy).catch((err) => console.log(err));
    //     }
    // }
    

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