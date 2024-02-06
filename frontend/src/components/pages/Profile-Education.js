import Header from '../components/Header'
import Footer from '../components/Footer'
import Avatar from '../images/Avatar.jpg'
import {Link} from 'react-router-dom';
import '../css/Profile.css'


function ProfileEducation () {
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
                        <tr><td><button className='profile-button-current'>Education</button></td></tr>
                        <tr><td><button className='profile-button'><Link to="/Profile-Scholarship">Scholarship</Link></button></td></tr>
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
                        <tr>
                            <td className='info-here'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='info-here'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='info-here'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='info-here'>xxxxxxxx</td>
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                            <td className='info-here'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='info-here'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='info-here'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='info-here'>xxxxxxxx</td>
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                            <td className='info-here'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='info-here'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='info-here'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='info-here'>xxxxxxxx</td>
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                            <td className='info-here'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='info-here'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='info-here'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='info-here'>xxxxxxxx</td>
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                            <td className='info-here'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='info-here'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='info-here'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='info-here'>xxxxxxxx</td>
                        </tr>
                        <tr className='smol'></tr>
                    </table>
                </div>
            <Footer/>
        </div>
    )
}

export default ProfileEducation;
