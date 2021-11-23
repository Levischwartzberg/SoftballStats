import React, { useEffect, useState } from 'react';
import { Dropdown } from "react-bootstrap";
import API from "../utils/API";
import AddSeasonPopup from './addSeasonPopup';
import styled from 'styled-components';

function SeasonForm(props) {
    const Button = styled.button`
        border: black solid 1px;
        margin: 5px;
        background-color: var(--darkGray);
        border-radius: 5px;
    `;

    const [seasons, setSeasons] = useState([]);
    const [gameSeason, setGameSeason] = useState({});
    const [seasonForm, setSeasonForm] = useState(false);

    useEffect(() => {
        loadSeasons();
    }, [])

    useEffect(() => {
        let seasonCopy = {...gameSeason};
        seasonCopy.resultList = [];
        props.setSeason(seasonCopy);
    },[gameSeason])

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

    function chooseSeason(seasonId) {
        seasons.forEach(season => {
            if(seasonId === season.id) {
                setGameSeason(season);
            }
        })
    }

    function createSeasonPopup(event) {
        event.preventDefault();
        setSeasonForm(true);
    }

    return (
        <div className="season-form">
            <Dropdown className="custom-dropdown">
                <Dropdown.Toggle variant="" id="dropdown-basic">
                    Choose Existing Season
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {seasons.map((season) => (
                        <Dropdown.Item key={season.id} value={season.id} onClick={() => chooseSeason(season.id)}> 
                            {season.session + " " + season.year}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <Button onClick={createSeasonPopup}>Create New Season</Button>
            {seasonForm === true && (
                <AddSeasonPopup setGameSeason={setGameSeason} open={seasonForm} seasonForm={setSeasonForm}></AddSeasonPopup>
            )}
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