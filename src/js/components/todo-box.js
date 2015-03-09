/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions');
var AppStore = require('../stores/app-store');
var TodoForm = require('./todo-form');
var TodoList = require('./todo-list');

function getTodoItems() {
  return { data: AppStore.getTodos() }
}

var TodoBox = React.createClass({
  getInitialState: function() {
    return getTodoItems();
  },
  componentWillMount: function(){
    // Listens for any changes, then updates the component
    AppStore.addChangeListener(this._onChange);

    // Fires action that triggers the initial load
    AppActions.loadComponentData('Hi Ben');
  },
  _onChange: function() {
    this.setState(getTodoItems());
  },
  handleTodoSubmit: function(todo) {
    // Fires action that sends Todo to server
    AppActions.submitTodo(todo);
  },
  render: function(){
    return (
      <div className="todo-container">
        <h4>GAE React Flux Todos</h4>
        <TodoForm onCommentSubmit={this.handleTodoSubmit} />
        <TodoList data={this.state.data} />
      </div>
    )
  }
});

module.exports = TodoBox;
