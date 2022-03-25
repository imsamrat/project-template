const clientRoute = (state = {}, action) => {
    switch(action.type) {
        case "LOAD_CLIENT_ROUTES": 
            return action.payload 
        default: 
            return state
    }
}

export default clientRoute