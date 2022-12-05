import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import Review from '../Review/Review';
import { fetchAllReviews, dispatchAllReviews } from '../../../../redux/actions/reviewAction';
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import './Reviews.css';

const Reviews = () => {

  const token = useSelector(state => state.token)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const fetchReviews = async () => {
    try {
      // setLoading(true)
      const res = await fetchAllReviews(token);
      dispatch(dispatchAllReviews(res));
      // setLoading(false)
    }
    catch (err) {

      toast.error('Error !', { theme: "colored" });
      setLoading(false)
    }

  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="project-container-lg">
      <h1 style={{ textAlign: "center" }}>Reviews</h1>
      {
        loading ? <div style={{ marginTop: '100px' }}><Loader /></div> : <Review />
      }
    </div>
  );
}

export default Reviews;