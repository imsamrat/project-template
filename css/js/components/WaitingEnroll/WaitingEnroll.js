import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import RoundedButton from '../Common/RoundedButton';

const WaitingEnroll = (props) => {
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
                    <div className="text-center" >

                       <p className="p-5">
                           {
                               !props.registered ? ' আমাদের ১ম ব্যাচের কোর্স এনরোলমেন্ট শুরু হবে মার্চ ৫ তারিখ আর এনরোলমেন্ট শেষ হবে মার্চ ১৯ তারিখ। মার্চ ১৯ তারিখের পর একজনকেও এই ব্যাচে সুযোগ দেয়া হবে না। তুমি আপাতত রেজিস্ট্রেশন করে রাখো।':
                               'আমাদের ১ম ব্যাচের কোর্স এনরোলমেন্ট শুরু হবে মার্চ ৫ তারিখ আর এনরোলমেন্ট শেষ হবে মার্চ ১৯ তারিখ। মার্চ ১৯ তারিখের পর একজনকেও এই ব্যাচে সুযোগ দেয়া হবে না।'
                           }
                      
                       </p>

                        {!props.registered && <div className="mb-5">
                            <Link className="" to="/register">
                                <RoundedButton variant="contained">Register Now</RoundedButton>
                            </Link>
                        </div>}
                        

                       
                    </div>
                </div>

            </Modal>
        </div>
    );
};

export default WaitingEnroll;