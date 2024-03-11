import Header from '../components/Header'
import Footer from '../components/Footer'
import {React, useState, useEffect} from 'react';
import {apiUrl} from '../../apiUrl';
import {Link} from 'react-router-dom';
import {BsSearch}  from 'react-icons/bs';
import EditPopUp from '../components/EditPopUp';
// import DeletePopUp from './DeletePopUp';
import '../css/Users.css'

function Users () {
    let input;
    const [users, setUsers] = useState([]);
    const [editPerson, setEditPerson] = useState("");
    const [currentRole, setCurrentRole] = useState("");
    const [forEdit, setEdit] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const handleUserInput = (e) => {
        input = e.target.value;
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit();
        }
    };

    const toggleEdit = () => {
        setEdit(!forEdit);
    }

    const editUser = (person, role) => {
        setEditPerson(person);
        setCurrentRole(role);
        toggleEditPopup();
    }

    const toggleEditPopup = () => {
        setOpenEdit(!openEdit);
    }

    const handleSubmit = () => {

        if (input !== "" && input !== undefined) {
            fetch(apiUrl(`/user/search?name=${input}`), {
                method: "GET",
                credentials:'include',
            })
            .then(response => {return response.json()})
            .then((data) => {setUsers(data.result)})
        } else {
            fetch(apiUrl(`/user`),
            {
                method: "GET",
                credentials:'include'
            })
            .then(response => {return response.json()})
            .then((data) => {setUsers(data)})
        }
    }

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

    return (
        <div>
            <Header/>
            <button className='back-button'><Link to="/Home">BACK</Link></button>

            <header className='list-header'>ACCOUNTS</header>
            <ul className='record-dropdowns'>
                <li><button className = 'record-print-button' onClick={toggleEdit}>EDIT</button></li>
            </ul>

            {users.length !== 0 ?
                <div className='scholar-container'>
                    <div className='list-search-container'>
                        <input type = "text" id = 'input' className = 'list-search-input' placeholder = "Search a record" value={input} onChange={handleUserInput} onKeyDown={handleKeyDown} required></input>
                        <BsSearch className='list-search-icon' onClick={handleSubmit}/>
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
                                        {forEdit ? <button className="edit-button" onClick={() => editUser(user, user.role)}>Edit Role</button> : ""}
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
            {openEdit ? <EditPopUp
                handleClose = {toggleEditPopup}
                person = {editPerson}
                role = {currentRole}
            /> : ""}
            <Footer/>
        </div>
    )
}

export default Users;
