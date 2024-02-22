import Header from '../components/Header'
import Footer from '../components/Footer'
import Avatar from '../images/Avatar.jpg'
import {React, useState, useEffect} from 'react';
import {apiUrl} from '../../apiUrl';
import {Link, useParams} from 'react-router-dom';
import '../css/Profile.css'


function ProfileEducation () {
    const [record, setRecord] = useState([]);
    const {type, id} = useParams();

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
                        <tr>&nbsp;</tr>
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
                        <tr>&nbsp;</tr>
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
                        {record.educational_bg ?
                            <tr className='table-tr'>
                                <td className='info-here'> {record.educational_bg.educ_bg1.level ? record.educational_bg.educ_bg1.level : <span className='info-white'>N/A</span>} </td>
                                <td></td>
                                <td className='info-here'> {record.educational_bg.educ_bg1.school ? record.educational_bg.educ_bg1.school : <span className='info-white'>N/A</span>} </td>
                                <td></td>
                                <td className='info-here'> {record.educational_bg.educ_bg1.dates ? record.educational_bg.educ_bg1.dates : <span className='info-white'>N/A</span>} </td>
                                <td></td>
                                <td className='info-here'> {record.educational_bg.educ_bg1.awards ? record.educational_bg.educ_bg1.awards : <span className='info-white'>N/A</span>} </td>
                            </tr>
                        : ""}
                        <tr className='smol'></tr>
                        {record.educational_bg ?
                            <tr className='table-tr'>
                                <td className='info-here'> {record.educational_bg.educ_bg2.level ? record.educational_bg.educ_bg2.level : <span className='info-white'>N/A</span>} </td>
                                <td></td>
                                <td className='info-here'> {record.educational_bg.educ_bg2.school ? record.educational_bg.educ_bg2.school : <span className='info-white'>N/A</span>} </td>
                                <td></td>
                                <td className='info-here'> {record.educational_bg.educ_bg2.dates ? record.educational_bg.educ_bg2.dates : <span className='info-white'>N/A</span>} </td>
                                <td></td>
                                <td className='info-here'> {record.educational_bg.educ_bg2.awards ? record.educational_bg.educ_bg2.awards : <span className='info-white'>N/A</span>} </td>
                            </tr>
                        : ""}
                        <tr className='smol'></tr>
                        {record.educational_bg ?
                            <tr className='table-tr'>
                                <td className='info-here'> {record.educational_bg.educ_bg3.level ? record.educational_bg.educ_bg3.level : <span className='info-white'>N/A</span>} </td>
                                <td></td>
                                <td className='info-here'> {record.educational_bg.educ_bg3.school ? record.educational_bg.educ_bg3.school : <span className='info-white'>N/A</span>} </td>
                                <td></td>
                                <td className='info-here'> {record.educational_bg.educ_bg3.dates ? record.educational_bg.educ_bg3.dates : <span className='info-white'>N/A</span>} </td>
                                <td></td>
                                <td className='info-here'> {record.educational_bg.educ_bg3.awards ? record.educational_bg.educ_bg3.awards : <span className='info-white'>N/A</span>} </td>
                            </tr>
                        : ""}
                        <tr className='smol'></tr>
                        {record.educational_bg ?
                            <tr className='table-tr'>
                                <td className='info-here'> {record.educational_bg.educ_bg4.level ? record.educational_bg.educ_bg4.level : <span className='info-white'>N/A</span>} </td>
                                <td></td>
                                <td className='info-here'> {record.educational_bg.educ_bg4.school ? record.educational_bg.educ_bg4.school : <span className='info-white'>N/A</span>} </td>
                                <td></td>
                                <td className='info-here'> {record.educational_bg.educ_bg4.dates ? record.educational_bg.educ_bg4.dates : <span className='info-white'>N/A</span>} </td>
                                <td></td>
                                <td className='info-here'> {record.educational_bg.educ_bg4.awards ? record.educational_bg.educ_bg4.awards : <span className='info-white'>N/A</span>} </td>
                            </tr>
                        : ""}
                        <tr className='smol'></tr>
                        {record.educational_bg ?
                            <tr className='table-tr'>
                                <td className='info-here'> {record.educational_bg.educ_bg5.level ? record.educational_bg.educ_bg5.level : <span className='info-white'>N/A</span>} </td>
                                <td></td>
                                <td className='info-here'> {record.educational_bg.educ_bg5.school ? record.educational_bg.educ_bg5.school : <span className='info-white'>N/A</span>} </td>
                                <td></td>
                                <td className='info-here'> {record.educational_bg.educ_bg5.dates ? record.educational_bg.educ_bg5.dates : <span className='info-white'>N/A</span>} </td>
                                <td></td>
                                <td className='info-here'> {record.educational_bg.educ_bg5.awards ? record.educational_bg.educ_bg5.awards : <span className='info-white'>N/A</span>} </td>
                            </tr>
                        : ""}
                        <tr className='smol'></tr>
                    </table>
                </div>
            <Footer/>
        </div>
    )
}

export default ProfileEducation;
