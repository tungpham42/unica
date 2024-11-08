import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import CourseList from "./components/CourseList";

const App = () => {
  return (
    <div className="text-center my-4">
      <h1>
        <FontAwesomeIcon icon={faGraduationCap} className="me-2" /> Khóa học
        Online
      </h1>
      <CourseList />
    </div>
  );
};

export default App;
