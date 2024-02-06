import Header from '../components/Header'
import Footer from '../components/Footer'
import Avatar from '../images/Avatar.jpg'
import {Link} from 'react-router-dom';
import '../css/Profile.css'


function ProfileDonor () {
    return (
        <div>
            <Header/>
                <button className='back-button'><Link to="/List">BACK</Link></button>
                <div className='profile'>
                    <img className="profile-pic" src={Avatar} alt="logo"/>
                    <div className='name'>NAME C. SURNAME</div>
                </div>

                <div className='profile-container'>
                    <header className='profile-header'>PERSONAL BACKGROUND</header>
                    <table className='personal-table'>
                        <tr>&nbsp;</tr>
                        <tr>
                        <td className='cell-bold'>Last Name</td>
                        <td className='info-here'>xxxxxxxx</td>
                        <td className='barrier'>||||</td><td className='barrier'>||||</td><td className='barrier'>||||</td>
                        <td className='cell-bold'>First Name</td>
                        <td className='info-here'>xxxxxxxx</td>
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                        <td className='cell-bold'>Middle Name</td>
                        <td className='info-here'>xxxxxxxx</td>
                        <td className='barrier'>||||</td><td className='barrier'>||||</td><td className='barrier'>||||</td>
                        <td className='cell-bold'>Suffix</td>
                        <td className='info-here'>xxxxxxxx</td>
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                        <td className='cell-bold'>Birthdate</td>
                        <td className='info-here'>XX/XX/XXXX</td>
                        <td className='barrier'>||||</td><td className='barrier'>||||</td><td className='barrier'>||||</td>
                        <td className='cell-bold'>Sex</td>
                        <td className='info-here'>X</td>
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                        <td className='cell-bold'>Birthplace</td>
                        <td className='info-here'>xxxxxxxx</td>
                        <td className='barrier'>||||</td><td className='barrier'>||||</td><td className='barrier'>||||</td>
                        <td className='cell-bold'>Citizenship</td>
                        <td className='info-here'>xxxxxxxx</td>
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                        <td className='cell-bold'>Contact Number</td>
                        <td className='info-here'>09XXXXXXXXX</td>
                        <td className='barrier'>||||</td><td className='barrier'>||||</td><td className='barrier'>||||</td>
                        <td className='cell-bold'>Email</td>
                        <td className='info-here'>xxxx@xxxx.com</td>
                        </tr>
                        <tr className='smol'></tr>
                        <tr>
                        <td className='cell-bold'>Address</td>
                        <td className='huge-info-here' colSpan='8'>xxxxxxxx</td>
                        </tr>
                    </table>

                    <header className='profile-header'>SCHOLARSHIP DETAILS</header>
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

export default ProfileDonor;
