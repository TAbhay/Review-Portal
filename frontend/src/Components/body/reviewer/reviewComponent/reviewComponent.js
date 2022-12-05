import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { isEmpty } from "../../../utils/validation/Validation";
import "./reviewComponent.css";
import { dispatchReview } from "../../../../redux/actions/reviewAction";
import Loader from "../../../utils/Loader";

const ReviewComponent = () => {
  const id = useParams();
  const token = useSelector((state) => state.token);
  const review = useSelector(state => state.currentReview)
  const initialState = { Q1: "", Q2: "", Q3: 0, Q4: 0, Q5: 0, Q6: 0, Q7: 0, Q8: 0, comment: "", status: 0, project_name: "", description: "", author: "", tag_one: "", tag_two: "" };
  const [question, setQuestion] = useState(initialState);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const fetchReview = async () => {
    setLoading(true)
    try {
      var res = await axios.get(`/api/review/${id.id}`, {
        headers: { Authorization: token },
      });
      dispatch(dispatchReview(res.data[0]));
      setLoading(false)
    }
    catch (err) {
      setLoading(false)
      toast.error('Error !', { theme: "colored" });
      return
    }
  };

  useEffect(() => {
    if (Object.keys(review).length !== 0) if (review.question.length !== 0) { { setQuestion({ Q1: review.question[0].Q1, Q2: review.question[0].Q2, Q3: review.question[0].Q3, Q4: review.question[0].Q4, Q5: review.question[0].Q5, Q6: review.question[0].Q6, Q7: review.question[0].Q7, Q8: review.question[0].Q8, comment: review.comment, status: review.status, project_name: review.project.name, description: review.project.description, author: review.project_by.name, tag_one: review.project.tag_one, tag_two: review.project.tag_two }) } }
    // if (Object.keys(review).length !== 0) { setQuestion({ ...question, project_name: review.project.name, description: review.project.description, author: review.project_by.name, tag_one: review.project.tag_one, tag_two: review.project.tag_two }) }
  }, [review])
  useEffect(() => {
    fetchReview();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };
  const handleInputChangeBox = (e) => {
    const { name } = e.target;
    setQuestion({ ...question, [name]: e.target.checked });
  };
  var tech = { Node: "lightgreen", Mongodb: "#F7CA18", Python: "#26C281", React: "#19B5FE", Angular: "#F22613", SQL: "orange", C: "#003171", Express: "#BF55EC" };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(question.Q1 && question.Q2 && question.Q6 && question.Q7 && question.Q8 && question.comment)) {
      toast.error('All fields should be filled !', { theme: "colored" });
      return;
    }
    if (question.Q6 > 5 || question.Q6 <= 0 || question.Q7 > 5 || question.Q7 <= 0 || question.Q8 > 5 || question.Q8 <= 0) {
      toast.error('Rating should be between 1 and 5', { theme: "colored" });
      return;
    }
    try {
      var res = await axios.put(`/api/review/${id.id}`, { question: { Q1: question.Q1, Q2: question.Q2, Q3: question.Q3, Q4: question.Q4, Q5: question.Q5, Q6: question.Q6, Q7: question.Q7, Q8: question.Q8 }, comment: question.comment, status: question.status },
        {
          headers: { Authorization: token },
        }
      );

      dispatch(dispatchReview(res.data));
      toast.success('Updated successfully !', { theme: "colored" });
    } catch (err) {
      err.response.data.msg &&
        toast.error('Error !', { theme: "colored" });
    }
  };

  return (
    <div className="review-container">
      {
        loading ?
          < div style={{ marginTop: '100px' }}><Loader /> </div>
          :
          <> <div className="project-body mb-5">
            <div className="project-title">
              <h1>{question.project_name}</h1>
              <h5>{question.author}</h5>
            </div>
            <div className="project-description">
              <h4>Description</h4>
              <p>{question.description}</p>
              <div className="tech_box card_icon" style={{ justifyContent: 'flex-start' }}>
                <div className="tech_stack" style={{ backgroundColor: tech[question.tag_one] }}>{question.tag_one}</div>
                <div className="tech_stack" style={{ backgroundColor: tech[question.tag_two] }}>{question.tag_two}</div>
              </div>
            </div>
          </div>


          <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="card card-outline-secondary">
            <div class="card-header">
                <h3 class="mb-0">Review</h3>
              </div>
              <div className="card-body p-5">
              <form className="form">
                <div className="form-group row p-2">
                  <label className="col-lg-9 col-form-label form-control-label">
                  <b>Please mention the strong points about the project.</b>  
                  </label>
                  <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    type="text"
                    id="input"
                    name="Q1"
                    cols={30}
                    rows={3}
                    value={question.Q1}
                    onChange={handleInputChange}
                    required
                  />
                  </div>
                </div>
                <div className="form-group row p-2">
                  <label className="col-lg-9 col-form-label form-control-label">
                    <b>Please provide the weak points about the project.</b>
                  </label>
                  <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    type="text"
                    id="input"
                    name="Q2"
                    cols={30}
                    rows={3}
                    value={question.Q2}
                    onChange={handleInputChange}
                    required
                  />
                  </div>
                </div>
                <div className="form-group row p-2">
                  <label className="col-lg-9 col-form-label form-control-label">
                   <b> Does the project match the broad domain of TIH-IITP
                    (speech-vision-text).</b>
                  </label>
                  <div className="col-sm-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="input"
                    name="Q3"
                    defaultChecked={question.Q3}
                    onChange={handleInputChangeBox}
                    required
                  />
                  </div>
                </div>
                <div className="form-group row p-2">
                  <label className="col-lg-9 col-form-label form-control-label">
                   <b>Does the project have any potential to make a product or can
                    it lead to a startup?</b> 
                  </label>
                  {/* <input className="form-check-input" type="checkbox" id="input" name="Q4" defaultChecked={question.Q4} onChange={handleInputChangeBox} required /> */}
                  <div className="col-sm-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="input"
                    name="Q4"
                    defaultChecked={question.Q4}
                    onChange={handleInputChangeBox}
                    required
                  />
                  </div>
                </div>
                <div className="form-group row p-2">
                  <label className="col-lg-9 col-form-label form-control-label">
                    <b>Does the proposal have research challenges in comparison with
                    current state of the art?</b>
                  </label>
                  <div className="col-sm-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="input"
                    defaultChecked={question.Q5}
                    name="Q5"
                    onChange={handleInputChangeBox}
                    required
                  />
                  </div>
                </div>
                <div className="form-group row p-2">
                  <label className="col-lg-9 col-form-label form-control-label">
                   <b> Please rate the project in terms of novelty on a scale of 1-5.</b>
                  </label>
                  <div className="col-sm-3">
                  <input
                    className="form-control"
                    type="number"
                    id="input"
                    min="1"
                    max="5"
                    name="Q6"
                    value={question.Q6}
                    onChange={handleInputChange}
                    required
                  />
                  </div>
                </div>
                <div className="form-group row p-2">
                  <label className="col-lg-9 col-form-label form-control-label">
                    <b>Please rate the project in terms of relevance in the present
                    context on a scale of 1-5.</b>
                  </label>
                  <div className="col-sm-3">
                  <input
                    className="form-control"
                    type="number"
                    id="input"
                    min="1"
                    max="5"
                    name="Q7"
                    value={question.Q7}
                    onChange={handleInputChange}
                    required
                  />
                  </div>
                </div>
                <div className="form-group row p-2">
                  <label className="col-lg-9 col-form-label form-control-label">
                    <b>Recommendation for funding on a scale of 1-5</b>
                  </label>
                  <div className="col-sm-3">
                  <input
                    className="form-control"
                    type="number"
                    id="input"
                    min="1"
                    max="5"
                    name="Q8"
                    value={question.Q8}
                    onChange={handleInputChange}
                    required
                  />
                  </div>
                </div>
                <div className="form-group row p-2">
                  <label className="col-lg-9 col-form-label form-control-label">
                   <b>Confidential comments to TIH-IITP</b> 
                  </label>
                  <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    type="text"
                    id="input"
                    name="comment"
                    cols={30}
                    rows={3}
                    onChange={handleInputChange}
                    value={question.comment}
                    required
                  />
                  </div>
                </div>
                <div className="form-group row p-2">
                  <label className="col-lg-9 col-form-label form-control-label">
                    <b>Mark it as Reviewed</b>
                  </label>
                  <div className="col-sm-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="input"
                    name="status"
                    defaultChecked={question.status}
                    onChange={handleInputChangeBox}
                  />
                  </div>
                </div>
                <div className="form-group row p-2">
            <div class="col-lg-9">
              <button class="btn btn-success btn-lg" style={{ backgroundColor: '#0d9460',width:'200px' }} onClick={handleSubmit}>
                Submit
              </button>
              </div>
               </div>
            </form>
            </div>
            </div>
            </div>
            </div>
          </>
      }
    </div>
  );
};

export default ReviewComponent;
