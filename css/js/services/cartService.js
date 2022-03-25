class CartService{
    // Get cart data from localStorage
    getCartFromLocalStorage(user) {
        const data = localStorage.getItem(user);
        return JSON.parse(data) || [];
    }

    // Update cart Data in LocalStorage
    updateCartToLocalStorage(user, data) {
        localStorage.setItem(user, JSON.stringify(data))
    }

}

export default new CartService();