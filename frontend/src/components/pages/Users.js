import Header from '../components/Header'
import Footer from '../components/Footer'
import {React, useState, useEffect} from 'react';
import {apiUrl} from '../../apiUrl';
import {Link} from 'react-router-dom';
import {BsSearch}  from 'react-icons/bs';
// import DeletePopUp from './DeletePopUp';
import '../css/Users.css'

function Users () {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        Promise.all([
            fetch(apiUrl(`/user`))
        ])
        .then(([resUsers]) => {
            return Promise.all([
                resUsers.json()
            ]);
        })
        .then(([dataUsers]) => {
            setUsers(dataUsers)
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }, []);

    console.log(users)

    return (
        <div>
            <Header/>
            <button className='back-button'><Link to="/Home">BACK</Link></button>

            <header className='list-header'>ACCOUNTS</header>
            <ul className='record-dropdowns'>
                <li><button className = 'record-print-button'>EDIT</button></li>
            </ul>

            {users.length !== 0 ?
                <div className='scholar-container'>
                    <div className='list-search-container'>
                        <input type = "text" id = 'input' className = 'list-search-input' placeholder = "Search an account"required></input>
                        <BsSearch className='list-search-icon'/>
                    </div>
                    <div className="view-users-body">
                        <div className='tile-page' >
                            {users.map((user, i) => (
                                <div key={i}>
                                    <div className={i % 2 === 0 ? "user-tile" : "user-odd-tile"}>
                                        <img src={user.picture} className='user-dp' alt='profile'/>
                                        <div className='user-name'>
                                            {user.first_name} {user.last_name} <br/>
                                            <span>{user.email}</span> <br/>
                                            <span>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                                        </div>
                                        <button className="delete-button">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            : 
                <div className='scholar-container'>
                    <div className='list-search-container'>
                        <input type = "text" id = 'input' className = 'list-search-input' placeholder = "Search a record"required></input>
                        <BsSearch className='list-search-icon'/>
                    </div>
                    <p className='none-found'>No users found.</p>
                    <button className='add-user-button'> Add User Account</button>
                </div>
            }
            <Footer/>
        </div>
    )
}

export default Users;
