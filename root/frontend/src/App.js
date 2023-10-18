import './css/App.css';
import React from 'react'
import Navbar from './pages/Navbar.js'
import Landing from './pages/Landing.js'
import GroupProfile from './pages/GroupProfile.js'
import StudentProfile from './pages/StudentProfile.js'
import TeacherProfile from './pages/TeacherProfile.js'
import Assignments from './pages/Assignments.js'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  const [academicID, setAcademicID] = React.useState(
    JSON.parse(localStorage.getItem('academicID')) || null
  ); 
  
  // Store data in case page refreshes
  React.useEffect(() => {
    localStorage.setItem('academicID', JSON.stringify(academicID));
  }, [academicID]);
  
  return (
    <Router>
      <div className="App">
        <Navbar setAcademicID = {setAcademicID} academicID = {academicID}/>
        <Routes>
          <Route exact path="/" element={<Landing/>}></Route>
          {academicID != null ? <Route exact path="/group" element={<GroupProfile/>}></Route>
          :
          <Route exact path="/group" element={<Landing/>}></Route>}
          
          {academicID != null ? <Route exact path="/student" element={<StudentProfile/>}></Route>
          :
          <Route exact path="/student" element={<Landing/>}></Route>}

          {academicID != null ? <Route exact path="/teacher" element={<TeacherProfile academicID={academicID}/>}></Route>
          :
          <Route exact path="/teacher" element={<Landing/>}></Route>}
          
          {academicID != null ? <Route exact path="/assignment" element={<Assignments/>}></Route>
          :
          <Route exact path="/assignment/:ID" element={<Landing/>}></Route>}
     
        </Routes>
      </div>
    </Router>
  );
}

export default App;