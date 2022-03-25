const exploredUnitHistory = (state = [], action) => {
    // reducer for explored unit history
    switch (action.type) {
        case 'exploredUnitHistory':
            return {
                data: action.payload
            }
        case 'ADD_TO_UNIT_HISTORY_LIST' : {
            const isAlreadyExist = state?.data?.find(data => data?.unitId === action?.payload?.unitId);
            return {
                data: isAlreadyExist ? state.data : [...state.data, action.payload]
            }
        }
        default:
            return state
    }

}

export default exploredUnitHistory;