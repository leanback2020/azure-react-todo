import React from "react"
import { Link } from "react-router-dom"
import logo from "../../images/leanBack.png"

const headerStyle = {
  background: "#391633",
  color: "#fff",
  textAlign: "center",
  padding: "10px",
  flex: "1",

  height: "90px",
}
function Header() {
  return (
    <>
      <header style={headerStyle}>
        <img width="250" style={{ float: "left" }} height="80" src={logo} alt="logo" />
        <div style={{ margin: "0px 250px" }}>
          <h2>Todo List</h2>
          <div style={{ margin: "-5px 0px" }}>
            <Link style={linkStyle} to="/">
              Home
            </Link>{" "}
            |{" "}
            <Link style={linkStyle} to="/about">
              About
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
}

export default Header
