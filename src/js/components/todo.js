/** @jsx React.DOM */
var React = require('react');

var Todo = React.createClass({
  render:function(){
    return (
      <p>{this.props.children}</p>
    )
  }
});

module.exports = Todo;
