import React from "react"

function About() {
  return (
    <div id="inner">
      <br />
      <br />
      <h1>About</h1>
      <br />
      <p>This is a small react app, using Azure Static Web Site with GitHub workflow for CI/CD.</p>
      <br />
      <p>The app is using a serverless backend with Azure Functions, to store data in a Mongo database</p>
      <br />
      <p>GitHub</p>
      <a href="https://github.com/leanback2020/react-todo">https://github.com/leanback2020/react-todo</a>
    </div>
  )
}

export default About
