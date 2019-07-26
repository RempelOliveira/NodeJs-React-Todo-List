import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import taskReducer from "../reducers/Tasks";
import userReducer from "../reducers/User";

const store = createStore (
    combineReducers({taskReducer, userReducer}), applyMiddleware(thunk)

);

export default store;