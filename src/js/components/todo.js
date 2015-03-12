/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions');

    var Todo = React.createClass({
      onDeleteClick: function(todo){
        AppActions.deleteTodo({id: todo.target.className});
        // Change state and call a render with setState

      },
      checkInput: function(todo){
        // Check if what was entered is a number
        console.log(todo.target.value);
      },
      updateTodo: function(todo){
        var newTodo = {id: todo.target.className, todoText: $('.' + todo.target.className).val()}
        AppActions.updateTodo()

        // NEXT: Send Todo id to backend to be deleted, then re-render the UI
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
