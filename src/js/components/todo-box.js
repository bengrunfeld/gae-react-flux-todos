/** @jsx React.DOM */
var React = require('react');
//var AppActions = require('../actions/AppActions');
//var AppStore = require('../stores/AppStores');
var TodoForm = require('./todo-form');
var TodoList = require('./todo-list');

var TodoBox = React.createClass({
  getInitialState: function(){
    return {data: []};
  },
  render: function(){
    return (
      <div className="todo-container">
        <h4>GAE React Flux Todos</h4>
        <TodoForm />
        <TodoList data={this.props.data} />
      </div>
    )
  }
});

module.exports = TodoBox;
