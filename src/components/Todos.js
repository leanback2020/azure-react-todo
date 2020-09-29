import React, { useEffect, useContext } from "react"
import TodoItem from "./TodoItem"
import LoadingDotsIcon from "./LoadingDotsIcon"
import { GlobalContext } from "../context/GlobalState"
import { useAuth0 } from "@auth0/auth0-react"

export const Todos = () => {
  const { todos, getTodoItemsByUserId, loading } = useContext(GlobalContext)
  const { user } = useAuth0()
  useEffect(() => {
    getTodoItemsByUserId(user.sub.split("|")[1])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <LoadingDotsIcon />
  }

  return todos.map((todo) => <TodoItem key={todo._id} todo={todo} />)
}
