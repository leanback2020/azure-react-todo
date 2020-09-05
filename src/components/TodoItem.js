import React, { useState, useContext } from "react"
import { GlobalContext } from "../context/GlobalState"

export const TodoItem = ({ todo }) => {
  //function TodoItem(props) {
  const { deleteTodoItem, updateTodoComplete } = useContext(GlobalContext)
  const [text, setText] = useState("Not Started")
  function getStyleShort() {
    return {
      background: "#f4f4f4",
      padding: "5px",
      borderBottom: "1px #ccc dotted",
      textDecoration: todo.completed ? "line-through" : "none",
      height: "42px",
    }
  }

  function changeText(e, str) {
    e.preventDefault()
    if (todo.completed) {
      e.target.style.background = "#BFB"
      str = "Finished"
    } else {
      e.target.style.background = "#0C0"
      e.target.style.border = "none"
      e.target.style.borderRadius = "20%"
      e.target.style.outline = "none"
    }
    setText(str)
  }

  //const { text } = this.state
  const { _id, title } = todo
  return (
    <div style={getStyleShort()}>
      <p>
        <input type="checkbox" checked={todo.completed} onChange={() => updateTodoComplete(todo)} /> {title} {"  "}
        {!todo.completed && (
          <button onClick={(e) => changeText(e, "InProgress")} style={btnStyleProgress}>
            {"   "} {text}
          </button>
        )}
        {todo.completed && <button style={btnStyleProgressFinished}>Finished</button>}
        <button onClick={() => deleteTodoItem(_id)} style={btnStyle}>
          X
        </button>
      </p>
    </div>
  )
}

//PropTypes

const btnStyleProgress = {
  background: "#ff9900",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "20%",
  cursor: "pointer",
  margin: "0px 10px",
}

const btnStyleProgressFinished = {
  background: "#333",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "20%",
  cursor: "pointer",
  margin: "0px 10px",
  fontStyle: "italic",
}

const btnStyle = {
  background: "#ff9900",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right",
}
export default TodoItem
