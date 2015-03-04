/** @jsx React.DOM */
var React = require('react');
//var AppActions = require('../actions/AppActions');
//var AppStore = require('../stores/AppStores');

var App = React.createClass({
  render:function(){
    return (
      <div className="todo-container">
        <h4>GAE React Flux Todos</h4>
      </div>
    )
  }
});

module.exports = App;
