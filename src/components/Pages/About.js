import React from "react"

function About() {
  return (
    <div id="inner">
      <br />
      <br />
      <h1>About</h1>
      <br />
      <p className="lead text-muted">This is a small react app, using Azure Static Web Site with GitHub workflow for CI/CD.</p>
      <br />
      <p>The app is using a serverless backend with Azure Functions, to store data in a Mongo database</p>
      <br />
      <p>This react app is using some basic react features (hooks) like: useEffect, useState, useContext, useReducer, createContext, BrowserRouter, Switch, Route </p>
      <br />
      <p>GitHub</p>
      <a href="https://github.com/leanback2020/azure-react-todo">https://github.com/leanback2020/azure-react-todo</a>
    </div>
  )
}

export default About
