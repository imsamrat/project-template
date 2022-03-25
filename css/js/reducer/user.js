// User Reducer

const user = (state = [], action) => {
  
    switch (action.type) {
        case 'userData':
            return {
                data: action.payload
            }
        case 'clearUserData':
            return {}
        default:
            return state
    }


}

export default user;