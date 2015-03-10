/** @jsx React.DOM */
var React = require('react');

var Todo = React.createClass({
  render:function(){
    return (
      <div><p>{this.props.children} - <a>delete</a></p></div>
    )
  }
});

module.exports = Todo;
