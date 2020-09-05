import React, { useEffect, useContext } from "react"
import TodoItem from "./TodoItem"
import LoadingDotsIcon from "./LoadingDotsIcon"
import { GlobalContext } from "../context/GlobalState"

export const Todos = () => {
  const { todos, getTodoItems, loading } = useContext(GlobalContext)

  useEffect(() => {
    getTodoItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <LoadingDotsIcon />
  }

  return todos.map((todo) => <TodoItem key={todo._id} todo={todo} />)
}

//export default Todos
