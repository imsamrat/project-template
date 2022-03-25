const module = (state = [], action) => {
  
    switch (action.type) {
        case 'lockedModule':
            return {
                data: action.payload,
                isLast: state.isLast
            }
        case 'lastModule':
            return {
                data: state?.data,
                isLast: action.payload
            }

        default:
            return state
    }


}

export default module;