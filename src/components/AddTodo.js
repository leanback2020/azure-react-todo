import React, { useState, useContext } from "react"
import { GlobalContext } from "../context/GlobalState"

function AddTodo(props) {
  const [text, setText] = useState("")
  const { addTodoItem } = useContext(GlobalContext)

  async function onSubmit(e) {
    e.preventDefault()
    console.log("AddTodo onSubmit - Title: " + text)
    try {
      const newTodo = {
        title: text,
        completed: false,
      }
      addTodoItem(newTodo)
      setText("")
    } catch (error) {
      console.log("Could not submit item: " + error)
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "flex" }}>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} style={{ flex: "10", padding: "5px" }} placeholder="Enter todo..." />
      <input type="submit" value="Submit" className="btn" style={{ flex: "1" }} />
    </form>
  )
}

export default AddTodo
