import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom';
import Review from '../Review/Review';
import './Reviews.css';
import { fetchAllReviews, dispatchAllReviews } from '../../../../redux/actions/reviewAction';

const Reviews = () => {

  const token = useSelector(state => state.token)
  const dispatch = useDispatch();

  const fetchReviews = async () => {
    const res = await fetchAllReviews(token);
    dispatch(dispatchAllReviews(res));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (

    <div className="project-container-lg">
      <h1 style={{ textAlign: "center" }}>Reviews</h1>
      <Review/>
    </div>

  );
}

export default Reviews;