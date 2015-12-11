/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions');

    var Todo = React.createClass({
      checkInput: function(todo){
        // Check if what was entered is a number
      },
      updateTodo: function(todo){
        var targetClass = '.' + todo.target.className;
        var newTodo = {id: todo.target.className, todoText: $(targetClass).val()};
        AppActions.updateTodo(newTodo);
      },
      onDeleteClick: function(todo){
        AppActions.deleteTodo({id: todo.target.className});
      },
      render:function(){
        return (
          <div className="todoItem">
            <input type="text" className={this.props.id} onChange={this.checkInput} defaultValue={this.props.children} ref="todoItem"/>
            &nbsp;
            -
            &nbsp;
            <a className={this.props.id} onClick={this.updateTodo}>update</a>
            &nbsp;
            -
            &nbsp;
            <a className={this.props.id} onClick={this.onDeleteClick}>delete</a>
          </div>
        )
      }
    });

module.exports = Todo;
