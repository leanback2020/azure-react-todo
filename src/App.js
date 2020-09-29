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
import LoginButton from "./components/LoginButton"
import LogoutButton from "./components/LogoutButton"
import { useAuth0 } from "@auth0/auth0-react"
import { Auth0Provider } from "@auth0/auth0-react"

import "./App.css"
//REACT_APP_AUTH0_DOMAIN=dev-hg0m5gt3.eu.auth0.com
//REACT_APP_AUTH0_CLIENT_ID=cBrVnGA2p7hJw9DV9N6IrEHlo4Jb5yZD

function App() {
  const { user, isAuthenticated } = useAuth0()

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Auth0Provider domain={"domainid"} clientId={"cBrVnGA2p7hJw9DV9N6IrEHlo4Jb5yZD"} redirectUri={window.location.origin}>
          <Header />
          <div>{process.env.REACT_APP_AUTH0_CLIENT_ID}</div>
          <Suspense fallback={<LoadingDotsIcon />}></Suspense>
          <LogoutButton />
          <FlashMessages />
          <div>
            Is login: {isAuthenticated} <br />
          </div>
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
        </Auth0Provider>
        ,
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
