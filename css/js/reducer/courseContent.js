// Course Content Reducer

const courseContent = (state = {}, action) => {
  
    switch (action.type) {
        case 'storeCourseContent':
            return {
                data: action?.payload?.data , upcomingRelease: action?.payload?.upcomingRelease
            }
       
        default:
            return state
    }


}

export default courseContent;