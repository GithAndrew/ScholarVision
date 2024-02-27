import Header from './Header'
import Footer from './Footer'
// import {apiUrl} from '../../apiUrl';

function OrderPopUp (props) {

    const record = props.record
    const attributesObj = Object.keys(record[0]);
    const attributes = []
    let newAttribute = ""

    const orderFilter = props.orderFilter.map(({ value }) => value)

    for (let i = 1; i < attributesObj.length-1; i++) {
        if (!orderFilter.includes(attributesObj[i])) {
            newAttribute = attributesObj[i].replace('_', ' ');
            attributes.push(newAttribute.charAt(0).toUpperCase() + newAttribute.slice(1));
        }
    }

    return (
        <div>
            <Header/>
            <div className='popup-wrapper'>
                <div className="order-popup-box">
                    <span className="add-close-icon" onClick={props.handleClose}>x</span>
                    <p className='add-label'>Add View Field</p>
                    <table className='list-table'>
                        <tbody>
                        {attributes !== undefined ? 
                            attributes.map((attribute) => {
                                return (
                                        <tr className='list-row'>
                                            <td className='list-cell-order'>{attribute}</td>
                                        </tr>
                                )
                            })
                        : ""}
                        </tbody>
                    </table>
                    <button className='add-green-button'>Confirm</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default OrderPopUp;
