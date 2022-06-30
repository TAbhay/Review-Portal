import ACTIONS from "./index"
import axios from "axios"

export const fetchAllReviews =  async (token) => {
    const res = await axios.get('/api/review', {
        headers:{Authorization:token}
    })
    return res
}

export const fetchReview =  async (token,id) => {
    const res = await axios.get(`/api/review/${id}`, {
        headers:{Authorization:token}
    })
    console.log(res)
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
        payload: {
            currentReview:{
                question :{
                    Q1: res.question[0].Q1,
                    Q2: res.question[0].Q2,
                    Q3: res.question[0].Q3,
                    Q4: res.question[0].Q4,
                    Q5: res.question[0].Q5,
                    Q6: res.question[0].Q6,
                    Q7: res.question[0].Q7,
                    Q8: res.question[0].Q8,
                },
                comment:res.comment,
                status:res.status,
                title:res.project.name,
                description:res.project.description
            }
        }
    }
}

