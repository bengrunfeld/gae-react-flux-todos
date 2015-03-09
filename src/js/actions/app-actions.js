/** @jsx React.DOM */
var AppDispatcher = require('../dispatcher/app-dispatcher');
var AppConstants = require('../constants/app-constants');

var AppActions = {
  loadComponentData: function(data){
    AppDispatcher.handleViewAction({
      actionType:AppConstants.LOAD_COMPONENT_DATA,
      data: data
    })
  },
  submitTodoForm: function(todo){
    AppDispatcher.handleViewAction({
      actionType.AppConstants.SUBMIT_TODO_FORM,
      data: data
    })
  }
}

module.exports = AppActions
