// Conceptual session reducer

const initialState = {
  currentUnit: null,
  lockedModules: [],
  unlockedModules: [],
  status: "idle",
  error: null,
};

const conceptualSession = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_CONCEPTUAL_SESSIONS/PENDING":
      return {
        ...state,
        error: null,
        status: "pending",
        lockedModules: [],
        unlockedModules: [],
      };
    case "LOAD_CONCEPTUAL_SESSIONS/SUCCESS":
      return {
        ...state,
        error: null,
        status: "success",
        lockedModules: action.payload.lockedModules,
        unlockedModules: action.payload.unlockedModules,
      };
    case "LOAD_CONCEPTUAL_SESSIONS/ERROR":
      return {
        ...state,
        error: action.payload,
        status: "error",
        lockedModules: [],
        unlockedModules: [],
      };
    case "SET_CURRENT_CONCEPTUAL_UNIT":
      return {
        ...state,
        currentUnit: action.payload,
      };
    case "UNLOCK_CONCEPTUAL_MODULE": {
      const moduleToUnlock = state.lockedModules.find(
        (module) => module._id === action.payload
      );
      const lockedModules = state.lockedModules.filter(
        (module) => module._id !== moduleToUnlock._id
      );
      const unlockedModules = [moduleToUnlock, ...state.unlockedModules];
      return {
        ...state,
        lockedModules,
        unlockedModules,
      };
    }

    default:
      return state;
  }
};

export default conceptualSession;
