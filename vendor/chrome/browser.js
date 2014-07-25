var App = (function (my) {

  my.browser = {
    name: 'Chrome',

    getUrl: function(url) {
      return chrome.extension.getURL(url);
    },

    getExtensionVersion: function() {
      var manifest = chrome.runtime.getManifest();
      return manifest.version;
    },

    setIcon: function(on) {
      var icon = 'img/19_gray.png';
      if (on) icon = 'img/19_white.png';
      chrome.browserAction.setIcon({path: icon});
    }

  };

})(App || {});

