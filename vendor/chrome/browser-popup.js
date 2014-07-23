;(function (window) {
  var popup = window.popup = window.popup || {};

  popup.init = function() {
    popup.show();
  };

  popup.getData = function() {
    var bg = chrome.extension.getBackgroundPage();
    if (bg) {
        popup.data = bg.app.videoObserver.data;
    }
  };

})(window);