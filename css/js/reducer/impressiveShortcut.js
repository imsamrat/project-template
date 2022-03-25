const impressiveShortcutReducer = (state = true, action) => {

    switch(action.type) {
        case "ENABLE_IMPRESSIVE_SHORTCUT":
            return true
        case "DISABLE_IMPRESSIVE_SHORTCUT":
            return false
        default:
            return state
    }

}

export default impressiveShortcutReducer