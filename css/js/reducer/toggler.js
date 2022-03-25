// Toggler Reducer
const toggler = (state = true , action) => {
    switch (action.type) {
        case 'set':
            return action.payload
        default:
            return state
    }
}

export default toggler;
