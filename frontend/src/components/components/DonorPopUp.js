import Header from '../components/Header'
import Footer from '../components/Footer'
import {React, useState, useEffect} from 'react';
import {apiUrl} from '../../apiUrl';
import '../css/PopUp.css'

function DonorPopUp (props) {
    const scholar = props.scholar
    const [donor, setDonor] = useState([]);
    const [scholarships, setScholarship] = useState([]);

    const giveScholarship = (scholar, scholarship_id) => {
        fetch(apiUrl("/scholar/" + scholar._id), {
            method: "PUT",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                first_name: scholar.first_name,
                last_name: scholar.last_name,
                middle_name: scholar.middle_name,
                suffix: scholar.suffix,
                address: scholar.address,
                student_no: scholar.student_no,
                graduation_year: scholar.graduation_year,
                mobile_no: scholar.mobile_no,
                email: scholar.email,
                birthday: scholar.birthday,
                birthplace: scholar.birthplace,
                sex: scholar.sex,
                citizenship: scholar.citizenship,
                father_details: scholar.father_details,
                mother_details: scholar.mother_details,
                guardian_name: scholar.guardian_name,
                guardian_contact: scholar.guardian_contact,
                sibling_details:  scholar.sibling_details,
                educational_bg: scholar.educational_bg,
                statement: scholar.statement,
                upload_id: scholar.upload_id,
                scholarship_id: scholarship_id
            })
        })
        .then(response => {return response.json()})
        .then(setTimeout(() => window.location.reload(), 450))
    }

    useEffect(() => {
        Promise.all([
            fetch(apiUrl(`/donor`)),
            fetch(apiUrl(`/scholarship`))
        ])
        .then(([resDonors, resScholarship]) => {
            return Promise.all([
                resDonors.json(), resScholarship.json()
            ]);
        })
        .then(([dataDonors, dataScholarship]) => {
            setDonor(dataDonors);
            setScholarship(dataScholarship);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }, []);

    return (
        <div>
            <Header/>
            <div className="popup-wrapper">
                <div className="donor-popup-box">
                    <span className="close-icon" onClick={props.handleClose}>x</span>
                    <table className='list-table'>
                        <thead>
                            <tr className='header-row'>
                                <th className='list-headr'>DONOR NAME</th>
                                <th className='list-headr'>EMAIL</th>
                                <td className='list-headr'>SCHOLARSHIP DETAILS</td>
                                <td className='list-headr'>ASSIGN HERE?</td>
                            </tr>
                        </thead>
                        <tbody>
                            {donor.map((person, i) => {
                                return (
                                    <tr className='list-row' key={i}>
                                        <td className='list-cll'><div>{person.last_name}, {person.first_name}{person.middle_name ? ', ' + person.middle_name : ""} {person.suffix ? ', ' + person.suffix + " " : ''}</div></td>
                                        <td className='list-cll'><a href={`mailto: ${person.email}`} className='email-color'>{person.email}</a></td>
                                        {scholarships.map((scholarship) => {
                                            return (
                                                (person._id === scholarship.donor_id ? <>
                                                    <td className='list-cll'>{scholarship.grant} {scholarship.details} </td>
                                                    <td className='list-cll'><button className='app-green-button' onClick={() => giveScholarship(scholar, scholarship._id)}>YES</button></td>
                                                </> : "")
                                            )
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <Footer/>
        </div>
    );
};
 
export default DonorPopUp;
