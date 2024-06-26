import Footer from '../components/Footer'
import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {apiUrl} from '../../apiUrl';
import {useStore} from '../../authHook';
import SVLogo from '../images/SVLogo.png'
import SchoolLogo from '../images/SchoolLogo.png'
import scholartemplate from '../components/Scholar Application.xlsx';
import SchoolPopUp from '../components/SchoolPopUp';
import '../css/Login.css'

function Login() {

  const navigate = useNavigate();
  const { user, isAuthenticated, setAuth } = useStore();
  console.log(user, isAuthenticated)
  const [imageURL, setImageURL] = useState();
  const [school, setSchool] = useState([]);

    useEffect(() => {
      function sendToken(token){
        fetch((apiUrl("/user/")), {
          method: "POST",
          credentials: 'include', 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            school: school._id
          }),
        })
        .then((response) => response.json())
        .then((data) => {
          if(data.success === true){
            navigate("/Home");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      }
  
      function handleCallbackResponse(response){
        sendToken(response.credential)
      }    
  
      const initializeGoogleSignIn = () => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.onload = () => {
          /* global google */
          google.accounts.id.initialize({
              client_id: "64363444097-efilpss9crpib95osovgqkfkve05u5br.apps.googleusercontent.com",
              callback: handleCallbackResponse
          });
  
          google.accounts.id.renderButton(
              document.getElementById("signInDiv"),
              { theme: "standard", size: "large", width: "393px", text: "Log In"}
          );
  
          const googleSignInButton = document.getElementById("signInDiv");
          googleSignInButton.classList.add("signInDiv");
        };
        document.body.appendChild(script);
    };
  
      initializeGoogleSignIn();
  });

    useEffect(()=>{
      fetch((apiUrl("/user/isLogin")), {
          method: "GET",
          credentials:'include',
          headers:{
            'Content-Type':'application/json'
          },
      }).then(response => {return response.json()})
      .then((data)=> {
          setAuth(data.User, data.status);
          if(data.status === true){
            const previousLocation = localStorage.getItem('currentLocation') || '/Home';
            navigate(previousLocation);
          }
      })
    },[navigate, setAuth]);

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
          }).then(response => response.text())
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

  return (
    <div className="login-limiter">
      <header className='login-header'>
        <img className="login-logo" src={SVLogo} alt="logo" />
        {imageURL ? <img className="login-logo" src={imageURL} alt="school"/> : <img className="login-logo" src={SchoolLogo} alt="school"/>}
        <div>
          {school && school.school_name ? <p className='login-header-text'>{school.school_name}</p> : 
            <p className='login-header-text'style={{fontSize: '1.5em'}}>Name of School</p>
          }
          <p className='login-subheader-text' style={{fontStyle: 'italic'}}> Scholar Database</p>
        </div>
      </header>

      <div className = 'login-info'>
          <h2 className='sv-title'>SCHOLARVISION</h2>
          <p className='sv-desc'> A <span style={{fontWeight: 'bold'}}>Content Management System</span> template that can be dynamically used by schools for their own scholarship databases.</p>
          <a href={scholartemplate} className='apply-button' download> APPLY NOW </a>
      </div>

      <div className="login-container">
        <div className="login-wrap">
          <form className="login-form">
            <span className="login-form-title">
              <h2 className='user-login'>User Login</h2>
            </span>

              <div id="signInDiv">
                <span class="icon"></span>
                <span class="buttonText">Google</span>
              </div>
          </form>

          <div className="login-more" ></div>
        </div>
      </div>
      {school ? "" : <SchoolPopUp></SchoolPopUp>}
      <Footer/>
    </div>
  );
}

export default Login;
