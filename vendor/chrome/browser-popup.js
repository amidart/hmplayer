;(function (window) {
  var popup = window.popup = window.popup || {};

  var bg = chrome.extension.getBackgroundPage();

  popup.browser = {

    init: function() {
      popup.show();
    },

    getData: function() {
      if (bg.App) {
        return bg.App.videoObserver;
      }
      return {};
    },

    isAppEnabled: function() {
      return bg.App.isEnabled();
    },

    toggleState: function() {
      bg.App.toggleState();
    }

  }

})(window);