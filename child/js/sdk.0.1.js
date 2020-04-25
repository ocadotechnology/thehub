

'use strict';

function onReady(func){
    theHub.__internal.ready = func;

}
let theHub = {
    __internal : {
        initialized:false,
        responsesMap:{}
    },
    onReady : onReady
};

let getRandomString = function () {
    let e = 20;
    let n = "";
    let t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let r = 0; r < e; r++) n += t.charAt(Math.floor(Math.random() * t.length));
    return n
}
window.addEventListener('message', function (event) {
    if (!theHub.__internal.initialized) {
        if (event.origin == "http://localhost:8002" && event.data.initializer) {

            event.data.methods.forEach(methodName => {
                theHub[methodName] = async function () {
                    let callId = methodName + "_" + getRandomString();
                    let data = {methodName: methodName, arguments: Array.prototype.slice.call(arguments), id: callId};

                    event.source.postMessage(data, event.origin);

                    return new Promise(function(resolve) {
                        theHub.__internal.responsesMap[callId] = resolve;
                    });
                }
            })
            theHub.__internal.initialized=true;
            theHub.__internal.ready();
        }
    } else {
        theHub.__internal.responsesMap[event.data.id](event.data.response);
        delete theHub.__internal.responsesMap[event.data.id];
    }
});




