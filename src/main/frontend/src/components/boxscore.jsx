import API from "../utils/API";
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

function Boxscore(props) {
    
    function formatPlayerName(player) {
        return player.lastName + " " + player.firstName[0];
    }
    function roundRates(rate) {
        return (rate >= 1) ? Number.parseFloat(rate).toPrecision(4) : Number.parseFloat(rate).toPrecision(3);
    }

    return (
        <div>
            <h3>Boxscore</h3>
            <table>
                <tbody>
                    <tr>
                        <th>Spot</th>
                        <th>Player Name</th>
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
                    {props.games.map((game) => (
                        <tr>
                            <td>{game.lineupSpot}</td>
                            <td>
                                {game.player && (
                                    <Link to={`/playerPage/${game.player.id}`}>
                                        {formatPlayerName(game.player)}
                                    </Link>
                                )}
                            </td>
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
export default Boxscore;