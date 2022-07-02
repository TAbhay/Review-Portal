import {combineReducers} from "redux"
import auth from "./authReducer"
import token from "./tokenReducer"
import users from './usersReducer'
import {reviewReducer , currentReviewReducer} from "./reviewReducer"
import { projectReducer } from "./projectReducer"




export default combineReducers({
    auth,
    token,
    users,
    reviews : reviewReducer,
    currentReview :currentReviewReducer,
    projectReducer,
})