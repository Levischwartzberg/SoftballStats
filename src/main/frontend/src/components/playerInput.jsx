import React, { useEffect, useState } from 'react';
import API from '../utils/API';

function PlayerInput() {
    const [playerObject, setPlayerObject] = useState({});

    useEffect(() => {
        setPlayerObject({batHand: "Right", throwHand: "Right"});
    },[])

    function handleChange(event) {
		const { name, value } = event.target;
		setPlayerObject({ ...playerObject, [name]: value });
	}

    function handleFormSubmit(event) {
        event.preventDefault();
        if (playerObject.firstName) {
            API.addPlayer(
                {firstName: playerObject.firstName,
                lastName: playerObject.lastName,
                height: playerObject.height,
                weight: playerObject.weight,
                throwHand: playerObject.throwHand,
                batHand: playerObject.batHand
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
            <label htmlFor="throwHand">
                Throwing Hand
                {/* <input onChange={handleChange} placeholder="Throw Hand" type="text" name="throws" /> */}
                <select id = "dropdown" onClick={handleChange} name="throwHand">
                    <option value="Right" disabled="true">Choose 1</option>
                    <option value="Right">Right</option>
                    <option value="Left">Left</option>
                </select>
            </label>
            <label htmlFor="batHand">
                Batting Side
                {/* <input onChange={handleChange} placeholder="Throw Hand" type="text" name="throws" /> */}
                <select id = "dropdown" onClick={handleChange} name="batHand">
                    <option value="Right" disabled="true">Choose 1</option>
                    <option value="Right">Right</option>
                    <option value="Left">Left</option>
                    <option value="Switch">Switch</option>
                </select>
            </label>

            <button
					className={'btn submit'}
					type="submit"
					disabled={!(playerObject.firstName) || !(playerObject.lastName)}
					onClick={handleFormSubmit}
				>
					Save
			</button>

        </form>
    )
}

export default PlayerInput;