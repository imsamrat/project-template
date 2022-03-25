const initialState = [];

const earlyAccessModule = (state = initialState, action) => {

    switch(action.type) {
        case "LOAD_EARLY_ACCESS_MODULES":
            return action.payload

        case "ADD_EARLY_ACCESS_MODULE":
            return [...state, action.payload]

        default:
            return state
    }

}

export default earlyAccessModule;