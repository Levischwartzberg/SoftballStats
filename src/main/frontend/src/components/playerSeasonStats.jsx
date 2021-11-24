import API from "../utils/API";
import React, { useEffect, useState } from 'react';

function PlayerSeasonStats(props) {
    const [seasonStats, setSeasonStats] = useState([]);
    useEffect(() => {
        loadSeasonStats();
    }, [props.playerId])

    function loadSeasonStats() {
        API.getSeasonStatsForPlayer(props.playerId)
            .then((res) => {
                let seasonStatsArray = res.data;
                return seasonStatsArray;
            })
            .then((seasonStatsArray) => setSeasonStats(seasonStatsArray))
            .catch((err) => console.log(err));
    }

    function roundRates(rate) {
        return (rate >= 1) ? Number.parseFloat(rate).toPrecision(4) : Number.parseFloat(rate).toPrecision(3);
    }

    return (
        <div>
            <h3>Seasons</h3>
            <table>
                <tbody>
                   <tr>
                       <th>Season</th>
                       <th>Games</th>
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
                   {seasonStats.map((season) => (
                        <tr key={season.season.id}>
                            <td>{season.season.session + " " + season.season.year}</td>
                            <td>{season.games}</td>
                            <td>{season.atBats}</td>
                            <td>{season.hits}</td>
                            <td>{season.singles}</td>
                            <td>{season.doubles}</td>
                            <td>{season.triples}</td>
                            <td>{season.homeruns}</td>
                            <td>{season.walks}</td>
                            <td>{season.runs}</td>
                            <td>{season.rbi}</td>
                            <td>{roundRates(season.avg)}</td>
                            <td>{roundRates(season.obp)}</td>
                            <td>{roundRates(season.slg)}</td>
                            <td>{roundRates(season.ops)}</td>
                        </tr>
                   ))}
                </tbody>
            </table>
        </div>
    )
}

export default PlayerSeasonStats;