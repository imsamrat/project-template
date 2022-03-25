const unit = (state = [], action) => {
  
    switch (action.type) {
        case 'unitList':
            return {
                data: action.payload || state?.data
            }

        default:
            return state
    }


}

export default unit;