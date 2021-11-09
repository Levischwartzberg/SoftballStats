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
        console.log(lineup);
        console.log(result);
        console.log(season);
        console.log(gameStats);
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