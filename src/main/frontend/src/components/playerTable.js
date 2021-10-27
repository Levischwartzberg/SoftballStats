import React, { useEffect, useState } from 'react';
import API from '../utils/API';

function PlayerTable() {

    const [players, setPlayers] = useState([]);
    useEffect(() => {
        loadPlayers();
    }, []);

    function loadPlayers() {
        API.getPlayers()
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
    }

    return (
        <header>
            <h1>
                Test Header
            </h1>
        </header>
    )
}

export default PlayerTable;