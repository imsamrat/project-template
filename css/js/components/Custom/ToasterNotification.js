import React, { useState } from 'react';
import successIcon from '../../assets/images/icons/checkmark-circle-2.png';
import failedIcon from '../../assets/images/icons/close-circle.png';

// Custom Toaster Notification component
const ToasterNotification = ({success, message, autoDismiss}) => {
    const [visible, setVisible] = useState(true)
    if(autoDismiss) {
        setTimeout(() => {
            setVisible(false)
        }, 1000)
    }
    return (
        <>
         {
            visible &&  <div
                className="text-white mx-auto p-2 w-75 d-flex align-items-center"
                style={{ backgroundColor: success ? '#3AC55A' : '#E65050' ,  borderRadius: 52 }}
            >
            <img src={success ? successIcon : failedIcon} alt="..." />
            <p className="text-center w-75 d-block m-0">{message}</p>

        </div>
         }
        </>
       
        
    );
};

export default ToasterNotification;