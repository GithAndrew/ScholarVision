import Header from '../components/Header'
import Footer from '../components/Footer'
import {React, useState, useEffect} from 'react';
import {apiUrl} from '../../apiUrl';
import {Link} from 'react-router-dom';
import {BsSearch}  from 'react-icons/bs';
// import DeletePopUp from './DeletePopUp';
import '../css/List.css'

function List () {
    const [viewValue] = useState("viewby");
    const [orderValue] = useState("orderby");
    const [donor, setDonor] = useState([]);

    const viewFilter = [
        {label:'VIEW BY', value:'viewby'},
        {label:'SCHOLAR', value:'scholar?value=true'},
        {label:'DONOR', value:'donor'},
        {label:'ACCEPTED', value:'scholar?value=false'},
        {label:'APPLICANT', value:'applicant'},
        {label:'ADD FIELD', value:'newfield'}
    ]

    const orderFilter = [
        {label: 'ORDER BY', value: 'orderby'},
        {label: 'NONE', value: ''},
        {label: 'AMOUNT', value: 'grant'},
        {label: 'NAME', value: 'name'},
        {label: 'GRAD YEAR', value: 'grad'},
        {label:'ADD FIELD', value:'newfield'}
    ]

    const DropDown = ({ value, options, onChange, type }) => {
        const filteredOptions = options.filter(option => option.value !== 'viewby');

        return (
          <label>
            <select value={value} onChange={onChange} className='record-dropdown'>
              {type === "order" ? <option value="" disabled hidden>ORDER BY</option> : <option value="" disabled hidden>VIEW BY</option>}
              {filteredOptions.map((option, i) => (
                <option key={i} value={option.value} className='record-option'>{option.label}</option>
              ))}
            </select>
          </label>
        );
      }            

    useEffect(() => {
        Promise.all([
          fetch(apiUrl("/donor"))
        ])
        .then(([resDonors]) => 
        Promise.all([resDonors.json()])
        )
        .then(([dataDonors]) => {
        setDonor(dataDonors);
        });
    }, []);

    console.log(donor)

    return (
        <div>
            <Header/>
            <button className='back-button'><Link to="/Home">BACK</Link></button>

            <header className='list-header'>RECORD OF DONORS &#91; {donor ? <span> {donor.length} </span> : ""} &#93; </header>
            {/* {viewValue === 'scholar?value=true' ? 
                <header className='list-header'>RECORD OF SCHOLARS &#91; {record ? <span> {record.length} &#93;</span> : ""}</header> : 
                (viewValue === 'scholar?value=false' ?
                    <header className='list-header'>RECORD OF ACCEPTED APPLICANTS &#91; {record ? <span> {record.length} &#93;</span> : ""}</header> : 
                    (viewValue === 'donor' ?
                        <header className='list-header'>RECORD OF DONORS &#91; {record ? <span> {record.length} &#93;</span> : ""}</header> :
                        <header className='list-header'>RECORD OF APPLICANTS &#91; {record ? <span> {record.length} &#93;</span> : ""}</header>
                    )
                )
            } */}

            <ul className='record-dropdowns'>
                <li><button className = 'record-print-button'>PRINT</button></li>
                <li><DropDown options = {viewFilter} value = {viewValue}/></li>
                <li><DropDown options = {orderFilter} value = {orderValue}/> </li>
            </ul>

            <div className='scholar-container'>
                <div className='list-search-container'>
                    <input type = "text" id = 'input' className = 'list-search-input' placeholder = "Search a record"required></input>
                    <BsSearch className='list-search-icon'/>
                </div>
                <table className='list-table'>
                    <tr className='table-header'>
                        <th className='list-head'>NAME</th>
                        <th className='list-head'>EMAIL</th>
                        <th className='list-head'>ADDRESS</th>
                        <th className='list-head'>ACCEPT?</th>
                        <th className='list-head'>ADD</th>
                    </tr>
                    <tr className='smol'></tr>
                    {donor.map((person, i) => {
                        return (
                            <tr className='list-row'>
                                <td className='first-list-cell'><Link to="/Profile">{person.last_name}, {person.first_name}{person.middle_name ? ', ' + person.middle_name : ""}</Link></td>
                                <td className='list-cell'><a href={`mailto: andrew.teope4@gmail.com`} className='email-color'>{person.email}</a></td>
                                <td className='list-cell'>{person.address}</td>
                                <td className='list-cell'>
                                    <div className='list-buttons'>
                                        <button className='app-green-button'>ACCEPT</button>&nbsp;
                                        <button className='app-red-button'>REJECT</button>
                                    </div>
                                </td>
                                <td className='last-list-cell'>...</td>
                            </tr>
                        );
                    })}

                    {/* <tr className='list-row'>
                        <td className='first-list-cell'><Link to="/ProfileDonor">Last Name, First Name, M.I.</Link></td>
                        <td className='list-cell'><a href="mailto:andrew.teope4@gmail.com" className='email-color'>email@email.com</a></td>
                        <td className='list-cell'>2023</td>
                        <td className='list-cell'>
                            <div className='list-buttons'>
                                <button className='app-green-button'>ACCEPT</button>&nbsp;
                                <button className='app-red-button'>REJECT</button>
                            </div>
                        </td>
                        <td className='last-list-cell'>...</td>
                    </tr> */}
                </table>
            </div>
            <Footer/>
        </div>
    )
}

export default List;
