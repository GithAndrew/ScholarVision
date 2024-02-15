import Header from '../components/Header'
import Footer from '../components/Footer'
import {React, useState, useEffect} from 'react';
import {apiUrl} from '../../apiUrl';
import {Link} from 'react-router-dom';
// import {Link, useLocation} from 'react-router-dom';
import {BsSearch, BsTrash}  from 'react-icons/bs';
// import DeletePopUp from './DeletePopUp';
import '../css/List.css'

function List () {
    // const location = useLocation();
    // console.log(location)
    // const [viewValue, setViewValue] = useState(location.state ? location.state.viewValue : "scholar?value=true");
    const [viewValue, setViewValue] = useState("scholar?value=true");
    const [orderValue, setOrderValue] = useState("name");
    // const [scholarship, setScholarship] = useState([]);
    const [record, setRecord] = useState([]);

    const viewFilter = [
        {label:'SCHOLAR', value:'scholar?value=true'},
        {label:'DONOR', value:'donor'},
        {label:'ACCEPTED', value:'scholar?value=false'},
        {label:'APPLICANT', value:'applicant'},
        {label:'ADD FIELD', value:'newfield'}
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
            // fetch(apiUrl(`/scholarship`))
        ])
        .then(([resDonors, resApps, resAccepted, resScholars]) => {
        // .then(([resDonors, resApps, resAccepted, resScholars, resScholarship]) => {
            return Promise.all([
                resDonors ? resDonors.json() : null,
                resApps ? resApps.json() : null,
                resAccepted ? resAccepted.json() : null,
                resScholars ? resScholars.json() : null,
                // resScholarship.json()
            ]);
        })
        .then(([dataDonors, dataApps, dataAccepted, dataScholars, dataScholarship]) => {
            if (viewValue === "donor") {setRecord(dataDonors);}
            if (viewValue === "applicant") {setRecord(dataApps);}
            if (viewValue === "scholar?value=false") {setRecord(dataAccepted);}
            if (viewValue === "scholar?value=true") {setRecord(dataScholars);}
            // setScholarship(dataScholarship)
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
                <li><button className = 'record-print-button'>PRINT</button></li>
                <li><DropDown options = {viewFilter} value = {viewValue} onChange={viewChange} type = "view"/></li>
                <li><DropDown options = {orderFilter} value = {orderValue} onChange={orderChange}/> </li>
            </ul>

            {/* {record.length !== 0 ? */}
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
                            {viewValue === "donor" || viewValue === "scholar?value=true" ? <th className='list-head'>SCHOLARSHIP</th> : ""}
                            {viewValue !== "donor" ? <th className='list-head'>LINKS</th> : ""}
                            {viewValue === "scholar?value=false" ? <th className='list-head'>ASSIGN</th> : ""}
                            {viewValue === "applicant" ? <th className='list-head'>ACCEPT?</th> : ""}
                            <th className='list-head'>DELETE?</th>
                            <th className='list-head'>ADD</th>
                        </tr>
                        <tr className='smol'></tr>
                        {record.map((person, i) => {
                            return (
                                <tr className='list-row' key = {i}>
                                    <td className='first-list-cell'><Link to={`/${viewValue}/${person._id}/Profile`}>{person.last_name}, {person.first_name}{person.middle_name ? ', ' + person.middle_name : ""}</Link></td>
                                    <td className='list-cell'><a href={`mailto: andrew.teope4@gmail.com`} className='email-color'>{person.email}</a></td>
                                    {viewValue === "applicant" || viewValue === "scholar?value=true" ? <td className='list-cell'>{person.graduation_year}</td> : ""}
                                    {viewValue === "donor" || viewValue === "scholar?value=true" ? <td className='list-cell'>SCHOLARSHIP</td> : ""}
                                    {viewValue !== "donor" ? <td className='list-cell'><a href={`http://${person.applicant_link}`} target="_blank" rel="noreferrer" className='email-color'>link</a></td> : ""}
                                    {viewValue === "scholar?value=false" ? <td className='list-cell'> <button className='app-green-button'>ACCEPT</button></td> : ""}
                                    {viewValue === "applicant" ?
                                        <td className='list-cell'>
                                            <div className='list-buttons'>
                                                <button className='app-green-button'>ACCEPT</button>&nbsp;
                                                <button className='app-red-button'>REJECT</button>
                                            </div>
                                        </td>
                                    : ""}
                                    <td className='list-cell-trash'><BsTrash/></td>
                                    <td className='last-list-cell'>...</td>
                                </tr>
                            );
                        })}
                    </table>
                </div>
            {/* : */}
                {/* <div className='scholar-container'>
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
                </div> */}
            {/* } */}
            <Footer/>
        </div>
    )
}

export default List;
