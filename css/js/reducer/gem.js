// Gem reducer

const initialState = {
  currentGem: 0,
  status: "idle",
  error: null,
};

const conceptualSession = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_GEM/PENDING":
      return {
        ...state,
        error: null,
        status: "pending",
      };
    case "LOAD_GEM/SUCCESS":
      return {
        ...state,
        error: null,
        status: "success",
        currentGem: action.payload,
      };
    case "LOAD_GEM/ERROR":
      return {
        ...state,
        error: action.payload,
        currentGem: null,
        status: "error",
      };
    case "GEM_INCREMENT":
      return {
        ...state,
        currentGem: state.currentGem + action.payload,
      };
    case "GEM_DECREMENT":
      return {
        ...state,
        currentGem: state.currentGem - action.payload,
      };

    default:
      return state;
  }
};

export default conceptualSession;
