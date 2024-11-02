import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CourseList from "./components/CourseList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<CourseList />} />
        <Route path="/course/:alias" element={<CourseList />} />
      </Routes>
    </Router>
  );
};

export default App;
