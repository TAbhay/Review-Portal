import ACTIONS from "./index"
import axios from "axios"

export const fetchAllReviews = async (token) => {
    const res = await axios.get('/api/review', {
        headers: { Authorization: token }
    })
    return res
}

export const fetchReview = async (token, id) => {
    const res = await axios.get(`/api/review/${id}`, {
        headers: { Authorization: token }
    })
   
    return res
}

export const dispatchAllReviews = (res) => {
    return {
        type: ACTIONS.GET_ALL_REVIEWS,
        payload: {
            reviews: res.data
        }
    }
}

export const dispatchReview = (res) => {
    return {
        type: ACTIONS.GET_REVIEW,
        payload: res
    }
}

