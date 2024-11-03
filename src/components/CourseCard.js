import React from "react";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const CourseCard = ({ course }) => {
  return (
    <Card className="h-100">
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://unica.vn/${course.url_course}?aff=360685`}
      >
        <Card.Img
          variant="top"
          src={`https://unica.vn/${course.url_thumnail}`}
          alt={course.course_name}
        />
      </a>
      <Card.Body>
        <Card.Title>{course.course_name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Giảng viên: {course.teacher_name}
        </Card.Subtitle>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>Số người học:</strong> {course.students}
          </div>
          <div>
            <strong>Đánh giá:</strong> {course.vote_avg} ⭐
          </div>
        </div>
        <div className="mt-2">
          {course.price_sale ? (
            <div>
              <span className="text-danger fw-bold">
                {course.price_sale.toLocaleString("vi-VN")} VND
              </span>{" "}
              <span className="text-muted text-decoration-line-through">
                {course.price_origin.toLocaleString("vi-VN")} VND
              </span>
            </div>
          ) : (
            <div className="fw-bold">
              {course.price_origin.toLocaleString("vi-VN")} VND
            </div>
          )}
        </div>
        <Button
          variant="primary"
          href={`https://unica.vn/${course.url_course}?aff=360685`}
          target="_blank"
          className="mt-3 w-100"
        >
          Xem chi tiết
        </Button>
      </Card.Body>
    </Card>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    course_name: PropTypes.string.isRequired,
    teacher_name: PropTypes.string.isRequired,
    url_course: PropTypes.string.isRequired,
    url_thumnail: PropTypes.string.isRequired,
    price_origin: PropTypes.number.isRequired,
    price_sale: PropTypes.number,
    content: PropTypes.string.isRequired,
    students: PropTypes.number.isRequired,
    vote_avg: PropTypes.number.isRequired,
  }).isRequired,
};

export default CourseCard;
