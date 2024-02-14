import Header from '../components/Header'
import Footer from '../components/Footer'
import Avatar from '../images/Avatar.jpg'
import {React, useState, useEffect} from 'react';
import {apiUrl} from '../../apiUrl';
import {Link, useParams} from 'react-router-dom';
import '../css/Profile.css'


function ProfileScholarship () {
    const [record, setRecord] = useState([]);
    const {type, id} = useParams();

    useEffect(() => {
        Promise.all([
            type === "donor" ? fetch(apiUrl(`/donor/${id}`)) : null,
            type === "applicant" ? fetch(apiUrl(`/applicant/${id}`)) : null
        ])
        .then(([resDonors, resApps]) => {
            return Promise.all([
                resDonors ? resDonors.json() : null,
                resApps ? resApps.json() : null
            ]);
        })
        .then(([dataDonors, dataApps]) => {
            if (type === "donor") {setRecord(dataDonors);}
            if (type === "applicant") {setRecord(dataApps);}
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
                        <div className='name'>{record.first_name.toUpperCase()} {record.middle_name.toUpperCase()} {record.last_name.toUpperCase()}</div>
                    : ""}
                    <table className='profile-table'>
                        <tr>&nbsp;</tr>
                        <tr><td><button className='profile-button'><Link to={`/${type}/${id}/Profile`}>Personal & Contact</Link></button></td></tr>
                        {type !== "donor" ? 
                            <tr><td><button className='profile-button'><Link to={`/${type}/${id}/Profile-Family`}>Family Background</Link></button></td></tr>
                        :""}
                        {type !== "donor" ? 
                            <tr><td><button className='profile-button'><Link to={`/${type}/${id}/Profile-Education`}>Education</Link></button></td></tr>
                        :""}
                        <tr><td><button className='profile-button-current'>Scholarship</button></td></tr>
                    </table>
                </div>

                <div className='profile-container'>
                    <header className='profile-header'>SCHOLARSHIP</header>
                    <table className='personal-table'>
                        <tr>&nbsp;</tr>
                        <tr>
                        <td className='cell-bold'>Scholarship Name</td>
                        <td className='info-here'>xxxxxxxx</td>
                        <td className='barrier'>||||</td><td className='barrier'>||||</td><td className='barrier'>||||</td><td className='barrier'>||||</td><td className='barrier'>||||</td><td className='barrier'>||||</td>
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                        <td className='cell-bold'>Date of Acceptance</td>
                        <td className='info-here'>XXXX</td>
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                        <td className='cell-bold'>Year Granted</td>
                        <td className='info-here'>XXXX</td>
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                        <td className='cell-bold'>Total Grant</td>
                        <td className='info-here'>XXXXX.XX</td>
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                        <td className='cell-bold'>Details</td>
                        <td className='huge-info-here'>xxxxxxxx</td>
                        </tr>
                    </table>
                    </div>

            <Footer/>
        </div>
    )
}

export default ProfileScholarship;
