import ACTIONS from '../actions/'

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {

    case ACTIONS.GET_ALL_REVIEWS:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state

  }
}

export const currentReviewReducer = (state = {}, action) => {
  switch (action.type) {

    case ACTIONS.GET_REVIEW:
      return {
        ...state,
        ...action.payload
      }
    case ACTIONS.UPDATE_REVIEW:
      return {
        ...action.payload
      }
    default:
      return state

  }
}

