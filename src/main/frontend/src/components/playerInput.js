import React, { useEffect, useState } from 'react';
import API from '../utils/API';
import PlayerTable from './playerTable';

function PlayerInput() {
    const [playerObject, setPlayerObject] = useState({});

    function handleChange(event) {
		const { name, value } = event.target;
		setPlayerObject({ ...playerObject, [name]: value });
	}
    // function handleHitsChange(event) {
	// 	const { hits, value } = event.target;
	// 	setPlayerObject({ ...playerObject, [hits]: value });
	// }
    // function handleAbsChange(event) {
	// 	const { atBats, value } = event.target;
	// 	setPlayerObject({ ...playerObject, [atBats]: value });
	// }

    function handleFormSubmit(event) {
        event.preventDefault();
        if (playerObject.name) {
            API.addPlayer(
                {name: playerObject.name,
                hits: playerObject.hits,
                atBats: playerObject.atBats
            }).catch((err) => console.log(err));
        }
    }

    return (
        <form>
            <label htmlFor="name">
                <input onChange={handleChange} placeholder="Name" type="text" name="name" />
            </label>
            <label htmlFor="hits">
                <input onChange={handleChange} placeholder="Hits" type="text" name="hits" />
            </label>
            <label htmlFor="atBats">
                <input onChange={handleChange} placeholder="atBats" type="text" name="atBats" />
            </label>

            <button
					className={'btn submit'}
					type="submit"
					disabled={!(playerObject.name)}
					onClick={handleFormSubmit}
				>
					Save
			</button>

        </form>
    )
}

export default PlayerInput;