import React, { useEffect, useState } from 'react';
import PlayerInput from './playerInput';
import API from "../utils/API";
import Modal from 'react-modal';

function PlayerPopup(props) {
    const [playerObj, setPlayerObj] = useState({});
    const [players, setPlayers] = useState([]);
    const [createNew, setCreateNew] = useState(false);
    
    useEffect(() => {
        console.log(props.spot)
        loadPlayers();
    },[]);

    function loadPlayers() {
        API.getPlayers()
        .then((res) => {
            let playerArray = res.data.sort(function(player1, player2) {
                let p1Last = player1.lastName;
                let p1First = player1.firstName;
                let p2Last = player2.lastName;
                let p2First = player2.firstName;

                if (p1Last < p2Last) {
                    return -1;
                } else if (p1Last > p2Last) {
                    return 1;
                } else {
                    if (p1First < p2First) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                }
            });
            return playerArray;
        })
            .then((players) => setPlayers(players))
            .catch((err) => console.log(err));
    }

    function choosePlayer(event) {
        let playerName = event.target.value;
        players.forEach(player => {
            if(playerName === player.lastName + ", " + player.firstName) {
                setPlayerObj(player);
            }
        })
    }

    function closeModal() {
        props.setPlayerPopup(false);
    }

    function chooseExistingPlayer(event) {
        event.preventDefault();
        console.log(playerObj);
        playerObj.lineupSpot = props.spot;
        let lineupCopy = [...props.lineup];
        lineupCopy[props.spot - 1] = playerObj;
        props.setLineup(lineupCopy);
        closeModal();
    }

    function createNewPlayer(event) {
        event.preventDefault();
        setCreateNew(!createNew);
    }

    function saveNewPlayer(newPlayerObj) {
        console.log(newPlayerObj)
        newPlayerObj.lineupSpot = props.spot;
        newPlayerObj.gameList = [];
        newPlayerObj.positionList = [];
        let lineupCopy = [...props.lineup];
        lineupCopy[props.spot - 1] = newPlayerObj;
        props.setLineup(lineupCopy);
        setPlayerObj(newPlayerObj);
        closeModal();
    }

    return (
        <div>
            <Modal 
                isOpen={props.open}
                onRequestClose={closeModal}
                ariaHideApp={false}
            >
                <button onClick={closeModal}>X</button>
                <label htmlFor="chooseExisting">
                    Choose Existing Player
                    <select name="existingPlayer" id="chooseExisting" onClick={choosePlayer}>
                        <option disabled={true} selected={true}>
                            Choose Existing Player 
                        </option>
                        {players.map((player) => (
                            <option key={player.id}>{player.lastName + ", " + player.firstName}</option>
                        ))}
                    </select>
                </label>
                <button onClick={chooseExistingPlayer}>Choose Existing</button>
                <br/> <br/> <br/>
                <label htmlFor="createNewPlayer">
                    <button onClick={createNewPlayer}>Create New Player</button>
                    {createNew && (
                        <PlayerInput saveNewPlayer={saveNewPlayer}></PlayerInput>
                    )}
                </label>
            </Modal>
        </div>
    )
}
export default PlayerPopup;