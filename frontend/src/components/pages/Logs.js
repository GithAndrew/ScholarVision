import Header from '../components/Header'
import Footer from '../components/Footer'
import {React, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {apiUrl} from '../../apiUrl';
import {useStore} from '../../authHook';
import {BsSearch}  from 'react-icons/bs';

function Logs () {
    
    localStorage.setItem('currentLocation', window.location.pathname);
    const { user } = useStore();
    let userRole = "";
    if (user) {userRole = user.role;}
    console.log(userRole)

    let input;
    const [logs, setLogs] = useState([]);

    const handleUserInput = (e) => {
        input = e.target.value;
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit();
        }
    };

    const handleSubmit = () => {

        console.log(input)

        if (input !== "" && input !== undefined) {
            fetch(apiUrl(`/logs/search?name=${input}`), {
                method: "GET",
                credentials:'include',
            })
            .then(response => {return response.json()})
            .then((data) => {setLogs(data.result)})
        } else {
            fetch(apiUrl(`/logs`), {
                method: "GET",
                credentials:'include'
            })
            .then(response => {return response.json()})
            .then((data) => {setLogs(data)})
        }
    }

    useEffect(() => {
        Promise.all([
            fetch(apiUrl(`/logs`), {credentials:'include'})
        ])
        .then(([resLogs]) => {
            return Promise.all([
                resLogs.json()
            ]);
        })
        .then(([dataLogs]) => {
            setLogs(dataLogs)
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }, []);

    
    return (
        <div>
            <Header/>
            <button className='back-button'><Link to="/Home">BACK</Link></button>

            <header className='list-header'>SYSTEM LOGS</header>
            {logs.length !== 0 ? 
                <div className='scholar-container'>
                    <div className='list-search-container'>
                        <input type = "text" id = 'input' className = 'list-search-input' placeholder = "Search log of user" value={input} onChange={handleUserInput} onKeyDown={handleKeyDown} required></input>
                        <BsSearch className='list-search-icon' onClick={handleSubmit}/>
                    </div>
                    <table className='list-table'>
                        <tr>
                            <th className='list-head'>USER</th>
                            <th className='list-head'>EMAIL</th>
                            <th className='list-head'>ROLE</th>
                            <th className='list-head'>TIMESTAMP</th>
                            <th className='list-head'>ACTIVITY</th>
                            <th className='list-head'>DETAILS</th>
                        </tr>
                        <tr className='smol'></tr>
                        {logs.map((log) => (
                            <tr className='list-row'>
                                <td className='first-list-cell'>{log.userName}</td>
                                <td className='list-cell'><a href={`mailto: ${log.userEmail}`} className='email-color'>{log.userEmail}</a></td>
                                {log.userRole ? <td className='list-cell'>{log.userRole.charAt(0).toUpperCase() + log.userRole.slice(1)}</td> : ""}
                                <td className='list-cell'>{log.date}</td>
                                {log.action ? <td className='list-cell'>{log.action.charAt(0).toUpperCase() + log.action.slice(1)}</td> : ""}
                                <td className='list-cell'>{log.description}</td>
                                <td className='last-table-barrier'>||||</td>
                            </tr>
                        ))}
                        <tr className='smol'></tr>
                    </table>
                </div>
            :
                <div className='scholar-container'>
                    <div className='list-search-container'>
                        <input type = "text" id = 'input' className = 'list-search-input' placeholder = "Search for user" value={input} onChange={handleUserInput} onKeyDown={handleKeyDown} required></input>
                        <BsSearch className='list-search-icon' onClick={handleSubmit}/>
                    </div>

                    <p className='none-found'>No logs in system!</p>
                    </div>
            }
            <Footer/>
        </div>
        
    )
}

export default Logs;
