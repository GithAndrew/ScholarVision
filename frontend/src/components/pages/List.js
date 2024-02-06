import Header from '../components/Header'
import Footer from '../components/Footer'
import {React, useState} from 'react';
import {Link} from 'react-router-dom';
import {BsSearch}  from 'react-icons/bs';
// import DeletePopUp from './DeletePopUp';
import '../css/ScholarList.css'

function List () {
    const [viewValue] = useState("viewby");
    const [orderValue] = useState("orderby");

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

    const DropDown =({value,options,onChange,type})=>{
        return(
            <label>
                <select value={value} onChange={onChange} className = 'record-dropdown'>
                {type === "order" ?  <option value = "" disabled hidden>ORDER BY</option> : <option value = "" disabled hidden></option>}
                {options.map((option,i)=>(
                    <option key={i} value = {option.value} className = 'record-option'> {option.label} </option>
                ))}
                </select>
            </label>
        );
    }

    return (
        <div>
            <Header/>
            <button className='back-button'><Link to="/Home">BACK</Link></button>

            <header className='list-header'>RECORD OF APPLICANTS</header>
            <ul className='record-dropdowns'>
                <li><button className='record-print-button'>PRINT</button></li>
                <li><DropDown options={viewFilter} value = {viewValue}/></li>
                <li><DropDown options={orderFilter} value = {orderValue}/> </li>

                {/* <button className='record-printbutton'>PRINT</button>&nbsp;
                <DropDown className = 'record-dropdown' options={viewFilter} value = {viewValue} onChange={viewChange}/>
                &nbsp;
                {viewValue === 'scholar?value=true' ? <DropDown className = 'record-dropdown' type="order" options={orderFilter} value = {orderValue} onChange={orderChange}/>: 
                viewValue === 'scholar?value=false' ? <DropDown className = 'record-dropdown' type="order" options={orderFilter1} value = {orderValue} onChange={orderChange}/>: 
                viewValue === 'applicant' ? <DropDown className = 'record-dropdown' type="order" options={orderFilter1} value = {orderValue} onChange={orderChange}/>: 
                <DropDown className = 'record-dropdown' type="order" options={orderFilter2} value = {orderValue} onChange={orderChange}/>}  */}
            </ul>
            <div className='scholar-container'>
                <div className='list-search-container'>
                    <input type = "text" id = 'input' className = 'list-search-input' placeholder = "Search a record"required></input>
                    <BsSearch className='list-search-icon'/>
                </div>
                <table className='list-table'>
                    <tr><th className='list-head'>NAME</th><th className='list-head'>EMAIL</th><th className='list-head'>GRADUATION YEAR</th><th className='list-head'>ACCEPT?</th><th className='list-head'>ADD</th></tr>
                    <tr className='smol'></tr>
                    <tr className='list-row'>
                        <td className='first-list-cell'><Link to="/Profile">Last Name, First Name, M.I.</Link></td>
                        <td className='list-cell'><a href={`mailto: andrew.teope4@gmail.com`} className='email-color'>email@email.com</a></td>
                        <td className='list-cell'>2023</td>
                        <td className='list-cell'>
                            <div className='list-buttons'>
                                <button className='app-green-button'>ACCEPT</button>&nbsp;
                                <button className='app-red-button'>REJECT</button>
                            </div>
                        </td>
                        <td className='last-list-cell'>...</td>
                    </tr>
                    <tr className='smol'></tr>
                    <tr className='list-row'>
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
                    </tr>
                </table>
            </div>
            <Footer/>
        </div>
    )
}

export default List;
