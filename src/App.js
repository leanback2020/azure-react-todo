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

  componentDidMount() {
    axios.get("https://gettodos.azurewebsites.net/api/GetTodos?code=3CkMhC5BPzPDOhr57QRv94UXXLxEfQ6uaqhpd7xa/axbPv7qPH0U8Q==").then((res) => {
      //console.log(res)
      this.setState({ todos: res.data })
    })
  }

  //https://jsonplaceholder.typicode.com/todos
  //Toggle Complete
  checkComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      }),
    })
  }

  //Delete Todo
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then((res) => this.setState({ todos: [...this.state.todos.filter((todo) => todo.id !== id)] }))
    //spread operator ...
  }

  addTodo = (title) => {
    const newTodo = {
      id: uuid(),
      title: title,
      completed: false,
    }
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
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
