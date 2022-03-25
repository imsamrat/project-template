import React, { useEffect, Fragment } from 'react';
import Modal from 'react-modal';
import {
    CButton,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBible, faFileVideo, faQuestionCircle, faTasks, faTimes, faTrophy, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { faWpforms } from '@fortawesome/free-brands-svg-icons'


// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

function CustomeModal(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
        if (props.clearState) {
            props.clearState();
        }
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: 20,
            ...props.customStyle
        }
    };

    useEffect(() => {
        if (props.openModal && props.openModal.edit) {
            openModal()
            if (props.clearState) {
                props.clearState();
            }
        }

    }, [props.openModal])


    useEffect(() => {
        if (props.closeModal) {
            if (props.closeModal.status === false && modalIsOpen) {
                setIsOpen(props.closeModal.status);
            }
        }

    }, [props.closeModal])


    function closeModal() {
        setIsOpen(false);
        if (props.handleCloseModal) {
            props.handleCloseModal();
        }
    }
   
    return (
        <div className="custom-modal">
            {props.editMode ? <Fragment></Fragment> :
                <CButton disabled={props?.disabled ?? false} type="button" onClick={openModal} className={`mt-2 btn btn-outline-primary custom-modal-button ${props.customModalCss || ""}`} size="md" >

                    {typeof props.title === "string" ? (
                        <>
                            {props.title === "Add Milestone" && <FontAwesomeIcon icon={faTrophy} className="mr-2" />}
                            {props.title === "Add Module" && <FontAwesomeIcon icon={faBible} className="mr-2" />}
                            {props.title?.includes("Video Content") && <FontAwesomeIcon icon={faFileVideo} className="mr-2" />}
                            {props.title?.includes("Assignment") && <FontAwesomeIcon icon={faTasks} className="mr-2" />}
                            {props.title?.includes("Quiz") && <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />}
                            {props.title?.includes("Post") && <FontAwesomeIcon icon={faFileAlt} className="mr-2" />}
                            {props.title?.includes("Form") && <FontAwesomeIcon icon={faWpforms} className="mr-2" />}
                            {props.title}
                        </>
                    ) : props.title}
                </CButton>
            }
            <Modal
                shouldCloseOnOverlayClick={false}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                appElement={document.getElementById('root')}
            >
                <div className="clearfix pl-3 pr-3">
                    {!props.noheading &&
                        <h4 className="float-left">
                            {props.title}
                        </h4>
                    }
                    {!props.noCloseIcon &&
                        <div className="float-right">
                            <FontAwesomeIcon
                                icon={faTimes}
                                onClick={event => closeModal()}
                                className="modal-close-icon"
                            />
                        </div>
                    }
                </div>
                {props.children}
            </Modal>
        </div>
    );
}

export default CustomeModal;