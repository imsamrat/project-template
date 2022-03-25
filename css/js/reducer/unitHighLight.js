const unitHighLight = (state = [], action) => {
  
    switch (action.type) {
        case 'unitHighLight':
            return {
                data: action.payload
            }

        default:
            return state
    }


}

export default unitHighLight;