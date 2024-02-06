import Header from '../components/Header'
import Footer from '../components/Footer'
import {Link} from 'react-router-dom';
import {BsSearch}  from 'react-icons/bs';
import {BsTrash}  from 'react-icons/bs';
// import DeletePopUp from './DeletePopUp';

function Logs () {
    return (
        <div>
            <Header/>
            <button className='back-button'><Link to="/Home">BACK</Link></button>

            <header className='list-header'>SYSTEM LOGS</header>
            <div className='scholar-container'>
                <div className='list-search-container'>
                    <input type="text" id='input' className='list-search-input' placeholder="Find log" required></input>
                    <BsSearch className='list-search-icon'/>
                </div>
                <table className='list-table'>
                    <tr>
                        <th className='list-head'></th>
                        <th className='list-head'>USER</th>
                        <th className='list-head'>TIMESTAMP</th>
                        <th className='list-head'>ACTIVITY TYPE</th>
                        <th className='list-head'>DETAILS</th>
                        <th className='list-head'>DELETE</th>
                    </tr>
                    <tr className='smol'></tr>
                    <tr className='list-row'>
                        <td className='first-list-cell'><input type='checkbox'></input></td>
                        <td className='list-cell'>drew1601</td>
                        <td className='list-cell'>02-05-2024 15:36 PM</td>
                        <td className='list-cell'>ADD USER</td>
                        <td className='list-cell'>added canjateope</td>
                        <td className='last-list-cell'><BsTrash/></td>
                    </tr>
                    <tr className='smol'></tr>
                </table>
            </div>
            <Footer/>
        </div>
    )
}

export default Logs;
