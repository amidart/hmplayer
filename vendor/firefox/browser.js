var App = (function (my) {

  require("sdk/preferences/service").set("javascript.options.strict", false);
  var tabsLib = require("sdk/tabs/helpers.js"),
      __temp = require('chrome'),
      Cc = __temp.Cc,
      Ci = __temp.Ci,
      pageMod = require("sdk/page-mod"),
      self = require("sdk/self"),
      { ToggleButton } = require('sdk/ui/button/toggle');
      tabs = require("sdk/tabs");

  // ========================================= UI

  var uiIcon = ToggleButton({
    id: "icon",
    label: "Hamatata Player",
    icon: {
      "16": self.data.url("img/19_white.png"),
    },
    onChange: function(state) {
      if (state.checked) uiPopup.show({position: uiIcon});
    }
  });

  function handleHide() {
    uiIcon.state('window', {checked: false});
  }

  var uiPopup = require("sdk/panel").Panel({
    contentURL: self.data.url("html/popup.html"),
    onHide: function(){
      uiIcon.state('window', {checked: false});
    },
    width: 415,
    height: 330
  });

  // ========================================= App API
  my.browser = {
    name: 'Firefox',

    getExtensionVersion: function() {
      return self.version;
    },

    setIcon: function(on) {
      var icon = 'img/19_gray.png';
      if (on) icon = 'img/19_white.png';
      uiIcon.contentURL = self.data.url(icon);
    }

  };

  return my;

})(App || {});
