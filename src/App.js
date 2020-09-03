import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import axios from "axios"
import Todos from "./components/Todos"
import AddTodo from "./components/AddTodo"
import Header from "./components/layout/Header"
import About from "./components/Pages/About"
import { v4 as uuid } from "uuid"

import "./App.css"

// function App() {
//   return (
//     <div className="App">
//       <h1>leanBack</h1>
//       <Todos />
//     </div>
//   )
// }
/*
state = {
  todos: [
    {
      id: uuid(),
      title: "Start learning React.js",
      completed: false,
    },
    {
      id: uuid(),
      title: "Read on Azure Solution Architect exam",
      completed: false,
    },
    {
      id: uuid(),
      title: "Learn CosmoDB",
      completed: false,
    },
  ],
}
*/

class App extends Component {
  state = {
    todos: [],
  }
  //https://todocrudfunc.azurewebsites.net/api/GetTodos?
  //https://todocrudfunc.azurewebsites.net/api/GetTodos
  //https://gettodos.azurewebsites.net/api/GetTodos
  componentDidMount() {
    try {
      console.log("Trying to connect to Azure Function GetTodos")
      axios.get("https://todocrudfunc.azurewebsites.net/api/GetTodos").then((res) => {
        this.setState({
          todos: res.data,
        })
      })
    } catch (error) {
      console.log("Could not log in")
      console.log(error)
    }
  }

  checkComplete = (_id) => {
    //http://localhost:7071/api/updateTodoItem
    //https://todocrudfunc.azurewebsites.net/api/updateTodoItem/{_id}
    // props.todos.map((todo) => <TodoItem key={todo._id} todo={todo} checkComplete={props.checkComplete} delTodo={props.delTodo} />)
    this.state.todos.map((todo) => {
      if (todo._id === _id) {
        console.log("Updating Completed Status For ID: " + _id)
        axios.put(`https://todocrudfunc.azurewebsites.net/api/updateTodoItem/${_id}`, { completed: !todo.completed }).then((res) => {
          this.setState({
            todos: this.state.todos.map((todo) => {
              if (todo._id === _id) {
                todo.completed = !todo.completed
              }
              return todo
            }),
          })
        })
      }
      return false
    })
  }

  //Delete Todo
  delTodo = (id) => {
    console.log("id: " + id)
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then((res) => this.setState({ todos: [...this.state.todos.filter((todo) => todo.id !== id)] }))
    //spread operator ...
  }

  addTodo = (title) => {
    const newTodo = {
      _id: uuid(),
      title: title,
      completed: false,
    } //http://localhost:7071/api/CreateTodoItem   https://jsonplaceholder.typicode.com/todos // https://todocrudfunc.azurewebsites.net/api/CreateTodoItem?code=5rl5Pv9S/6i1zNihec7Oeaja0/aK5SqBVNReZ7RgIIP1eBMtR7rBWQ==
    axios
      .post("https://todocrudfunc.azurewebsites.net/api/CreateTodoItem?code=5rl5Pv9S/6i1zNihec7Oeaja0/aK5SqBVNReZ7RgIIP1eBMtR7rBWQ==", {
        title: title,
        completed: false,
      })
      .then((res) => this.setState({ todos: [...this.state.todos, newTodo] }))
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos todos={this.state.todos} checkComplete={this.checkComplete} delTodo={this.delTodo} />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
