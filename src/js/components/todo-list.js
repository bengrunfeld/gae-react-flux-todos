/** @jsx React.DOM */
var React = require('react');
var Todo = require('./todo');

var TodoList = React.createClass({
  handleUpdateSubmit: function(e) {
    e.preventDefault();

    console.log('her');
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
        <Todo key={todo.id} id={todo.id}>
          {todo.title}
        </Todo>
      );
    });
    return (
      <form className="todoList" onSubmit={this.handleUpdateSubmit}>
        {todoNodes}
      </form>
    )
  }
});

module.exports = TodoList;
