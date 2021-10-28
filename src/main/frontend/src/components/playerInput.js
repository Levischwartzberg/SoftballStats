import React, { useEffect, useState } from 'react';
import API from '../utils/API';

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
        if (playerObject.firstName) {
            API.addPlayer(
                {firstName: playerObject.firstName,
                lastName: playerObject.lastName,
                height: playerObject.height,
                weight: playerObject.weight
            }).catch((err) => console.log(err));
        }
    }

    return (
        <form>
            <label htmlFor="firstName">
                First Name
                <input onChange={handleChange} placeholder="First Name" type="text" name="firstName" />
            </label>
            <label htmlFor="lastName">
                Last Name
                <input onChange={handleChange} placeholder="Last Name" type="text" name="lastName" />
            </label>
            <label htmlFor="weight">
                Weight
                <input onChange={handleChange} placeholder="Weight" type="text" name="weight" />
            </label>
            <label htmlFor="height">
                Height
                <input onChange={handleChange} placeholder="Height" type="text" name="height" />
            </label>

            <button
					className={'btn submit'}
					type="submit"
					disabled={!(playerObject.firstName)}
					onClick={handleFormSubmit}
				>
					Save
			</button>

        </form>
    )
}

export default PlayerInput;