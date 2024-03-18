import Header from '../components/Header'
import Footer from '../components/Footer'
import {Link} from 'react-router-dom';
import useStore from '../../authHook';
import SchoolPopUp from '../components/SchoolPopUp';
import '../css/Home.css'

function Home () {
    localStorage.setItem('currentLocation', window.location.pathname);
    const { user } = useStore();
    let userRole = "";
    if (user) {userRole = user.role;}

    const handleButtonClick = (linkTo) => {
        localStorage.setItem('viewValue', linkTo);
    };

    return (
        <div>
            <Header/>
            <SchoolPopUp></SchoolPopUp>
            <p className='home-main-text'> ABOUT THE DATABASE </p>
            <p className='home-main-desc'> <span style={{fontWeight: 'bold'}}>ScholarVision</span> is a <span style={{fontWeight: 'bold'}}>Content Management System</span> template that can be dynamically used by schools for their own scholarship databases.</p>
            <hr className='horizontal-line'></hr>
            <div className='home-row'>
                {userRole === "admin" || userRole === "member" ? 
                    <button className='blue-button'><Link to="/ApplicationFormDonor">ADD <br></br>DONOR</Link></button> :
                    <button className='blue-button'><Link to="/ApplicationFormDonor">APPLY AS <br></br>DONOR</Link></button>
                }
                <div>
                    {userRole === "admin" || userRole === "member" ? 
                        <p className='home-text'>ADD DONOR</p> :
                        <p className='home-text'>APPLY AS DONOR</p> 
                    }
                    {userRole === "admin" || userRole === "member" ? 
                        <p className='home-desc'> Enter the donors who are offering the scholarships here using either the web form or uploading their CSV file. </p> :
                        <p className='home-desc'> Apply as a donor here using the web form or uploading your CSV file.</p> 
                    }
                </div>
            </div>

            <hr className='horizontal-line'></hr>

            <div className='home-row'>
                {userRole === "admin" || userRole === "member" ? 
                    <button className='green-button'><Link to="/ApplicationForm">ADD<br></br> APPLICANT</Link></button> :
                    <button className='green-button'><Link to="/ApplicationForm">APPLY AS <br></br>APPLICANT</Link></button>
                }
                <div>
                    {userRole === "admin" || userRole === "member" ? 
                        <p className='home-text'>ADD APPLICANT</p> :
                        <p className='home-text'>APPLY AS APPLICANT</p> 
                    }
                    {userRole === "admin" || userRole === "member" ? 
                        <p className='home-desc'> Enter those who are applying to be scholars here using either the web form or uploading their CSV file. </p> :
                        <p className='home-desc'> Apply as a scholar here using the web form or uploading your CSV file.</p> 
                    }
                </div>
            </div>

            <hr className='horizontal-line'></hr>

            {userRole === "admin" || userRole === "member" ?
                <div className='home-row'>
                    <button className='blue-button' onClick={() => handleButtonClick("applicant")}><Link to="/List">VIEW <br></br>APPLICANTS</Link></button>
                    <div>
                        <p className='home-text'>VIEW APPLICANTS</p>
                        <p className='home-desc'> View the details of the aspiring applicants who want to be a scholar.</p>
                    </div>
                </div>
            : ""}

            {userRole === "admin" || userRole === "member" ? <hr className='horizontal-line'></hr> : ""}

            {userRole === "admin" || userRole === "member" ?
                <div className='home-row'>
                    <button className='green-button' onClick={() => handleButtonClick("scholar?value=false")}><Link to="/List">VIEW <br></br>ACCEPTED</Link></button>
                    <div>
                        <p className='home-text'>VIEW ACCEPTED</p>
                        <p className='home-desc'> View the details of the applicants who have been accepted as a scholar but still doesn't have a scholarship.</p>
                    </div>
                </div>
            : ""}

            {userRole === "admin" || userRole === "member" ? <hr className='horizontal-line'></hr> : ""}

            <div className='home-row'>
                <button className='blue-button' onClick={() => handleButtonClick("donor")}><Link to="/List">VIEW <br></br>DONORS</Link></button>
                <div>
                    <p className='home-text'>VIEW SCHOLARSHIPS</p>
                    <p className='home-desc'> View the details of the donors and the respective scholarships they offer.</p>
                </div>
            </div>

            {userRole === "admin" || userRole === "member" ? <hr className='horizontal-line'></hr> : ""}

            {userRole === "admin" || userRole === "member" ?
                <div className='home-row'>
                    <button className='green-button' onClick={() => handleButtonClick("scholar?value=true")}><Link to="/List">VIEW <br></br>SCHOLARS</Link></button>
                    <div>
                        <p className='home-text'>VIEW SCHOLARS</p>
                        <p className='home-desc'> View the details of all of the scholars.</p>
                    </div>
                </div>
            : ""}

            {userRole === "admin" ? <hr className='horizontal-line'></hr> : ""}

            {userRole === "admin" ?
                <div className='home-row'>
                    <button className='blue-button'><Link to="/Users">VIEW <br></br>USERS</Link></button>
                    <div>
                        <p className='home-text'>VIEW USERS</p>
                        <p className='home-desc'> View the details of the users of the system.</p>
                    </div>
                </div>
            : ""}

            {userRole === "admin" ? <hr className='horizontal-line'></hr> : ""}

            {userRole === "admin" ?
                <div className='home-row'>
                    <button className='green-button'><Link to="/Logs">LOGS</Link></button>
                    <div>
                        <p className='home-text'>VIEW LOGS</p>
                        <p className='home-desc'> View the activities of the users of the system.</p>
                    </div>
                </div>
            : ""}
            <Footer/>
        </div>
    )
}

export default Home;
