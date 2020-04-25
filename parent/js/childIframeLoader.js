
'use strict';

let iframe = document.createElement('iframe');
// once the child iframe is loaded lets initialize the child with available methods from the parent
iframe.onload = function () {
  let data = {initializer:true, methods: Object.keys(functions)};
    iframe.contentWindow.postMessage(data, 'http://localhost:8003');
}; // before setting 'src'
iframe.src = 'http://localhost:8003/childFrame.html'; // set to test cross site

//once the above is ready we can add the iframe to our webpage
document.getElementById('childContainer').appendChild(iframe);
