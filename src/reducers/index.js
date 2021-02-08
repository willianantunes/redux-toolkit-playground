import { combineReducers } from "redux"
// import todos from "./todos"
import todosReducer from "features/todos/todosSlice"
import visibilityFilter from "./visibilityFilter"

export default combineReducers({
  // todos,
  todos: todosReducer,
  visibilityFilter,
})
