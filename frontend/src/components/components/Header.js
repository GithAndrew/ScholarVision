import React from 'react';
import {Link} from 'react-router-dom';
import SVLogo from '../images/SVLogo.png'
import SchoolLogo from '../images/SchoolLogo.png'
import ProfilePic from '../images/drewllibee.jpg'
import '../css/Header.css';

class Header extends React.Component{
    render(){
        return(
            <header className='main-header'>
            <img className="main-logo" src={SVLogo} alt="logo"/>
            <img className="main-logo" src={SchoolLogo} alt="logo"/>
            <div>
                <span><p className='header-text'><Link to="/Home"><span style={{fontSize: '1.5em'}}>Name of School</span><span style={{fontStyle: 'italic'}}> Scholar Database</span></Link></p></span>
            </div>
            <div className='header-div-right'>
                <p className='rightmost-text'>Role</p>
            </div>
                <img className="main-logo-right" src={ProfilePic} alt="logo"/>
                <Link to="/"><button className='logout'> LOG OUT  </button></Link>
            </header>
        );
    }
}

export default Header