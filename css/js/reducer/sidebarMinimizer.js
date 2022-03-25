// Toggler Reducer
const sidebarMinimizer = (state = false , action) => {
    switch (action.type) {
        case 'minimize':
            return action.payload
        case 'toggle_minimize':
                return !state
        default:
            return state
    }
}

export default sidebarMinimizer;
