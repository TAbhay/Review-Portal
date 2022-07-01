import ACTIONS from '../actions/'

const initialState = {
    projects:[],
    currentProject:null
}

export const projectReducer = (state =initialState, action) => {
  switch (action.type) {

    case ACTIONS.GET_ALL_PROJECTS:
      return {
        ...state,
        projects:[...action.payload]
      }
      case ACTIONS.GET_PROJECT:
        return {
          ...state,
          currentProject:action.payload
        }
    case ACTIONS.ADD_PROJECT:
        return {
            ...state,
            projects:[action.payload.projects.result, ...state.projects]
        }
    case ACTIONS.UPDATE_PROJECT:
        console.log(action.payload)
        return {
            ...state,
            projects:[action.payload.projects.result, ...state.projects]
        }
    default:
      return state

  }
}


