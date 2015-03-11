/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions');

    var Todo = React.createClass({
      onDeleteClick: function(todo){
        AppActions.deleteTodo({id: todo.target.className});
        // Change state and call a render with setState

      },
      render:function(){
        return (
          <div className="todoItem"><input type="text" value={this.props.children} ref="todoItem"/> - <a className={this.props.id} onClick={this.onDeleteClick}>delete</a></div>
        )
      }
    });

module.exports = Todo;
