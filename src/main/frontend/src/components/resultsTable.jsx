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
        API.getSeasonById(seasonId)
            .then((res) => {
                return res.data;
            })
            .then((season) => {
                setSeason(season);
                setResults(sortResultsByDate(season.resultList))
            })
            .catch((error) => console.log(error))
    }

    function sortResultsByDate(resultList) {
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
                        <tr key={result.id}>
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