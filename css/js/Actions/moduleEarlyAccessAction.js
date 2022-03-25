export const loadEarlyAccessModules = (payload) => {
    return {
        type: "LOAD_EARLY_ACCESS_MODULES",
        payload
    }
}

export const addEarlyAccessModule = (payload) => {
    return {
        type: "ADD_EARLY_ACCESS_MODULE",
        payload
    }
}