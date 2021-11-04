import API from "../utils/API";
import React, { useEffect, useState } from 'react';

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
            <h1>Seasons</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Year</th>
                        <th>Session</th>
                    </tr>
                    {seasons.map((season) => (
                        <tr>
                            <td>{season.year}</td>
                            <td>{season.session}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SeasonTable;