import API from "../utils/API";
import React, { useEffect, useState } from 'react';
import { Dropdown } from "react-bootstrap";

function PlayerGameLog(props) {
    const [games, setGames] = useState([]);
    const [seasons, setSeasons] = useState([]);
    useEffect(() => {
        loadSeasons();
    }, [])

    function loadGames(seasonId) {
        API.getGameLogBySeason(props.playerId, seasonId)
            .then((res) => {
                let gameArray = res.data;
                // console.log(gameArray);
                return gameArray;
            })
            .then((gameArray) => setGames(gameArray))
            .catch((err) => console.log(err));
    }

    function loadSeasons() {
        API.getSeasonStatsForPlayer(props.playerId)
            .then((res) => {
                let seasonStatsArray = res.data;
                let seasonsArray = [];
                seasonStatsArray.forEach(season => seasonsArray.push(season.season));
                return seasonsArray;
            })
            .then((seasons) => setSeasons(seasons))
            .catch((error) => console.log(error))
    }

    function roundRates(rate) {
        return (rate >= 1) ? Number.parseFloat(rate).toPrecision(4) : Number.parseFloat(rate).toPrecision(3);
    }
    function convertDateTime(dateTime) {
        return dateTime.split("T")[0] + " " + dateTime.split("T")[1].split(".")[0];
    }
    
    return (
        <div>
            <h3>Game Logs</h3>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Seasons
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {seasons.map((season) => (
                        <Dropdown.Item>
                            <button value={season.id} onClick={() => loadGames(season.id)}> 
                                {season.session + " " + season.year}
                            </button>
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <table>
                <tbody>
                   <tr>
                       <th>Game</th>
                       <th>Lineup Spot</th>
                       <th>AB</th>
                       <th>Hits</th>
                       <th>1B</th>
                       <th>2B</th>
                       <th>3B</th>
                       <th>HR</th>
                       <th>BB</th>
                       <th>R</th>
                       <th>RBI</th>
                       <th>AVG</th>
                       <th>OBP</th>
                       <th>SLG</th>
                       <th>OPS</th>
                   </tr>
                   {games.map((game) => (
                        <tr>
                            <td>{convertDateTime(game.result.date)}</td>
                            <td>{game.lineupSpot}</td>
                            <td>{game.atBats}</td>
                            <td>{game.hits}</td>
                            <td>{game.singles}</td>
                            <td>{game.doubles}</td>
                            <td>{game.triples}</td>
                            <td>{game.homeruns}</td>
                            <td>{game.walks}</td>
                            <td>{game.runs}</td>
                            <td>{game.rbi}</td>
                            <td>{roundRates(game.avg)}</td>
                            <td>{roundRates(game.obp)}</td>
                            <td>{roundRates(game.slg)}</td>
                            <td>{roundRates(game.ops)}</td>
                        </tr>
                   ))}
                </tbody>
            </table>
        </div>
    )
}

export default PlayerGameLog;