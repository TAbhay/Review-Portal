import {combineReducers} from "redux"
import auth from "./authReducer"
import token from "./tokenReducer"
import users from './usersReducer'
import {reviewReducer , currentReviewReducer} from "./reviewReducer"
import { projectReducer } from "./projectReducer"
// import currentReviewReducer from './reviewReducer'



export default combineReducers({
    auth,
    token,
    users,
    reviewReducer,
    currentReviewReducer,
    projectReducer,
})