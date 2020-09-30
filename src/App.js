import React, { Suspense } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Todos } from "./components/Todos"
import AddTodo from "./components/AddTodo"
import Header from "./components/layout/Header"
import About from "./components/Pages/About"
import LoadingDotsIcon from "./components/LoadingDotsIcon"
import FlashMessages from "./components/FlashMessages"
import { GlobalProvider } from "./context/GlobalState"

import { useAuth0 } from "@auth0/auth0-react"
import "./App.css"

function App() {
  const { user, isAuthenticated } = useAuth0()
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<LoadingDotsIcon />}></Suspense>
        <FlashMessages />
        <Switch>
          <Route exact path="/">
            {isAuthenticated ? (
              <>
                {" "}
                <h2>Welcome {user.nickname}</h2>
                <AddTodo className="container" />
                <Todos />{" "}
              </>
            ) : (
              <h5>Please log in to add todo items!</h5>
            )}
          </Route>
          <Route path="/about" exact component={About} />
        </Switch>
      </BrowserRouter>
    </GlobalProvider>
  )
}
export default App
