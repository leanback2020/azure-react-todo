import React from "react"
import { Link } from "react-router-dom"
import logo from "../../images/leanBack.png"
//57, 21, 52
const headerStyle = {
  background: "#391633",
  color: "#fff",
  textAlign: "center",
  padding: "0px",
  flex: "1",

  height: "90px",
}
function Header() {
  return (
    <>
      <header style={headerStyle}>
        <img width="250" style={{ float: "left" }} height="80" src={logo} alt="logo" />
        <div style={{ margin: "0px 250px" }}>
          <h1>Todo List</h1>
          <div style={{ margin: "5px 0px" }}>
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
