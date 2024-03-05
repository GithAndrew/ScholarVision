import Header from '../components/Header'
import Footer from '../components/Footer'
import {React, useState, useEffect} from 'react';
import {apiUrl} from '../../apiUrl';
import {Link} from 'react-router-dom';
// import {Link, useLocation} from 'react-router-dom';
import {AiFillDelete, AiFillCheckCircle} from 'react-icons/ai';
import {BsSearch}  from 'react-icons/bs';
import DonorPopUp from '../components/DonorPopUp';
import ConfirmPopUp from '../components/ConfirmPopUp';
import AddPopUp from '../components/AddPopUp';
import OrderPopUp from '../components/OrderPopUp';
import Alert from '../components/Alert';
import '../css/List.css'

function List () {
    // const location = useLocation();
    // console.log(location)
    // const [viewValue, setViewValue] = useState(location.state ? location.state.viewValue : "scholar?value=true");
    let input;
    const [assignScholar, setAssign] = useState([]);
    const [assignConfirm, setAssignConfirm] = useState([]);
    const [forConfirm, setConfirm] = useState([]);

    const [scholarships, setScholarships] = useState([]);
    const [record, setRecord] = useState([]);

    const [openDonor, setOpenDonor] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openAdd, setAddField] = useState(false);
    const [openOrder, setOpenOrder] = useState(false);

    // https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react
    const [checkedDelete, setcheckedDelete] = useState([]);
    const [deleteMany, setDeleteMany] = useState([]);
    const [checkedAccept, setcheckedAccept] = useState([]);
    const [acceptMany, setAcceptMany] = useState([]);

    const [viewValue, setViewValue] = useState("applicant");
    const [orderValue, setOrderValue] = useState("");

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleShowAlert = (message) => {
        setAlertMessage(message);
        toggleAlertPopUp()
    };

    const toggleAlertPopUp = () => {
        setShowAlert(!showAlert);
    };

    const viewFilter = [
        {label:'SCHOLAR', value:'scholar?value=true'},
        {label:'DONOR', value:'donor'},
        {label:'ACCEPTED', value:'scholar?value=false'},
        {label:'APPLICANT', value:'applicant'}
    ]

    const [orderFilter, setOrderFilter] = useState([
        { label: 'NONE', value: '' },
        { label: 'LAST NAME', value: 'last_name' },
        { label: 'FIRST NAME', value: 'first_name' },
        { label: 'GRAD YEAR', value: 'graduation_year' },
        { label: 'ADD VIEW', value: 'newfield' }
    ]);

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

    const openConfirmation = (person, toDo) => {
        setAssignConfirm(person)
        setConfirm(toDo)
        toggleConfirmPopup()
    }

    const toggleConfirmPopup = () => {
        setOpenDelete(!openDelete);
    }

    const toggleAddPopup = () => {
        setAddField(!openAdd);
    }

    const toggleOrderPopup = () => {
        setOpenOrder(!openOrder);
        setOrderValue("")
    }

    const updateOrderFilter = (newValue) => {
        const newAttribute = newValue.replace(' ', '_').replace('Number', 'no');
        orderFilter.splice(orderFilter.length-1, 0, { label: newValue.toUpperCase(), value: newAttribute.toLowerCase() });
        setOrderFilter(orderFilter)
        setOrderValue(newAttribute.toLowerCase())
    }

    const handleUserInput = (e) => {
        input = e.target.value;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let inputLink = ""

        if (input !== '' && input !== undefined && viewValue === "donor") {inputLink = (apiUrl(`/donor/search?name=${input}`))}
        if (input !== '' && input !== undefined && viewValue === "applicant") {inputLink = (apiUrl(`/applicant/search?name=${input}`))}
        if (input !== '' && input !== undefined && viewValue === "scholar?value=false") {inputLink = (apiUrl(`/scholar/search?name=${input}&value=false`))}
        if (input !== '' && input !== undefined && viewValue === "scholar?value=true") {inputLink = (apiUrl(`/scholar/search?name=${input}&value=true`))}

        if (inputLink !== "") {
            fetch(inputLink, {
                method: "GET",
                credentials:'include',
            })
            .then(response => {return response.json()})
            .then((data) => {setRecord(data.result)})
        } else {
            fetch(apiUrl(`/${viewValue}`),
            {
                method: "GET",
                credentials:'include'
            })
            .then(response => {return response.json()})
            .then((data) => {setRecord(data)})
        }
    }

    const handleCheckDeleteChange = (position) => {
        let toDelete = []

        const updatedcheckedDelete = checkedDelete.map((checked, index) => {
            if (index === position) {
                if (!checked === true) {
                    toDelete.push(record[index]._id)
                }
                return !checked;
            } else {
                if (checked === true) {
                    toDelete.push(record[index]._id)
                }
                return checked;
            }
        });

        setcheckedDelete(updatedcheckedDelete);
        setDeleteMany(toDelete);
    }

    const handleCheckAcceptChange = (position) => {
        let toAccept = []

        const updatedcheckedAccept = checkedAccept.map((checked, index) => {
            if (index === position) {
                if (!checked === true) {
                    toAccept.push(record[index])
                }
                return !checked;
            } else {
                if (checked === true) {
                    toAccept.push(record[index])
                }
                return checked;
            }
        });

        setcheckedAccept(updatedcheckedAccept);
        setAcceptMany(toAccept);
    }

    const editAppLink = (person, i) => {
        let current_link = `app_link${i}`
        const element = document.getElementById(current_link);
        const value = element ? element.value : '';
        const urlPattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
        // https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url

        if (value === '') {
            handleShowAlert("No link inputted!");
            return;
        }

        if (!urlPattern.test(value)) {
            handleShowAlert("Not a valid link!");
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
                guardian_details: person.guardian_details,
                sibling_details: person.sibling_details,
                educational_bg: person.educational_bg,
                statement: person.statement,
                upload_id: person.upload_id,
                applicant_link: document.getElementById(current_link).value
            })
        })
        .then(response => {return response.json()})
        .then(handleShowAlert("Link submitted!"))
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

    // const addGrant = () => {
    //    const grantFilterExists = orderFilter.some(item => item.value === 'grant');
    //     if(!grantFilterExists) {
    //         orderFilter.splice(orderFilter.length-1, 0, { label: "GRANT", value: "grant" });
    //         setOrderFilter(orderFilter);
    //     }
    // }

    // const removeGrant = () => {
    //     const filteredOrderFilter = orderFilter.filter(item => item.value !== 'grant');
    //     setOrderFilter(filteredOrderFilter);
    // }

    // useEffect(() => {
    //     if (viewValue === "donor" || viewValue === "scholar?value=true") {
    //         addGrant();
    //     } else {
    //         removeGrant();
    //     }
    // }, [viewValue]);

    // SOURCE: https://medium.com/@jdhawks/make-fetch-s-happen-5022fcc2ddae
    useEffect(() => {
        Promise.all([
            orderValue !== '' && viewValue === "donor" ? fetch(apiUrl(`/donor/orderby?${orderValue}=1`)) : null,
            orderValue !== '' && viewValue === "applicant" ? fetch(apiUrl(`/applicant/orderby?${orderValue}=1`)) : null,
            orderValue !== '' && viewValue === "scholar?value=false" ? fetch(apiUrl(`/scholar/orderby?${orderValue}=1&value=false`)) : null,
            orderValue !== '' && viewValue === "scholar?value=true" ? fetch(apiUrl(`/scholar/orderby?${orderValue}=1&value=true`)) : null,
            viewValue === "donor" ? fetch(apiUrl(`/donor`)) : null,
            viewValue === "applicant" ? fetch(apiUrl(`/applicant`)) : null,
            viewValue === "scholar?value=false" ? fetch(apiUrl(`/scholar?value=false`)) : null,
            viewValue === "scholar?value=true" ? fetch(apiUrl(`/scholar?value=true`)) : null,
            fetch(apiUrl(`/scholarship`))
        ])
        .then(([resDonorsO, resAppsO, resAcceptedO, resScholarsO, resDonors, resApps, resAccepted, resScholars, resScholarships]) => {
            return Promise.all([
                resDonorsO ? resDonorsO.json() : null,
                resAppsO ? resAppsO.json() : null,
                resAcceptedO ? resAcceptedO.json() : null,
                resScholarsO ? resScholarsO.json() : null,
                resDonors ? resDonors.json() : null,
                resApps ? resApps.json() : null,
                resAccepted ? resAccepted.json() : null,
                resScholars ? resScholars.json() : null,
                resScholarships.json()
            ]);
        })
        .then(([dataDonorsO, dataAppsO, dataAcceptedO, dataScholarsO, dataDonors, dataApps, dataAccepted, dataScholars, dataScholarship]) => {
            if (orderValue !== '') {
                if (viewValue === "donor") {setRecord(dataDonorsO);}
                if (viewValue === "applicant") {setRecord(dataAppsO);}
                if (viewValue === "scholar?value=false") {setRecord(dataAcceptedO);}
                if (viewValue === "scholar?value=true") {setRecord(dataScholarsO);}
            } else {
                if (viewValue === "donor") {setRecord(dataDonors);}
                if (viewValue === "applicant") {setRecord(dataApps);}
                if (viewValue === "scholar?value=false") {setRecord(dataAccepted);}
                if (viewValue === "scholar?value=true") {setRecord(dataScholars);}    
            }
            setScholarships(dataScholarship);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }, [orderValue, viewValue]);

    useEffect(() => {
        if (record === undefined) {}
        else {
            setcheckedDelete(new Array(record.length).fill(false));
            setcheckedAccept(new Array(record.length).fill(false))
        }
    }, [record])

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
                {checkedAccept.includes(true) ? <li><button className = 'record-acceptmany-button' onClick={() => openConfirmation(acceptMany, "accept")}>ACCEPT MANY</button></li> : ""}
                {checkedDelete.includes(true) ? <li><button className = 'record-deletemany-button' onClick={() => openConfirmation(deleteMany, "delete")}>DELETE MANY</button></li> : ""}
                <li><button className = 'record-add-button' onClick={() => toggleAddPopup()}>ADD FIELD</button></li>
                <li><button className = 'record-print-button'>PRINT</button></li>
                <li><DropDown value = {viewValue} options = {viewFilter} onChange={viewChange} /></li>
                <li><DropDown value = {orderValue} options = {orderFilter} onChange={orderChange}/></li>
            </ul>

            {record.length !== 0 ?
                <div className='scholar-container'>
                    <div className='list-search-container'>
                        <input type = "text" id = 'input' className = 'list-search-input' placeholder = "Search a record" value={input} onChange={handleUserInput} required></input>
                        <BsSearch className='list-search-icon' onClick={handleSubmit}/>
                    </div>
                    <table className='list-table'>
                        <tr className='table-header'>
                            <th className='list-head'>NAME</th>
                            <th className='list-head'>EMAIL</th>
                            {viewValue !== "donor" ? <th className='list-head'>GRADUATION YEAR</th> : ""}
                            {viewValue === "donor" || viewValue === "scholar?value=true" ? <th className='list-head'>SCHOLARSHIP DETAILS</th> : ""}
                            {viewValue !== "donor" ? <th className='list-head'>LINKS</th> : ""}
                            {viewValue === "scholar?value=false" ? <th className='list-head'>ASSIGN</th> : ""}
                            {viewValue === "applicant" ? <th className='list-head'><AiFillCheckCircle className='green-check'></AiFillCheckCircle></th> : ""}
                            {viewValue === "applicant" ? <th className='list-head'>ACCEPT?</th> : ""}
                            {viewValue !== "applicant" ? <th className='list-head'>DELETE?</th> : ""}
                            <th className='list-head'><AiFillDelete className='red-trash'></AiFillDelete> </th>
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
                                    {viewValue === "scholar?value=false" ? <td className='list-cell'> <button className='app-green-button' onClick={() => giveScholarship(person)}>Yes</button></td> : ""}
                                    {viewValue === "applicant" ? <td className='list-cell'><input type = 'checkbox' className='list-checkbox' checked = {checkedAccept[i]} value = {checkedAccept[i]} onChange={() => handleCheckAcceptChange(i)}></input></td> : ""}
                                    {viewValue === "applicant" ?
                                        <td className='list-cell'>
                                            <div className='list-buttons'>
                                                <button className='app-green-button' onClick={() => openConfirmation(person, "accept")}>Yes</button>&nbsp;
                                                <button className='app-red-button' onClick={() => openConfirmation(person, "delete")}>No</button>
                                            </div>
                                        </td>
                                    : ""}
                                    {viewValue !== "applicant" ? <td className='list-cell-trash' onClick={() => openConfirmation(person, "delete")}><AiFillDelete/></td> : ""}
                                    <td className='list-cell'><input type = 'checkbox' className='list-checkbox' checked = {checkedDelete[i]} value = {checkedDelete[i]} onChange={() => handleCheckDeleteChange(i)}></input></td>
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
            {/* {viewValue === "donor" || viewValue === "scholar?value=true" ? addGrant() : ""} */}
            {orderValue === "newfield" && <OrderPopUp
                record = {record}
                orderFilter = {orderFilter}
                handleClose = {toggleOrderPopup}
                addView = {updateOrderFilter}
            />}
            {openAdd ? <AddPopUp
                handleClose = {toggleAddPopup}
            /> : ""}
            {openDonor ? <DonorPopUp
                scholar = {assignScholar}
                handleClose = {toggleDonorPopup}
            /> : ""}
            {openDelete ? <ConfirmPopUp
                person = {assignConfirm}
                type = {viewValue}
                toDo = {forConfirm}
                handleClose = {toggleConfirmPopup}
            /> : ""}
            {showAlert ? <Alert 
                message={alertMessage} 
                handleClose={toggleAlertPopUp} 
            />: ""}
            
            <Footer/>
        </div>
    )
}

export default List;
