import React, { Suspense } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Todos } from "./components/Todos"
import AddTodo from "./components/AddTodo"
import Header from "./components/layout/Header"
import About from "./components/Pages/About"
import LoadingDotsIcon from "./components/LoadingDotsIcon"
import FlashMessages from "./components/FlashMessages"
import { GlobalProvider } from "./context/GlobalState"
import LoginButton from "./components/LoginButton"
import LogoutButton from "./components/LogoutButton"
import { useAuth0 } from "@auth0/auth0-react"
import "./App.css"

function App() {
  const { user, isAuthenticated } = useAuth0()
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<LoadingDotsIcon />}></Suspense>
        <LogoutButton />
        <FlashMessages />
        <Switch>
          <Route exact path="/">
            {isAuthenticated ? (
              <>
                {" "}
                <h2>{user.name}</h2>
                <AddTodo className="container" /> <Todos /> <LogoutButton />{" "}
              </>
            ) : (
              <LoginButton />
            )}
          </Route>
          <Route path="/about" exact component={About} />
          {/* <Route path="/guest" exact component={HomeGuest} /> */}
        </Switch>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
