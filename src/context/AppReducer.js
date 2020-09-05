export default (state, action) => {
  switch (action.type) {
    case "login":
      state.loggedIn = true
      state.user = action.data
      break
    case "logout":
      state.loggedIn = false
      break
    case "flashMessage":
      console.log("Flash: " + action.value)
      return {
        ...state,
        messages: [...state.messages, action.value],
      }
    case "addTodoItem":
      console.log("Reducer - Added todo item")
      console.log(action.value)
      state.todos.push(action.value)
      break
    case "deleteTodoItem":
      console.log("Reducer - delete todo item")
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.value),
      }
    case "GET_TODOITEMS":
      console.log("AppReducer: Get")
      console.log(action.payload)
      return {
        ...state,
        loading: false,
        todos: action.payload,
      }
    case "DELETE_TODOITEM":
      console.log("AppReducer: Delete " + action.payload)
      return {
        ...state,
        todos: [...state.todos.filter((todo) => todo._id !== action.payload)],
        //todos: state.todos.filter((todo) => todo.id !== action.payload),
      }
    case "ADD_TODOITEM":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      }
    case "UPDATE_TODOITEMCOMPLETE":
      console.log("AppReducer Update")
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo._id === action.payload._id) {
            todo.completed = !todo.completed
          }
          return todo
        }),
      }
    case "TODOITEM_ERROR":
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
