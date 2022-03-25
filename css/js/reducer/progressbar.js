const progressbar = (state = [], action) => {
  
    switch (action.type) {
        case 'progressbar':
            return {
                data: action.payload
            }

        default:
            return state
    }


}

export default progressbar;