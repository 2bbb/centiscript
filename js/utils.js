/*
The MIT License (MIT)

Copyright (c) 2014 Satoshi HORII

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

if ( !window.requestAnimationFrame ) {

    window.requestAnimationFrame = ( function() {

        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

            window.setTimeout( callback, 1000 / 60 );

        };

    } )();

}
window.cancelAnimationFrame = window.cancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.msCancelAnimationFrame;

if (!window.XMLHttpRequest){
  XMLHttpRequest = function () {
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.6.0");
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.3.0");
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {}
    throw new Error("This browser does not support XMLHttpRequest.");
  };
}

function evalInContext(source, context) {
    source = '(function(' + Object.keys(context).join(', ') + ') {' + source + '})';
    
    var compiled = eval(source);
    return compiled.apply(context, values());
    // you likely don't need this - use underscore, jQuery, etc
    function values() {
        var result = [];
        for (var property in context)
            if (context.hasOwnProperty(property))
                result.push(context[property]);
        return result;
    }
}

function get_url_vars(){
  var vars = new Object();
  var params;
  var temp_params = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i <temp_params.length; i++) {
    params = temp_params[i].split('=');
    
    if(params.length == 2) {
        //vars[params[0]] = params[1];
        vars[decodeURIComponent(params[0])] = decodeURIComponent(params[1]);
    }
  }
  return vars;
}

function checkFileReaderApi(){
  return window.File && window.FileReader && window.FileList && window.Blob;
}

function checkFileWriterApi(){
  return window.File && window.saveAs && window.FileList && window.Blob;
}

var audioContext = null;
var audioContextClass = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext;

function getAudioContext(){
  if ( audioContextClass ) return audioContext || (audioContext = new audioContextClass());
  else null;
}

var audioAnalyser = null;

function getAudioAnalyser(){
    return audioAnalyser || (audioAnalyser = getAudioContext().createAnalyser());
}

if ( !Array.prototype.forEach ) {
    Array.prototype.forEach = function(callback, context){
        for ( var i=0; i<this.length; i++ ) {
            callback.call(context || null, this[i], i, this);
        }
    };
}


