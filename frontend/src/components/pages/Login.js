import SVLogo from '../images/SVLogo.png'
import SchoolLogo from '../images/SchoolLogo.png'
import {Link} from 'react-router-dom';
import Footer from '../components/Footer'
import '../css/Login.css'


function Login() {
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
            <p className='sv-desc'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut liquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <a className='apply-button' href='a' download> APPLY NOW </a>
        </div>
  
        <div className="container-login100">
          <div className="wrap-login100">
            <form className="login100-form validate-form">
              <span className="login100-form-title p-b-43">
                <h2>User Login</h2>
              </span>
  
              <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                <input className="input100" type="text" name="email" />
                <span className="focus-input100"></span>
                <span className="label-input100">Email</span>
              </div>
  
              <div className="wrap-input100 validate-input" data-validate="Password is required">
                <input className="input100" type="password" name="pass" />
                <span className="focus-input100"></span>
                <span className="label-input100">Password</span>
              </div>
  
              <div className="container-login100-form-btn">
                <button className="login100-form-btn">
                  <Link to="/Home">Login</Link>
                </button>
              </div>
            </form>

            <div className="login100-more" >
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
    
export default Login;
