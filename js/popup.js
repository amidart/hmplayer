;(function (window) {

  var popup = window.popup = window.popup || {};

  popup.data = {};

  popup.init = function() {
    popup.browser.init();
  };

  popup.show = function() {
    var results = popup.browser.getData();
    document.body.innerHTML = popup.renderContent(results.dataType, results.data);
  };

  popup.renderContent = function(template, data) {
    var header = popup.templates.header();
    var body = '';
    if (template && popup.templates[template]) {
      body = popup.templates[template](data);
    }
    else {
      body = popup.templates.empty();
    }
    return header + body;
  };

  // =================================== Templates 
  popup.templates = {};

  popup.templates.header = function() {
    return '<div class="header">Header</div>';
  }

  popup.templates.empty = function() {
    return '<p>Video has not been opened yet</p>';
  }

  popup.templates.singleLink = function(data) {
    var res = '';
    var items = ['pageUrl', 'videoUrl', 'videoType', 'subsUrl'];
    for (var i = 0, len = items.length; i < len; i++) {
      var item = items[i];
      if (data[item]) {
        res += '<div>' + data[item] + '</div>';
      }
    }
    if (res) {
      res += '<div class="btn watch">Watch</div>'
    }
    return res;
  }

  popup.templates.multiLinks = function(data) {
    var res = '';
    return res;
  }


})(window);


popup.init();