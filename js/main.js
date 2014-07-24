;(function (window) {

  var app = window.app = window.app || {};

  var name = 'Hamatata Player',
      version = '';

  var state = {
    enabled: false
  }

  app.videoObserver = {
    dataType: '',
    data: {}
  };

  app.init = function() {
    version = app.browser.getExtensionVersion();
    state.enabled = localStorage['enabled'] === undefined ? true : localStorage['enabled'] === 'true';
    app.browser.setIcon(state.enabled);
  };

  app.getVersion = function() {
    return version;
  };

  app.toggleState = function() {
    state.enabled = !state.enabled;
    localStorage['enabled'] = state.enabled;
    app.browser.setIcon(state.enabled);
  }


})(window);


window.addEventListener('load', function() {
  app.init();
});
