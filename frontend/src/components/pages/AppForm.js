import Header from '../components/Header'
import Footer from '../components/Footer'
import {React, useEffect, useState} from 'react';
import {apiUrl} from '../../apiUrl';
import {Link} from 'react-router-dom'
import '../css/AppForm.css'

const AppForm = () => {

    let missingFields = [];
    const [allEmails, setAllEmails] = useState([]);

    const sendData = (e) => {
        e.preventDefault();
    
        const tempEmail = getValue("emailaddress", true);
        const notuniqueEmail = !allEmails.includes(tempEmail);

        if (notuniqueEmail) {
            const last_name = getValue("surname", true);
            const first_name = getValue("firstname", true);
            const middle_name = getValue("middlename");
            const birthday = getValue("birthdate", true);
            const birthplace = getValue("birthplace", true);
            const sex = getValue("sex", true);
            const suffix = getValue("suffix");
            const citizenship = getValue("citizenship", true);
            const mobile_no = getValue("contactnum", true);
            const student_no = getValue("studentno", true);
            const graduation_year = getValue("gradyear", true);

            const address = {
                street: getValue("streetname", true),
                subd: getValue("subdivision", true),
                brgy: getValue("barangay", true),
                city: getValue("city", true),
                province: getValue("province", true),
                postal_code: getValue("postalcode", true)
            };

            const father_details = getPersonDetails("father");
            const mother_details = getPersonDetails("mother");
            const guardian_name = getValue("guardianname");
            const guardian_contact = getValue("guardiannum");
            const sibling_details = getSiblingDetails();
            const educational_bg = getEducationDetails();
            const statement = getValue("appreason", true);
            getValue("agree", true);

            if (missingFields.length !== 0) {
                return
            } else {
                fetch(apiUrl("/applicant"), {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        last_name: last_name,
                        first_name: first_name,
                        middle_name: middle_name,
                        suffix: suffix,
                        address: address,
                        student_no: student_no,
                        graduation_year: graduation_year,
                        mobile_no: mobile_no,
                        email: tempEmail,
                        birthday: birthday,
                        birthplace: birthplace,
                        sex: sex,
                        citizenship: citizenship,
                        father_details: father_details,
                        mother_details: mother_details,
                        guardian_name: guardian_name,
                        guardian_contact: guardian_contact,
                        sibling_details: sibling_details,
                        educational_bg: educational_bg,
                        statement: statement,
                        upload_id: ""
                    })
                })
                .then(response => response.json())
                .then(allEmails.push(tempEmail))
                .then(alert("Application accepted!"))
                .catch(error => {
                    console.error('Error submitting application:', error);
                });
            }
            setTimeout(() => window.location.reload(), 450)
        } else {
            alert("Inputted email address already exists!");
        }
    }

    const getValue = (id, required = false) => {
        const element = document.getElementById(id);
        const value = element ? element.value : '';

        if (id === 'agree') {
            if (document.getElementById(id).checked === false) {
                missingFields.push(id);
                alert("Check the agreement.");
                return;
            }
        }

        let showID = ""

        if (id === "emailaddress") {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(value)) {
                alert("Not a valid email!");
                missingFields.push(id);
                return;
            }
        }

        if (id === "contactnum") {
            const contactnumRegex = /^09\d{9}$/;
            if (!contactnumRegex.test(value)) {
                alert("Phone number must have the format 09XXXXXXXXX");
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
            if (id === "surname") {showID = "Surname"}
            if (id === "firstname") {showID = "First Name"}
            if (id === "streetname") {showID = "Address Street Name"}
            if (id === "subdivision") {showID = "Address Subdivision"}
            if (id === "barangay") {showID = "Address Barangay"}
            if (id === "city") {showID = "Address City"}
            if (id === "province") {showID = "Address Province"}
            if (id === "postalcode") {showID = "Address Postal Code"}
            if (id === "studentno") {showID = "Student Number"}
            if (id === "gradyear") {showID = "Graduation Year"}
            if (id === "contactnum") {showID = "Contact Number"}
            if (id === "birthdate") {showID = "Birthday"}
            if (id === "birthplace") {showID = "Birthplace"}
            if (id === "sex") {showID = "Sex"}
            if (id === "citizenship") {showID = "Citizenship"}
            if (id === "appreason") {showID = "Personal Statement"}
            alert(`Missing the value for ${showID}!`);
        } else {
            return value;
        }
    };
    
    const getPersonDetails = (parent) => ({
        [`${parent}_name`]: getValue(`${parent}name`),
        [`${parent}_birthday`]: getValue(`${parent}birthdate`),
        [`${parent}_citizenship`]: getValue(`${parent}citizenship`),
        [`${parent}_mobile_no`]: getValue(`${parent}contactnum`),
        [`${parent}_occupation`]: getValue(`${parent}occupation`),
        [`${parent}_employer`]: getValue(`${parent}employer`),
        [`${parent}_business_address`]: getValue(`${parent}businessaddr`),
        [`${parent}_educ_attainment`]: getValue(`${parent}highesteduatt`),
        [`${parent}_income`]: getValue(`${parent}annualinc`)
    });
    
    const getSiblingDetails = () => {
        const siblings = {};
        for (let i = 1; i <= 5; i++) {
            const prefix = `sibling${i}-`;
            siblings[`sibling${i}`] = {
                name: getValue(`${prefix}name`),
                age: getValue(`${prefix}age`),
                civil_status: getValue(`${prefix}civilstatus`),
                educ_attainment: getValue(`${prefix}educ`),
                occupation: getValue(`${prefix}occupation`)
            };
        }
        return siblings;
    }
    
    const getEducationDetails = () => {
        const education = {};
        for (let i = 1; i <= 5; i++) {
            education[`educ_bg${i}`] = {
                level: getValue(`level-${i}`),
                school: getValue(`school-${i}`),
                dates: getValue(`inclusive_dates-${i}`),
                awards: getValue(`scholar-award-${i}`)
            };
        }
        return education;
    }

    useEffect(() => {
        Promise.all([
            fetch(apiUrl(`/applicant`)),
            fetch(apiUrl(`/scholar?value=false`)),
            fetch(apiUrl(`/scholar?value=true`))
        ])
        .then(([resApps, resAccepted, resScholars]) => {
            return Promise.all([
                resApps.json(), resAccepted.json(), resScholars.json()
            ]);
        })
        .then(([dataApps, dataAccepted, dataScholars]) => {
            const emails = dataApps.map(app => app.email)
                .concat(dataAccepted.map(acc => acc.email))
                .concat(dataScholars.map(sch => sch.email));          
            setAllEmails(emails);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }, []);


    return (
        <div>
            <Header/>
            <button className='back-button'><Link to="/Home">BACK</Link></button>

            <form className='app-form-body'>

            <div className='app-form-buttons'>
                <button className='buttons'>Upload <br></br> CSV</button>
                <br></br>
                <button className='buttons'>Download Blank <br></br> Application Form</button>
                <br></br>
                <button className='buttons-g' onClick = {sendData}>Submit <br></br> Application</button>
            </div>

            <div className='app-form-main'>
                <h2 className='form-title'>Scholarship Application Form</h2>

                <div className='backgrounds'>
                    <h4 className='form-sections'>PERSONAL BACKGROUND</h4>
                    <div className='backgrounds-personal'>
                        <div className='table-table'>
                            <table className='table-form'>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Surname <span className='for-required'>*</span></th>
                                    <th className='table-form-th'>First Name <span className='for-required'>*</span></th>
                                    <th className='table-form-th'>Middle Name</th>
                                    <th rowSpan="6">
                                        <div className='upload-photo-box'>
                                            <label htmlFor="upload-photo">Upload Picture Here<br></br>(1x1 or 2x2)</label>
                                            <input type="file" name="photo" id="upload-photo"/>
                                            <button type="submit" className='submit-button'>Submit Photo</button>
                                        </div>
                                    </th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text" id = "surname" required></input></td>
                                    <td className='table-form-td'><input type = "text" id = "firstname" required></input></td>
                                    <td className='table-form-td'><input type = "text" id = "middlename" required></input></td>
                                </tr>

                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Date of Birth <span className='for-required'>*</span></th>
                                    <th className='table-form-th'>Place of Birth <span className='for-required'>*</span></th>
                                    <th className='table-form-th'>Sex <span className='for-required'>*</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Suffix</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "date" id = "birthdate" required></input></td>
                                    <td className='table-form-td'><input type = "text" id = "birthplace" required></input></td>
                                    <td className='table-form-td'>
                                        <select name='sex' id = "sex" className='input-select'>
                                            <option value='male'>Male</option>
                                            <option value='female'>Female</option>
                                        </select>
                                        <input type = "text" className='input-suffix' id = "suffix"></input>
                                    </td>
                                </tr>

                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Citizenship <span className='for-required'>*</span></th>
                                    <th className='table-form-th'>Contact Number <span className='for-required'>*</span></th>
                                    <th className='table-form-th'>Email Address <span className='for-required'>*</span></th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text" id = "citizenship" required></input></td>
                                    <td className='table-form-td'><input type = "number" id = "contactnum" required></input></td>
                                    <td className='table-form-td'><input type = "email" id = "emailaddress" required></input></td>
                                </tr>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Student Number <span className='for-required'>*</span></th>
                                    <th className='table-form-th'>Graduation Year <span className='for-required'>*</span></th>

                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text" id = "studentno" required></input></td>
                                    <td className='table-form-td'><input type = "number" id= "gradyear" required></input></td>

                                </tr>
                                <td className='form-subtitle'>Address <span className='for-required'>*</span></td>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Street Name, House No.</th>
                                    <th className='table-form-th'>Subdivision</th>
                                    <th className='table-form-th'>Barangay</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text"  id = "streetname" required></input></td>
                                    <td className='table-form-td'><input type = "text" id = "subdivision"></input></td>
                                    <td className='table-form-td'><input type = "text"  id = "barangay" required></input></td>
                                </tr>

                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>City</th>
                                    <th className='table-form-th'>Province</th>
                                    <th className='table-form-th'>Postal Code</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text" id = "city" required></input></td>
                                    <td className='table-form-td'><input type = "text" id = "province" required></input></td>
                                    <td className='table-form-td'><input type = "number" id = "postalcode" required></input></td>
                                </tr>

                            </table>
                        </div>
                    </div>
                </div>

                
                <div className='backgrounds'>
                    <h4 className='form-sections'>FAMILY BACKGROUND</h4>

                    <div className='form-section-1'>

                        <div className='form-section-2'>
                            <table className='table-form'>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Father's Name</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text" className='parentname' id = "fathername"  ></input></td>
                                </tr>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Birthdate</th>
                                    <th className='table-form-th'>Citizenship</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "date" id = "fatherbirthdate"  ></input></td>
                                    <td className='table-form-td'><input type = "text" id = "fathercitizenship"  ></input></td>
                                </tr>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Contact Number</th>
                                    <th className='table-form-th-1'>Highest Education Attainment</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "number" id = "fathercontactnum"  ></input></td>
                                    <td className='table-form-td'><input type = "text" className='parentname' id = "fatherhighesteduatt"  ></input></td>
                                </tr>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Occupation</th>
                                    <th className='table-form-th'>Employer</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text" id = "fatheroccupation"  ></input></td>
                                    <td className='table-form-td'><input type = "text" id = "fatheremployer"  ></input></td>
                                </tr>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Business Address</th>
                                </tr>
                                <tr className='table-form-tr'>
                                <td className='table-form-td'><input type = "text" className='parentname' id = "fatherbusinessaddr"  ></input></td>
                                </tr>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th-1'>Annual Income</th>
                                </tr>
                                <tr className='table-form-tr'>
                                <td className='table-form-td'><input type = "text" id = "fatherannualinc"  ></input></td>
                                </tr>
                            </table>
                        </div>

                        <div className='form-section-2'>
                        <table className='table-form'>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Mother's Name</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text" className='parentname' id = "mothername"  ></input></td>
                                </tr>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Birthdate</th>
                                    <th className='table-form-th'>Citizenship</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "date" id = "motherbirthdate"  ></input></td>
                                    <td className='table-form-td'><input type = "text" id = "mothercitizenship"  ></input></td>
                                </tr>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Contact Number</th>
                                    <th className='table-form-th-1'>Highest Education Attainment</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "number" id = "mothercontactnum"  ></input></td>
                                    <td className='table-form-td'><input type = "text" className='parentname' id = "motherhighesteduatt"  ></input></td>
                                </tr>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Occupation</th>
                                    <th className='table-form-th'>Employer</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text" id = "motheroccupation"  ></input></td>
                                    <td className='table-form-td'><input type = "text" id = "motheremployer"  ></input></td>
                                </tr>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Business Address</th>
                                </tr>
                                <tr className='table-form-tr'>
                                <td className='table-form-td'><input type = "text" className='parentname' id = "motherbusinessaddr"  ></input></td>
                                </tr>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th-1'>Annual Income</th>
                                </tr>
                                <tr className='table-form-tr'>
                                <td className='table-form-td'><input type = "text" id = "motherannualinc"  ></input></td>
                                </tr>
                            </table>
                        </div>

                    </div>
                    <br></br>
                    <div className='form-section-1-1'>
                        <table className='table-form'>
                            <tr className='table-form-tr'>
                                <th className='table-form-th'>Name of Guardian (if not living with parents)</th>
                                <th className='table-form-th'>Contact Number</th>
                            </tr>
                            <tr className='table-form-tr'>
                                <td className='table-form-td'><input type = "text" className='parentname-1' id = "guardianname"></input></td>
                                <td className='table-form-td'><input type = "number" id = "guardiannum"></input></td>
                            </tr>
                        </table>
                    </div>

                    <div className='form-section-1-1'>
                        <table className='table-form'>
                            <tr className='table-form-tr'>
                                <th className='table-form-th-1'>Name of Siblings</th>
                                <th className='table-form-th'>Age</th>
                                <th className='table-form-th'>Civil Status</th>
                                <th className='table-form-th-1'>Highest Educational Attainment</th>
                                <th className='table-form-th'>Occupation</th>
                            </tr>
                            <tr className='table-form-tr'>
                                <td className='table-form-td-1'><input type = "text" id="sibling1-name"></input></td>
                                <td className='table-form-td-1'><input type = "number" id="sibling1-age"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="sibling1-civilstatus"></input></td>
                                <td className='table-form-td-1'><input type = "text" className='parentname-2' id="sibling1-educ"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="sibling1-occupation"></input></td>
                            </tr>
                            <tr className='table-form-tr'>
                                <td className='table-form-td-1'><input type = "text" id="sibling2-name"></input></td>
                                <td className='table-form-td-1'><input type = "number" id="sibling2-age"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="sibling2-civilstatus"></input></td>
                                <td className='table-form-td-1'><input type = "text" className='parentname-2' id="sibling2-educ"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="sibling2-occupation"></input></td>
                            </tr>
                            <tr className='table-form-tr'>
                                <td className='table-form-td-1'><input type = "text" id="sibling3-name"></input></td>
                                <td className='table-form-td-1'><input type = "number" id="sibling3-age"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="sibling3-civilstatus"></input></td>
                                <td className='table-form-td-1'><input type = "text" className='parentname-2' id="sibling3-educ"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="sibling3-occupation"></input></td>
                            </tr>
                            <tr className='table-form-tr'>
                                <td className='table-form-td-1'><input type = "text" id="sibling4-name"></input></td>
                                <td className='table-form-td-1'><input type = "number" id="sibling4-age"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="sibling4-civilstatus"></input></td>
                                <td className='table-form-td-1'><input type = "text" className='parentname-2' id="sibling4-educ"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="sibling4-occupation"></input></td>
                            </tr>
                            <tr className='table-form-tr'>
                                <td className='table-form-td-1'><input type = "text" id="sibling5-name"></input></td>
                                <td className='table-form-td-1'><input type = "number" id="sibling5-age"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="sibling5-civilstatus"></input></td>
                                <td className='table-form-td-1'><input type = "text" className='parentname-2' id="sibling5-educ"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="sibling5-occupation"></input></td>
                            </tr>
                            
                        </table>
                        
                    </div>
                    
                    
                </div>
                
                
                <div className='backgrounds'>
                    <h4 className='form-sections'>EDUCATIONAL BACKGROUND</h4>

                    <div className='form-section-1-1'>
                        <table className='table-form'>
                            <tr className='table-form-tr'>
                                <th className='table-form-th'>Education Level</th>
                                <th className='table-form-th'>Name of School</th>
                                <th className='table-form-th'>Inclusive Dates</th>
                                <th className='table-form-th'>Scholarship or Academic Awards Received</th>
                            </tr>
                            <tr className='table-form-tr'>
                                <td className='table-form-td-1'><input type = "text" id="level-1"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="school-1"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="inclusive_dates-1"></input></td>
                                <td className='table-form-td-1'><input type = "text" className='parentname-1' id="scholar-award-1"></input></td>
                            </tr>
                            <tr className='table-form-tr'>
                                <td className='table-form-td-1'><input type = "text" id="level-2"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="school-2"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="inclusive_dates-2"></input></td>
                                <td className='table-form-td-1'><input type = "text" className='parentname-1' id="scholar-award-2"></input></td>
                            </tr>
                            <tr className='table-form-tr'>
                                <td className='table-form-td-1'><input type = "text" id="level-3"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="school-3"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="inclusive_dates-3"></input></td>
                                <td className='table-form-td-1'><input type = "text" className='parentname-1' id="scholar-award-3"></input></td>
                            </tr>
                            <tr className='table-form-tr'>
                                <td className='table-form-td-1'><input type = "text" id="level-4"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="school-4"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="inclusive_dates-4"></input></td>
                                <td className='table-form-td-1'><input type = "text" className='parentname-1' id="scholar-award-4"></input></td>
                            </tr>
                            <tr className='table-form-tr'>
                                <td className='table-form-td-1'><input type = "text" id="level-5"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="school-5"></input></td>
                                <td className='table-form-td-1'><input type = "text" id="inclusive_dates-5"></input></td>
                                <td className='table-form-td-1'><input type = "text" className='parentname-1' id="scholar-award-5"></input></td>
                            </tr>
                        </table>
                       
                    </div>
                    
                    
                </div>

                <div className='backgrounds'>
                    <h4 className='form-sections'>PERSONAL STATEMENT</h4>
                    <div className='agreement'>State the reason/s for applying for financial assistance. <span className='for-required'>*</span></div>
                    <textarea className='text-area' id = "appreason" required></textarea>
                </div>

                <div className='backgrounds'>
                    <h4 className='form-sections'>AGREEMENT</h4>
                    <div className='agreement'>
                    We hereby certify upon our honor that all the data and information which I have furnished are accurate and complete. I understand that any 
                    misinformation and/or withholding of information will automatically disqualify me from receiving any financial assistance or subsidy. Furthermore, if 
                    such misinformation and/or withholding of information on my part is discovered after I have been awarded the scholarship, I will be  to reimburse all the 
                    financial benefits received. 
                    </div>
                    <label>
                        <input type='checkbox' id='agree'></input>
                        &nbsp;I agree. <span className='for-required'>*</span>
                    </label>
                </div>
            </div>
        </form>
        <Footer/>
        </div>
    )

}

export default AppForm;