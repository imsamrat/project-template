// FooterData Reducer

const footerData = (state = {}, action) => {
  
    switch (action.type) {
        case 'storeFooterData':
            return {
                ...action.payload
            }
     
        default:
            return state
    }

}

export default footerData;