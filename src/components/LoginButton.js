import React from "react"
import { useAuth0 } from "@auth0/auth0-react"

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <div className="col-md-auto">
      <button className="btn btn-success btn-sm" onClick={() => loginWithRedirect()}>
        Log In
      </button>
    </div>
  )
}

export default LoginButton
