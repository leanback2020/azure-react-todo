import React, { createContext, useReducer } from "react"
import axios from "axios"
import AppReducer from "./AppReducer"

// Initial state
const initialState = {
  todos: [],
  error: null,
  loading: true,
  messages: [],
}

// Create context
export const GlobalContext = createContext(initialState)

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  // Actions
  async function getTodoItems() {
    console.log("getTodoItems")
    try {
      const response = await axios.get(`https://todocrudfunc.azurewebsites.net/api/GetTodos`)
      dispatch({
        type: "GET_TODOITEMS",
        payload: response.data,
      })
    } catch (err) {
      dispatch({
        type: "TODOITEM_ERROR",
        payload: err,
      })
    }
  }

  async function deleteTodoItem(_id) {
    console.log("deleteTodoItem id:" + _id)
    try {
      await axios.delete(`https://todocrudfunc.azurewebsites.net/api/DeleteTodoItem/${_id}`)

      dispatch({
        type: "DELETE_TODOITEM",
        payload: _id,
      })
      dispatch({
        type: "flashMessage",
        value: "Deleted Todo Item Successfully!",
      })
    } catch (err) {
      dispatch({
        type: "TODOITEM_ERROR",
        payload: err,
      })
    }
  }

  async function updateTodoComplete(todo) {
    try {
      console.log("updateTodoComplete ID: " + todo._id)
      await axios.put(`https://todocrudfunc.azurewebsites.net/api/updateTodoItem/${todo._id}`, { completed: !todo.completed, inprogress: false })

      dispatch({
        type: "UPDATE_TODOITEMCOMPLETE",
        payload: todo,
      })
    } catch (err) {
      dispatch({
        type: "TODOITEM_ERROR",
        payload: err,
      })
    }
  }

  async function UpdateInProgress(todo) {
    try {
      console.log("UpdateInProgress ID: " + todo._id)
      await axios.put(`https://todocrudfunc.azurewebsites.net/api/updateTodoItem/${todo._id}`, { inprogress: !todo.inprogress })

      dispatch({
        type: "UPDATE_TODOITEMINPROGRESS",
        payload: todo,
      })
    } catch (err) {
      dispatch({
        type: "TODOITEM_ERROR",
        payload: err,
      })
    }
  }

  async function addTodoItem(todo) {
    try {
      const response = await axios.post("https://todocrudfunc.azurewebsites.net/api/CreateTodoItem?code=5rl5Pv9S/6i1zNihec7Oeaja0/aK5SqBVNReZ7RgIIP1eBMtR7rBWQ==", {
        title: todo.title,
        completed: false,
        inprogress: false,
      })
      todo._id = response.data._id
      dispatch({
        type: "ADD_TODOITEM",
        payload: todo,
      })
      dispatch({
        type: "flashMessage",
        value: "Added Todo Item Successfully!",
      })
    } catch (err) {
      dispatch({
        type: "TODOITEM_ERROR",
        payload: err,
      })
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        todos: state.todos,
        error: state.error,
        loading: state.loading,
        messages: state.messages,
        getTodoItems,
        deleteTodoItem,
        addTodoItem,
        updateTodoComplete,
        UpdateInProgress,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
export default GlobalProvider
