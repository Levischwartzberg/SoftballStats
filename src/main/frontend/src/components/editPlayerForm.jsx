import React, { useEffect, useState } from 'react';
import API from '../utils/API';
import { useHistory } from 'react-router-dom'

function EditPlayerForm(props) {
    const [player, setPlayer] = useState({positionList: []});
    const [heightObj, setHeightObj] = useState({});
    const [deletebutton, setDeleteButton] = useState(false);

    useEffect(() => {
        loadPlayer();
    },[])

    function parseHeight(playerObj) {
        let feet = playerObj.height.split("'")[0];
        let inches = playerObj.height.split("'")[1];
        let newHeightObj = {
            feet: feet,
            inches: inches
        }
        setHeightObj(newHeightObj);
    }

    function loadPlayer() {
        API.getPlayerById(props.playerId)
            .then((res) => {
                let player = res.data;
                if(player.gameList.length === 0) {
                    setDeleteButton(true);
                }
                player.gameList = [];
                return player;
            })
            .then((player) => {
                setPlayer(player);
                parseHeight(player);
            })
            .catch((err) => console.log(err));
    }

    let history = useHistory();

    const redirect = () => {
        history.push(`/playerPage/${player.id}`);
    }

    function handleChange(event) {
		const { name, value } = event.target;
		setPlayer({ ...player, [name]: value });
	}

    function handleHeightChange(event) {
        const { name, value } = event.target;
        setHeightObj({ ...heightObj, [name]: value});
    }

    useEffect(() => {
        let heightString = heightObj.feet + "'" + heightObj.inches;
        setPlayer({...player, height: heightString});
    },[heightObj])

    function handleFormSubmit(event) {
        console.log(player);
        event.preventDefault();
        if (player.firstName) {
            API.updatePlayer(player)
            .then(() => redirect())
            .catch((err) => console.log(err));
        }
    }

    function deletePlayer(event) {
        event.preventDefault();
        API.deletePlayer(player.id)
            .then(history.push("/players"))
            .catch((error) => console.log(error));
    }

    return (
        <form className="player-form">
            <label htmlFor="firstName">
                First Name:
                <input className="player-input" onChange={handleChange} placeholder="First Name" type="text" name="firstName" value={player.firstName}/>
            </label>
            <label htmlFor="lastName">
                Last Name:
                <input className="player-input" onChange={handleChange} placeholder="Last Name" type="text" name="lastName" value={player.lastName}/>
            </label>
            <label htmlFor="weight">
                Weight:
                <input className="player-input" onChange={handleChange} placeholder="Weight" type="number" name="weight" min="50" max="500" value={player.weight}/>
            </label>
            <label htmlFor="height">
                Height:
                <span className="player-input">
                    <input onChange={handleHeightChange} value={heightObj.feet} type="number" name="feet" min="4" max="7"/>
                    <input onChange={handleHeightChange} value={heightObj.inches} type="number" name="inches" min="0" max="11"/>
                </span>
            </label>
            <label htmlFor="throwHand">
                Throwing Hand:
                {/* <input onChange={handleChange} placeholder="Throw Hand" type="text" name="throws" /> */}
                <select className="player-input" id = "dropdown" onChange={handleChange} name="throwHand">
                    <option value="Right" disabled={true}>Choose 1</option>
                    <option value="Right" selected={player.throwHand === "Right"}>Right</option>
                    <option value="Left" selected={player.throwHand === "Left"}>Left</option>
                </select>
            </label>
            <label htmlFor="batHand">
                Batting Side:
                {/* <input onChange={handleChange} placeholder="Throw Hand" type="text" name="throws" /> */}
                <select className="player-input" id = "dropdown" onChange={handleChange} name="batHand">
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
            {deletebutton === true && <button onClick={deletePlayer}>Delete</button>}

        </form>
    )
}
export default EditPlayerForm;