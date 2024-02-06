import Header from '../components/Header'
import Footer from '../components/Footer'
import {Link} from 'react-router-dom';
import '../css/Home.css'

function Home () {
    return (
        <div>
            <Header/>
            <p className='home-main-text'> ABOUT THE DATABASE </p>
            <p className='home-desc'> <span style={{fontWeight: 'bold'}}>ScholarVision</span> is a <span style={{fontWeight: 'bold'}}>Content Management System</span> template that can be dynamically used by schools for their own scholarship databases.</p>
            <hr className='horizontal-line'></hr>
            <div className='home-row'>
                <button className='blue-button'><Link to="/ApplicationFormDonor">ADD <br></br>DONOR</Link></button>
                <div>
                    <p className='home-text'>ADD DONOR</p>
                    <p className='home-desc'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>

            <hr className='horizontal-line'></hr>

            <div className='home-row'>
                <button className='green-button'><Link to="/ApplicationForm">ADD<br></br> APPLICANT</Link></button>
                <div>
                    <p className='home-text'>ADD APPLICANT</p>
                    <p className='home-desc'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>

            <hr className='horizontal-line'></hr>

            <div className='home-row'>
                <button className='blue-button'><Link to="/List">VIEW <br></br>APPLICANTS</Link></button>
                <div>
                    <p className='home-text'>VIEW APPLICANTS</p>
                    <p className='home-desc'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>

            <hr className='horizontal-line'></hr>

            <div className='home-row'>
                <button className='green-button'><Link to="/List">VIEW <br></br>ACCEPTED</Link></button>
                <div>
                    <p className='home-text'>VIEW ACCEPTED</p>
                    <p className='home-desc'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>

            <hr className='horizontal-line'></hr>

            <div className='home-row'>
                <button className='blue-button'><Link to="/List">VIEW <br></br>DONORS</Link></button>
                <div>
                    <p className='home-text'>VIEW SCHOLARSHIPS</p>
                    <p className='home-desc'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>

            <hr className='horizontal-line'></hr>

            <div className='home-row'>
                <button className='green-button'><Link to="/List">VIEW <br></br>SCHOLARS</Link></button>
                <div>
                    <p className='home-text'>VIEW SCHOLARS</p>
                    <p className='home-desc'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>

            <hr className='horizontal-line'></hr>

            <div className='home-row'>
                <button className='blue-button'><Link to="/Users">VIEW <br></br>USERS</Link></button>
                <div>
                    <p className='home-text'>VIEW USERS</p>
                    <p className='home-desc'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>

            <hr className='horizontal-line'></hr>

            <div className='home-row'>
                <button className='green-button'><Link to="/Logs">LOGS</Link></button>
                <div>
                    <p className='home-text'>VIEW LOGS</p>
                    <p className='home-desc'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>

            <hr className='horizontal-line'></hr>

            <div className='home-row'>
                <button className='blue-button'><Link to="/ApplicationForm">ADD <br></br>FIELD</Link></button>
                <div>
                    <p className='home-text'>ADD FIELD</p>
                    <p className='home-desc'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Home;
