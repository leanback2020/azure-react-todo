import "bootstrap/dist/css/bootstrap.css"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { Auth0Provider } from "@auth0/auth0-react"
import config from "./authConfig.json"

require("dotenv").config()

ReactDOM.render(
  <Auth0Provider domain={config.domain} clientId={config.clientId} redirectUri={window.location.origin}>
    <App />,
  </Auth0Provider>,
  document.getElementById("root")
)
