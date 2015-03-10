/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions');

var Todo = React.createClass({
  onDeleteClick: function(todo){
    // TODO: Should this go in parent?
    AppActions.deleteTodo(todo.target.className);
  },
  render:function(){
    return (
      <div><p>{this.props.children} - <a className={this.props.id} onClick={this.onDeleteClick}>delete</a></p></div>
    )
  }
});

module.exports = Todo;
