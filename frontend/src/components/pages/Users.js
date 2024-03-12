import Header from '../components/Header'
import Footer from '../components/Footer'
import {React, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {apiUrl} from '../../apiUrl';
import useStore from '../../authHook';
import EditPopUp from '../components/EditPopUp';
import {BsSearch}  from 'react-icons/bs';
import '../css/Users.css'

function Users () {

    localStorage.setItem('currentLocation', window.location.pathname);
    const { user } = useStore();
    let userRole = "";
    if (user) {userRole = user.role;}
    console.log(userRole)

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
                <li><button className = 'record-add-button' onClick={toggleEdit}>EDIT</button></li>
            </ul>

            {users.length !== 0 ?
                <div className='scholar-container'>
                    <div className='list-search-container'>
                        <input type = "text" id = 'input' className = 'list-search-input' placeholder = "Search a record" value={input} onChange={handleUserInput} onKeyDown={handleKeyDown} required></input>
                        <BsSearch className='list-search-icon' onClick={handleSubmit}/>
                    </div>
                    <div className="view-users-body">
                        <div className='tile-page' >
                            {users.map((person, i) => (
                                <div key={i}>
                                    <div className={i % 2 === 0 ? "user-tile" : "user-odd-tile"}>
                                        <img src={user.picture} className='user-dp' alt='profile'/>
                                        <div className='user-name'>
                                            {person.first_name} {person.last_name} <br/>
                                            <span>{person.email}</span> <br/>
                                            <span>{person.role.charAt(0).toUpperCase() + person.role.slice(1)}</span>
                                        </div>
                                        {forEdit ? <button className="edit-button" onClick={() => editUser(person, person.role)}>Edit Role</button> : ""}
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
