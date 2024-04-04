import Header from '../components/Header'
import Footer from '../components/Footer'
import {React, useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {apiUrl} from '../../apiUrl';
import useStore from '../../authHook';
import Avatar from '../images/Avatar.jpg'
import '../css/Profile.css'

function ProfileEducation () {

    localStorage.setItem('currentLocation', window.location.pathname);
    const { user } = useStore();
    let userRole = "";
    if (user) {userRole = user.role;}
    console.log(userRole)

    const [record, setRecord] = useState([]);
    const {type, id} = useParams();

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
                    {record.upload_id ? <img className="profile-pic" src={require(`../images/${record.upload_id}`)} alt="logo"/>: <img className="profile-pic" src={Avatar} alt="logo"/>}
                    {record.first_name ? 
                        <div className='name'>{record.first_name.toUpperCase()} {record.last_name.toUpperCase()}</div>
                    : ""}
                    <table className='profile-table'>
                        <tr className='smol'>&nbsp;</tr>
                        <tr><td><button className='profile-button'><Link to={`/${type}/${id}/Profile`}>Personal & Contact</Link></button></td></tr>
                        {type !== "donor" ? 
                            <tr><td><button className='profile-button'><Link to={`/${type}/${id}/Profile-Family`}>Family Background</Link></button></td></tr>
                        :""}
                        <tr><td><button className='profile-button-current'>Education</button></td></tr>
                        {type === "donor" || (type === "scholar" && record.scholarship_id !== undefined) ? <tr><td><button className='profile-button'><Link to={`/${type}/${id}/Profile-Scholarship`}>Scholarship</Link></button></td></tr> : ""}
                    </table>
                </div>

                <div className='profile-container'>
                    <header className='profile-header'>EDUCATION</header>
                    <table className='personal-table'>
                        <tr className='smol'>&nbsp;</tr>
                        <tr>
                            <td className='cell-bold'>Education Level</td>
                            <td className='barrier'>||||</td>
                            <td className='cell-bold'>Name of School</td>
                            <td className='barrier'>||||</td>
                            <td className='cell-bold'>Inclusive Dates</td>
                            <td className='barrier'>||||</td>
                            <td className='cell-bold'>Scholarship or Academic Awards Received</td></tr>
                        <tr className='smol'></tr>
                        <tr className='smol'></tr>

                        {record.educational_bg && Object.keys(record.educational_bg).map((key, index) => (
                            <tr className='table-tr' key={index}>
                                <td className='info-here'>{record.educational_bg[key].level || <span className='info-white'>N/A</span>}</td>
                                <td></td>
                                <td className='info-here'>{record.educational_bg[key].school || <span className='info-white'>N/A</span>}</td>
                                <td></td>
                                <td className='info-here'>{record.educational_bg[key].dates || <span className='info-white'>N/A</span>}</td>
                                <td></td>
                                <td className='info-here'>{record.educational_bg[key].awards || <span className='info-white'>N/A</span>}</td>
                            </tr>
                        ))}
                        <tr className='smol'></tr>
                    </table>
                </div>
            <Footer/>
        </div>
    )
}

export default ProfileEducation;
