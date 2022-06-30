import api from './api';

export const fetchAll = () => dispatch => {
//FETCH ALL REVIEW
  api.Reviews().fetchAll()
      .then(res => {
          dispatch({
              type: "FETCH_ALL",
              payload: res.data
          })
      })
      .catch(err => console.log(err))

}
//GET REVIEW BY ID
export const getReview = (id) => ({
  type: "GET_REVIEW",
  payload : id,
  })

//UPDATE BY ID
export const UpdateReview = (id,data) => dispatch => {
  api.Reviews().update(id,data)
      .then(res =>{
          dispatch({
              type: "UPDATE_REVIEW",
              payload: res.data
          })
      })
      .catch(err => console.log(err))
}
