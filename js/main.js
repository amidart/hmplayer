var App = (function (my) {

  var name = 'Hamatata Player',
      version = '';

  var state = {
    enabled: false
  }

  my.videoObserver = {
    dataType: '',
    data: {}
  };

  my.init = function() {
    version = my.browser.getExtensionVersion();
    state.enabled = localStorage['enabled'] === undefined ? true : localStorage['enabled'] === 'true';
    my.browser.setIcon(state.enabled);
  };

  my.getVersion = function() {
    return version;
  };

  my.isEnabled = function() {
    return state.enabled === true;
  }

  my.toggleState = function() {
    state.enabled = !state.enabled;
    localStorage['enabled'] = state.enabled;
    my.browser.setIcon(state.enabled);
  }

  return my;

})(App || {});

