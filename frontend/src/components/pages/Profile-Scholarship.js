import Header from '../components/Header'
import Footer from '../components/Footer'
import Avatar from '../images/Avatar.jpg'
import {Link} from 'react-router-dom';
import '../css/Profile.css'


function ProfileScholarship () {
    return (
        <div>
            <Header/>
                <button className='back-button'><Link to="/List">BACK</Link></button>
                <div className='profile'>
                    <img className="profile-pic" src={Avatar} alt="logo"/>
                    <div className='name'>NAME C. SURNAME</div>
                    <table className='profile-table'>
                        <tr>&nbsp;</tr>
                        <tr><td><button className='profile-button'><Link to="/Profile">Personal & Contact</Link></button></td></tr>
                        <tr><td><button className='profile-button'><Link to="/Profile-Family">Family Background</Link></button></td></tr>
                        <tr><td><button className='profile-button'><Link to="/Profile-Education">Education</Link></button></td></tr>
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
