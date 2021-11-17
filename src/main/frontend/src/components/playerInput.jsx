import React, { useEffect, useState } from 'react';
import API from '../utils/API';
import { useHistory } from 'react-router-dom'

function PlayerInput(props) {
    const [playerObject, setPlayerObject] = useState({});
    const [heightObj, setHeightObj] = useState({feet: 6, inches: 0});

    useEffect(() => {
        setPlayerObject({batHand: "Right", throwHand: "Right"});
    },[])

    let history = useHistory();

    const redirect = () => {
        console.log("redirect");
        history.push('/players');
    }

    function handleChange(event) {
		const { name, value } = event.target;
		setPlayerObject({ ...playerObject, [name]: value });
	}

    function handleHeightChange(event) {
        const { name, value } = event.target;
        setHeightObj({ ...heightObj, [name]: value});
    }

    useEffect(() => {
        let heightString = heightObj.feet + "'" + heightObj.inches;
        setPlayerObject({...playerObject, height: heightString});
    },[heightObj])

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
            }).then((player) => {
                if(history.location.pathname === "/admin/addPlayer"){
                    redirect();
                }
                else {
                    props.saveNewPlayer(player.data);
                }
            })
            .catch((err) => console.log(err));
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
                Weight (lbs)
                <input onChange={handleChange} placeholder="Weight" type="number" name="weight" min="50" max="500"/>
            </label>
            <label htmlFor="height">
                Height
                <input onChange={handleHeightChange} value={heightObj.feet} type="number" name="feet" min="4" max="7"/>
                <input onChange={handleHeightChange} value={heightObj.inches} type="number" name="inches" min="0" max="11"/>
            </label>
            <label htmlFor="throwHand">
                Throwing Hand
                {/* <input onChange={handleChange} placeholder="Throw Hand" type="text" name="throws" /> */}
                <select id = "dropdown" onClick={handleChange} name="throwHand">
                    <option value="Right" disabled={true}>Choose 1</option>
                    <option value="Right">Right</option>
                    <option value="Left">Left</option>
                </select>
            </label>
            <label htmlFor="batHand">
                Batting Side
                {/* <input onChange={handleChange} placeholder="Throw Hand" type="text" name="throws" /> */}
                <select id = "dropdown" onClick={handleChange} name="batHand">
                    <option value="Right" disabled={true}>Choose 1</option>
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