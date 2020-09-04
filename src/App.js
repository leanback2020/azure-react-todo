import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import axios from "axios"
import Todos from "./components/Todos"
import AddTodo from "./components/AddTodo"
import Header from "./components/layout/Header"
import About from "./components/Pages/About"
import { v4 as uuid } from "uuid"

import "./App.css"

class App extends Component {
  state = {
    todos: [],
  }
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
  delTodo = (_id) => {
    console.log("Deleting id: " + _id)
    axios.delete(`https://todocrudfunc.azurewebsites.net/api/DeleteTodoItem/${_id}`).then((res) => this.setState({ todos: [...this.state.todos.filter((todo) => todo._id !== _id)] }))
    //spread operator ...
  }

  addTodo = (title) => {
    const newTodo = {
      _id: uuid(),
      title: title,
      completed: false,
    }
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
          <div className="">
            <Header />
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <AddTodo className="container" addTodo={this.addTodo} />
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
