import Alert from '../components/Alert';
import {React, useState} from 'react';
import {apiUrl} from '../../apiUrl';

function SchoolPopUp (props) {

    const [picID, setPicID] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [counter, setCounter] = useState(1);
    let missingFields = [];

    const showMessage = (message) => {
        setAlertMessage(message);
        toggleAlertPopUp()
    };

    const toggleAlertPopUp = () => {
        setShowAlert(!showAlert);
    };

    const sendData = (e) => {
        e.preventDefault();

        if (picID === undefined) {
            showMessage('No image set!');
            return
        }

        const school_name = getValue("schoolName", true);
        const email = getValue("schoolEmail", true);
        const contact_no = getValue("schoolNumber", true);
        const location = getValue("schoolLocation", true);
        const member_emails = getEmails();

        if (missingFields.length !== 0) {
            return
        } else {
            fetch(apiUrl("/school"), {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    school_name: school_name,
                    email: email,
                    contact_no: contact_no,
                    location: location,
                    upload_id: picID,
                    member_emails: member_emails
                })
            })
            .then(response => response.json())
            .then(data => {
                const schoolID = data.school._id;
                localStorage.setItem('mainSchool', schoolID)
            })
            .then(showMessage(`School ${school_name} registered!`))
            .catch(error => {
                console.error('Error submitting application:', error);
            });
        }
        setTimeout(() => window.location.reload(), 750)
    }

    const getValue = (id, required = false) => {
        const element = document.getElementById(id);
        const value = element ? element.value : '';

        let showID = ""

        if (id === "emailaddress") {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(value)) {
                showMessage("Not a valid email!");
                missingFields.push(id);
                return;
            }
        }

        if (missingFields.length !== 0 && missingFields[0] === id && value !== '') {
            missingFields = []
        } else if (missingFields.length !== 0) {
            return
        }

        if (required && value === '') {
            missingFields.push(id);
            if (id === "schoolName") {showID = "School Name"}
            if (id === "schoolEmail") {showID = "School Email"}
            if (id === "schoolNumber") {showID = "School Contact Number"}
            if (id === "schoolLocation") {showID = "School Location"}
            showMessage(`Missing the value for ${showID}!`);
        } else {
            return value;
        }
    };

    const addRow = () => {
        let systemMemberCounter = counter + 1;
        const table = document.getElementById('system-member-table');

        const newRow = table.insertRow(-1);
        const existingRow = table.rows[1];

        for (let i = 0; i < existingRow.cells.length; i++) {
            const existingCell = existingRow.cells[i];
            const newCell = newRow.insertCell(i);
            newCell.colSpan = '2';
            const input = document.createElement('input');
            input.type = 'email';
            input.className='school-input';
            input.id = existingCell.querySelector('input').id.replace(/\d+/g, systemMemberCounter);
            newCell.appendChild(input);
        }

        setCounter(systemMemberCounter);
    }

    const getEmails = () => {
        const systemUsers = [];
        for (let i = 1; i <= counter; i++) {
            systemUsers.push(getValue(`system-member-${i}`));
        }
        return systemUsers;
    }

    const openImageFile = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                if (img.width !== img.height) {
                    showMessage('Please upload a square image.');
                    setImageSrc(null);
                } else {
                    setImageSrc(reader.result);
                    const data = new FormData();
                    data.append("image", e.target.files[0]);
            
                    fetch(apiUrl("/upload"), {
                      method: "POST",
                      body: data,
                      credentials:'include'
                    }).then((response) => response.json())
                    .then((result) => {
                        setPicID(result.id);
                    });
                }
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    return (
        <div>
            <div className='popup-wrapper'>
                <div className="school-popup-box">
                    <p className='add-label'>School Details</p>
                    <table>
                        <tr className='table-form-tr'>
                            <th className='table-form-th'>School Name</th>
                            <td rowSpan='10'>
                                {imageSrc && (
                                    <div className='uploaded-school-image'>
                                        <img src={imageSrc} alt="Uploaded" />
                                    </div>
                                )}
                                <div className='upload-school-photo-box'>
                                    <label htmlFor="upload-school-logo" className="upload-school-label">Upload School Logo</label>
                                    <input type="file" id="upload-school-logo" accept=".png,.jpg" onChange={openImageFile}/>
                                </div>
                            </td>
                        </tr>
                        <tr className='table-form-tr'><td className='table-form-td'><input className='school-input' type = "text" id = "schoolName" required></input></td></tr>
                        <tr className='table-form-tr'><th className='table-form-th'>Email</th></tr>
                        <tr className='table-form-tr'><td className='table-form-td'><input className='school-input' type = "text" id = "schoolEmail" required></input></td></tr>
                        <tr className='table-form-tr'><th className='table-form-th'>School Contact Number</th></tr>
                        <tr className='table-form-tr'><td className='table-form-td'><input className='school-input' type = "text" id = "schoolNumber" required></input></td></tr>
                        <tr className='table-form-tr'><th className='table-form-th'>School Location</th></tr>
                        <tr className='table-form-tr'><td className='table-form-td'><input className='school-input' type = "text" id = "schoolLocation" required></input></td></tr>
                    </table>
                                        
                    <div className="school-column">
                        <table id="system-member-table" className='table-form'>
                            <thead>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th-1'>Email of Scholar Committee Members</th>
                                    <th><button id="add-systemmember-btn" className='school-green-button' onClick={addRow}>Add</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td-1' colSpan='2'>
                                        <input type="email" className='school-input' id="system-member-1" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button className='add-green-button' onClick={sendData}>Confirm</button>
                </div>
            </div>
            {showAlert ? <Alert
                message={alertMessage} 
                handleClose={toggleAlertPopUp} 
           />: ""}
        </div>
    )
}

export default SchoolPopUp;
