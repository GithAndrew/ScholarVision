import Header from '../components/Header'
import Footer from '../components/Footer'
import {React, useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {apiUrl} from '../../apiUrl';
import {useStore} from '../../authHook';
import Avatar from '../images/Avatar.jpg'
import '../css/Profile.css'

function ProfileFamily () {

    localStorage.setItem('currentLocation', window.location.pathname);
    const { user } = useStore();
    let userRole = "";
    if (user) {userRole = user.role;}
    console.log(userRole)
    const [imageURL, setImageURL] = useState();

    const [record, setRecord] = useState([]);
    const {type, id} = useParams();

    function formatDate(birthday) {
        if (birthday === "") {return}
        if (birthday !== undefined) {
            if(birthday.includes("/")) {
                const dateParts = birthday.split('/');
                const month = parseInt(dateParts[0]);
                const day = parseInt(dateParts[1]);
                const year = parseInt(dateParts[2]);
                const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
                const formattedDate = monthNames[month-1] + ' ' + day + ', ' + year;
            
                return formattedDate;    
            } else {
                const dateParts = birthday.split('-');
                const year = parseInt(dateParts[0]);
                const month = parseInt(dateParts[1]);
                const day = parseInt(dateParts[2]);
                const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
                const formattedDate = monthNames[month-1] + ' ' + day + ', ' + year;
            
                return formattedDate;
            }
        }
    }

    useEffect(() => {
        Promise.all([
            type === "applicant" ? fetch(apiUrl(`/applicant/${id}`), {credentials:'include'}) : null,
            type === 'scholar' ? fetch(apiUrl(`/scholar/${id}`), {credentials:'include'}) : null
        ])
        .then(([resApps, resScholars]) => {
            return Promise.all([
                resApps ? resApps.json() : null,
                resScholars ? resScholars.json() : null
            ]);
        })
        .then(([dataApps, dataScholars]) => {
            if (type === "applicant") {
                setRecord(dataApps);
                let uploadID = dataApps.upload_id.split(".")[0];
                fetch(apiUrl(`/upload/${uploadID}`), {
                    method: "GET",
                    credentials: 'include'
                }).then((response) => response.json())
                .then(dataUrl => {setImageURL(dataUrl)})
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
            }
            if (type === "scholar") {
                setRecord(dataScholars);
                let uploadID = dataScholars.upload_id.split(".")[0];
                fetch(apiUrl(`/upload/${uploadID}`), {
                    method: "GET",
                    credentials: 'include'
                }).then((response) => response.json())
                .then(dataUrl => {setImageURL(dataUrl)})
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
            }
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
                    {record.upload_id ? <img className="profile-pic" src={imageURL} alt="logo"/>: <img className="profile-pic" src={Avatar} alt="logo"/>}
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
                            <tr className='smol'>&nbsp;</tr>
                        <td className='cell-bold' colSpan='4'>If not living with parents</td>
                        <tr className='smol'>&nbsp;</tr>
                        <tr>
                        <td className='cell-bold'>Guardian's Name</td>
                        {record.guardian_details ? <td className='info-here' colSpan='10'>{record.guardian_details.guardian_name}</td>: <span className='info-white'>N/A</span>}
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                        <td className='cell-bold'>Birthdate</td>
                        {record.guardian_details ? <td className='info-here' colSpan='4'>{formatDate(record.guardian_details.guardian_birthday)}</td>: <span className='info-white'>N/A</span>}
                        <td className='barrier'>||||</td>
                        <td className='cell-bold'>Citizenship</td>
                        {record.guardian_details ? <td className='info-here' colSpan='4'>{record.guardian_details.guardian_citizenship}</td>: <span className='info-white'>N/A</span>}
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                        <td className='cell-bold'>Contact Number</td>
                        {record.guardian_details ? <td className='info-here' colSpan='4'>{record.guardian_details.guardian_mobile_no}</td>: <span className='info-white'>N/A</span>}
                        <td className='barrier'>||||</td>
                        <td className='cell-bold'>Highest Education Attainment</td>
                        {record.guardian_details ? <td className='info-here' colSpan='4'>{record.guardian_details.guardian_educ_attainment}</td>: <span className='info-white'>N/A</span>}
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                        <td className='cell-bold'>Occupation</td>
                        {record.guardian_details ? <td className='info-here' colSpan='4'>{record.guardian_details.guardian_occupation}</td>: <span className='info-white'>N/A</span>}
                        <td className='barrier'>||||</td>
                        <td className='cell-bold'>Employer</td>
                        {record.guardian_details ? <td className='info-here' colSpan='4'>{record.guardian_details.guardian_employer}</td>: <span className='info-white'>N/A</span>}
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                        <td className='cell-bold'>Annual Income</td>
                        {record.guardian_details ? <td className='info-here' colSpan='10'>{record.guardian_details.guardian_income}</td>: <span className='info-white'>N/A</span>}
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                        <td className='cell-bold'>Business Address</td>
                        {record.guardian_details ? <td className='huge-info-here' colSpan='10'>{record.guardian_details.guardian_business_address}</td>: <span className='info-white'>N/A</span>}
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

                    {record.sibling_details && Object.keys(record.sibling_details).map((key, index) => (
                        <tr className='table-tr' key={index}>
                            <td className='info-here'>{record.sibling_details[key].name || <span className='info-white'>N/A</span>}</td>
                            <td></td>
                            <td className='info-here'>{record.sibling_details[key].age || <span className='info-white'>N/A</span>}</td>
                            <td></td>
                            <td className='info-here'>{record.sibling_details[key].civil_status || <span className='info-white'>N/A</span>}</td>
                            <td></td>
                            <td className='info-here'>{record.sibling_details[key].educ_attainment || <span className='info-white'>N/A</span>}</td>
                            <td></td>
                            <td className='info-here'>{record.sibling_details[key].occupation || <span className='info-white'>N/A</span>}</td>
                        </tr>
                    ))}
                    <tr className='smol'></tr>
                    </table>
                </div>
            <Footer/>
        </div>
    )
}

export default ProfileFamily;
