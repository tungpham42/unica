import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import CourseCard from "./CourseCard";
import FilterBar from "./FilterBar";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [error, setError] = useState(null);

  const affId = "360685";
  const token = "eTg2dlAvSmJmREVHZktLWjI0enRuUT09";

  // Fetch courses by category ID
  const fetchCoursesByCategory = async (categoryId) => {
    try {
      const response = await axios.get("https://unica.vn/api/coursecategory", {
        params: { category_id: categoryId, aff_id: affId, token: token },
      });
      const data = response.data?.data?.course || [];
      setCourses(data);
      setFilteredCourses(data); // Set both courses and filtered courses to the fetched data
    } catch (error) {
      setError("Error fetching courses. Please try again later.");
    }
  };

  useEffect(() => {
    // Initial fetch with a default category ID
    const defaultCategoryId = 1; // Replace with a default category ID if needed
    fetchCoursesByCategory(defaultCategoryId);
  }, []);

  const handleFilterChange = ({ categoryId }) => {
    let updatedCourses = [...courses];

    // Fetch new courses if categoryId is provided
    if (categoryId) {
      fetchCoursesByCategory(categoryId);
      return; // Avoid filtering until new data is fetched
    }

    setFilteredCourses(updatedCourses);
  };

  if (error) return <p>{error}</p>;

  return (
    <Container className="my-4">
      <FilterBar onFilterChange={handleFilterChange} />
      <Row>
        {filteredCourses.map((course) => (
          <Col key={course.id} md={4} className="mb-4">
            <CourseCard course={course} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CourseList;
