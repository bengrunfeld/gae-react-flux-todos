/** @jsx React.DOM */
var React = require('react');

var TodoBox = React.createFactory(require('./components/todo-box'));

var data = [
  {todoId: "567", todoText: "Hello, how are you?"},
  {todoId: "890", todoText: "Fine thank you."},
  {todoId: "123", todoText: "What is that?"}
];

React.render(
  <TodoBox data={data} />,
  document.getElementById('main')
);
