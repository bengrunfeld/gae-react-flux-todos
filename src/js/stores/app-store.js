/** @jsx React.DOM */
var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/app-constants');
var assign = require('object-assign');

var _todoItems = {};

var AppStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(AppConstants.CHANGE_EVENT);
  },
  getTodos: function() {
    return _todoItems;
  },
  addChangeListener: function(callback) {
    this.on(AppConstants.CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(AppConstants.CHANGE_EVENT, callback);
  },
  getAllTodos: function() {
    this.requestAllTodos().done(function(result){
      // When the result has come back after an async request, update the UI
      _todoItems = result;
      AppStore.emitChange();
      return;
    }).fail(function(){
      return 'error in Ajax call: ' + result;
    });
  },
  requestAllTodos: function(){
    return $.ajax({
      url: AppConstants.REQUEST_ALL_TODOS_URL,
      dataType: 'json',
      success: function(data) {
        // return data;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});

AppDispatcher.register(function(payload){

  // Sends the request to the server
  AppStore.getAllTodos();

  return true;

  // TODO: if the action is 'getAll', query the DB via the API
  // TODO: then load the payload we recieve into _todoItems.
});

module.exports = AppStore;
