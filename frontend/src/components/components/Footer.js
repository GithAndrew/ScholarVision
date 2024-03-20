import {React, useState, useEffect} from 'react';
import {apiUrl} from '../../apiUrl';
import { MdEmail, MdPlace } from "react-icons/md";
import { RiPhoneFill } from "react-icons/ri";
import '../css/Footer.css';

const Footer = () => {
    const [school, setSchool] = useState([]);
    const storedValue = localStorage.getItem('mainSchool');

    useEffect(() => {
        Promise.all([
            fetch(apiUrl(`/school/${storedValue}`), {credentials:'include'})
        ])
        .then(([resSchools]) => {
            return Promise.all([
                resSchools.json()
            ]);
        })
        .then(([dataSchools]) => {
            if (dataSchools.message === "school not found") {setSchool("")}
            else {setSchool(dataSchools);}
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }, [storedValue]);

    return(
        <footer>
            {school ? <div className='info-leftmost'> <MdEmail className='dot'/>{school.email}</div> : 
                <div className='info-leftmost'> <MdEmail className='dot'/> scholardatabase_email@email.com</div>
            }
            {school ? <div className='info-left'> <RiPhoneFill className='dot'/> {school.contact_no}</div> : 
                <div className='info-left'> <RiPhoneFill className='dot'/> (XXXX) XXX-XXXX</div>
            }
            {school ?  <div className='info-left'> <MdPlace className='dot'/> {school.location} </div> : 
                 <div className='info-left'> <MdPlace className='dot'/> location </div>
            }           
            <div className='copyright'>© ScholarVision (University of the Philippines Los Baños)</div>
        </footer>       
    );
}

export default Footer