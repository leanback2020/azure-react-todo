import React from "react"
import TodoItem from "./TodoItem"
import PropTypes from "prop-types"

function Todos(props) {
  // console.log(props.todos)
  return props.todos.map((todo) => <TodoItem key={todo.id} todo={todo} checkComplete={props.checkComplete} delTodo={props.delTodo} />)
}

//PropTypes
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  checkComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
}

export default Todos
