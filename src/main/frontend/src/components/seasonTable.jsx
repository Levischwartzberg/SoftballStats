import API from "../utils/API";
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

function SeasonTable() {
    const [seasons, setSeasons] = useState([]);
    useEffect(() => {
        loadSeasons();
    }, [])

    function loadSeasons() {
        API.getAllSeasons()
            .then((res) => {
                return res.data;
            })
            .then((seasons) => setSeasons(seasons))
            .catch((err) => console.log(err));
    }
    
    return (
        <div>
            <h1 className="table-header">Seasons</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Year</th>
                        <th>Session</th>
                    </tr>
                    {seasons.map((season) => (
                        <tr key={season.id}>
                            <td>
                                <Link to={`seasonPage/${season.id}`}>
                                    {season.year}
                                </Link>
                            </td>
                            <td>
                                <Link to={`seasonPage/${season.id}`}>
                                    {season.session}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SeasonTable;