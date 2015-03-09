/** @jsx React.DOM */
var React = require('react');

var TodoForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    // Grab value from form
    var todoText = this.refs.todoText.getDOMNode().value.trim();

    // If empty, bail
    if (!todoText) {
      return
    }

    // Send to server
    this.props.onTodoSubmit({todoText: todoText});

    // Reset the form
    this.refs.todoText.getDOMNode().value = '';
  },
  render:function(){
    return (
      <form className="todosForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Write a todo here..." ref="todoText" />
        <input type="submit" value="Post" />
      </form>
    )
  }
});

module.exports = TodoForm;
