import SVLogo from '../images/SVLogo.png'
import SchoolLogo from '../images/SchoolLogo.png'
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {apiUrl} from '../../apiUrl';
import useStore from '../../authHook';
import Footer from '../components/Footer'
import scholartemplate from '../components/Scholar Application.xlsx';
import '../css/Login.css'

function Login() {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();
    console.log(user, isAuthenticated)

    useEffect(() => {
        function sendToken(token){
            fetch((apiUrl("/user/")), {
                method: "POST",
                credentials: "include", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token,
                }),
    
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.success === true){
                    navigate("/dashboard");
                }
                
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        }
    
        function handleCallbackResponse(response){
            sendToken(response.credential)
        }    
        
        /* global google */
        google.accounts.id.initialize({
          client_id: "327180859592-tp33fd8q78iqg55d962i5cotuqgm0glp.apps.googleusercontent.com",
          callback: handleCallbackResponse
        });
    
        google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          { theme: "standard", size: "large", width: "393px", text: "Log In"}
        )
        const googleSignInButton = document.getElementById("signInDiv");
        googleSignInButton.classList.add("signInDiv");
    },[navigate]);

    useEffect(()=>{
        fetch((apiUrl("/user/isLogin")), {
            method: "GET",
            credentials:'include',
            withCredentials: true,
            headers:{
                'Content-Type':'application/json'
            },
        }).then(response => {return response.json()})
        .then((data)=> {
            setAuth(data.User, data.status);
            if(data.status === true){
                navigate("/dashboard")
            }
        })
    },[navigate, setAuth]);


    return (
        <div className="limiter">
          <header className='login-header'>
            <img className="login-logo" src={SVLogo} alt="logo" />
            <img className="login-logo" src={SchoolLogo} alt="logo" />
            <div className="text">
              <p className='header-text'><span style={{fontSize: '1.5em'}}>Name of School</span><span style={{fontStyle: 'italic'}}> Scholar Database</span></p>
            </div>
          </header>
  
          <div className = 'login-info'>
              <h2 className='sv-title'>SCHOLARVISION</h2>
              <p className='sv-desc'> A <span style={{fontWeight: 'bold'}}>Content Management System</span> template that can be dynamically used by schools for their own scholarship databases.</p>
              <a href={scholartemplate} className='apply-button' download> APPLY NOW </a>
          </div>
    
          <div className="container-login100">
            <div className="wrap-login100">
              <form className="login100-form validate-form">
                <span className="login100-form-title p-b-43">
                  <h2>User Login</h2>
                </span>

                <div id="signInDiv" class="customGPlusSignIn">
                    <span class="icon"></span>
                    <span class="buttonText">Google</span>
                </div>
    
                {/* <label htmlFor="signInDiv" className="login-label">
                <button id='signInDiv'></button></label> */}
              </form>
  
              <div className="login100-more"></div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      );
    }
      
  export default Login;
