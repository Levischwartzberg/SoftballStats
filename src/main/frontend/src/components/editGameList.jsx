import React, { useEffect, useState } from 'react';
import { Dropdown } from "react-bootstrap";
import {Link} from 'react-router-dom';
import API from "../utils/API";

function EditGameList() {
    const [gameList, setGameList] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [season, setSeason] = useState({});

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

    function loadResults(seasonId) {
        API.getSeasonById(seasonId)
            .then((res) => {
                return res.data;
            })
            .then((season) => {
                setSeason(season);
                setGameList(season.resultList)
            })
            .catch((error) => console.log(error))
    }

    function convertDateTime(dateTime) {
        if(dateTime) {
            return dateTime.split("T")[0] + " " + dateTime.split("T")[1].split(".")[0];
        }
        return null;
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
        </div>
    )
}
export default EditGameList;