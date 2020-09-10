import React from 'react';
//import ContainersReducer from '../reducers/ContainersReducer';

const ModalDisplay = (props) => {

    const showModal = props.modalValid ? 'modal-conatiner display-block' : 'modal-conatiner display-none';
    
    const handleClose = () => {
        props.setModalValid(false);
    }

    return (
        <div className={showModal}>
            <div className="modal-header">
                <h5 className="modal-title">Error!</h5>
                <div className="modal-body">
                <p>{props.modalErrormessage}</p>
                </div>
                <div className="modal-footer">
                <button type="button" className="modal-btn-close" onClick={handleClose} >Close</button>
                </div>
            </div>
        </div>
    )
}

export default ModalDisplay;