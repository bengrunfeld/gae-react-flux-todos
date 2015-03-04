/** @jsx React.DOM */
var React = require('react');
var Todo = require('./todo');

var App = React.createClass({
  render:function(){
    var todoNodes = this.props.data.map(function (todo) {
      return (
        <Todo key={todo.todoId}>
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

module.exports = App;
