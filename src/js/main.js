/** @jsx React.DOM */
var React = require('react');

var TodoBox = React.createFactory(require('./components/todo-box'));

React.render(
  <TodoBox />,
  document.getElementById('main')
);
