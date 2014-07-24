;(function (window) {
  var popup = window.popup = window.popup || {};

  var bg = chrome.extension.getBackgroundPage();

  popup.browser = {

    init: function() {
      popup.show();
    },

    getData: function() {
      if (bg.app) {
        return bg.app.videoObserver;
      }
      return {};
    },

    isAppEnabled: function() {
      return bg.app.isEnabled();
    },

    toggleState: function() {
      bg.app.toggleState();
    }

  }

})(window);