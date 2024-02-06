import Header from '../components/Header'
import Footer from '../components/Footer'
function DeletePopUp () {
    return (
        <div>
            <Header/>
            <div className="delete-popup-box">
                <p className='delete-label'>DELETE?</p>
                <div className="delete-buttons">
                    <button className='delete-green-button'>CONFIRM</button>
                    <button className='delete-red-button'>CANCEL</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default DeletePopUp;
