import { useEffect, useState } from "react";
import API from "../utils/API";
import {Link} from 'react-router-dom';

function ResultsTable(props) {
    const [season, setSeason] = useState({});
    const [results, setResults] = useState([]);

    useEffect(() => {
        loadResults(props.seasonId);
    }, [])

    function loadResults(seasonId) {
        console.log(seasonId)
        API.getSeasonById(seasonId)
            .then((res) => {
                console.log(res.data);
                return res.data;
            })
            .then((season) => {
                setSeason(season);
                setResults(season.resultList)
            })
            .catch((error) => console.log(error))
    }

    function convertDateTime(dateTime) {
        return dateTime.split("T")[0] + " " + dateTime.split("T")[1].split(".")[0];
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Game Date</th>
                        <th>Result</th>
                        <th>Score</th>
                        <th>Box Score</th>
                    </tr>
                    {results.map((result) => (
                        <tr>
                            <td>{convertDateTime(result.date)}</td>
                            <td>{result.result}</td>
                            <td>{result.score}</td>
                            <td>
                                <Link to={`/boxscore/${result.id}`}>
                                    boxscore
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ResultsTable;