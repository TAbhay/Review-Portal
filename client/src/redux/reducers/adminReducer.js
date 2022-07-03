import ACTIONS from '../actions/'

export const adminReducer = (state = {}, action) => {
  switch (action.type) {

    case ACTIONS.ADMIN_DATA:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state

  }
}



