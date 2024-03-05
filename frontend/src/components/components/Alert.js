import React from 'react';
import '../css/Alert.css'

const CustomAlert = (props) => {
    return (
        <div className="popup-wrapper">
            <div className="alert">
                <p className='alert-label'> SCHOLARVISION</p>
                <p className='alert-message'>{props.message}</p>
                <button className='alert-button' onClick={props.handleClose}>OK</button>
            </div>
        </div>
    );
};

export default CustomAlert;
