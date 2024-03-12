import Header from '../components/Header'
import Footer from '../components/Footer'
import {Link} from 'react-router-dom';
import useStore from '../../authHook';
import '../css/Home.css'

function Home () {
    localStorage.setItem('currentLocation', window.location.pathname);
    const { user } = useStore();
    let userRole = "";
    if (user) {userRole = user.role;}
    console.log(userRole)

    return (
        <div>
            <Header/>
            <p className='home-main-text'> ABOUT THE DATABASE </p>
            <p className='home-desc'> <span style={{fontWeight: 'bold'}}>ScholarVision</span> is a <span style={{fontWeight: 'bold'}}>Content Management System</span> template that can be dynamically used by schools for their own scholarship databases.</p>
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
                    <p className='home-desc'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
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
                    <p className='home-desc'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>

            <hr className='horizontal-line'></hr>

            {userRole === "admin" || userRole === "member" ?
                <div className='home-row'>
                    <button className='blue-button'><Link to={{ state: { viewValue: "applicant" }, pathname: "/List" }}>VIEW <br></br>APPLICANTS</Link></button>
                    <div>
                        <p className='home-text'>VIEW APPLICANTS</p>
                        <p className='home-desc'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
            : ""}

            {userRole === "admin" || userRole === "member" ? <hr className='horizontal-line'></hr> : ""}

            {userRole === "admin" || userRole === "member" ?
                <div className='home-row'>
                    <button className='green-button'><Link to={{ pathname: "/List", state: { viewValue: "scholar?value=false" } }}>VIEW <br></br>ACCEPTED</Link></button>
                    <div>
                        <p className='home-text'>VIEW ACCEPTED</p>
                        <p className='home-desc'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
            : ""}

            {userRole === "admin" || userRole === "member" ? <hr className='horizontal-line'></hr> : ""}

            <div className='home-row'>
                <button className='blue-button'><Link to="/List">VIEW <br></br>DONORS</Link></button>
                <div>
                    <p className='home-text'>VIEW SCHOLARSHIPS</p>
                    <p className='home-desc'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>

            {userRole === "admin" || userRole === "member" ? <hr className='horizontal-line'></hr> : ""}

            {userRole === "admin" || userRole === "member" ?
                <div className='home-row'>
                    <button className='green-button'><Link to="/List">VIEW <br></br>SCHOLARS</Link></button>
                    <div>
                        <p className='home-text'>VIEW SCHOLARS</p>
                        <p className='home-desc'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
            : ""}

            {userRole === "admin" || userRole === "member" ? <hr className='horizontal-line'></hr> : ""}

            {userRole === "admin" || userRole === "member" ?
                <div className='home-row'>
                    <button className='blue-button'><Link to="/Users">VIEW <br></br>USERS</Link></button>
                    <div>
                        <p className='home-text'>VIEW USERS</p>
                        <p className='home-desc'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
            : ""}

            {userRole === "admin" || userRole === "member" ? <hr className='horizontal-line'></hr> : ""}

            {userRole === "admin" || userRole === "member" ?
                <div className='home-row'>
                    <button className='green-button'><Link to="/Logs">LOGS</Link></button>
                    <div>
                        <p className='home-text'>VIEW LOGS</p>
                        <p className='home-desc'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
            : ""}
            <Footer/>
        </div>
    )
}

export default Home;
