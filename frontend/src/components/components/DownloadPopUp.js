import Header from '../components/Header'
import Footer from '../components/Footer'
import {React, useState} from 'react';
// import {apiUrl} from '../../apiUrl';
import scholartemplate from '../components/Scholar Application.xlsx';
import donortemplate from '../components/Donor Application.xlsx';
import '../css/PopUp.css'

function DownloadPopUp (props) {

    const [csvFile, setFile] = useState();

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

        for (let i = 0; i < rows.length; i ++) {
            let row = rows[i].split(",");

            if (row[1].includes("*") && row[2] === "") {
                alert(`Missing value for ${row[1].replace(" *","")}!`)
                return
            }

            if (row[1] === "Reason/s for Applying for Personal Statement"){
                break
            }

            if (row !== "" && row.length > 1 && row[2] !== ""){
                let attribute = row[1].replace(" ", "_").toLowerCase()
                console.log(attribute + ": " + row[2])

                // https://www.geeksforgeeks.org/how-to-use-dynamic-variable-names-in-javascript/
                // eval('var ' + attribute)

                // console.log(last_name)
            }
        }
    }

    return (
        <div>
            <Header/>
            <div className="popup-wrapper">
                <div className="upload-popup-box">
                    <span className="add-close-icon" onClick={props.handleClose}>x</span>
                    <p className='delete-label'>Instructions for Application</p>
                    <p className='form-subtitle'>1. Download the Excel file through the blue button found below.</p>
                    <p className='form-subtitle'>2. Fill up your data. Cells with a * means information is required.</p>
                    <p className='form-subtitle'>3. Save the file as .csv.</p>
                    <p className='form-subtitle'>4. Upload your CSV file using the green button.</p>
                    <p className='form-subtitle'>5. Another button will appear for you to submit your file.</p>

                    <div className="delete-buttons">
                        {props.user === "donor" ? <a href={donortemplate} className='upload-blue-button' download> Download Excel</a>: ""}
                        {props.user === "scholar" ? <a href={scholartemplate} className='upload-blue-button' download> Download Excel</a>: ""}
                        {csvFile ? <button className='upload-green-button' onClick={() => readFile(csvFile)}>Submit {csvFile.name}</button> : "" }
                        <label htmlFor="file-input" className='upload-green-button'>Upload CSV</label>
                        <input type="file" id="file-input" accept='.csv' onChange={setCSVFile}></input>
                    </div>

                </div>
            </div>

            <Footer/>
        </div>
    );
};
 
export default DownloadPopUp;
