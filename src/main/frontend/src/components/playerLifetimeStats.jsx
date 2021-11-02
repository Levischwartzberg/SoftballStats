import API from "../utils/API";
import React, { useEffect, useState } from 'react';

function PlayerLifetimeStats(props) {
    const [stats, setStats] = useState({});
    useEffect(() => {
        loadLifetimeStats();
    },[])

    function loadLifetimeStats() {
        API.getLifetimeStatsForPlayer(props.playerId)
            .then((res) => {
                return res.data
            })
            .then((lifetimeStats) => setStats(lifetimeStats))
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <h3>Lifetime Stats</h3>
            <table>
                <tbody>
                   <tr>
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
                    <tr>
                        <td>{stats.atBats}</td>
                        <td>{stats.hits}</td>
                        <td>{stats.singles}</td>
                        <td>{stats.doubles}</td>
                        <td>{stats.triples}</td>
                        <td>{stats.homeruns}</td>
                        <td>{stats.walks}</td>
                        <td>{stats.runs}</td>
                        <td>{stats.rbi}</td>
                        <td>{stats.avg}</td>
                        <td>{stats.obp}</td>
                        <td>{stats.slg}</td>
                        <td>{stats.ops}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PlayerLifetimeStats;