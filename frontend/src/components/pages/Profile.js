import Header from '../components/Header'
import Footer from '../components/Footer'
import {React, useState, useEffect} from 'react';
import {apiUrl} from '../../apiUrl';
import {Link, useParams} from 'react-router-dom';
import Avatar from '../images/Avatar.jpg'
import '../css/Profile.css'

function Profile () {

    function formatDate(birthday) {
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

    const [record, setRecord] = useState([]);
    const {type, id} = useParams();

    useEffect(() => {
        Promise.all([
            type === "donor" ? fetch(apiUrl(`/donor/${id}`)) : null,
            type === "applicant" ? fetch(apiUrl(`/applicant/${id}`)) : null,
            type === 'scholar' ? fetch(apiUrl(`/scholar/${id}`)) : null
        ])
        .then(([resDonors, resApps, resScholars]) => {
            return Promise.all([
                resDonors ? resDonors.json() : null,
                resApps ? resApps.json() : null,
                resScholars ? resScholars.json() : null
            ]);
        })
        .then(([dataDonors, dataApps, dataScholars]) => {
            if (type === "donor") {
                setRecord(dataDonors);
                let uploadID = dataDonors.upload_id.split(".")[0]
                fetch(apiUrl(`/upload/${uploadID}`), {
                    method: "GET",
                }).then((response) => response.json())
                .catch(error => {
                    console.error("Error fetching data:", error);
                });    
            }
            if (type === "applicant") {
                setRecord(dataApps);
                let uploadID = dataApps.upload_id.split(".")[0];
                fetch(apiUrl(`/upload/${uploadID}`), {
                    method: "GET",
                }).then((response) => response.json())
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
            }
            if (type === "scholar") {
                setRecord(dataScholars);
                let uploadID = dataScholars.upload_id.split(".")[0];
                fetch(apiUrl(`/upload/${uploadID}`), {
                    method: "GET",
                }).then((response) => response.json())
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
                    {record.upload_id ? <img className="profile-pic" src={require(`../images/${record.upload_id}`)} alt="logo"/>: <img className="profile-pic" src={Avatar} alt="logo"/>}
                    {record.first_name ? 
                        <div className='name'>{record.first_name.toUpperCase()} {record.last_name.toUpperCase()}</div>
                    : ""}
                    <table className='profile-table'>
                        <tr>&nbsp;</tr>
                        <tr><td><button className='profile-button-current'>Personal & Contact</button></td></tr>
                        {type !== "donor" ? 
                            <tr><td><button className='profile-button'><Link to={`/${type}/${id}/Profile-Family`}>Family Background</Link></button></td></tr>                        
                        : ""}
                        {type !== "donor" ? 
                            <tr><td><button className='profile-button'><Link to={`/${type}/${id}/Profile-Education`}>Education</Link></button></td></tr>
                        : ""}
                        {type === "donor" || (type === "scholar" && record.scholarship_id !== undefined) ? <tr><td><button className='profile-button'><Link to={`/${type}/${id}/Profile-Scholarship`}>Scholarship</Link></button></td></tr> : ""}
                    </table>
                </div>

                <div className='profile-container'>
                    <header className='profile-header'>PERSONAL BACKGROUND</header>
                    <table className='personal-table'>
                        <tr className='smol'>&nbsp;</tr>
                        <tr>
                        <td className='cell-bold'>Last Name</td>
                        <td className='info-here'>{record.last_name}</td>
                        <td className='barrier'>||||</td><td className='barrier'>||||</td><td className='barrier'>||||</td>
                        <td className='cell-bold'>First Name</td>
                        <td className='info-here'>{record.first_name}</td>
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                        <td className='cell-bold'>Middle Name</td>
                        <td className='info-here'>{record.middle_name ? record.middle_name : <span className='info-white'>N/A</span>}</td>
                        <td className='barrier'>||||</td><td className='barrier'>||||</td><td className='barrier'>||||</td>
                        <td className='cell-bold'>Suffix</td>
                        <td className='info-here'>{record.suffix}</td>
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                        <td className='cell-bold'>Birthdate</td>
                        <td className='info-here'>{formatDate(record.birthday)}</td>
                        <td className='barrier'>||||</td><td className='barrier'>||||</td><td className='barrier'>||||</td>
                        <td className='cell-bold'>Sex</td>
                        {record.sex ? <td className='info-here'>{record.sex.charAt(0).toUpperCase() + record.sex.slice(1)}</td> : ""}
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                        <td className='cell-bold'>Birthplace</td>
                        <td className='info-here'>{record.birthplace}</td>
                        <td className='barrier'>||||</td><td className='barrier'>||||</td><td className='barrier'>||||</td>
                        <td className='cell-bold'>Citizenship</td>
                        <td className='info-here'>{record.citizenship}</td>
                        </tr>
                        <tr className='smol'></tr>
                        {type !== "donor" ? 
                        <tr>
                        <td className='cell-bold'>Graduation Year</td>
                        <td className='info-here'>{record.graduation_year}</td>
                        </tr>
                        : ""}
                        <tr className='smol'></tr>
                    </table>
                    <header className='profile-header'>CONTACT INFORMATION</header>
                    <table className='personal-table'>
                        <tr className='smol'>&nbsp;</tr>
                        <tr>
                        <td className='cell-bold'>Contact Number</td>
                        <td className='info-here'>{record.mobile_no}</td>
                        <td className='barrier'>||||</td><td className='barrier'>||||</td><td className='barrier'>||||</td>
                        <td className='cell-bold'>Email</td>
                        <td className='info-here'>{record.email}</td>
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                        <td className='cell-bold'>Address</td>
                        {record.address && type !== "donor" ?
                            <td className='huge-info-here' colSpan='8'> {record.address.street}, {record.address.subd}, {record.address.brgy}, {record.address.city}, {record.address.province}, {record.address.postal_code} </td>
                        : <td className='huge-info-here' colSpan='8'> <span className='info-white'>N/A</span> </td>} 
                        </tr>
                        <tr className='smol'></tr>
                    </table>
                </div>
                <Footer/>
        </div>
    )
}

export default Profile;
