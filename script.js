var script_file = 'content_script.js'
var s = document.createElement('script');
s.src = chrome.extension.getURL(script_file);
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
  s.parentNode.removeChild(s);
};
