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
        const updateData = action.payload.projects.result
        const filtered = state.projects.map((project) => project._id === updateData._id ? {...updateData}:project);
       
        return {
            ...state,
            projects:[...filtered]
        }
     case ACTIONS.DELETE_PROJECT:
          // const idData = action.payload.projects.result
          return {
              ...state,
              projects:[...filtered]
          }
    default:
      return state

  }
}


