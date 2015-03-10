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
  optimisticallyUpdate: function(todo){
    // Optimistically update the UI
    var all_todos = getTodoItems();
    all_todos.data.push(todo);
    console.log(all_todos);
    this.setState(all_todos);
  },
  handleTodoSubmit: function(todo) {
    AppStore.addReloadListener(this._onReloadResults);

    AppActions.submitTodoForm(todo);

    // Otherwise data doesn't sync up
    // TODO: Update database model field name
    todo.title = todo.todoText;

    this.optimisticallyUpdate(todo);

    AppStore.removeChangeListener(this._onReloadResults);
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
