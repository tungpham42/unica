import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import CourseCard from "./CourseCard";
import FilterBar from "./FilterBar";

const AFFILIATE_ID = "360685";
const TOKEN = "eTg2dlAvSmJmREVHZktLWjI0enRuUT09";
const DEFAULT_CATEGORY_ID = 1;

const CourseList = () => {
  // eslint-disable-next-line
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    categoryId: DEFAULT_CATEGORY_ID,
  });
  const [totalPages, setTotalPages] = useState(10);

  const fetchCourses = useCallback(async (categoryId, pageNumber = 1) => {
    try {
      const response = await axios.get("https://unica.vn/api/coursecategory", {
        params: {
          category_id: categoryId,
          aff_id: AFFILIATE_ID,
          token: TOKEN,
          page: pageNumber,
        },
      });
      const coursesData = response.data?.data?.course || [];
      setCourses(coursesData);
      setFilteredCourses(coursesData);
    } catch {
      setError("Error fetching courses. Please try again later.");
    }
  }, []);

  const fetchTotalPages = useCallback(async (categoryId) => {
    let currentPage = 1;
    let lastPage = 1;
    let isSuccess = true;

    try {
      while (isSuccess) {
        const response = await axios.get(
          "https://unica.vn/api/coursecategory",
          {
            params: {
              category_id: categoryId,
              aff_id: AFFILIATE_ID,
              token: TOKEN,
              page: currentPage,
            },
          }
        );
        isSuccess = response.data?.success === 1;

        if (isSuccess) {
          lastPage = currentPage;
          currentPage++;
        }
      }
      setTotalPages(lastPage);
    } catch {
      setError("Error fetching total pages. Please try again later.");
    }
  }, []);

  useEffect(() => {
    fetchTotalPages(pagination.categoryId);
    fetchCourses(pagination.categoryId, pagination.page);
  }, [fetchCourses, fetchTotalPages, pagination]);

  const handleFilterChange = ({ categoryId }) => {
    setPagination({ page: 1, categoryId }); // Reset to first page and update categoryId
    fetchTotalPages(categoryId);
    fetchCourses(categoryId, 1);
  };

  const nextPage = () => {
    if (pagination.page < totalPages) {
      setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const prevPage = () => {
    if (pagination.page > 1) {
      setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <Container className="my-4">
      <FilterBar onFilterChange={handleFilterChange} />
      <Row>
        {filteredCourses.map((course) => (
          <Col key={course.id} md={6} className="mb-4">
            <CourseCard course={course} />
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center mt-4">
        <Button
          onClick={prevPage}
          disabled={pagination.page === 1}
          className="me-2"
        >
          Trước
        </Button>
        <span>
          Trang {pagination.page} trong {totalPages}
        </span>
        <Button
          onClick={nextPage}
          disabled={pagination.page === totalPages}
          className="ms-2"
        >
          Sau
        </Button>
      </div>
    </Container>
  );
};

export default CourseList;
