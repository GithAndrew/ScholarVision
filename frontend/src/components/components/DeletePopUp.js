import Header from './Header'
import Footer from './Footer'
import {apiUrl} from '../../apiUrl';

function DeletePopUp (props) {
    const type = props.type;
    const toDelete = props.person;

    const isArray = Array.isArray(toDelete)

    const deletePerson = (id) => {
        if (isArray) {
            for (let i = 0; i < id.length; i++){
                fetch(apiUrl("/" + [type]), {
                    method: "DELETE",
                    credentials:'include',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        ids: [`${id[i]}`],
                    }) 
                }).then(response => {return response.json()})
            }
            setTimeout(() => window.location.reload(), 450)    
        } else {
            fetch(apiUrl(`/${type}/`), {
                method: "DELETE",
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    ids: [`${id}`],
                })
                
            }).then(response => {return response.json()})
            .then(setTimeout(() => window.location.reload(), 450))
        }
    }

    return (
        <div>
            <Header/>
            <div className='popup-wrapper'>
                <div className="delete-popup-box">
                    <p className='delete-label'>Confirm Deletion?</p>
                    <div className="delete-buttons">
                        {isArray ? <button className='delete-red-button' onClick = {() => deletePerson(toDelete)}>Delete</button> : 
                            <button className='delete-red-button' onClick = {() => deletePerson(toDelete._id)}>Delete</button>}
                        <button className='delete-gray-button' onClick={props.handleClose}>Cancel</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default DeletePopUp;
