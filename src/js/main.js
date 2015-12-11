/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');

var TodoBox = require('./components/todo-box');

ReactDOM.render(
  <TodoBox />,
  document.getElementById('main')
);
