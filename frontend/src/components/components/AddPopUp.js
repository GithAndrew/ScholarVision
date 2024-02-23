import Header from './Header'
import Footer from './Footer'
// import {apiUrl} from '../../apiUrl';

function AddPopUp (props) {

    return (
        <div>
            <Header/>
            <div className='popup-wrapper'>
                <div className="add-popup-box">
                    <span className="add-close-icon" onClick={props.handleClose}>x</span>
                    <p className='add-label'>Add Field</p>
                    <input className='add-input' placeholder = "Insert affiliation here."></input>
                    <button className='add-green-button'>Confirm</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AddPopUp;
