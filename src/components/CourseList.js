import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import CourseCard from "./CourseCard";
import FilterBar from "./FilterBar";

const AFFILIATE_ID = "360685";
const TOKEN = "eTg2dlAvSmJmREVHZktLWjI0enRuUT09";
const DEFAULT_CATEGORY_ID = 1;

const CourseList = () => {
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1, // Displayed page number (starting from 1)
    categoryId: DEFAULT_CATEGORY_ID,
  });
  const [totalPages, setTotalPages] = useState(0);

  const fetchCourses = useCallback(async () => {
    try {
      const { data } = await axios.get("https://unica.vn/api/coursecategory", {
        params: {
          category_id: pagination.categoryId,
          aff_id: AFFILIATE_ID,
          token: TOKEN,
          page: pagination.page - 1, // API request page, starting from 0
        },
      });
      setFilteredCourses(data?.data?.course || []);
    } catch {
      setError("Error fetching courses. Please try again later.");
    }
  }, [pagination]);

  const fetchTotalPages = useCallback(async () => {
    let currentPage = 0;
    let lastPage = 0;

    try {
      while (true) {
        const { data } = await axios.get(
          "https://unica.vn/api/coursecategory",
          {
            params: {
              category_id: pagination.categoryId,
              aff_id: AFFILIATE_ID,
              token: TOKEN,
              page: currentPage,
            },
          }
        );

        if (data?.success !== 1) break;
        lastPage = currentPage;
        currentPage++;
      }
      setTotalPages(lastPage + 1); // Convert lastPage (0-based) to totalPages (1-based)
    } catch {
      setError("Error fetching total pages. Please try again later.");
    }
  }, [pagination.categoryId]);

  useEffect(() => {
    fetchTotalPages();
    fetchCourses();
  }, [fetchCourses, fetchTotalPages]);

  const handleFilterChange = ({ categoryId }) => {
    setPagination({ page: 1, categoryId });
  };

  const handlePageChange = (pageNumber) => {
    setPagination((prev) => ({ ...prev, page: pageNumber }));
  };

  if (error) return <p>{error}</p>;

  const PaginationControls = () => {
    const pageButtons = [];

    pageButtons.push(
      <Button
        key={1}
        onClick={() => handlePageChange(1)}
        variant={pagination.page === 1 ? "primary" : "outline-primary"}
        className="mx-1"
      >
        1
      </Button>
    );

    if (pagination.page > 3) {
      pageButtons.push(
        <FontAwesomeIcon
          icon={faEllipsisH}
          key="start-ellipsis"
          className="mx-2"
        />
      );
    }

    for (
      let i = Math.max(2, pagination.page - 1);
      i <= Math.min(totalPages - 1, pagination.page + 1);
      i++
    ) {
      pageButtons.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          variant={pagination.page === i ? "primary" : "outline-primary"}
          className="mx-1"
        >
          {i}
        </Button>
      );
    }

    if (pagination.page < totalPages - 2) {
      pageButtons.push(
        <FontAwesomeIcon
          icon={faEllipsisH}
          key="end-ellipsis"
          className="mx-2"
        />
      );
    }

    pageButtons.push(
      <Button
        key={totalPages}
        onClick={() => handlePageChange(totalPages)}
        variant={pagination.page === totalPages ? "primary" : "outline-primary"}
        className="mx-1"
      >
        {totalPages}
      </Button>
    );

    return (
      <div className="d-flex justify-content-center my-4 align-items-center">
        <Button
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
          className="me-2"
        >
          Trước
        </Button>
        <div className="d-flex align-items-center">{pageButtons}</div>
        <Button
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page === totalPages}
          className="ms-2"
        >
          Sau
        </Button>
      </div>
    );
  };

  return (
    <Container className="my-4">
      <FilterBar onFilterChange={handleFilterChange} />
      {totalPages > 1 && <PaginationControls />}
      <Row>
        {filteredCourses.map((course) => (
          <Col key={course.id} md={6} className="mb-4">
            <CourseCard course={course} />
          </Col>
        ))}
      </Row>
      {totalPages > 1 && <PaginationControls />}
    </Container>
  );
};

export default CourseList;
