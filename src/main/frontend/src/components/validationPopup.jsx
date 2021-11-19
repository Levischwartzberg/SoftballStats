import Modal from 'react-modal';

function ValidationPopup(props) {

    function closeModal() {
        props.setValidationAlert({open: false, message: ""});
    }

    return (
        <div>
            <Modal 
                isOpen={props.open}
                onRequestClose={closeModal}
                ariaHideApp={false}
            >
                <button onClick={closeModal}>X</button>
                <h3>{props.message}</h3>
            </Modal>
        </div>
    )
}
export default ValidationPopup;