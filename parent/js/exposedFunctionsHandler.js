
'use strict';

// This will store all registered functions
let functions = [];

function registerFunction() {
	for (let i=0; i < arguments.length; i++) {
    functions[arguments[i].name] =arguments[i];
  }

}

// This code handles calls to trigger a function from child frame and reply back the value
window.addEventListener('message', function (event) {
  let data = event.data;

  reply(event.source, data.id, functions[data.methodName].apply(null, data.arguments));
});

function reply(sourceWindow, id, response){
  let data = {
    id:id,
    response:response
  }
  sourceWindow.postMessage(data, 'http://localhost:8003');
}