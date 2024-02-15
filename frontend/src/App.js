import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './components/pages/Login'
import Home from './components/pages/Home'
import Profile from './components/pages/Profile'
import ProfileEducation from './components/pages/Profile-Education'
import ProfileFamily from './components/pages/Profile-Family'
import ProfileScholarship from './components/pages/Profile-Scholarship'
import List from './components/pages/List'
import AppForm from './components/pages/AppForm'
import AppFormDonor from './components/pages/AppFormD'
import Logs from './components/pages/Logs'
import Users from './components/pages/Users'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact={true} path="/" element={<Login />} />
            <Route exact={true} path="/Home" element={<Home />} />
            <Route exact={true} path="/:type/:id/Profile" element={<Profile />} />
            <Route exact={true} path="/:type/:id/Profile-Family" element={<ProfileFamily />} />
            <Route exact={true} path="/:type/:id/Profile-Education" element={<ProfileEducation />} />
            <Route exact={true} path="/:type/:id/Profile-Scholarship" element={<ProfileScholarship />} />
            <Route exact={true} path="/List" element={<List />} />
            <Route exact={true} path="/Logs" element={<Logs />} />
            <Route exact={true} path="/ApplicationForm" element={<AppForm />} />
            <Route exact={true} path="/ApplicationFormDonor" element={<AppFormDonor />} />
            <Route exact={true} path="/Users" element={<Users />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
