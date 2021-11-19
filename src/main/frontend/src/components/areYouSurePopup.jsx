import API from '../utils/API';
import Modal from 'react-modal';
import { useHistory } from 'react-router';

function DeletePopup(props) {

    function closeModal() {
        props.setDeletePopup(false);
    }

    let history = useHistory();

    const redirect = (page) => {
        history.push(`/${page}`);
    }

    function deleteResult(result) {
        API.deleteResultAndGames(result.season.id, result.id)
        .then(() => redirect(`seasonPage/${result.season.id}`))
        .catch((err) => console.log(err));
    }

    return (
        <div>
            <Modal 
                isOpen={props.open}
                onRequestClose={closeModal}
                ariaHideApp={false}
            >
                <button onClick={closeModal}>X</button>
                <h3>Are you sure you want to delete this result? It will delete all the stats from this particular game.</h3>
                <button className={'btn submit'} onClick={(event) => {event.preventDefault(); deleteResult(props.result)}}>
					Yes I'm Sure
			    </button>
            </Modal>
        </div>
    )
}
export default DeletePopup;