import {React, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {apiUrl} from '../../apiUrl';
import useStore from '../../authHook';
import SVLogo from '../images/SVLogo.png'
import SchoolLogo from '../images/SchoolLogo.png'
import '../css/Header.css';

const Header = () => {

    const navigate = useNavigate();
    const { user, isAuthenticated } = useStore();

    const logout = () => {
        fetch(apiUrl("/user"), {
            method: "DELETE",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
        }).then(response => {return response.json()})
    }

    useEffect(()=> {
        if(isAuthenticated === false){
            navigate("/")
        }
    },[navigate, isAuthenticated]);

    return(
        <header className='main-header'>
            <img className="main-logo" src={SVLogo} alt="logo"/>
            <img className="main-logo" src={SchoolLogo} alt="logo"/>
            <div>
                <p className='header-text'style={{fontSize: '1.5em'}}><Link to="/Home">Name of School</Link></p>
                <p className='subheader-text' style={{fontStyle: 'italic'}}> Scholar Database</p>
            </div>
            {user ?
                <div className='header-div-right'>
                    <p className='rightmost-text'>{user.first_name} {user.last_name}</p>
                </div>
            : ""}
            {user ? <img className="main-pic-right" src={user.picture} alt="Profile Pic"/> : ""}
            {user ? <Link to="/"><button className='logout' onClick={logout}> LOG OUT </button></Link> : ""}
        </header>
    );
}

export default Header
