import Header from '../components/Header'
import Footer from '../components/Footer'
import {React, useState, useEffect} from 'react';
import {apiUrl} from '../../apiUrl';
import {Link} from 'react-router-dom'
import '../css/AppForm.css'

const AppFormDonor = () => {

    let missingFields = [];
    const [allEmails, setAllEmails] = useState([]);

    const sendData = (e) => {
        e.preventDefault();
    
        const tempEmail = document.getElementById("emailaddress").value;
        const notuniqueEmail = !allEmails.includes(tempEmail);

        if (notuniqueEmail) {
            const last_name = getValue("surname", true);
            const first_name = getValue("firstname", true);
            const middle_name = getValue("middlename");
            const suffix = getValue("suffix");

            const address = {
                street: getValue("streetname", true),
                subd: getValue("subdivision", true),
                brgy: getValue("barangay", true),
                city: getValue("city", true),
                province: getValue("province", true),
                postal_code: getValue("postalcode", true)
            };

            const mobile_no = getValue("contactnum", true);
            const birthday = getValue("birthdate", true);
            const birthplace = getValue("birthplace", true);
            const sex = getValue("sex", true);
            const citizenship = getValue("citizenship", true);
            getValue("scholarshipname", true);
            getValue("grantyear", true);
            getValue("totalgrant", true);
            getValue("grantdetails", true);
            const statement = getValue("appreason", true);

            if(missingFields.length !== 0) {
                return
            } else {
                fetch(apiUrl("/donor"), {
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
                        mobile_no: mobile_no,
                        email: tempEmail,
                        birthday: birthday,
                        birthplace: birthplace,
                        sex: sex,
                        citizenship: citizenship,
                        statement: statement,
                        upload_id: ""
                    })
                })
                .then(response => response.json())
                .then(allEmails.push(tempEmail))
                .then(getDonorData())
                .then(alert("Application accepted!"))
                .catch(error => {
                    console.error('Error submitting application:', error);
                });
            }
            window.location.reload();
        } else {
            alert("Inputted email address already exists!");
        }
    }

    const getValue = (id, required = false) => {
        const element = document.getElementById(id);
        const value = element ? element.value : '';
        let showID = ""

        if(missingFields.length !== 0 && missingFields[0] === id) {
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
            if (id === "totalgrant") {showID = "Scholarship Total Grant"}
            if (id === "scholarshipname") {showID = "Scholarship Name"}
            if (id === "grantdetails") {showID = "Scholarship Grant Details"}
            if (id === "grantyear") {showID = "Scholarship Grant Year"}
            if (id === "appreason") {showID = "Personal Statement"}
            alert(`Missing the value for ${showID}!`);
        } else {
            return value;
        }
    };

    const getDonorData = () => {
        Promise.all([
            fetch(apiUrl(`/donor`))
        ])
        .then(([resDonors]) => {
            return Promise.all([resDonors.json()]);
        })
        .then(([dataDonors]) => {
            sendScholarship(dataDonors[dataDonors.length-1])
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }

    const sendScholarship = (donorData) => {
        fetch(apiUrl("/scholarship"), {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                donor: getValue("firstname") + " " + getValue("surname"),
                grant: getValue("totalgrant"),
                scholarshipname: getValue("scholarshipname"),
                details: "(" + getValue("grantdetails") + ")",
                year: getValue("grantyear"),
                donor_id: donorData._id
            })
        })
        .then(response => { return response.json() })
    }
    
    useEffect(() => {
        Promise.all([
            fetch(apiUrl(`/donor`))
        ])
        .then(([resDonors]) => {
            return Promise.all([
                resDonors.json()
            ]);
        })
        .then(([dataDonors]) => {
            const emails = dataDonors.map(don => don.email);
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
                <h2 className='form-title'>Donor Application Form</h2>

                <div className='backgrounds'>
                    <h4 className='form-sections'>PERSONAL BACKGROUND</h4>
                    <div className='backgrounds-personal'>
                        <div className='table-table'>
                            <table className='table-form'>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Last Name</th>
                                    <th className='table-form-th'>First Name</th>
                                    <th className='table-form-th'>Middle Name</th>
                                    <th rowspan="6">
                                        <div className='upload-photo-box'>
                                            <form>
                                                <label for="upload-photo">Upload Picture Here<br></br>(1x1 or 2x2)</label>
                                                <input type="file" name="photo" id="upload-photo"/>
                                                <button type="submit" className='submit-button'>Submit Photo</button>
                                            </form> 
                                        </div>
                                    </th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text" id = "surname" required></input></td>
                                    <td className='table-form-td'><input type = "text" id = "firstname" required></input></td>
                                    <td className='table-form-td'><input type = "text" id = "middlename" required></input></td>
                                </tr>

                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Date of Birth</th>
                                    <th className='table-form-th'>Place of Birth</th>
                                    <th className='table-form-th'>Sex &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Suffix</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "date" id = "birthdate" required></input></td>
                                    <td className='table-form-td'><input type = "text" id = "birthplace" required></input></td>
                                    <td className='table-form-td'>
                                        <select name='sex' id = "sex">
                                            <option value='male'>Male</option>
                                            <option value='female'>Female</option>
                                        </select>
                                        <input type = "text" className='input-suffix' id = "suffix"></input>
                                    </td>
                                </tr>

                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Citizenship</th>
                                    <th className='table-form-th'>Contact Number</th>
                                    <th className='table-form-th'>Email Address</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text" id = "citizenship" required></input></td>
                                    <td className='table-form-td'><input type = "number" id = "contactnum" required></input></td>
                                    <td className='table-form-td'><input type = "email" id = "emailaddress" required></input></td>
                                </tr>
                                <td className='form-subtitle'>Address</td>
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

                                <td className='form-subtitle'>Scholarship Details</td>
                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Scholarship Name</th>
                                    <th className='table-form-th'>Year Granted</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text" id = "scholarshipname" required></input></td>
                                    <td className='table-form-td'><input type = "text" id = "grantyear" required></input></td>
                                </tr>

                                <tr className='table-form-tr'>
                                    <th className='table-form-th'>Total Grant</th>
                                    <th className='table-form-th'>Details</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='table-form-td'><input type = "text" id = "totalgrant" required></input></td>
                                    <td className='table-form-td'><input type = "text" id = "grantdetails" required></input></td>
                                </tr>

                            </table>
                        </div>
                    </div>
                </div>


                <div className='backgrounds'>
                    <h4 className='form-sections'>PERSONAL STATEMENT</h4>
                    <div className='agreement'>State the reason/s for applying as a donor.</div>
                    <textarea className='text-area' id = "appreason"></textarea>
                </div>

                <div className='backgrounds'>
                    <h4 className='form-sections'>AGREEMENT</h4>
                    <div className='agreement'>
                    We hereby certify upon our honor that all the data and information which I have furnished are accurate and complete. I understand that any misinformation and/or withholding of information will automatically disqualify me from receiving any financial assistance or subsidy. Furthermore, if such misinformation and/or withholding of information on my part is discovered after I have been awarded the scholarship, I will be  to reimburse all the financial benefits received.
                    </div>
                    <label>
                        <input type='checkbox'></input>
                        &nbsp;I agree.
                    </label>
                </div>
                
                </div>

            </form>
            <Footer/>

        </div>

    )

}

export default AppFormDonor;
