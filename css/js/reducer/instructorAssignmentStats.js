const instructorAssignmentStats = (state = false , action) => {
    switch(action.type) {
        case 'instructorAssignmentStats':
            return action.payload
       
        default:
            return state
    }
}

export default instructorAssignmentStats;