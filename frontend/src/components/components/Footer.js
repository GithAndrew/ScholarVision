import React from 'react';
import '../css/Footer.css';
import { MdEmail, MdPlace } from "react-icons/md";
import { RiPhoneFill } from "react-icons/ri";

class Footer extends React.Component{
    render(){
        return(
            <footer>
                <div className='info-leftmost'> <MdEmail className='dot'/> scholardatabase_email@email.com</div>
                <div className='info-left'> <RiPhoneFill className='dot'/> (099) 999-9999</div>
                <div className='info-left'> <MdPlace className='dot'/> CAS Building, UPLB</div>
                <div className='copyright'>© University of the Philippines Los Baños</div>
            </footer>       
        );
    }
}

export default Footer