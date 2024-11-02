import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CourseList from "./components/CourseList";
import CourseDetails from "./components/CourseDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<CourseList />} />
        <Route path="/course/:alias" element={<CourseList />} />
        <Route path="/:id" element={<CourseDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
