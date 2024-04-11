import Header from '../components/Header'
import Footer from '../components/Footer'
import Alert from '../components/Alert';
import {React, useState} from 'react';
import {apiUrl} from '../../apiUrl';
import scholartemplate from '../components/Scholar Application.xlsx';
import donortemplate from '../components/Donor Application.xlsx';
import '../css/PopUp.css'

function DownloadPopUp (props) {

    const [csvFile, setFile] = useState();
    const allEmails = props.allEmails;
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [picID, setPicID] = useState(null);
    const [csvImage, setcsvImage] = useState(null);

    const showMessage = (message) => {
        setAlertMessage(message);
        toggleAlertPopUp()
    };

    const toggleAlertPopUp = () => {
        setShowAlert(!showAlert);
    };

    const setCSVFile = (e) => {
        setFile(e.target.files[0])
    }

    const readFile = async (file) => {
        let reader = new FileReader();
        
        let read = new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            
            reader.readAsText(file);
        });

        validateData(await(read));
    };

    const validateData = (inputData) => {
        let rows = inputData.slice(inputData.indexOf('\n')+1).split('\n');
        let data = {};
        let boolData = false;
        const siblings = {};
        const education = {};

        for (let i = 0; i < rows.length; i ++) {
            let row = rows[i].split(",");

            if (props.user === "scholar") {
                if (row[1] === "SCHOLARVISION DONOR INFORMATION") {
                    showMessage("Wrong Excel file!")
                    return
                }
                
                if (row[1].includes("*") && row[3] === "") {
                    showMessage(`Missing value for ${row[1].replace(" *","")}!`)
                    return
                }

                if (row[1] === "Reason/s for Applying for Personal Statement") {
                    boolData = true;
                    data["statement"] = rows[i+1].split(",")[1];
                    break
                }

                if (row[1] === "Siblings' Information") {
                    let j = i
                    let numofSiblings = 1
                    while (rows[j+2].split(",")[1] !== "EDUCATIONAL BACKGROUND") {
                        siblings[`sibling${numofSiblings}`] = {
                            name: rows[j+2].split(",")[1],
                            age: rows[j+2].split(",")[2],
                            civil_status: rows[j+2].split(",")[3],
                            educ_attainment: rows[j+2].split(",")[4],
                            occupation: rows[j+2].split(",")[5]
                        };
                        numofSiblings += 1
                        j += 1
                    }
                }

                if (row[1] === "EDUCATIONAL BACKGROUND") {
                    let j = i
                    let educationLevel = 1
                    while (rows[j+2].split(",")[1] !== "PERSONAL STATEMENT") {
                        education[`educ_bg${educationLevel}`] = {
                            level: rows[j+2].split(",")[1],
                            school: rows[j+2].split(",")[2],
                            dates: rows[j+2].split(",")[3],
                            awards: rows[j+2].split(",")[4]
                        };
                        educationLevel += 1
                        j += 1
                    }
                }

                if (row !== "" && row.length > 1 && row[3] !== ""){
                    let attribute = row[1].replace(" *", "").replace(" ", "_").toLowerCase()
                    data[attribute] = row[3];
                } else if (row !== "" && row.length > 1 && row[1].toUpperCase() !== row[1]){
                    let attribute = row[1].replace(" ", "_").toLowerCase()
                    data[attribute] = row[3];
                }
            }

            if (props.user === "donor") {
                if (row[1] === "SCHOLARVISION APPLICANT INFORMATION") {
                    showMessage("Wrong Excel file!")
                    return
                }

                if (row[1].includes("*") && row[2] === "") {
                    showMessage(`Missing value for ${row[1].replace(" *","")}!`)
                    return
                }
    
                if (row[1] === "Reason/s for Applying for Personal Statement"){
                    boolData = true;
                    data["statement"] = rows[i+1].split(",")[1];
                    break
                }
    
                if (row !== "" && row.length > 1 && row[2] !== ""){
                    let attribute = row[1].replace(" *", "").replace(" ", "_").toLowerCase()
                    data[attribute] = row[2];
                } else if (row !== "" && row.length > 1 && row[1].toUpperCase() !== row[1]){
                    let attribute = row[1].replace(" ", "_").toLowerCase()
                    data[attribute] = row[2];
                }
            }
        }

        if (boolData === true){
            if(props.user === "donor") {sendDonorData(data)}
            if(props.user === "scholar") {sendScholarData(data, siblings, education)}
        }
    }

    const openImageFilePopup = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                if (img.width !== img.height) {
                    showMessage('Please upload a square image.');
                    setcsvImage(null);
                } else {
                    setcsvImage(reader.result);
                    const data = new FormData();
                    data.append("image", e.target.files[0]);

                    fetch(apiUrl("/upload"), {
                      method: "POST",
                      body: data,
                      credentials: 'include'
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

    const sendScholarData = (appData, siblings, education) => {
        if (picID === null) {
            showMessage('No image set!');
            return
        }

        const tempEmail = appData["email"];
        const uniqueEmail = !allEmails.includes(tempEmail);

        if (uniqueEmail) {
            const address = {
                street: appData["street_name & house no."],
                subd: appData["subdivision"],
                brgy: appData["barangay"],
                city: appData["city"],
                province: appData["province"],
                postal_code: appData["postal_code"]
            };

            const father_details = getPersonDetails(appData, "father's");
            const mother_details = getPersonDetails(appData, "mother's");
            const guardian_details = getPersonDetails(appData, "guardian's");

            fetch(apiUrl("/applicant"), {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    last_name: appData["last_name"],
                    first_name: appData["first_name"],
                    middle_name: appData["middle_name"],
                    suffix: appData["suffix"],
                    address: address,
                    mobile_no: appData["contact_number"],
                    email: appData["email"],
                    birthday: appData["birthdate"],
                    birthplace: appData["birthplace"],
                    sex: appData["sex"],
                    citizenship: appData["citizenship"],
                    student_no: appData["student_number"],
                    graduation_year: appData["graduation_year"],
                    father_details: father_details,
                    mother_details: mother_details,
                    guardian_details: guardian_details,
                    sibling_details: siblings,
                    educational_bg: education,
                    statement: appData["statement"],
                    upload_id: picID
                })
            })
            .then(response => response.json())
            .then(showMessage(`Application for ${appData["first_name"]} ${appData["last_name"]} accepted!`))
            .catch(error => {
                console.error('Error submitting application:', error);
            });
            setTimeout(() => window.location.reload(), 750)
        } else {
            showMessage("Inputted email address already exists!");
        }
    }

    const getPersonDetails = (appData, parent) => ({
        [`${parent.replace("'s","")}_name`]: appData[`${parent}_name`],
        [`${parent.replace("'s","")}_birthday`]: appData[`${parent}_birthdate`],
        [`${parent.replace("'s","")}_citizenship`]: appData[`${parent}_citizenship`],
        [`${parent.replace("'s","")}_mobile_no`]: appData[`${parent}_contact number`],
        [`${parent.replace("'s","")}_occupation`]: appData[`${parent}_occupation`],
        [`${parent.replace("'s","")}_employer`]: appData[`${parent}_employer`],
        [`${parent.replace("'s","")}_business_address`]: appData[`${parent}_business address`],
        [`${parent.replace("'s","")}_educ_attainment`]: appData[`${parent}_highest education attainment`],
        [`${parent.replace("'s","")}_income`]: appData[`${parent}_annual income`]
    });

    const sendDonorData = (appData) => {
        if (picID === null) {
            showMessage('No image set!');
            return
        }

        const tempEmail = appData["email"];
        const uniqueEmail = !allEmails.includes(tempEmail);

        if (uniqueEmail) {
            fetch(apiUrl("/donor"), {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    last_name: appData["last_name"],
                    first_name: appData["first_name"],
                    middle_name: appData["middle_name"],
                    suffix: appData["suffix"],
                    mobile_no: appData["contact_number"],
                    email: appData["email"],
                    birthday: appData["birthdate"],
                    birthplace: appData["birthplace"],
                    sex: appData["sex"],
                    citizenship: appData["citizenship"],
                    statement: appData["statement"],
                    upload_id: picID
                })
            })
            .then(response => response.json())
            .then(data => {sendScholarship(appData, data.donor._id);})
            .then(showMessage(`Application for ${appData["first_name"]} ${appData["last_name"]} accepted!`))
            .catch(error => {
                console.error('Error submitting application:', error);
            });
            setTimeout(() => window.location.reload(), 750)
        } else {showMessage("Inputted email address already exists!")}
    }

    const sendScholarship = (appData, donorID) => {
        console.log(appData)
        fetch(apiUrl("/scholarship"), {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                donor: appData["first_name"] + " " + appData["last_name"],
                grant: appData["total_grant"],
                scholarshipname: appData["scholarship_name"],
                details: "(" + appData["details"]+ ")",
                year: appData["years_involved"],
                donor_id: donorID
            })
        })
        .then(response => { return response.json() })
    }


    return (
        <div>
            <Header/>
            <div className="popup-wrapper">
                <div className="upload-popup-box">
                    <span className="add-close-icon" onClick={props.handleClose}>x</span>
                    <p className='delete-label'>Instructions for Application</p>
                    <p className='popup-form-subtitle'>1. Download the Excel file through the green button found below.</p>
                    <p className='popup-form-subtitle'>2. Fill up your data. Cells with a * means information is required.</p>
                    <p className='popup-form-subtitle'>3. Save the file as .csv.</p>
                    <p className='popup-form-subtitle'>4. Upload your CSV file using the blue button.</p>
                    <p className='popup-form-subtitle'>5. If the proper data is sent, a button for uploading your image will appear.</p>
                    <p className='popup-form-subtitle'>6. Another button will appear for you to submit your file.</p>

                    {csvImage && (
                        <div className='popup-uploaded-image'>
                            <img src={csvImage} alt="Upload" />
                        </div>
                    )}

                    <div className="delete-buttons">
                        {props.user === "donor" ? <a href={donortemplate} className='upload-green-button' download> Download Excel</a>: ""}
                        {props.user === "scholar" ? <a href={scholartemplate} className='upload-green-button' download> Download Excel</a>: ""}
                        <label htmlFor="file-input" className='upload-blue-button'>Upload CSV</label>
                        <input type="file" id="file-input" accept='.csv' onChange={setCSVFile}></input>
                        {csvFile ? 
                            <div className='upload-photo-box'>
                                <label htmlFor="upload-photo-popup" className="upload-label">Upload Picture</label>
                                <input type="file" id="upload-photo-popup" accept=".png,.jpg" onChange={openImageFilePopup}/>
                            </div>
                        : ""}
                        {csvImage ? <button className='upload-blue-button' onClick={() => readFile(csvFile)}>Submit {csvFile.name}</button> : "" }
                    </div>

                </div>
            </div>
            {showAlert ? <Alert 
                message={alertMessage} 
                handleClose={toggleAlertPopUp} 
            />: ""}

            <Footer/>
        </div>
    );
};
 
export default DownloadPopUp;
