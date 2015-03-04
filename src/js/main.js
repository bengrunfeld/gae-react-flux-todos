/** @jsx React.DOM */
var React = require('react');

var App = React.createFactory(require('./components/app.js'));

React.render(
  <App />,
  document.getElementById('main')
);
