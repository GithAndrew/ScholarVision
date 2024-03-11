import Header from './Header'
import Footer from './Footer'
import {React} from 'react';
import {apiUrl} from '../../apiUrl';

function EditPopUp (props) {
    const email = props.person.email;

    const editList = ['guest', 'admin', 'scholar', 'donor', 'member', 'applicant']
    const newList = editList.filter(role => role !== props.role);

    const changeRole = (role) => {
        fetch(apiUrl("/user"), {
            method: "PUT",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: email,
                role: role
            })
        })
        .then(response => {return response.json()})
        .then(setTimeout(() => window.location.reload(), 450))
    }

    return (
        <div>
            <Header/>
            <div className='popup-wrapper'>
                <div className="edit-popup-box">
                    <span className="add-close-icon" onClick={props.handleClose}>x</span>
                    <p className='add-label'>Assign {props.person.first_name} to which role?</p>
                    <table className='list-table'>
                        <tbody>
                        {newList !== undefined ? 
                            newList.map((role) => {
                                return (
                                    <tr className='list-row'>
                                        <td className='list-cell-order' onClick={() => changeRole(role)}>{role.charAt(0).toUpperCase() + role.slice(1)}</td>
                                    </tr>
                                )
                            })
                        : ""}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default EditPopUp;
