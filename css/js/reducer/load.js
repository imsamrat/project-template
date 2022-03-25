const load = (state = false , action) => {
    switch(action.type) {
        case 'isLoaded':
            return action.payload
       
        default:
            return state
    }
}

export default load;