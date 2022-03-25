// Cart reducer
const cart = (state = [] , action) => {
    switch(action.type) {
        case 'ADD_TO_CART':
            return [...state, action.item]
        case 'REMOVE_FROM_CART':
            return state.filter(item=> item._id !== action.id)
        case 'LOAD_CART_FROM_LOCALSTORAGE':
            return action.data
        case 'CLEAR_CART':
            return []
        default:
            return state
    }
}

export default cart;