/** @jsx React.DOM */
var React = require('react');
var Todo = require('./todo');

var TodoList = React.createClass({
  reorder: function(e) {
    a = this.props.data[0];
    this.props.data.splice(0, 1);
    this.props.data.splice(2, 0, a);
    this.setState(this.props.data);
  },
  render:function(){
    // Avoid error from rendering if props is empty
    // TODO: Should probably take care of this in the parent component
    if (jQuery.isEmptyObject(this.props.data)) {
      return (
        <div className="todoList"></div>
      )
    }
    var todoNodes = this.props.data.map(function(todo) {
      return (
        // TODO: key should NOT be todo.id
        <Todo key={todo.id} id={todo.id}>
          {todo.todoText}
        </Todo>
      );
    });
    return (
      <div className="todoList">
        {todoNodes}
        <button onClick={this.reorder}>Click me</button>
      </div>
    )
  }
});

module.exports = TodoList;
