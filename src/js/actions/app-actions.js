/** @jsx React.DOM */
var AppDispatcher = require('../dispatcher/app-dispatcher');
var AppConstants = require('../constants/app-constants');

var AppActions = {
  loadComponentData: function(item){
    AppDispatcher.handleViewAction({
      actionType:AppConstants.LOAD_COMPONENT_DATA,
      item: item
    })
  }
}

module.exports = AppActions
