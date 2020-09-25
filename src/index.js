import "bootstrap/dist/css/bootstrap.css"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { Auth0Provider } from "@auth0/auth0-react"

const domain = "dev-hg0m5gt3.eu.auth0.com" // process.env.REACT_APP_AUTH0_DOMAIN
const clientId = "cBrVnGA2p7hJw9DV9N6IrEHlo4Jb5yZD" // process.env.REACT_APP_AUTH0_CLIENT_ID

ReactDOM.render(
  <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
    <App />
  </Auth0Provider>,
  document.getElementById("root")
)
