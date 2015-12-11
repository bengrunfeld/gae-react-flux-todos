/** @jsx React.DOM */
var React = require('react');
var Todo = require('./todo');

var TodoList = React.createClass({
  render:function(){
    // Avoid error from rendering if props is empty
    if (jQuery.isEmptyObject(this.props.data)) {
      return (
        <div className="todoList"></div>
      )
    }

    // Props aren't empty - continue as planned
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
      </div>
    )
  }
});

module.exports = TodoList;
