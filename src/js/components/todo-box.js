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
  _onReloadResults: function() {
    AppActions.loadComponentData();
  },
  handleTodoSubmit: function(todo) {
    AppStore.addReloadListener(this._onReloadResults);

    // Fires action that sends Todo to server
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
