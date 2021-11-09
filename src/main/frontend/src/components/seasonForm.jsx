import React, { useEffect, useState } from 'react';
import { Dropdown } from "react-bootstrap";
import API from "../utils/API";
import AddSeasonPopup from './addSeasonPopup';

function SeasonForm(props) {
    const [seasons, setSeasons] = useState([]);
    const [gameSeason, setGameSeason] = useState({});
    const [seasonForm, setSeasonForm] = useState(false);

    useEffect(() => {
        loadSeasons();
    }, [])

    useEffect(() => {
        props.setSeason(gameSeason);
    },[gameSeason])

    function loadSeasons() {
        API.getAllSeasons()
            .then((res) => {
                return res.data;
            })
            .then((seasons) => setSeasons(seasons))
            .catch((err) => console.log(err));
    }

    function chooseSeason(seasonId) {
        seasons.forEach(season => {
            if(seasonId == season.id) {
                setGameSeason(season);
            }
        })
    }

    function createSeasonPopup(event) {
        event.preventDefault();
        setSeasonForm(true);
    }

    function tester() {
        console.log(gameSeason);
    }

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Choose Existing Season
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {seasons.map((season) => (
                        <Dropdown.Item value={season.id} onClick={() => chooseSeason(season.id)}> 
                            {season.session + " " + season.year}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <button onClick={createSeasonPopup}>Create New Season</button>
            {seasonForm === true && (
                <AddSeasonPopup setGameSeason={setGameSeason} open={seasonForm} seasonForm={setSeasonForm}></AddSeasonPopup>
            )}
            <button onClick={tester}>tester</button>
            {(gameSeason.session && gameSeason.year) && (
                <label htmlFor="selected-season">
                    selected season
                    <h4 name="selected-season">{gameSeason.session + " " + gameSeason.year}</h4>
                </label>
            )}
        </div>
    )
}
export default SeasonForm;