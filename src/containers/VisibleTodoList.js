import { connect } from "react-redux"
import { toggleTodo } from "../features/todos/todosSlice"
import TodoList from "../components/TodoList"
import { VisibilityFilters } from "../features/filters/filtersSlice"

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error("Unknown filter: " + filter)
  }
}

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter),
})

const mapDispatchToProps = { toggleTodo }

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
