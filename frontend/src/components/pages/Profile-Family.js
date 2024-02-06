import Header from '../components/Header'
import Footer from '../components/Footer'
import Avatar from '../images/Avatar.jpg'
import {Link} from 'react-router-dom';
import '../css/Profile.css'


function ProfileFamily () {
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
                        <tr><td><button className='profile-button-current'>Family Background</button></td></tr>
                        <tr><td><button className='profile-button'><Link to="/Profile-Education">Education</Link></button></td></tr>
                        <tr><td><button className='profile-button'><Link to="/Profile-Scholarship">Scholarship</Link></button></td></tr>
                    </table>
                </div>

                <div className='profile-container'>
                    <header className='profile-header'>PARENTS</header>
                    <table className='personal-table'>
                        <tr>&nbsp;</tr>
                        <tr>
                            <td className='cell-bold'>Father's Name</td>
                            <td className='info-here' colSpan='4'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='cell-bold'>Mother's Name</td>
                            <td className='info-here' colSpan='4'>xxxxxxxx</td>
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                            <td className='cell-bold'>Birthdate</td>
                            <td className='info-here'>xx/xx/xxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='cell-bold'>Citizenship</td>
                            <td className='info-here'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='cell-bold'>Birthdate</td>
                            <td className='info-here'>xx/xx/xxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='cell-bold'>Citizenship</td>
                            <td className='info-here'>xxxxxxxx</td>
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                            <td className='cell-bold'>Contact Number</td>
                            <td className='info-here'>09XXXXXXXXX</td>
                            <td className='barrier'>||||</td>
                            <td className='cell-bold'>Highest Education Attainment</td>
                            <td className='info-here'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='cell-bold'>Contact Number</td>
                            <td className='info-here'>09XXXXXXXXX</td>
                            <td className='barrier'>||||</td>
                            <td className='cell-bold'>Highest Education Attainment</td>
                            <td className='info-here'>xxxxxxxx</td>
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                            <td className='cell-bold'>Occupation</td>
                            <td className='info-here'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='cell-bold'>Employer</td>
                            <td className='info-here'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='cell-bold'>Occupation</td>
                            <td className='info-here'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='cell-bold'>Employer</td>
                            <td className='info-here'>xxxxxxxx</td>
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                            <td className='cell-bold'>Annual Income</td>
                            <td className='info-here' colSpan='4'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='cell-bold'>Annual Income</td>
                            <td className='info-here' colSpan='4'>xxxxxxxx</td>
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                            <td className='cell-bold'>Business Address</td>
                            <td className='huge-info-here' colSpan='4'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='cell-bold'>Business Address</td>
                            <td className='huge-info-here' colSpan='4'>xxxxxxxx</td></tr>
                        <tr><td className='barrier'>||||</td></tr>
                        <tr>
                            <td className='cell-bold'>Name of Guardian (if not living with parents)</td>
                            <td className='info-here' colSpan='4'>xxxxxxxx</td>
                            <td className='barrier'>||||</td>
                            <td className='cell-bold'>Contact Number</td>
                            <td className='info-here' colSpan='4'>09XXXXXXXXX</td>
                        </tr>
                        <tr className='smol'></tr>
                    </table>

                    <header className='profile-header'>SIBLINGS</header>
                    <table className='personal-table'>
                    <tr>&nbsp;</tr>
                    <tr>
                        <td className='cell-bold'>Name of Siblings</td>
                        <td className='barrier'>||||</td>
                        <td className='cell-bold'>Age</td>
                        <td className='barrier'>||||</td>
                        <td className='cell-bold'>Civil Status</td>
                        <td className='barrier'>||||</td>
                        <td className='cell-bold'>Highest Education Attainment</td>
                        <td className='barrier'>||||</td>
                        <td className='cell-bold'>Occupation</td>
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

export default ProfileFamily;
