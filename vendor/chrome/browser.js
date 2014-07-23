;(function (window) {
  var app = window.app = window.app || {};

  app.browser = {
    name: 'Chrome',

    getUrl: function(url) {
      return chrome.extension.getURL(url);
    },

    getExtensionVersion: function() {
      var manifest = chrome.runtime.getManifest();
      return manifest.version;
    }

  };

})(window);
