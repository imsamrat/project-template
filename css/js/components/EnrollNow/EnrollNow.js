import React, { useState, useEffect } from 'react';
import LoginRegisterForm from '../Forms/LoginRegistarForm/loginRegisterForm';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const EnrollNow = (props) => {
    const [buttonActive, setButtonActive] = useState({
        login: false,
        register: true
    });

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            width: '36%',
            bottom: 'auto',
            overflow: 'visible',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: 20

        }
    }

    const handleActiveButton = (event, type) => {
        setButtonActive({
            [type]: true
        })
    }

    return (
        <div className="easy-checkout-modal" >
            <Modal
                id="easy-checkout-modal"
                isOpen={props.modalIsOpen}
                style={customStyles}
            >
                <div className="enroll-modal">
                    <div className="ml-3 mr-2">
                        <div className="d-flex justify-content-end">
                            <FontAwesomeIcon className="enroll-modal-close-icon" icon={faTimes}
                                style={{ cursor: 'pointer' }}
                                onClick={event => props.handleModalClose(event)}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="enroll-now-tab d-flex justify-content-between w-100">
                            <div className="w-50 text-center">
                                <button onClick={event => handleActiveButton(event, "register")} className={`${buttonActive.register && "enroll-now-nav-active-button"} enroll-now-nav-button`}>
                                    REGISTER
                                </button>
                            </div>
                            <div className="w-50 text-center">
                                <button onClick={event => handleActiveButton(event, "login")} className={`${buttonActive.login && "enroll-now-nav-active-button"} enroll-now-nav-button`}>
                                    LOGIN
                                </button>
                            </div>
                        </div>

                        {buttonActive.login && <LoginRegisterForm
                            label="Login"
                            redirect="/checkout"
                            easyCheckout="true"
                        />
                        }

                        {buttonActive.register && <LoginRegisterForm
                            label="Register"
                            redirect="/checkout"
                            easyCheckout="true"
                        />
                        }
                    </div>
                </div>

            </Modal>
        </div>
    );
};

export default EnrollNow;