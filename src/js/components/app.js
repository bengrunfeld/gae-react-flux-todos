/** @jsx React.DOM */
var React = require('react');
//var AppActions = require('../actions/AppActions');
//var AppStore = require('../stores/AppStores');
var TodoForm = require('./todo-form.js');
var TodoList = require('./todo-list.js');

var App = React.createClass({
  render:function(){
    return (
      <div className="todo-container">
        <h4>GAE React Flux Todos</h4>
        <TodoForm />
        <TodoList />
      </div>
    )
  }
});

module.exports = App;
