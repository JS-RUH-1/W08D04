import { combineReducers, createStore } from "redux"
import token from "./login"

const reducers = combineReducers({token})
const store = createStore(reducers)
export default store;