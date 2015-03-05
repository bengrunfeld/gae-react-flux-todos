/** @jsx React.DOM */
var React = require('react');

var TodoBox = require('./components/todo-box');

React.render(
  <TodoBox />,
  document.getElementById('main')
);
