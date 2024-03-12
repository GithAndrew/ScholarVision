import Header from './Header'
import Footer from './Footer'

function AddPopUp (props) {

    return (
        <div>
            <Header/>
            <div className='popup-wrapper'>
                <div className="add-popup-box">
                    <span className="add-close-icon" onClick={props.handleClose}>x</span>
                    <p className='add-label'>Add Field</p>
                    <input className='add-input' placeholder = "Insert attribute here." id='addInput'></input>
                    <div className='add-checkbox'>
                        <span className='add-sub'>Required?</span>
                        <input type = 'checkbox' className='list-checkbox' id='forRequired'></input>
                    </div>
                    <button className='add-green-button' onClick={() => props.addField(document.getElementById('addInput').value, document.getElementById('forRequired').checked)}>Confirm</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AddPopUp;
