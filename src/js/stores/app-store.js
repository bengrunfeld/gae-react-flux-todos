/** @jsx React.DOM */
var AppActions = require('../actions/app-actions');
var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/app-constants');
var assign = require('object-assign');

var _todoItems = {};

var AppStore = assign({}, EventEmitter.prototype, {
  emitChange: function(change) {
    this.emit(change);
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
  addReloadListener: function(callback) {
    this.on(AppConstants.RELOAD_RESULTS, callback);
  },
  removeReloadListener: function(callback) {
    this.removeListener(AppConstants.RELOAD_RESULTS, callback);
  },
  getAllTodos: function() {
    this.requestAllTodos().done(function(result){
      // When the result has come back after an async request, update the UI
      _todoItems = result;
      AppStore.emitChange(AppConstants.CHANGE_EVENT);
      return;
    }).fail(function(){
      return 'error in requestAllTodos Ajax call: ' + result;
    });
  },
  createTodo: function(todo) {
    this.createTodoOnServer(todo).done(function(result){
      return;
    }).fail(function(){
      return 'error in createTodoOnServer Ajax call: ' + result;
    });
  },
  createTodoOnServer: function(todo){
    return $.ajax({
      url: AppConstants.CREATE_NEW_TODO_URL,
      dataType: 'json',
      type: 'POST',
      data: todo,
      success: function(data) {
        // return data;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(AppConstants.CREATE_NEW_TODO_URL, status, err.toString());
      }.bind(this)
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
        console.error(AppConstants.REQUEST_ALL_TODOS_URL, status, err.toString());
      }.bind(this)
    });
  },
  deleteTodo: function(todo) {
    this.deleteTodoOnServer(todo).done(function(result){
      console.log('Woot!' + result);
      return;
    }).fail(function(result){
      return 'error in deleteTodoOnServer Ajax call: ' + result;
    });
  },
  deleteTodoOnServer: function(todo) {
    return $.ajax({
      url: AppConstants.DELETE_TODO_URL + todo.id,
      dataType: 'json',
      type: 'DELETE',
      //data: todo,
      success: function(data) {
        // return data;
      }.bind(this),
      error: function(xhr, status, err) {
        // console.error(AppConstants.CREATE_NEW_TODO_URL, status, err.toString())
        console.log('Stink!');
      }.bind(this)
    });
  }
});

AppDispatcher.register(function(payload){

  // Filter by actionType
  switch(payload.action.actionType){
    case 'LOAD_COMPONENT_DATA':
      AppStore.getAllTodos();
      break;
    case 'SUBMIT_TODO_FORM':
      AppStore.createTodo(payload.action.data);
      break;
    case 'DELETE_TODO':
      AppStore.deleteTodo(payload.action.data);
      break;
  }

  return true;
});

module.exports = AppStore;
