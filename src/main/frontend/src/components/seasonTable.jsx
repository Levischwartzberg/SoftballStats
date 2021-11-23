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
                let sortedByYearAndSession = res.data.sort(function(season1, season2) {
                    let year1 = season1.year;
                    let year2 = season2.year;
                    let session1ValueObj = {spring: 0, summer: 1, fall: 2, other: 3};
                    let session2ValueObj = {spring: 0, summer: 1, fall: 2, other: 3};

                    if(year1 < year2) {
                        return -1;
                    }
                    else if (year1 > year2) {
                        return 1;
                    }
                    else {
                        if (session1ValueObj[season1.session] <= session2ValueObj[season2.session]) {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    }
                })
                return sortedByYearAndSession;
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