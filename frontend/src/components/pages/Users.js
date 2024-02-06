import Header from '../components/Header'
import Footer from '../components/Footer'
import {Link} from 'react-router-dom';
import {BsSearch}  from 'react-icons/bs';
// import DeletePopUp from './DeletePopUp';
import '../css/Users.css'

function Users () {
    return (
        <div>
            <Header/>
            <button className='back-button'><Link to="/Home">BACK</Link></button>

            <header className='list-header'>ACCOUNTS</header>
            <div className='scholar-container'>
            <div className='list-search-container'>
                <input type = "text" id = 'input' className = 'list-search-input' placeholder = "Search an account"required></input>
                <BsSearch className='list-search-icon'/>
            </div>
            <div className="view-users-body">                
                <div className='tile-page'> 
                    <span>
                        <div className="user-tile" >
                            <img src = {require(`../images/Andrew1.png`)} className='user-dp' alt='profilePic'/>
                            <div className='user-name'>Andrew Teope <br /><span>Developer</span></div>
                            <button className = "delete-button">Remove</button>
                        </div>
                    </span>
                    <span>
                        <div className="user-odd-tile" >
                            <img src = {require(`../images/Andrew2.png`)} className='user-dp' alt='profilePic'/>
                            <div className='user-name'>Andrew Twope <br /><span>Student</span></div>
                            <button className = "delete-button">Remove</button>
                        </div>
                    </span>
                </div>
            </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Users;
