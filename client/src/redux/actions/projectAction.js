import ACTIONS from "./index"
import axios from "axios"

export const fetchAllProjects =  async (token) => {
    const res = await axios.get('/api/project', {
        headers:{Authorization:token}
    })
    return res
}

export const fetchProject =  async (token,id) => {
    const res = await axios.get(`/api/project/${id}`, {
        headers:{Authorization:token}
    })
    return res
}

export const addProject =  async (token) => {
    const res = await axios.post(`/api/project/`, {
        headers:{Authorization:token}
    })
    return res
}

export const dispatchAllProjects = (res) => {
    return {
        type: ACTIONS.GET_ALL_PROJECTS,
        payload: res.data.result
    }
}
export const dispatchAddProject = (res) => {
    return {
        type: ACTIONS.ADD_PROJECT,
        payload: {
            projects:{
                result: res.data.result
            }
        }
    }
}

// export const dispatchReview = (res) => {
//     return {
//         type: ACTIONS.GET_REVIEW,
//         payload: {
//             currentReview:{
//                 question :{
//                     Q1: res.question[0].Q1,
//                     Q2: res.question[0].Q2,
//                     Q3: res.question[0].Q3,
//                     Q4: res.question[0].Q4,
//                     Q5: res.question[0].Q5,
//                     Q6: res.question[0].Q6,
//                     Q7: res.question[0].Q7,
//                     Q8: res.question[0].Q8,
//                 },
//                 comment:res.comment,
//                 status:res.status,
//                 title:res.project.name,
//                 description:res.project.description
//             }
//         }
//     }
// }

