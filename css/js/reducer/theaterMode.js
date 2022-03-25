const initialState = 'off'
const theaterMode = (state = initialState , action) => {
    switch(action.type) {
        case 'SET_THEATER_MODE':
            return action.payload
       default:
        return state
    }
}

export default theaterMode;