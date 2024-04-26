import Header from '../components/Header'
import Footer from '../components/Footer'
import {React, useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {apiUrl} from '../../apiUrl';
import {useStore} from '../../authHook';
import Avatar from '../images/Avatar.jpg'
import '../css/Profile.css'

function ProfileScholarship () {

    localStorage.setItem('currentLocation', window.location.pathname);
    const { user } = useStore();
    let userRole = "";
    if (user) {userRole = user.role;}
    console.log(userRole)
    const [imageURL, setImageURL] = useState();

    function formatDate(acceptDay) {
        const dateParts = acceptDay.split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const day = parseInt(dateParts[2]);
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const formattedDate = monthNames[month-1] + ' ' + day + ', ' + year;
    
        return formattedDate;
    }

    const [record, setRecord] = useState([]);
    const {type, id} = useParams();
    const [scholarships, setScholarship] = useState([])

    useEffect(() => {
        Promise.all([
            type === "donor" ? fetch(apiUrl(`/donor/${id}`), {credentials:'include'}) : null,
            type === "scholar" ? fetch(apiUrl(`/scholar/${id}`), {credentials:'include'}) : null,
            fetch(apiUrl(`/scholarship`), {credentials:'include'})
        ])
        .then(([resDonors, resScholars, resScholarship]) => {
            return Promise.all([
                resDonors ? resDonors.json() : null,
                resScholars ? resScholars.json() : null,
                resScholarship.json()
            ]);
        })
        .then(([dataDonors, dataScholars, dataScholarship]) => {
            if (type === "donor") {
                setRecord(dataDonors);
                let uploadID = dataDonors.upload_id;
                fetch(apiUrl(`/upload/${uploadID}`), {
                    method: "GET",
                    credentials: 'include'
                }).then((response) => response.text())
                .then(dataUrl => {setImageURL(dataUrl)})
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
            }
            if (type === "scholar") {
                setRecord(dataScholars);
                let uploadID = dataScholars.upload_id;
                fetch(apiUrl(`/upload/${uploadID}`), {
                    method: "GET",
                    credentials: 'include'
                }).then((response) => response.json())
                .then(dataUrl => {setImageURL(dataUrl)})
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
            }
            setScholarship(dataScholarship)
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
                    {imageURL ? <img className="profile-pic" src={imageURL} alt="profile"/>: <img className="profile-pic" src={Avatar} alt="profile"/>}
                    {record.first_name ? 
                        <div className='name'>{record.first_name.toUpperCase()} {record.last_name.toUpperCase()}</div>
                    : ""}
                    <table className='profile-table'>
                        <tr className='smol'>&nbsp;</tr>
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
                    {type === "donor" ? scholarships.map((scholarship) => (
                        record._id === scholarship.donor_id ? (
                            <table className='personal-table' key={scholarship.id}>
                                <tr className='smol'>&nbsp;</tr>
                                <tr>
                                    <td className='cell-bold'>Scholarship Name</td>
                                    <td className='info-here'>{scholarship.scholarshipname}</td>
                                    <td className='barrier'>||||</td><td className='barrier'>||||</td><td className='barrier'>||||</td><td className='barrier'>||||</td><td className='barrier'>||||</td><td className='barrier'>||||</td>
                                </tr>
                                <tr className='smol'></tr>
                                <tr>
                                    <td className='cell-bold'>Year Granted</td>
                                    <td className='info-here'>{scholarship.year}</td>
                                </tr>
                                <tr className='smol'></tr>
                                <tr>
                                    <td className='cell-bold'>Total Grant</td>
                                    <td className='info-here'>{scholarship.grant}</td>
                                </tr>
                                <tr className='smol'></tr>
                                <tr>
                                    <td className='cell-bold'>Details</td>
                                    <td className='huge-info-here'>{scholarship.details}</td>
                                </tr>
                            </table>
                        ) : ""
                    )) 
                    : 
                    type === "scholar" ? scholarships.map((scholarship) => (
                        record.scholarship_id === scholarship._id ? (
                            <table className='personal-table' key={scholarship.id}>
                                <tr className='smol'>&nbsp;</tr>
                                <tr>
                                    <td className='cell-bold'>Scholarship Name</td>
                                    <td className='info-here'>{scholarship.scholarshipname}</td>
                                    <td className='barrier'>||||</td><td className='barrier'>||||</td><td className='barrier'>||||</td><td className='barrier'>||||</td><td className='barrier'>||||</td><td className='barrier'>||||</td>
                                </tr>
                                <tr className='smol'></tr>
                                {record.acceptance_date ? <tr>
                                    <td className='cell-bold'>Date of Acceptance</td>
                                     <td className='info-here'> {formatDate(record.acceptance_date)} </td> 
                                </tr> : ""}
                                <tr className='smol'></tr>
                                <tr>
                                    <td className='cell-bold'>Year Granted</td>
                                    <td className='info-here'>{scholarship.year}</td>
                                </tr>
                                <tr className='smol'></tr>
                                <tr>
                                    <td className='cell-bold'>Total Grant</td>
                                    <td className='info-here'>{scholarship.grant}</td>
                                </tr>
                                <tr className='smol'></tr>
                                <tr>
                                    <td className='cell-bold'>Details</td>
                                    <td className='huge-info-here'>{scholarship.details}</td>
                                </tr>
                            </table>
                        ) : ""
                    )) 
                    : "" 
                }
                </div>
            <Footer/>
        </div>
    )
}

export default ProfileScholarship;
