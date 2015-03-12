/** @jsx React.DOM */
var AppActions = require('../actions/app-actions');
var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/app-constants');
var assign = require('object-assign');

var _todoItems = {};

var AppStore = assign({}, EventEmitter.prototype, {
  getTodos: function() {
    return _todoItems;
  },
  emitChange: function(change) {
    this.emit(change);
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
  addToTodoItems: function(todo){
    // Add new Todo to _todoItems
    _todoItems.push(todo);
  },
  removeFromTodoItems: function(todo){
    // Remove deleted todo from _todoItems
    newTodoItems = $.grep(_todoItems, function(e){
      return e.id == todo.id;
    }, true);

    _todoItems = newTodoItems;
  },
  getAllTodos: function() {
    this.requestAllTodos().done(function(result){
      // When the result has come back after an async request, update the UI
      _todoItems = result;
      AppStore.emitChange(AppConstants.CHANGE_EVENT);
      return;
    }).fail(function(result){
      return 'error in requestAllTodos Ajax call: ' + result;
    });
  },
  createTodo: function(todo) {
    this.createTodoOnServer(todo).done(function(result){
      // Add new todo to _todoItems, then call re-render
      todo.id = result.id;
      AppStore.addToTodoItems(todo);
      AppStore.emitChange(AppConstants.CHANGE_EVENT);
      return;
    }).fail(function(result){
      return 'error in createTodoOnServer Ajax call: ' + result;
    });
  },
  deleteTodo: function(todo) {
    this.deleteTodoOnServer(todo).done(function(result){
      AppStore.removeFromTodoItems(todo);

      // Fire a render to remove todo from the DOM
      AppStore.emitChange(AppConstants.CHANGE_EVENT);
      return;
    }).fail(function(result){
      return 'error in deleteTodoOnServer Ajax call: ' + result;
    });
  },
  updateTodo: function(todo) {
    this.updateTodoOnServer(todo).done(function(result){
      // Update _todoItems with new list of todos
      // Should perform a re-render here, but currently not necessary
      AppStore.emitChange(AppConstants.CHANGE_EVENT);
      return;
    }).fail(function(result){
      return 'error in deleteTodoOnServer Ajax call: ' + result;
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
      }.bind(this)
    });
  },
  updateTodoOnServer: function(todo){
    return $.ajax({
      url: AppConstants.UPDATE_TODO_URL + todo.id,
      dataType: 'json',
      type: 'PUT',
      data: todo,
      success: function(data) {
        // return data;
      }.bind(this),
      error: function(xhr, status, err) {
        // console.error(AppConstants.CREATE_NEW_TODO_URL, status, err.toString())
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
    case 'UPDATE_TODO':
      AppStore.updateTodo(payload.action.data);
  }

  return true;
});

module.exports = AppStore;
