import ACTIONS from "./index"

export const dispatchAdminData = (res) => {
    return {
        type: ACTIONS.ADMIN_DATA,
        payload: res.data
    }
}


