import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';

function AddSeasonPopup(props) {
    const [seasonObj, setSeasonObj] = useState({});

    useEffect(() => {
        setSeasonObj({session: "Spring"})
    }, [])

    function closeModal() {
       props.seasonForm(false);
    }

    function handleChange(event) {
		const { name, value } = event.target;
		setSeasonObj({ ...seasonObj, [name]: value });
	}

    function handleFormSubmit(event) {
        event.preventDefault();
        props.setGameSeason(seasonObj);
        props.seasonForm(false);
    }

    return (
        <div>
            <Modal 
                isOpen={props.open}
                onRequestClose={closeModal}
                ariaHideApp={false}
            >
                <button onClick={closeModal}>X</button>
                <h2>
                    Create New Season
                </h2>
                <form action="">
                    <label htmlFor="year">
                        Year
                        <input onChange={handleChange} type="number" min="2020" max="2025" step="1" placeholder="2020" name="year" />
                    </label>
                    <label htmlFor="session">
                        Session
                        <select id = "dropdown" onClick={handleChange} name="session">
                            <option value="" disabled="true">Choose 1</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                            <option value="Fall">Fall</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                    <button
					className={'btn submit'}
					type="submit"
					disabled={!(seasonObj.year) || !(seasonObj.session)}
					onClick={handleFormSubmit}
				>
					Save
			</button>

                </form>
            </Modal>
        </div>
    )
}
export default AddSeasonPopup;