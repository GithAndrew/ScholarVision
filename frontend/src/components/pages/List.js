import Header from '../components/Header'
import Footer from '../components/Footer'
import Alert from '../components/Alert';
import {React, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {apiUrl} from '../../apiUrl';
import useStore from '../../authHook';
import {AiFillDelete, AiFillCheckCircle} from 'react-icons/ai';
import {BsSearch}  from 'react-icons/bs';
import AddPopUp from '../components/AddPopUp';
import ConfirmPopUp from '../components/ConfirmPopUp';
import DonorPopUp from '../components/DonorPopUp';
import OrderPopUp from '../components/OrderPopUp';
import '../css/List.css'

function List () {
    localStorage.setItem('currentLocation', window.location.pathname);
    const { user } = useStore();
    let userRole = "";
    if (user) {userRole = user.role;}

    let input;
    const [assignScholar, setAssign] = useState([]);
    const [assignConfirm, setAssignConfirm] = useState([]);
    const [forConfirm, setConfirm] = useState([]);

    const [scholarships, setScholarships] = useState([]);
    const [record, setRecord] = useState([]);
    const [originalRecord, setOriginalRecord] = useState([]);
    const [combinedLength, setCombinedLength] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    
    const [openDonor, setOpenDonor] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openOrder, setOpenOrder] = useState(false);

    const [openAdd, setAddField] = useState(false);
    const [field, setField] = useState();
    const [requiredField, setRequiredField] = useState(false);

    // https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react
    const [checkedDelete, setcheckedDelete] = useState([]);
    const [deleteMany, setDeleteMany] = useState([]);
    const [checkedAccept, setcheckedAccept] = useState([]);
    const [acceptMany, setAcceptMany] = useState([]);

    const [viewValue, setViewValue] = useState("");
    const [orderValue, setOrderValue] = useState("");

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    let attributes = [];
    if (record[0] && record[0]["newFields"]) {
        const keys = Object.keys(record[0]["newFields"]);
        keys.forEach(key => {attributes.push(key);});
    }

    const showMessage = (message) => {
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
        { label: 'GRANT', value: 'grant' },
        { label: 'ADD VIEW', value: 'newfield' }
    ]);

    const [searchOrderFilter, setSearchOrderFilter] = useState([
        { label: 'NONE', value: '' },
        { label: 'LAST NAME', value: 'last_name' },
        { label: 'FIRST NAME', value: 'first_name' },
        { label: 'GRAD YEAR', value: 'graduation_year' },
        { label: 'GRANT', value: 'grant' },
        { label: 'ADD SEARCH', value: 'searchfield' }
    ]);

    const viewChange = (selectedValue) => {
        setViewValue(selectedValue);
        localStorage.setItem('viewValue', selectedValue);
    }

    const orderChange = (selectedValue) => {
        setOrderValue(selectedValue);
    }

    const searchChange = (selectedValue) => {
        setSearchQuery(selectedValue);
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

    const updateSearchOrderFilter = (newValue) => {
        const newAttribute = newValue.replace(' ', '_').replace('Number', 'no');
        searchOrderFilter.splice(searchOrderFilter.length-1, 0, { label: newValue.toUpperCase(), value: newAttribute.toLowerCase() });
        setSearchOrderFilter(searchOrderFilter)
        setSearchQuery(newAttribute.toLowerCase())
    }

    const handleUserInput = (e) => {
        input = e.target.value;
    }

    // https://www.tutorialspoint.com/enter-key-press-event-in-javascript
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        let inputLink = ""

        if (input !== '' && input !== undefined && viewValue === "donor") {inputLink = (apiUrl(`/donor/search?${searchQuery}=${input}`))}
        if (input !== '' && input !== undefined && viewValue === "applicant") {inputLink = (apiUrl(`/applicant/search?${searchQuery}=${input}`))}
        if (input !== '' && input !== undefined && viewValue === "scholar?value=false") {inputLink = (apiUrl(`/scholar/search?${searchQuery}=${input}&value=false`))}
        if (input !== '' && input !== undefined && viewValue === "scholar?value=true") {inputLink = (apiUrl(`/scholar/search?${searchQuery}=${input}&value=true`))}

        if (inputLink !== "") {
            fetch(inputLink, {
                method: "GET",
                credentials:'include',
            })
            .then(response => {return response.json()})
            .then((data) => {setRecord(data.result)})
        } else {
            fetch(apiUrl(`/${viewValue}`), {
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
            showMessage("No link inputted!");
            return;
        }

        if (!urlPattern.test(value)) {
            showMessage("Not a valid link!");
            return;
        }

        let fetchLink = apiUrl(`/${viewValue}/${person._id}`)

        if (viewValue !== "applicant") {
            fetchLink = apiUrl(`/scholar/${person._id}`)
        }

        fetch(fetchLink, {
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
                applicant_link: document.getElementById(current_link).value,
                scholarship_id: person.scholarship_id
            })
        })
        .then(response => {return response.json()})
        .then(showMessage("Link submitted!"))
        .then(setTimeout(() => window.location.reload(), 750))
    }

    const newField = (userInput, required) => {
        if (userInput) {
            toggleAddPopup()
            setField(userInput)

            if (viewValue === "applicant" || viewValue.includes("scholar")){
                Promise.all([
                    fetch(apiUrl(`/applicant`), {credentials:'include'}),
                    fetch(apiUrl(`/scholar`), {credentials:'include'})
                ])
                .then(([resApps, resScholars]) => {
                    return Promise.all([
                        resApps ? resApps.json() : null,
                        resScholars ? resScholars.json() : null
                    ]);
                })
                .then(([dataApps, dataScholars]) => {
                    setCombinedLength([dataApps.length, dataScholars.length])
                    const combinedData = [ ...dataApps, ...dataScholars ];
                    setRecord(combinedData);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
            }
            setRequiredField(required)
        } else {
            showMessage("No input!")
        }
    }

    const validateNewField = () => {
        let newFieldsArr = []
        for (let i = 0; i < record.length; i++) {
            const element = document.getElementById(`new_field${i}`);
            const value = element ? element.value : '';
            if (requiredField && value === '') {
                showMessage(`Missing input for ${record[i].first_name} ${record[i].last_name}!`)
                return
            }
            newFieldsArr.push(value)
        }

        for (let j = 0; j < newFieldsArr.length; j++) {
            let fetchLink = apiUrl(`/${viewValue}/${record[j]._id}`)

            if (viewValue.includes("scholar") || viewValue === "applicant") {
                if (j < combinedLength[0]) {
                    fetchLink = apiUrl(`/applicant/${record[j]._id}`)
                } else {
                    fetchLink = apiUrl(`/scholar/${record[j]._id}`)
                }
            }

            const requestBody = {
                newFields: {[field.toLowerCase() + "~" + requiredField]: `${newFieldsArr[j]}`}
            };

            fetch(fetchLink,{
                method: "POST",
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            .then(response => {return response.json()})
        }
        showMessage(`Added new field ${field}!`)
        setTimeout(() => window.location.reload(), 750)
    }

    const handleCancelAdding = () => {
        setField();
        setRecord(originalRecord);
    };

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
            orderValue !== '' && viewValue === "donor" ? fetch(apiUrl(`/donor/orderby?${orderValue}=1`), {credentials:'include'}) : null,
            orderValue !== '' && viewValue === "applicant" ? fetch(apiUrl(`/applicant/orderby?${orderValue}=1`), {credentials:'include'}) : null,
            orderValue !== '' && viewValue === "scholar?value=false" ? fetch(apiUrl(`/scholar/orderby?${orderValue}=1&value=false`), {credentials:'include'}) : null,
            orderValue !== '' && viewValue === "scholar?value=true" ? fetch(apiUrl(`/scholar/orderby?${orderValue}=1&value=true`), {credentials:'include'}) : null,
            viewValue === "donor" ? fetch(apiUrl(`/donor`), {credentials:'include'}) : null,
            viewValue === "applicant" ? fetch(apiUrl(`/applicant`), {credentials:'include'}) : null,
            viewValue === "scholar?value=false" ? fetch(apiUrl(`/scholar?value=false`), {credentials:'include'}) : null,
            viewValue === "scholar?value=true" ? fetch(apiUrl(`/scholar?value=true`), {credentials:'include'}) : null,
            fetch(apiUrl(`/scholarship`), {credentials:'include'})
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
                if (viewValue === "donor") {setRecord(dataDonorsO); setOriginalRecord(dataDonorsO);}
                if (viewValue === "applicant") {setRecord(dataAppsO); setOriginalRecord(dataAppsO);}
                if (viewValue === "scholar?value=false") {setRecord(dataAcceptedO); setOriginalRecord(dataAcceptedO);}
                if (viewValue === "scholar?value=true") {setRecord(dataScholarsO); setOriginalRecord(dataScholarsO);}
            } else {
                if (viewValue === "donor") {setRecord(dataDonors); setOriginalRecord(dataDonors);}
                if (viewValue === "applicant") {setRecord(dataApps); setOriginalRecord(dataApps);}
                if (viewValue === "scholar?value=false") {setRecord(dataAccepted); setOriginalRecord(dataAccepted);}
                if (viewValue === "scholar?value=true") {setRecord(dataScholars); setOriginalRecord(dataScholars);}
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

    useEffect(() => {
        const storedValue = localStorage.getItem('viewValue');
        if (storedValue) {
            setViewValue(storedValue);
        }
    }, []);

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
                            <header className='list-header'>RECORD OF APPLICANTS &#91; {record ? <span>&#160;{record.length} &#93;</span> : ""}</header>
                            : <header className='list-header'>RECORDS &#91; 0 &#93; </header>
                        )
                    )
                )
            }

            <ul className='record-dropdowns'>
                {checkedAccept.includes(true) ? <li><button className = 'record-acceptmany-button' onClick={() => openConfirmation(acceptMany, "accept")}>ACCEPT MANY</button></li> : ""}
                {checkedDelete.includes(true) ? <li><button className = 'record-deletemany-button' onClick={() => openConfirmation(deleteMany, "delete")}>DELETE MANY</button></li> : ""}
                {(userRole === "admin" || userRole === "member") && field ? <li><button className = 'record-enter-button' onClick={() => validateNewField()}>ENTER FIELD</button></li> : (userRole === "admin" || userRole === "member") && <li><button className = 'record-add-button' onClick={() => toggleAddPopup()}>ADD FIELD</button></li>}
                {field ? <li><button className = 'record-cancel-button' onClick={handleCancelAdding}>CANCEL ADDING</button></li> : ""}
                {userRole === "admin" || userRole === "member" ? <li><DropDown value = {viewValue} options = {viewFilter} onChange={viewChange} /></li> : ""}
                <li><DropDown value = {orderValue} options = {orderFilter} onChange={orderChange}/></li>
            </ul>

            {record.length !== 0 ?
                <div className='scholar-container'>
                    <div className='list-search-container'>
                        <input type = "text" id = 'input' className = 'list-search-input' placeholder = "Search a record" value={input} onChange={handleUserInput} onKeyDown={handleKeyDown} required></input>
                        <BsSearch className='list-search-icon' onClick={handleSubmit}/>
                        <DropDown value = {searchQuery} options = {searchOrderFilter} onChange={searchChange}/>
                    </div>
                    <table className='list-table'>
                        <tr className='table-header'>
                            <th className='list-head'>NAME</th>
                            <th className='list-head'>EMAIL</th>
                            {!field && viewValue !== "donor" ? <th className='list-head'>GRADUATION YEAR</th> : ""}
                            {(!field && viewValue === "donor") || (!field && viewValue === "scholar?value=true") ? <th className='list-head'>SCHOLARSHIP DETAILS</th> : ""}
                            {!field && attributes.map((attribute) => (<th className='list-head'>{attribute.toUpperCase().split("~")[0]}</th>))}
                            {!field && viewValue !== "donor" ? <th className='list-head'>LINKS</th> : ""}
                            {!field && viewValue === "scholar?value=false" ? <th className='list-head'>ASSIGN</th> : ""}
                            {!field && viewValue === "applicant" ? <th className='list-head'><AiFillCheckCircle className='green-check'></AiFillCheckCircle></th> : ""}
                            {!field && viewValue === "applicant" ? <th className='list-head'>ACCEPT?</th> : ""}
                            {(userRole === "admin" || userRole === "member") && !field && viewValue !== "applicant" ? <th className='list-head'>DELETE?</th> : ""}
                            {(userRole === "admin" || userRole === "member") && !field ? <th className='list-head'><AiFillDelete className='red-trash'></AiFillDelete> </th> : ""}
                            {field ? <th className='barrier'>&nbsp;</th> : ""}
                            {field ? <th className='list-head'>ADD {field.toUpperCase()}</th> : <th className='list-head'></th>}
                        </tr>
                        <tr className='smol'></tr>
                        {record.map((person, i) => {
                            return (
                                <tr className='list-row' key = {i}>
                                    {viewValue === 'scholar?value=true' || viewValue === 'scholar?value=false' ? 
                                        <td className='first-list-cell'><Link to={`/scholar/${person._id}/Profile`}>{person.last_name}, {person.first_name}{person.middle_name ? ', ' + person.middle_name : ""}</Link></td>
                                    : <td className='first-list-cell'><Link to={`/${viewValue}/${person._id}/Profile`}>{person.last_name}, {person.first_name}{person.middle_name ? ', ' + person.middle_name : ""}</Link></td>}
                                    <td className='list-cell'><a href={`mailto: ${person.email}`} className='email-color'>{person.email}</a></td>
                                    {!field && viewValue !== "donor" ? <td className='list-cell'>{person.graduation_year}</td> : ""}
                                    {(!field && viewValue === "scholar?value=true") || (!field && viewValue === "donor") ?
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
                                    {!field && person.newFields ? attributes.map((attribute) => (<td className='list-cell'>{person.newFields[attribute]}</td>)) : ""}
                                    {(!field && viewValue !== 'donor' && person.applicant_link !== undefined) ? <td className='list-cell'><a href={`${person.applicant_link}`} target="_blank" rel="noreferrer" className='app-link'>link</a> </td> :
                                        !field && viewValue !== 'donor' ? <td className='list-cell'><input type='text' className='link-input' id = {`app_link${i}`} placeholder='Input link of files.'></input> <button className='app-red-button' onClick={() => editAppLink(person, i)}>Submit</button></td> 
                                    : ""}
                                    {!field && viewValue === "scholar?value=false" ? <td className='list-cell'> <button className='app-green-button' onClick={() => giveScholarship(person)}>Yes</button></td> : ""}
                                    {!field && viewValue === "applicant" ? <td className='list-cell'><input type = 'checkbox' className='list-checkbox' checked = {checkedAccept[i]} value = {checkedAccept[i]} onChange={() => handleCheckAcceptChange(i)}></input></td> : ""}
                                    {!field && viewValue === "applicant" ?
                                        <td className='list-cell'>
                                            <div className='list-buttons'>
                                                <button className='app-green-button' onClick={() => openConfirmation(person, "accept")}>Yes</button>&nbsp;
                                                <button className='app-red-button' onClick={() => openConfirmation(person, "delete")}>No</button>
                                            </div>
                                        </td>
                                    : ""}
                                    {(userRole === "admin" || userRole === "member") && !field && viewValue !== "applicant" ? <td className='list-cell-trash' onClick={() => openConfirmation(person, "delete")}><AiFillDelete/></td> : ""}
                                    {(userRole === "admin" || userRole === "member") && !field ? <td className='list-cell'><input type = 'checkbox' className='list-checkbox' checked = {checkedDelete[i]} value = {checkedDelete[i]} onChange={() => handleCheckDeleteChange(i)}></input></td> : ""}
                                    {field ? <td className='table-barrier'>||||</td> : ""}
                                    {field ? <td className='list-cell'><input type='text' className='link-input' id = {`new_field${i}`} placeholder={`Enter ${field.toLowerCase()}.`}></input></td> : (userRole === "admin" || userRole === "member") && <td className='last-list-cell'>...</td>}
                                    {field ? <td className='last-table-barrier'>||||</td> : ""}
                                    {(userRole === "admin" || userRole === "member") ? "" : <td className='last-table-barrier'>||||</td>}
                                </tr>
                            );
                        })}
                    </table>
                </div>
            :
                <div className='scholar-container'>
                    <div className='list-search-container'>
                        <input type = "text" id = 'input' className = 'list-search-input' placeholder = "Search a record" value={input} onChange={handleUserInput} onKeyDown={handleKeyDown} required></input>
                        <BsSearch className='list-search-icon' onClick={handleSubmit}/>
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
            {orderValue === "newfield" && <OrderPopUp
                record = {record}
                orderFilter = {orderFilter}
                addView = {updateOrderFilter}
                handleClose = {toggleOrderPopup}
            />}
            {searchQuery === "searchfield" && <OrderPopUp
                record = {record}
                orderFilter = {searchOrderFilter}
                addView = {updateSearchOrderFilter}
                handleClose = {toggleOrderPopup}
            />}
            {openAdd ? <AddPopUp
                addField = {newField}
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
