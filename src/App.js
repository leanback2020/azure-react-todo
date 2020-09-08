import React, { Suspense } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Todos } from "./components/Todos"
import AddTodo from "./components/AddTodo"
import Header from "./components/layout/Header"
import About from "./components/Pages/About"
//import HomeGuest from "./components/Pages/HomeGuest"
//import { v4 as uuid } from "uuid"
import LoadingDotsIcon from "./components/LoadingDotsIcon"
import FlashMessages from "./components/FlashMessages"
import { GlobalProvider } from "./context/GlobalState"
import "./App.css"

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<LoadingDotsIcon />}></Suspense>

        <FlashMessages />
        <Switch>
          <Route exact path="/">
            <AddTodo className="container" />
            <Todos />
          </Route>
          <Route path="/about" exact component={About} />
          {/* <Route path="/guest" exact component={HomeGuest} /> */}
        </Switch>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
