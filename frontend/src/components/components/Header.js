import {React, useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {apiUrl} from '../../apiUrl';
import {useStore} from '../../authHook';
import SVLogo from '../images/SVLogo.png'
import SchoolLogo from '../images/SchoolLogo.png'
import '../css/Header.css';

const Header = () => {

    const navigate = useNavigate();
    const { user, isAuthenticated } = useStore();
    const [school, setSchool] = useState([]);
    const [imageURL, setImageURL] = useState();

    const logout = () => {
        fetch(apiUrl("/user/logout"), {
            method: "DELETE",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
        }).then(response => {return response.json()})
    }

    useEffect(() => {
        Promise.all([
            fetch(apiUrl(`/school`), {credentials:'include'})
        ])
        .then(([resSchools]) => {
            return Promise.all([
                resSchools.json()
            ]);
        })
        .then(([dataSchools]) => {
            if (dataSchools.existing === false) {setSchool("")}
            else {
                setSchool(dataSchools[0]);
                let uploadID = dataSchools[0].upload_id
                fetch(apiUrl(`/upload/${uploadID}`), {
                    method: "GET",
                    credentials: 'include'
                }).then((response) => response.text())
                .then(dataUrl => {setImageURL(dataUrl)})
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }, []);

    useEffect(()=> {
        if(isAuthenticated === false){
            navigate("/")
        }
    },[navigate, isAuthenticated]);

    return(
        <header className='main-header'>
            <img className="main-logo" src={SVLogo} alt="logo"/>
            {imageURL ? <img className="main-logo" src={imageURL} alt="logo"/> : <img className="main-logo" src={SchoolLogo} alt="logo"/>}
            <div>
                {school.school_name ? <p className='header-text'style={{fontSize: '1.5em'}}><Link to="/Home">{school.school_name}</Link></p> : 
                    <p className='header-text'style={{fontSize: '1.5em'}}><Link to="/Home">School Name</Link></p>
                }
                <p className='subheader-text' style={{fontStyle: 'italic'}}> Scholar Database</p>
            </div>
            {user ?
                <div className='header-div-right'>
                    <p className='header-text'>{user.first_name} {user.last_name}</p>
                </div>
            : ""}
            {user ? <img className="main-pic-right" src={user.picture} alt="Profile Pic"/> : ""}
            {user ? <Link to="/"><button className='logout' onClick={logout}> LOG OUT </button></Link> : ""}
        </header>
    );
}

export default Header
