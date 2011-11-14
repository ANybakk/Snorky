var Query = function() {
};



var STATE = {
  BOUND   : {name:"snorky-bound"},
  POLLING : {name:"snorky-polling"},
  LOADING : {name:"snorky-loading"},
  LOADED  : {name:"snorky-loaded"}
};



var TRIGGERS = {
  POLL    : {name:"snorky-poll"}
}



var Binding = function(objQuery, jqElement) {

  this.objQuery = objQuery;
  this.enumState = STATE.BOUND;
  
  var funcPoll = function() {
    //Poll
  };
  
  if(jqElement.on) { //jQ7
    jqElement.on(TRIGGERS.POLL.name, funcPoll);
  } else if(jqElement.bind) {
    jqElement.bind(TRIGGERS.POLL.name, funcPoll);
  }
  this.jqElement = jqElement;
  
};

Binding.prototype.map = function(nameVariable, jqElement) {
};

Binding.prototype.setEndpoint = function(urlEndpoint) {
  this.urlEndpoint = urlEndpoint;
};

Binding.prototype.setCodeDuplication = function(ynCodeDuplication) {
  this.ynCodeDuplication = ynCodeDuplication;
};

Binding.prototype.setPollRate = function(msPollRate) {
  this.msPollRate = msPollRate;
};

Binding.prototype.setPollTrigger = function(jqElement, eventType) {

  if(typeof eventType !== "string") {
    return false;
  }
  
  var funcPollTrigger = function() {
    this.trigger(TRIGGERS.POLL); //Does "this" point correctly here?
  };
  
  if(jqElement.on) { //jQ7
    jqElement.on(eventType, funcPollTrigger);
    return true;
  } else if(jqElement.bind) {
    jqElement.bind(eventType, funcPollTrigger);
    return true;
  }
  
  return false;
  
};

Binding.prototype.trigger = function(enumTrigger) {

  if(enumTrigger.name) {
  
    var e = jQuery.Event(enumTrigger.name);
    this.jqElement.trigger(e);
    return true;
    
  }
  
  return false;
  
};



exports.Query = Query;
exports.STATE = STATE;
exports.TRIGGERS = TRIGGERS;
exports.Binding = Binding;