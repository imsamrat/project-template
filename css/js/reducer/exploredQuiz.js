// Explored quiz Reducer

const exploredQuiz = (state = [], action) => {
  
    switch (action.type) {
        case 'exploredQuizStore':
            return {
                data: [...state, action.payload]
            }
       
        default:
            return state
    }


}

export default exploredQuiz;