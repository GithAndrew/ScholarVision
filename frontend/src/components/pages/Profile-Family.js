import Header from '../components/Header'
import Footer from '../components/Footer'
import Avatar from '../images/Avatar.jpg'
import {React, useState, useEffect} from 'react';
import {apiUrl} from '../../apiUrl';
import {Link, useParams} from 'react-router-dom';
import '../css/Profile.css'


function ProfileFamily () {
    const [record, setRecord] = useState([]);
    const {type, id} = useParams();

    function formatDate(birthday) {
        if (birthday === "") {return}
        if (birthday !== undefined) {
            const dateParts = birthday.split('-');
            const year = parseInt(dateParts[0]);
            const month = parseInt(dateParts[1]);
            const day = parseInt(dateParts[2]);
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            const formattedDate = monthNames[month-1] + ' ' + day + ', ' + year;
        
            return formattedDate;
        }
    }

    useEffect(() => {
        Promise.all([
            type === "applicant" ? fetch(apiUrl(`/applicant/${id}`)) : null,
            type === 'scholar' ? fetch(apiUrl(`/scholar/${id}`)) : null
        ])
        .then(([resApps, resScholars]) => {
            return Promise.all([
                resApps ? resApps.json() : null,
                resScholars ? resScholars.json() : null
            ]);
        })
        .then(([dataApps, dataScholars]) => {
            if (type === "applicant") {setRecord(dataApps);}
            if (type === "scholar") {setRecord(dataScholars);}
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }, [type, id]);

    return (
        <div>
            <Header/>
                <button className='back-button'><Link to="/List">BACK</Link></button>
                <div className='profile'>
                    <img className="profile-pic" src={Avatar} alt="logo"/>
                    {record.first_name ? 
                        <div className='name'>{record.first_name.toUpperCase()} {record.last_name.toUpperCase()}</div>
                    : ""}
                    <table className='profile-table'>
                        <tr className='smol'>&nbsp;</tr>
                        <tr><td><button className='profile-button'><Link to={`/${type}/${id}/Profile`}>Personal & Contact</Link></button></td></tr>
                        <tr><td><button className='profile-button-current'>Family Background</button></td></tr>
                        {type !== "donor" ? 
                            <tr><td><button className='profile-button'><Link to={`/${type}/${id}/Profile-Education`}>Education</Link></button></td></tr>
                        :""}
                        {type === "donor" || (type === "scholar" && record.scholarship_id !== undefined) ? <tr><td><button className='profile-button'><Link to={`/${type}/${id}/Profile-Scholarship`}>Scholarship</Link></button></td></tr> : ""}
                    </table>
                </div>

                <div className='profile-container'>
                    <header className='profile-header'>PARENTS</header>
                    <table className='personal-table'>
                        <tr className='smol'>&nbsp;</tr>
                            <tr>
                                <td className='cell-bold'>Father's Name</td>
                                {record.father_details ? <td className='info-here' colSpan='4'>{record.father_details.father_name}</td>: <span className='info-white'>N/A</span>}
                                <td className='barrier'>||||</td>
                                <td className='cell-bold'>Mother's Name</td>
                                {record.mother_details ? <td className='info-here' colSpan='4'>{record.mother_details.mother_name}</td>: <span className='info-white'>N/A</span>}
                            </tr>
                            <tr className='smol'></tr>
                            <tr>
                                <td className='cell-bold'>Birthdate</td>
                                {record.father_details ? <td className='info-here'>{formatDate(record.father_details.father_birthday)}</td>: <span className='info-white'>N/A</span>}
                                <td className='barrier'>||||</td>
                                <td className='cell-bold'>Citizenship</td>
                                {record.father_details ? <td className='info-here'>{record.father_details.father_citizenship}</td>: <span className='info-white'>N/A</span>}
                                <td className='barrier'>||||</td>
                                <td className='cell-bold'>Birthdate</td>
                                {record.mother_details ? <td className='info-here'>{formatDate(record.mother_details.mother_birthday)}</td>: <span className='info-white'>N/A</span>}
                                <td className='barrier'>||||</td>
                                <td className='cell-bold'>Citizenship</td>
                                {record.mother_details ? <td className='info-here'>{record.mother_details.mother_citizenship}</td>: <span className='info-white'>N/A</span>}
                            </tr>
                            <tr className='smol'></tr>
                            <tr>
                                <td className='cell-bold'>Contact Number</td>
                                {record.father_details ? <td className='info-here'>{record.father_details.father_mobile_no}</td>: <span className='info-white'>N/A</span>}
                                <td className='barrier'>||||</td>
                                <td className='cell-bold'>Highest Education Attainment</td>
                                {record.father_details ? <td className='info-here'>{record.father_details.father_educ_attainment}</td>: <span className='info-white'>N/A</span>}
                                <td className='barrier'>||||</td>
                                <td className='cell-bold'>Contact Number</td>
                                {record.mother_details ? <td className='info-here'>{record.mother_details.mother_mobile_no}</td>: <span className='info-white'>N/A</span>}
                                <td className='barrier'>||||</td>
                                <td className='cell-bold'>Highest Education Attainment</td>
                                {record.mother_details ? <td className='info-here'>{record.mother_details.mother_educ_attainment}</td>: <span className='info-white'>N/A</span>}
                            </tr>
                            <tr className='smol'></tr>
                            <tr>
                                <td className='cell-bold'>Occupation</td>
                                {record.father_details ? <td className='info-here'>{record.father_details.father_occupation}</td>: <span className='info-white'>N/A</span>}
                                <td className='barrier'>||||</td>
                                <td className='cell-bold'>Employer</td>
                                {record.father_details ? <td className='info-here'>{record.father_details.father_employer}</td>: <span className='info-white'>N/A</span>}
                                <td className='barrier'>||||</td>
                                <td className='cell-bold'>Occupation</td>
                                {record.mother_details ? <td className='info-here'>{record.mother_details.mother_occupation}</td>: <span className='info-white'>N/A</span>}
                                <td className='barrier'>||||</td>
                                <td className='cell-bold'>Employer</td>
                                {record.mother_details ? <td className='info-here'>{record.mother_details.mother_employer}</td>: <span className='info-white'>N/A</span>}
                            </tr>
                            <tr className='smol'></tr>
                            <tr>
                                <td className='cell-bold'>Annual Income</td>
                                {record.father_details ? <td className='info-here' colSpan='4'>{record.father_details.father_income}</td>: <span className='info-white'>N/A</span>}
                                <td className='barrier'>||||</td>
                                <td className='cell-bold'>Annual Income</td>
                                {record.mother_details ? <td className='info-here' colSpan='4'>{record.mother_details.mother_income}</td>: <span className='info-white'>N/A</span>}
                            </tr>
                            <tr className='smol'></tr>
                            <tr>
                                <td className='cell-bold'>Business Address</td>
                                {record.father_details ? <td className='huge-info-here' colSpan='4'>{record.father_details.father_business_address}</td>: <span className='info-white'>N/A</span>}
                                <td className='barrier'>||||</td>
                                <td className='cell-bold'>Business Address</td>
                                {record.mother_details ? <td className='huge-info-here' colSpan='4'>{record.mother_details.mother_business_address}</td>: <span className='info-white'>N/A</span>}
                            </tr>
                            <tr><td className='barrier'>||||</td></tr>

                        <td className='cell-bold' colSpan='4'>If not living with parents</td>
                        <tr className='smol'></tr>
                        <tr className='smol'>&nbsp;</tr>
                            <tr>
                                <td className='cell-bold'>Guardian's Name</td>
                                {record.guardian_details ? <td className='info-here' colSpan='4'>{record.guardian_details.guardian_name}</td>: <span className='info-white'>N/A</span>}
                            </tr>
                            <tr className='smol'></tr>
                            <tr>
                                <td className='cell-bold'>Birthdate</td>
                                {record.guardian_details ? <td className='info-here'>{formatDate(record.guardian_details.guardian_birthday)}</td>: <span className='info-white'>N/A</span>}
                                <td className='barrier'>||||</td>
                                <td className='cell-bold'>Citizenship</td>
                                {record.guardian_details ? <td className='info-here'>{record.guardian_details.guardian_citizenship}</td>: <span className='info-white'>N/A</span>}
                            </tr>
                            <tr className='smol'></tr>
                            <tr>
                                <td className='cell-bold'>Contact Number</td>
                                {record.guardian_details ? <td className='info-here'>{record.guardian_details.guardian_mobile_no}</td>: <span className='info-white'>N/A</span>}
                                <td className='barrier'>||||</td>
                                <td className='cell-bold'>Highest Education Attainment</td>
                                {record.guardian_details ? <td className='info-here'>{record.guardian_details.guardian_educ_attainment}</td>: <span className='info-white'>N/A</span>}
                            </tr>
                            <tr className='smol'></tr>
                            <tr>
                                <td className='cell-bold'>Occupation</td>
                                {record.guardian_details ? <td className='info-here'>{record.guardian_details.guardian_occupation}</td>: <span className='info-white'>N/A</span>}
                                <td className='barrier'>||||</td>
                                <td className='cell-bold'>Employer</td>
                                {record.guardian_details ? <td className='info-here'>{record.guardian_details.guardian_employer}</td>: <span className='info-white'>N/A</span>}
                            </tr>
                            <tr className='smol'></tr>
                            <tr>
                                <td className='cell-bold'>Annual Income</td>
                                {record.guardian_details ? <td className='info-here' colSpan='4'>{record.guardian_details.guardian_income}</td>: <span className='info-white'>N/A</span>}
                            </tr>
                            <tr className='smol'></tr>
                            <tr>
                                <td className='cell-bold'>Business Address</td>
                                {record.guardian_details ? <td className='huge-info-here' colSpan='4'>{record.guardian_details.guardian_business_address}</td>: <span className='info-white'>N/A</span>}
                            </tr>
                        <tr className='smol'></tr>
                    </table>

                    <header className='profile-header'>SIBLINGS</header>
                    <table className='personal-table'>
                    <tr className='smol'>&nbsp;</tr>
                    <tr>
                        <td className='cell-bold'>Name of Siblings</td>
                        <td className='barrier'>||||</td>
                        <td className='cell-bold'>Age</td>
                        <td className='barrier'>||||</td>
                        <td className='cell-bold'>Civil Status</td>
                        <td className='barrier'>||||</td>
                        <td className='cell-bold'>Highest Education Attainment</td>
                        <td className='barrier'>||||</td>
                        <td className='cell-bold'>Occupation</td>
                    </tr>
                    <tr className='smol'></tr>
                    {record.sibling_details ?
                        <tr className='table-tr'>
                            <td className='info-here'> {record.sibling_details.sibling1.name ? record.sibling_details.sibling1.name : <span className='info-white'>N/A</span>} </td>
                            <td></td>
                            <td className='info-here'> {record.sibling_details.sibling1.age ? record.sibling_details.sibling1.age : <span className='info-white'>N/A</span>} </td>
                            <td></td>
                            <td className='info-here'> {record.sibling_details.sibling1.civil_status ? record.sibling_details.sibling1.civil_status : <span className='info-white'>N/A</span>} </td>
                            <td></td>
                            <td className='info-here'> {record.sibling_details.sibling1.educ_attainment ? record.sibling_details.sibling1.educ_attainment : <span className='info-white'>N/A</span>} </td>
                            <td></td>
                            <td className='info-here'> {record.sibling_details.sibling1.occupation ? record.sibling_details.sibling1.occupation : <span className='info-white'>N/A</span>} </td>
                        </tr>
                    : ""}
                    <tr className='smol'></tr>
                    {record.sibling_details ?
                        <tr className='table-tr'>
                            <td className='info-here'> {record.sibling_details.sibling2.name ? record.sibling_details.sibling2.name : <span className='info-white'>N/A</span>} </td>
                            <td></td>
                            <td className='info-here'> {record.sibling_details.sibling2.age ? record.sibling_details.sibling2.age : <span className='info-white'>N/A</span>} </td>
                            <td></td>
                            <td className='info-here'> {record.sibling_details.sibling2.civil_status ? record.sibling_details.sibling2.civil_status : <span className='info-white'>N/A</span>} </td>
                            <td></td>
                            <td className='info-here'> {record.sibling_details.sibling2.educ_attainment ? record.sibling_details.sibling2.educ_attainment : <span className='info-white'>N/A</span>} </td>
                            <td></td>
                            <td className='info-here'> {record.sibling_details.sibling2.occupation ? record.sibling_details.sibling2.occupation : <span className='info-white'>N/A</span>} </td>
                        </tr>
                    : ""}
                    <tr className='smol'></tr>
                    {record.sibling_details ?
                        <tr className='table-tr'>
                            <td className='info-here'> {record.sibling_details.sibling3.name ? record.sibling_details.sibling3.name : <span className='info-white'>N/A</span>} </td>
                            <td></td>
                            <td className='info-here'> {record.sibling_details.sibling3.age ? record.sibling_details.sibling3.age : <span className='info-white'>N/A</span>} </td>
                            <td></td>
                            <td className='info-here'> {record.sibling_details.sibling3.civil_status ? record.sibling_details.sibling3.civil_status : <span className='info-white'>N/A</span>} </td>
                            <td></td>
                            <td className='info-here'> {record.sibling_details.sibling3.educ_attainment ? record.sibling_details.sibling3.educ_attainment : <span className='info-white'>N/A</span>} </td>
                            <td></td>
                            <td className='info-here'> {record.sibling_details.sibling3.occupation ? record.sibling_details.sibling3.occupation : <span className='info-white'>N/A</span>} </td>
                        </tr>
                    : ""}
                    <tr className='smol'></tr>
                    {record.sibling_details ?
                        <tr className='table-tr'>
                            <td className='info-here'> {record.sibling_details.sibling4.name ? record.sibling_details.sibling4.name : <span className='info-white'>N/A</span>} </td>
                            <td></td>
                            <td className='info-here'> {record.sibling_details.sibling4.age ? record.sibling_details.sibling4.age : <span className='info-white'>N/A</span>} </td>
                            <td></td>
                            <td className='info-here'> {record.sibling_details.sibling4.civil_status ? record.sibling_details.sibling4.civil_status : <span className='info-white'>N/A</span>} </td>
                            <td></td>
                            <td className='info-here'> {record.sibling_details.sibling4.educ_attainment ? record.sibling_details.sibling4.educ_attainment : <span className='info-white'>N/A</span>} </td>
                            <td></td>
                            <td className='info-here'> {record.sibling_details.sibling4.occupation ? record.sibling_details.sibling4.occupation : <span className='info-white'>N/A</span>} </td>
                        </tr>
                    : ""}
                    <tr className='smol'></tr>
                    {record.sibling_details ?
                        <tr className='table-tr'>
                            <td className='info-here'> {record.sibling_details.sibling5.name ? record.sibling_details.sibling5.name : <span className='info-white'>N/A</span>} </td>
                            <td></td>
                            <td className='info-here'> {record.sibling_details.sibling5.age ? record.sibling_details.sibling5.age : <span className='info-white'>N/A</span>} </td>
                            <td></td>
                            <td className='info-here'> {record.sibling_details.sibling5.civil_status ? record.sibling_details.sibling5.civil_status : <span className='info-white'>N/A</span>} </td>
                            <td></td>
                            <td className='info-here'> {record.sibling_details.sibling5.educ_attainment ? record.sibling_details.sibling5.educ_attainment : <span className='info-white'>N/A</span>} </td>
                            <td></td>
                            <td className='info-here'> {record.sibling_details.sibling5.occupation ? record.sibling_details.sibling5.occupation : <span className='info-white'>N/A</span>} </td>
                        </tr>
                    : ""}
                    <tr className='smol'></tr>
                    </table>
                </div>
            <Footer/>
        </div>
    )
}

export default ProfileFamily;
