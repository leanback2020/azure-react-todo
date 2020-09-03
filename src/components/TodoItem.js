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

  getStyle2 = () => {
    if (this.props.todo.completed) {
      return {
        background: "#f4f4f4",
      }
    } else {
      return {
        background: "#f40000",
      }
    }
  }

  state = {
    text: "Not Started",
  }

  changeText = (e, text) => {
    e.preventDefault()
    if (this.props.todo.completed) {
      e.target.style.background = "#BFB"
      text = "Finished"
    } else {
      e.target.style.background = "#0F0"
      e.target.style.border = "none"
      e.target.style.borderRadius = "20%"
      e.target.style.outline = "none"
    }
    this.setState({ text })
  }

  render() {
    const { text } = this.state
    const { _id, title } = this.props.todo
    return (
      <div style={this.getStyleShort()}>
        <p>
          <input type="checkbox" checked={this.props.todo.completed} onChange={this.props.checkComplete.bind(this, _id)} /> {title} {"  "}
          {!this.props.todo.completed && (
            <button onClick={(e) => this.changeText(e, "InProgress")} style={btnStyleProgress}>
              {text}
            </button>
          )}
          {this.props.todo.completed && <button style={btnStyleProgress}>Finished</button>}
          <button onClick={this.props.delTodo.bind(this, _id)} style={btnStyle}>
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

const btnStyleProgress = {
  background: "#ff9900",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "20%",
  cursor: "pointer",
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
