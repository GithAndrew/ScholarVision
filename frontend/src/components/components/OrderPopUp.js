import Header from './Header'
import Footer from './Footer'

function OrderPopUp (props) {

    const record = props.record
    const attributesObj = Object.keys(record[0]);
    const attributesVal = Object.values(record[0]);
    const attributes = []
    const variables = []
    let newAttribute = ""

    const orderFilter = props.orderFilter.map(({ value }) => value)

    for (let i = 1; i < attributesObj.length; i++) {
        const isObject = typeof attributesVal[i] === 'object';
        const isSpecificValue = attributesObj[i].includes("_v") || attributesObj[i].includes("id") || attributesObj[i].includes("guardian");

        if (isObject || isSpecificValue) {continue}
        if (!orderFilter.includes(attributesObj[i])) {
            variables.push(attributesObj[i])
            newAttribute = attributesObj[i].replace('_', ' ').replace('no', 'Number').replace('name','Name');
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
                                        <td className='list-cell-order' onClick={() => props.addView(attribute) && props.handleClose}>{attribute}</td>
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

export default OrderPopUp;
