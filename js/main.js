;(function (window) {

  var app = window.app = window.app || {};

  var name = 'Hamatata Player',
      version = '';


  app.videoObserver = {
    dataType: '',
    data: {}
  };

  app.init = function() {
    version = app.browser.getExtensionVersion();
  };

  app.getVersion = function() {
    return version;
  };


})(window);
