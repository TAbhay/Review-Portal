import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {showErrMsg,showSuccessMsg} from "../../../utils/notifications/Notification";
import { isEmpty } from "../../../utils/validation/Validation";
import "./reviewComponent.css";
import { dispatchReview } from "../../../../redux/actions/reviewAction";

const ReviewComponent = (props) => {
  const id = useParams();
  const token = useSelector((state) => state.token);
  const review = useSelector(state => state.currentReview.currentReview);
  const initialState = { Q1: "", Q2: "", Q3: false, Q4: false, Q5: false, Q6: 0, Q7: 0, Q8: 0, comment: "", status: 0 };

  const [question, setQuestion] = useState(initialState);
  const [data, setData] = useState({ err: "", success: ""});
  const { err, success } = data;

  const dispatch = useDispatch();

  const fetchReview = async () => {
    try {
      var res = await axios.get(`/api/review/${id.id}`, {
        headers: { Authorization: token },
      });
      console.log(res.data, "response data")
      dispatch(dispatchReview(res.data[0]));
    }
    catch(err){
      return setData({ ...data, err: "some error occurred", success: "" });
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };
  const handleInputChangeBox = (e) => {
    const { name } = e.target;
    setQuestion({ ...question, [name]: e.target.checked ? 1 : 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(question)
    setData({...data, err: "", success: ""});
    if (isEmpty(question.Q1 && question.Q2 && question.Q6 && question.Q7 && question.Q8 && question.comment && question.status  ) ) {
      return setData({ ...data, err: "Please Fill All the fields 1", success: "", });
    }
    if ( question.Q6 > 5 || question.Q6 <= 0 || question.Q7 > 5 || question.Q7 <= 0 || question.Q8 > 5 || question.Q8 <= 0 ) {
      return setData({...data,err: "Rating should be between 1 and 5",success: "", });
    }
    try {
      var res = await axios.put( `/api/review/${id.id}`, { question: { Q1: question.Q1, Q2: question.Q2, Q3: question.Q3, Q4: question.Q4, Q5: question.Q5, Q6: question.Q6, Q7: question.Q7, Q8: question.Q8  } , comment: question.comment  , status: question.status },
        {
          headers: { Authorization: token },
        }
      );
      dispatch(dispatchReview(res.data));

      setData({ ...data, err: "", success: "Updated successfully" });
    //   var answer = result.data.question[0];
    //   setQuestion({
    //     Q1: answer.Q1,
    //     Q2: answer.Q2,
    //     Q3: answer.Q3,
    //     Q4: answer.Q4,
    //     Q5: answer.Q5,
    //     Q6: answer.Q6,
    //     Q7: answer.Q7,
    //     Q8: answer.Q8,
    //     comment: result.data.comment,
    //     status: result.data.status,
    //   });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: "err.response.data.msg", success: "" });
    }
  };
  // useEffect(() => {}, [data]);s

  return (
    <div>
      <form>
        <div className="single-project-container">
          <div className="project-body">
            <div className="project-title">
              <h3>{review?.title}</h3>
            </div>
            <div className="project-description">
              <p>{review?.description}</p>
            </div>

            <div className="question-body">
              <h4>Review</h4>

              <div className="question">
                <label className="label">
                  Please mention the strong points about the project.
                </label>
                <input
                  className="label-input form-control"
                  type="text"
                  id="input"
                  name="Q1"
                  cols={40}
                  rows={3}
                  defaultValue={review?.question.Q1}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="question">
                <label className="label">
                  Please provide the weak points about the project.
                </label>
                <input
                  className="label-input form-control"
                  type="text"
                  id="input"
                  name="Q2"
                  cols={40}
                  rows={3}
                  defaultValue={review?.question.Q2}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="question">
                <label className="label">
                  Does the project match the broad domain of TIH-IITP
                  (speech-vision-text).
                </label>
                <input
                  className="label-input"
                  type="checkbox"
                  id="input"
                  name="Q3"
                  defaultChecked={review?.question.Q3}
                  onChange={handleInputChangeBox}
                  required
                />
              </div>
              <div className="question">
                <label className="label">
                  Does the project have any potential to make a product or can
                  it lead to a startup?
                </label>
                <input
                  className="label-input"
                  type="checkbox"
                  id="input"
                  name="Q4"
                  defaultChecked={review?.question.Q4}
                  onChange={handleInputChangeBox}
                  required
                />
              </div>
              <div className="question">
                <label className="label">
                  Does the proposal have research challenges in comparison with
                  current state-of-the-art?
                </label>
                <input
                  className="label-input"
                  type="checkbox"
                  id="input"
                  defaultChecked={review?.question.Q5}
                  name="Q5"
                  onChange={handleInputChangeBox}
                  required
                />
              </div>
              <div className="question">
                <label className="label">
                  Please rate the project in terms of novelty on a scale of 1-5.
                </label>
                <input
                  className="label-input form-control"
                  type="number"
                  id="input"
                  min="1"
                  max="5"
                  name="Q6"
                  defaultValue={review?.question.Q6}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="question">
                <label className="label">
                  Please rate the project in terms of relevance in the present
                  context on a scale of 1-5.
                </label>
                <input
                  className="label-input form-control"
                  type="number"
                  id="input"
                  min="1"
                  max="5"
                  name="Q7"
                  defaultValue={review?.question.Q7}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="question">
                <label className="label">
                  Recommendation for funding on a scale of 1-5
                </label>
                <input
                  className="label-input form-control"
                  type="number"
                  id="input"
                  min="1"
                  max="5"
                  name="Q8"
                  defaultValue={review?.question.Q8}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="question">
                <label className="label">
                  Confidential comments to TIH-IITP
                </label>
                <textarea
                  className="label-input form-control"
                  type="text"
                  id="input"
                  name="comment"
                  cols={40}
                  rows={2}
                  onChange={handleInputChange}
                  defaultValue={review?.comment}
                  required
                />
              </div>
              <div className="question">
                <label className="label">Mark it as Reviewed</label>
                <input
                  className="label-input"
                  type="checkbox"
                  id="input"
                  name="status"
                  defaultChecked={review?.status}
                  onChange={handleInputChangeBox}
                  required
                />
              </div>
            </div>
          </div>
          <div>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
          </div>
          <div className="quiz-answer submit_button_div">
            <button className="submit_button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewComponent;
