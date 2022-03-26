import React, { useEffect, useState } from 'react';
import { Dropdown } from "react-bootstrap";
import {Link} from 'react-router-dom';
import API from "../utils/API";

function EditGameList() {
    const [gameList, setGameList] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [season, setSeason] = useState({});
    const [deleteButton, setDeleteButton] = useState(false);

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

    function loadResults(seasonId) {
        API.getSeasonById(seasonId)
            .then((res) => {
                return res.data;
            })
            .then((season) => {
                setSeason(season);
                setGameList(sortResultsByDate(season.resultList))
            })
            .catch((error) => console.log(error))
    }

    function sortResultsByDate(resultList) {
        if(resultList.length === 0) {
            setDeleteButton(true);
        }
        let ordered = resultList.sort(function(result1, result2) {
            let date1 = result1.date;
            let date2 = result2.date;

            if (date1 < date2) {
                return -1;
            }
            else {
                return 1;
            }
        })
        return ordered;
    }

    function convertDateTime(dateTime) {
        if(dateTime) {
            return dateTime.split("T")[0] + " " + dateTime.split("T")[1].split(".")[0];
        }
        return null;
    }

    function deleteSeason(event) {
        event.preventDefault();
        API.deleteSeason(season.id)
            .then((res) => {
                return res.data;
            })
            .then((season) => {
                setSeason({});
                setDeleteButton(false);
                loadSeasons();
            })
            .catch((error) => console.log(error))
    }


    return (
        <div>
            <Dropdown className="custom-dropdown">
                <Dropdown.Toggle variant="" id="dropdown-basic">
                    Choose Existing Season
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {seasons.map((season) => (
                        <Dropdown.Item key={season.id} value={season.id} onClick={() => loadResults(season.id)}> 
                            {season.session + " " + season.year}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            {season.year != null && (<h2>{season.session + " " + season.year}</h2>)}
            {gameList.length > 0 && (
                <table>
                    <tbody>
                        <tr>
                            <th>Game Date</th>
                            <th>Result</th>
                            <th>Score</th>
                            <th>Edit</th>
                        </tr>
                        {gameList.map((result) => (
                            <tr key={result.id}>
                                <td>{convertDateTime(result.date)}</td>
                                <td>{result.result}</td>
                                <td>{result.score}</td>
                                <td>
                                    <Link to={`/admin/editOneGame/${result.id}`}>
                                        Edit Game
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {deleteButton === true && <button onClick={deleteSeason}> Delete Season </button>}
        </div>
    )
}
export default EditGameList;