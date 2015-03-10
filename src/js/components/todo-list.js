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
    var todoNodes = this.props.data.map(function (todo) {
      return (
        <Todo key={todo.id} id={todo.id}>
          {todo.title}
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
