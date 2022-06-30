import ACTIONS from '../actions/'

const initialState = {
    user: {},
    isLogged: false,
    isAdmin: false,
    isStudent: false,
    isReviewer: false
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case ACTIONS.LOGIN:
            return {
                ...state,
                isLogged: true
            }

        case ACTIONS.GET_USER:
            return {
                ...state,
                user: action.payload.user,
                isAdmin: action.payload.isAdmin,
                isStudent: action.payload.isStudent,
                isReviewer: action.payload.isReviewer,
            }
        default:
            return state

    }
}


export default authReducer