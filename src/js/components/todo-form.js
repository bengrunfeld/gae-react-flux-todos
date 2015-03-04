/** @jsx React.DOM */
var React = require('react');

var TodoForm = React.createClass({
  render:function(){
    return (
      <form className="todosForm">
        <input type="text" placeholder="Write a todo here..." ref="todoText" />
        <input type="submit" value="Post" />
      </form>
    )
  }
});

module.exports = TodoForm;
