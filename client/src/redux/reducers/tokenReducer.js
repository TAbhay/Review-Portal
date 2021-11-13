import ACTIONS from "../actions/"


const token = ""

const tokenReducer = (state=token , action) => {

    switch(action.type){
        case ACTIONS.GET_TOKEN:
            console.log(token)
            return action.payload

        default: 
            return  state
    }
}


export default tokenReducer