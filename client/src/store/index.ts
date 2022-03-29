
import { createStore, applyMiddleware, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer";

const store: Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;