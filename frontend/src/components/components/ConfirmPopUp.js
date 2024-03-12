import Header from './Header'
import Footer from './Footer'
import Alert from '../components/Alert';
import {React, useState} from 'react';
import {apiUrl} from '../../apiUrl';
import '../css/PopUp.css'

function ConfirmPopUp (props) {

    const type = props.type;
    const toAccess = props.person;
    const toDo = props.toDo;

    const isArray = Array.isArray(toAccess)

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const showMessage = (message) => {
        setAlertMessage(message);
        toggleAlertPopUp()
    };

    const toggleAlertPopUp = () => {
        setShowAlert(!showAlert);
    };

    const acceptApplicant = (person) => {
        if (isArray) {
            for (let i = 0; i < person.length; i++){
                fetch(apiUrl("/scholar"), {
                    method: "POST",
                    credentials:'include',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        first_name: person[i].first_name,
                        last_name: person[i].last_name,
                        middle_name: person[i].middle_name,
                        suffix: person[i].suffix,
                        address: person[i].address,
                        student_no: person[i].student_no,
                        graduation_year: person[i].graduation_year,
                        mobile_no: person[i].mobile_no,
                        email: person[i].email,
                        birthday: person[i].birthday,
                        birthplace: person[i].birthplace,
                        sex: person[i].sex,
                        citizenship: person[i].citizenship,
                        father_details: person[i].father_details,
                        mother_details: person[i].mother_details,
                        guardian_details: person[i].guardian_details,
                        sibling_details:  person[i].sibling_details,
                        educational_bg: person[i].educational_bg,
                        applicant_link: person[i].applicant_link,
                        statement: person[i].statement,
                        upload_id: person[i].upload_id
                    })
                })
                .then(response => {return response.json()})
                .then(showMessage(`The applicant ${person[i].first_name} ${person[i].last_name} is accepted!`))
                .then(deleteApplicant(person[i]._id))
            }
            setTimeout(() => window.location.reload(), 450)
        } else {
            fetch(apiUrl("/scholar"), {
                method: "POST",
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    first_name: person.first_name,
                    last_name: person.last_name,
                    middle_name: person.middle_name,
                    suffix: person.suffix,
                    address: person.address,
                    student_no: person.student_no,
                    graduation_year: person.graduation_year,
                    mobile_no: person.mobile_no,
                    email: person.email,
                    birthday: person.birthday,
                    birthplace: person.birthplace,
                    sex: person.sex,
                    citizenship: person.citizenship,
                    father_details: person.father_details,
                    mother_details: person.mother_details,
                    guardian_details: person.guardian_details,
                    sibling_details:  person.sibling_details,
                    educational_bg: person.educational_bg,
                    applicant_link: person.applicant_link,
                    statement: person.statement,
                    upload_id: person.upload_id
                })
            })
            .then(response => {return response.json()})
            .then(showMessage(`The applicant ${person.first_name} ${person.last_name} is accepted!`))
            .then(deleteApplicant(person._id))
            .then(setTimeout(() => window.location.reload(), 450))
        }
    }

    const deleteApplicant = (id) => {
        fetch(apiUrl(`/${type}/`), {
            method: "DELETE",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                ids: [`${id}`],
            })
            
        }).then(response => {return response.json()})
    }

    const deletePerson = (id) => {
        if (isArray) {
            for (let i = 0; i < id.length; i++){
                fetch(apiUrl("/" + [type]), {
                    method: "DELETE",
                    credentials:'include',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        ids: [`${id[i]}`],
                    }) 
                }).then(response => {return response.json()})
            }
            setTimeout(() => window.location.reload(), 450)
        } else {
            fetch(apiUrl(`/${type}/`), {
                method: "DELETE",
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    ids: [`${id}`],
                })
                
            }).then(response => {return response.json()})
            .then(setTimeout(() => window.location.reload(), 450))
        }
    }

    return (
        <div>
            <Header/>
            <div className='popup-wrapper'>
                <div className="delete-popup-box">
                    {toDo === "accept" ? <p className='delete-label'>Confirm Acceptance?</p> : ""}
                    {toDo === "delete" ? <p className='delete-label'>Confirm Deletion?</p> : ""}
                    <div className="delete-buttons">
                        {toDo === "accept" ? <button className='upload-green-button' onClick = {() => acceptApplicant(toAccess)}>Accept</button> : ""}
                        {toDo === "delete" ? isArray ? <button className='delete-red-button' onClick = {() => deletePerson(toAccess)}>Delete</button> : 
                            <button className='delete-red-button' onClick = {() => deletePerson(toAccess._id)}>Delete</button>
                        : ""}
                        <button className='delete-gray-button' onClick={props.handleClose}>Cancel</button>
                    </div>
                </div>
            </div>
            {showAlert ? <Alert 
                message={alertMessage} 
                handleClose={toggleAlertPopUp} 
            />: ""}

            <Footer/>
        </div>
    )
}

export default ConfirmPopUp;
