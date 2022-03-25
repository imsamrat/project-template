import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import rootReducer from "./reducer/index";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [reduxThunk];
const store = createStore(
  rootReducer,
  process.env.REACT_APP_ENV !== "production"
    ? composeWithDevTools(applyMiddleware(...middleware))
    : applyMiddleware(...middleware)
);
export default store;