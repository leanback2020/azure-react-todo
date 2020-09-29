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
    case "GET_TODOITEMS":
      console.log("AppReducer: Get")
      console.log(action.payload)
      return {
        ...state,
        loading: false,
        todos: action.payload,
      }
    case "GET_CONF":
      console.log("Appreducer: GetConfig")
      console.log(action.payload)
      return {
        ...state,
        domainid: action.payload.domain_id,
      }
    case "DELETE_TODOITEM":
      console.log("AppReducer: Delete " + action.payload)
      return {
        ...state,
        todos: [...state.todos.filter((todo) => todo._id !== action.payload)],
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
    case "UPDATE_TODOITEMINPROGRESS":
      console.log("AppReducer Update")
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo._id === action.payload._id) {
            todo.inprogress = !todo.inprogress
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
