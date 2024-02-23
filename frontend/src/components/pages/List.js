import Header from '../components/Header'
import Footer from '../components/Footer'
import {React, useState, useEffect} from 'react';
import {apiUrl} from '../../apiUrl';
import {Link} from 'react-router-dom';
// import {Link, useLocation} from 'react-router-dom';
import {BsSearch, BsTrash}  from 'react-icons/bs';
import DonorPopUp from '../components/DonorPopUp';
import DeletePopUp from '../components/DeletePopUp';
import AddPopUp from '../components/AddPopUp';
import '../css/List.css'

function List () {
    // const location = useLocation();
    // console.log(location)
    // const [viewValue, setViewValue] = useState(location.state ? location.state.viewValue : "scholar?value=true");
    const [viewValue, setViewValue] = useState("applicant");
    const [orderValue, setOrderValue] = useState("name");
    const [assignScholar, setAssign] = useState([]);
    const [assignDelete, setDelete] = useState([]);
    const [scholarships, setScholarships] = useState([]);
    const [record, setRecord] = useState([]);
    const [openDonor, setOpenDonor] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openAdd, setAddField] = useState(false);

    const viewFilter = [
        {label:'SCHOLAR', value:'scholar?value=true'},
        {label:'DONOR', value:'donor'},
        {label:'ACCEPTED', value:'scholar?value=false'},
        {label:'APPLICANT', value:'applicant'}
    ]

    const orderFilter = [
        {label: 'NONE', value: ''},
        {label: 'AMOUNT', value: 'grant'},
        {label: 'NAME', value: 'name'},
        {label: 'GRAD YEAR', value: 'grad'},
        {label:'ADD FIELD', value:'newfield'}
    ]

    const viewChange = (selectedValue) => {
        setViewValue(selectedValue);
    }

    const orderChange = (selectedValue) => {
        setOrderValue(selectedValue);
    }

    const giveScholarship = (person) => {
        setAssign(person)
        toggleDonorPopup()
    }

    const toggleDonorPopup = () => {
        setOpenDonor(!openDonor);
    }

    const deleteConfirmation = (person) => {
        setDelete(person)
        toggleDeletePopup()
    }

    const toggleDeletePopup = () => {
        setOpenDelete(!openDelete);
    }

    const toggleAddPopup = () => {
        setAddField(!openAdd);
    }

    const acceptApplicant = (person) => {
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
                guardian_name: person.guardian_name,
                guardian_contact: person.guardian_contact,
                sibling_details:  person.sibling_details,
                educational_bg: person.educational_bg,
                statement: person.statement,
                upload_id: person.upload_id
            })
        })
        .then(response => {return response.json()})
        .then(deletePerson(person._id))
    }

    const deletePerson = (id) => {
        fetch(apiUrl("/" + [viewValue] + "/"), {
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

    const editAppLink = (person, i) => {
        let current_link = "app_link" + i
        const element = document.getElementById(current_link);
        const value = element ? element.value : '';
        const urlPattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
        // https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url

        if (value === '') {
            alert("No link inputted!");
            return;
        }

        if (!urlPattern.test(value)) {
            alert("Not a valid link!");
            return;
        }

        fetch(apiUrl("/" + [viewValue] + "/" + person._id),{
            method: "PUT",
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
                guardian_name: person.guardian_name,
                guardian_contact: person.guardian_contact,
                sibling_details: person.sibling_details,
                educational_bg: person.educational_bg,
                statement: person.statement,
                upload_id: person.upload_id,
                applicant_link: document.getElementById(current_link).value
            })
        })
        .then(response => {return response.json()})
        .then(setTimeout(() => window.location.reload(), 450))
    }

    const DropDown = ({value, options, onChange}) => {
        return (
            <label>
                <select value={value} onChange={(e) => onChange(e.target.value)} className='record-dropdown'>
                    {options.map((option, i) => (
                        <option key={i} value={option.value} className='record-option'>{option.label}</option>
                    ))}
                </select>
            </label>
        );
    }            

    // SOURCE: https://medium.com/@jdhawks/make-fetch-s-happen-5022fcc2ddae
    useEffect(() => {
        Promise.all([
            viewValue === "donor" ? fetch(apiUrl(`/donor`)) : null,
            viewValue === "applicant" ? fetch(apiUrl(`/applicant`)) : null,
            viewValue === "scholar?value=false" ? fetch(apiUrl(`/scholar?value=false`)) : null,
            viewValue === "scholar?value=true" ? fetch(apiUrl(`/scholar?value=true`)) : null,
            fetch(apiUrl(`/scholarship`))
        ])
        .then(([resDonors, resApps, resAccepted, resScholars, resScholarships]) => {
            return Promise.all([
                resDonors ? resDonors.json() : null,
                resApps ? resApps.json() : null,
                resAccepted ? resAccepted.json() : null,
                resScholars ? resScholars.json() : null,
                resScholarships.json()
            ]);
        })
        .then(([dataDonors, dataApps, dataAccepted, dataScholars, dataScholarship]) => {
            if (viewValue === "donor") {setRecord(dataDonors);}
            if (viewValue === "applicant") {setRecord(dataApps);}
            if (viewValue === "scholar?value=false") {setRecord(dataAccepted);}
            if (viewValue === "scholar?value=true") {setRecord(dataScholars);}
            setScholarships(dataScholarship);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }, [viewValue]);

    return (
        <div>
            <Header/>
            <button className='back-button'><Link to="/Home">BACK</Link></button>
            {viewValue === 'scholar?value=true' ? 
                <header className='list-header'>RECORD OF SCHOLARS &#91; {record ? <span> &#160;{record.length} &#93;</span> : ""}</header> : 
                (viewValue === 'scholar?value=false' ?
                    <header className='list-header'>RECORD OF ACCEPTED APPLICANTS &#91; {record ? <span> &#160;{record.length} &#93;</span> : ""}</header> : 
                    (viewValue === 'donor' ?
                        <header className='list-header'>RECORD OF DONORS &#91; {record ? <span> &#160;{record.length} &#93;</span> : ""}</header> :
                        (viewValue === 'applicant' ?
                            <header className='list-header'>RECORD OF APPLICANTS &#91; {record ? <span> &#160;{record.length} &#93;</span> : ""}</header>
                            : <header className='list-header'>RECORDS &#91; 0 &#93; </header>
                        )
                    )
                )
            }

            <ul className='record-dropdowns'>
                <li><button className = 'record-add-button' onClick={() => toggleAddPopup()}>ADD FIELD</button></li>
                <li><button className = 'record-print-button'>PRINT</button></li>
                <li><DropDown options = {viewFilter} value = {viewValue} onChange={viewChange} type = "view"/></li>
                <li><DropDown options = {orderFilter} value = {orderValue} onChange={orderChange}/> </li>
            </ul>

            {record.length !== 0 ?
                <div className='scholar-container'>
                    <div className='list-search-container'>
                        <input type = "text" id = 'input' className = 'list-search-input' placeholder = "Search a record"required></input>
                        <BsSearch className='list-search-icon'/>
                    </div>
                    <table className='list-table'>
                        <tr className='table-header'>
                            <th className='list-head'>NAME</th>
                            <th className='list-head'>EMAIL</th>
                            {viewValue !== "donor" ? <th className='list-head'>GRADUATION YEAR</th> : ""}
                            {viewValue === "donor" || viewValue === "scholar?value=true" ? <th className='list-head'>SCHOLARSHIP DETAILS</th> : ""}
                            {viewValue !== "donor" ? <th className='list-head'>LINKS</th> : ""}
                            {viewValue === "scholar?value=false" ? <th className='list-head'>ASSIGN</th> : ""}
                            {viewValue === "applicant" ? <th className='list-head'>ACCEPT?</th> : ""}
                            {viewValue !== "applicant" ? <th className='list-head'>DELETE?</th> : ""}
                            <th className='list-head'></th>
                        </tr>
                        <tr className='smol'></tr>
                        {record.map((person, i) => {
                            let app_files = "app_link" + i
                            return (
                                <tr className='list-row' key = {i}>
                                    {viewValue === 'scholar?value=true' || viewValue === 'scholar?value=false' ? 
                                        <td className='first-list-cell'><Link to={`/scholar/${person._id}/Profile`}>{person.last_name}, {person.first_name}{person.middle_name ? ', ' + person.middle_name : ""}</Link></td>
                                    : <td className='first-list-cell'><Link to={`/${viewValue}/${person._id}/Profile`}>{person.last_name}, {person.first_name}{person.middle_name ? ', ' + person.middle_name : ""}</Link></td>}
                                    <td className='list-cell'><a href={`mailto: andrew.teope4@gmail.com`} className='email-color'>{person.email}</a></td>
                                    {viewValue !== "donor" ? <td className='list-cell'>{person.graduation_year}</td> : ""}
                                    {viewValue === "scholar?value=true" || viewValue === "donor" ?
                                        scholarships.map((scholarship) => {
                                            return (
                                                viewValue === 'donor' ? 
                                                    (person._id === scholarship.donor_id ? 
                                                        <td className='list-cell'>{scholarship.grant} {scholarship.details}</td>
                                                        : "") 
                                                    : viewValue === 'scholar?value=true' ?
                                                        (person.scholarship_id === scholarship._id ? 
                                                            <td className='list-cell'>{scholarship.grant} {scholarship.details}</td> 
                                                            : "") 
                                                        : " "
                                            )
                                        })
                                    : ""}
                                    {(viewValue !== 'donor' && person.applicant_link !== undefined) ? <td className='list-cell'><a href={`${person.applicant_link}`} target="_blank" rel="noreferrer" className='email-color'>link</a> </td> :
                                        viewValue !== 'donor' ? <td className='list-cell'><input type='text' className='link-input' id = {app_files} placeholder='Input link of files.'></input> <button className='app-red-button' onClick={() => editAppLink(person, i)}>Submit</button></td> 
                                    : ""}
                                    {/* {viewValue === "donor" ? <td className='list-cell'><a href={`http://${person.applicant_link}`} target="_blank" rel="noreferrer" className='email-color'>link</a></td> : ""} */}
                                    {viewValue === "scholar?value=false" ? <td className='list-cell'> <button className='app-green-button' onClick={() => giveScholarship(person)}>Yes</button></td> : ""}
                                    {viewValue === "applicant" ?
                                        <td className='list-cell'>
                                            <div className='list-buttons'>
                                                <button className='app-green-button' onClick={() => acceptApplicant(person)}>Yes</button>&nbsp;
                                                <button className='app-red-button' onClick={() => deleteConfirmation(person)}>No</button>
                                            </div>
                                        </td>
                                    : ""}
                                    {viewValue !== "applicant" ? <td className='list-cell-trash' onClick={() => deleteConfirmation(person)}><BsTrash/></td> : ""}
                                    <td className='last-list-cell'>...</td>
                                </tr>
                            );
                        })}
                    </table>
                </div>
            :
                <div className='scholar-container'>
                    <div className='list-search-container'>
                        <input type = "text" id = 'input' className = 'list-search-input' placeholder = "Search a record"required></input>
                        <BsSearch className='list-search-icon'/>
                    </div>

                    {viewValue === 'scholar?value=true' ? <p className='none-found'>No scholars in system!</p> : 
                        (viewValue === 'scholar?value=false' ? <p className='none-found'>No applicants in system!</p> : 
                            (viewValue === 'donor' ? <p className='none-found'>No donors in system!</p> :
                                (viewValue === 'applicant' ? <p className='none-found'>No applicants in system!</p> : <p className='none-found'>No one in system! </p>)
                            )
                        )
                    }
                </div>
            }
            {openAdd ? <AddPopUp
                handleClose = {toggleAddPopup}
            /> : ""}
            {openDonor ? <DonorPopUp
                scholar = {assignScholar}
                handleClose = {toggleDonorPopup}
            /> : ""}
            {openDelete ? <DeletePopUp
                person = {assignDelete}
                type = {viewValue}
                handleClose={toggleDeletePopup}
            /> : ""}
            <Footer/>
        </div>
    )
}

export default List;
