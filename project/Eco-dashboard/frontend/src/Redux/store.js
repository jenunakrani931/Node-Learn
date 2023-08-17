import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import productReducer from "./reducers/productReducer";

const rootReducer = combineReducers({
  product: productReducer,
  auth: authReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
