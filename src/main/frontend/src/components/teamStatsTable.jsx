import API from "../utils/API";
import React, { useEffect, useState } from 'react';

function TeamStatsTable(props) {
    const [teamStats, setTeamStats] = useState([]);
    const [sort, setSort] = useState({});

    useEffect(() => {
        loadTeamStats();
    },[props.playerId])

    function loadTeamStats() {
        API.getTeamStatsBySeason(props.seasonId)
            .then((res) => {
                return res.data
            })
            .then((stats) => setTeamStats(stats.sort((a,b) => (a.ops < b.ops ? 1 : -1))))
            .catch((err) => console.log(err));
    }

    function sortColumn(event) {
        let colName = event.target.id;
        let sorted = [...teamStats].sort((a,b) => (a[colName] < b[colName] ? 1 : -1));
        setSort({[colName]: true});
        if(colName === "player.lastName") {
            sorted = [...teamStats].sort((a,b) => (a.player.lastName < b.player.lastName ? -1 : 1));
            setSort({name: true});
        }
        if(colName === "") {
            sorted = [...teamStats].sort((a,b) => (a.ops < b.ops ? 1 : -1));
        }
        setTeamStats(sorted);
    }

    function roundRates(rate) {
        return (rate >= 1) ? Number.parseFloat(rate).toPrecision(4) : Number.parseFloat(rate).toPrecision(3);
    }

    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <th onClick={sortColumn} className="click-header" id="player.lastName">Player {sort.name === true && <span>&#8681;</span>} </th>
                    <th onClick={sortColumn} className="click-header" id="games">Games {sort.games === true && <span>&#8681;</span>} </th>
                    <th onClick={sortColumn} className="click-header" id="atBats">AB {sort.atBats === true && <span>&#8681;</span>} </th>
                    <th onClick={sortColumn} className="click-header" id="hits">Hits {sort.hits === true && <span>&#8681;</span>} </th>
                    <th onClick={sortColumn} className="click-header" id="singles">1B {sort.singles === true && <span>&#8681;</span>} </th>
                    <th onClick={sortColumn} className="click-header" id="doubles">2B {sort.doubles === true && <span>&#8681;</span>} </th>
                    <th onClick={sortColumn} className="click-header" id="triples">3B {sort.triples === true && <span>&#8681;</span>} </th>
                    <th onClick={sortColumn} className="click-header" id="homeruns">HR {sort.homeruns === true && <span>&#8681;</span>} </th>
                    <th onClick={sortColumn} className="click-header" id="walks">BB {sort.walks === true && <span>&#8681;</span>} </th>
                    <th onClick={sortColumn} className="click-header" id="runs">R {sort.runs === true && <span>&#8681;</span>} </th>
                    <th onClick={sortColumn} className="click-header" id="rbi">RBI {sort.rbi === true && <span>&#8681;</span>} </th>
                    <th onClick={sortColumn} className="click-header" id="avg">AVG {sort.avg === true && <span>&#8681;</span>} </th>
                    <th onClick={sortColumn} className="click-header" id="obp">OBP {sort.obp === true && <span>&#8681;</span>} </th>
                    <th onClick={sortColumn} className="click-header" id="slg">SLG {sort.slg === true && <span>&#8681;</span>} </th>
                    <th onClick={sortColumn} className="click-header" id="ops">OPS {sort.ops === true && <span>&#8681;</span>} </th>
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