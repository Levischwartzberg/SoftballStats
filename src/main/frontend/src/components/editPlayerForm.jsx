import React, { useEffect, useState } from 'react';
import API from '../utils/API';
import { useHistory } from 'react-router-dom'

function EditPlayerForm(props) {
    const [player, setPlayer] = useState({});
    useEffect(() => {
        loadPlayer();
    },[])

    function loadPlayer() {
        API.getPlayerById(props.playerId)
            .then((res) => {
                let person = res.data;
                return person;
            })
            .then((person) => setPlayer(person))
            .catch((err) => console.log(err));
    }

    let history = useHistory();

    const redirect = () => {
        console.log("redirect");
        history.push(`/playerPage/${player.id}`);
    }

    function handleChange(event) {
		const { name, value } = event.target;
		setPlayer({ ...player, [name]: value });
	}

    function handleFormSubmit(event) {
        console.log(player)
        event.preventDefault();
        if (player.firstName) {
            API.updatePlayer(player)
            .then(() => redirect())
            .catch((err) => console.log(err));
        }
    }

    return (
        <form>
            <label htmlFor="firstName">
                First Name
                <input onChange={handleChange} placeholder="First Name" type="text" name="firstName" value={player.firstName}/>
            </label>
            <label htmlFor="lastName">
                Last Name
                <input onChange={handleChange} placeholder="Last Name" type="text" name="lastName" value={player.lastName}/>
            </label>
            <label htmlFor="weight">
                Weight
                <input onChange={handleChange} placeholder="Weight" type="text" name="weight" value={player.weight}/>
            </label>
            <label htmlFor="height">
                Height
                <input onChange={handleChange} placeholder="Height" type="text" name="height" value={player.height}/>
            </label>
            <label htmlFor="throwHand">
                Throwing Hand
                {/* <input onChange={handleChange} placeholder="Throw Hand" type="text" name="throws" /> */}
                <select id = "dropdown" onClick={handleChange} name="throwHand">
                    <option value="Right" disabled={true}>Choose 1</option>
                    <option value="Right" selected={player.throwHand === "Right"}>Right</option>
                    <option value="Left" selected={player.throwHand === "Left"}>Left</option>
                </select>
            </label>
            <label htmlFor="batHand">
                Batting Side
                {/* <input onChange={handleChange} placeholder="Throw Hand" type="text" name="throws" /> */}
                <select id = "dropdown" onClick={handleChange} name="batHand">
                    <option value="Right" disabled={true}>Choose 1</option>
                    <option value="Right" selected={player.batHand === "Right"}>Right</option>
                    <option value="Left" selected={player.batHand === "Left"}>Left</option>
                    <option value="Switch" selected={player.batHand === "Switch"}>Switch</option>
                </select>
            </label>

            <button
					className={'btn submit'}
					type="submit"
					disabled={!(player.firstName) || !(player.lastName)}
					onClick={handleFormSubmit}
				>
					Save
			</button>

        </form>
    )
}
export default EditPlayerForm;