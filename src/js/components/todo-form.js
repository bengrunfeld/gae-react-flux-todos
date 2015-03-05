/** @jsx React.DOM */
var React = require('react');

var TodoForm = React.createClass({
  handleSubmit: function(e) {
    alert('hi');
    e.preventDefault();
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
