import API from "../utils/API";
import React, { useEffect, useState } from 'react';

function TeamStatsTable(props) {
    const [teamStats, setTeamStats] = useState([]);
    useEffect(() => {
        loadTeamStats();
    },[props.playerId])

    function loadTeamStats() {
        API.getTeamStatsBySeason(props.seasonId)
            .then((res) => {
                return res.data
            })
            .then((stats) => setTeamStats(stats))
            .catch((err) => console.log(err));
    }

    function roundRates(rate) {
        return (rate >= 1) ? Number.parseFloat(rate).toPrecision(4) : Number.parseFloat(rate).toPrecision(3);
    }

    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <th>Player</th>
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
                {teamStats.map((player) => (
                    <tr key={player.player.id}>
                        <td>{player.player.lastName + ", " + player.player.firstName}</td>
                        <td>{player.games}</td>
                        <td>{player.atBats}</td>
                        <td>{player.hits}</td>
                        <td>{player.singles}</td>
                        <td>{player.doubles}</td>
                        <td>{player.triples}</td>
                        <td>{player.homeruns}</td>
                        <td>{player.walks}</td>
                        <td>{player.runs}</td>
                        <td>{player.rbi}</td>
                        <td>{roundRates(player.avg)}</td>
                        <td>{roundRates(player.obp)}</td>
                        <td>{roundRates(player.slg)}</td>
                        <td>{roundRates(player.ops)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default TeamStatsTable;