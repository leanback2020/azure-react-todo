import React, { Component } from "react"
import PropTypes from "prop-types"

export class TodoItem extends Component {
  getStyle = () => {
    if (this.props.todo.completed) {
      return {
        background: "#f4f4f4",
        padding: "10px",
        borderBottom: "1px #ccc dotted",
        textDecoration: "line-through",
      }
    } else {
      return {
        textDecoration: "none",
      }
    }
  }

  getStyleShort = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: this.props.todo.completed ? "line-through" : "none",
    }
  }

  render() {
    const { id, title } = this.props.todo
    return (
      <div style={this.getStyleShort()}>
        <p>
          <input type="checkbox" onChange={this.props.checkComplete.bind(this, id)} /> {title}
          <button onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>
            X
          </button>
        </p>
      </div>
    )
  }
}

//PropTypes
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  checkComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
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
