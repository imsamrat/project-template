// Add new item to cart
export const  addToCart = (item) => {
    return {
        type: 'ADD_TO_CART',
        item
    }
}

// Remove Item from cart by Item ID
export const  removeFromCart = (id) => {
    return {
        type: 'REMOVE_FROM_CART',
        id
    }
}

// Clear Cart
export const  clearCart = (id) => {
    return {
        type: 'CLEAR_CART',
        id
    }
}

// Load and set cart from local storage on Manual Reload
export const  loadCartFromLocalStorage = (data) => {
    return {
        type: 'LOAD_CART_FROM_LOCALSTORAGE',
        data
    }
}