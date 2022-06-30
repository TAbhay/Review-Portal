import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Review.css";
const Review = () => {
  const { reviews } = useSelector((state) => state.reviews);

  const renderReviews = reviews?.map((item) => {
    const projectName = item.project.name;
    const id = item._id;
    const status = item.status;
    return (
      <div className="singleProject">
        <div className="single_card_istem">
          <h4>{projectName}</h4>
        </div>
        <div className="single_card_item card_icons">
          <div className="edit_icon">
            <Link to={`/review/${id}`}>
              <i className="fas fa-edit"></i>
            </Link>
          </div>
          <div className="card-status">
            {status ? (
              <i className="fas fa-dot-circle" style={{ color: "green" }}></i>
            ) : (
              <i className="fas fa-dot-circle" style={{ color: "red" }}></i>
            )}
          </div>
        </div>
      </div>
    );
  });

  return <>{renderReviews}</>;
};
export default Review;
