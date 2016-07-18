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
    AppStore.addChangeListener(this._onChange);

    // Fires action that triggers the initial load
    AppActions.loadComponentData();
  },
  _onChange: function() {
    this.setState(getTodoItems());
  },
  handleTodoSubmit: function(todo) {
    AppActions.submitTodoForm(todo);
  },
  render: function(){
    return (
      <div className="todo-container">
        <h4>GAE React Flux Todos</h4>
        <TodoForm onTodoSubmit={this.handleTodoSubmit} />
        <TodoList data={this.state.data} />
      </div>
    )
  }
});

module.exports = TodoBox;
