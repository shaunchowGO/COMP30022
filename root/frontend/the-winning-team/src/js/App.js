import '../css/App.css';
import Navbar from '../pages/Navbar.js'
import Landing from '../pages/Landing.js'
import GroupProfile from '../pages/GroupProfile.js'
import StudentProfile from '../pages/StudentProfile.js'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Landing/>}></Route>
          <Route exact path="/group" element={<GroupProfile/>}></Route>
          <Route exact path="/student" element={<StudentProfile/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
