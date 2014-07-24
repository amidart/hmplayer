;(function (window) {
  var popup = window.popup = window.popup || {};

  popup.browser = {

    init: function() {
      popup.show();
    },

    getData: function() {
      var bg = chrome.extension.getBackgroundPage();
      if (bg.app) {
        return bg.app.videoObserver;
      }
      return {};
    }

  }

})(window);