import "./css/App.css";
import React from "react";
import Navbar from "./pages/Navbar.js";
import Landing from "./pages/Landing.js";
import GroupProfile from "./pages/GroupProfile.js";
import StudentProfile from "./pages/StudentProfile.js";
import TeacherProfile from "./pages/TeacherProfile.js";
import Assignments from "./pages/Assignments.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [academicID, setAcademicID] = React.useState(
    JSON.parse(localStorage.getItem("academicID")) || null,
  );

  const [alertValue, setAlertValue] = React.useState({ text: "", type: "" });

  // Store data in case page refreshes
  React.useEffect(() => {
    localStorage.setItem("academicID", JSON.stringify(academicID));
  }, [academicID]);

  function revealAction() {
    var reveals = document.querySelectorAll(".alert");
    reveals[0].classList.add("alert-reveal");
    setTimeout(function () {
      reveals[0].classList.remove("alert-reveal");
    }, 2000);
  }

  function manageAlert(text, type) {
    setAlertValue({ text: text, type: type });
    revealAction();
  }

  return (
    <Router>
      <div className="App">
        <div className={`alert`}>
          <div className={`${alertValue.type}`}>
            {alertValue.text}{" "}
            {alertValue.type == "success" ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              <FontAwesomeIcon icon={faXmark} />
            )}
          </div>
        </div>
        <Navbar setAcademicID={setAcademicID} academicID={academicID} manageAlert={manageAlert} />
        <Routes>
          <Route exact path="/" element={<Landing />}></Route>
          {academicID != null ? (
            <Route exact path="/group/:ID" element={<GroupProfile manageAlert={manageAlert}/>}></Route>
          ) : (
            <Route exact path="/group/:ID" element={<Landing />}></Route>
          )}

          {academicID != null ? (
            <Route exact path="/student" element={<StudentProfile manageAlert={manageAlert}/>}></Route>
          ) : (
            <Route exact path="/student" element={<Landing />}></Route>
          )}

          {academicID != null ? (
            <Route
              exact
              path="/teacher"
              element={<TeacherProfile academicID={academicID} manageAlert={manageAlert}/>}
            ></Route>
          ) : (
            <Route exact path="/teacher" element={<Landing />}></Route>
          )}

          {academicID != null ? (
            <Route exact path="/assignment/:ID" element={<Assignments manageAlert={manageAlert}/>}></Route>
          ) : (
            <Route exact path="/assignment/:ID" element={<Landing />}></Route>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
