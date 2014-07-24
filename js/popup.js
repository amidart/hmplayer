;(function (window) {

  var popup = window.popup = window.popup || {};

  popup.data = {};

  popup.init = function() {
    popup.browser.init();
  };

  popup.show = function() {
    var videoObserver = popup.browser.getData();
    var result = popup.renderContent(videoObserver.dataType, videoObserver.data);
    document.body.innerHTML = result.content;
    // attach event listeners
    for (var i = result.eventHandlers.length - 1; i >= 0; i--) {
      var f = result.eventHandlers[i];
      if (typeof f === 'function') f();
    };
  };

  popup.renderContent = function(template, data) {
    var header = popup.templates.header();
    var body = '';
    var eventHandlers = [header.eventHandlers];
    if (template && popup.templates[template]) {
      body = popup.templates[template](data);
      eventHandlers.push(body.eventHandlers);
    }
    else {
      body = popup.templates.empty();
    }
    return {content: header.content + body.content, eventHandlers: eventHandlers};
  };

  // =================================== Templates 
  popup.templates = {};

  popup.templates.header = function() {
    var content = '<div class="header">Header</div>';
    var checked = popup.browser.isAppEnabled() ? 'checked="checked"' : '';
    content += '<label><input type="checkbox" class="enabled" ' + checked + '>Enabled</input></label>';
    var eventHandlers = function(){
      document.querySelector(".enabled").addEventListener('change', function(){
        popup.browser.toggleState();
      });
    }
    return {content: content, eventHandlers: eventHandlers};
  }

  popup.templates.empty = function() {
    return {content: '<p>Video has not been opened yet</p>'};
  }

  // =================================== singleLink template
  popup.templates.singleLink = function(data) {
    var content = '';
    var items = ['pageUrl', 'videoUrl', 'videoType', 'subsUrl'];
    for (var i = 0, len = items.length; i < len; i++) {
      var item = items[i];
      if (data[item]) {
        content += '<div>' + data[item] + '</div>';
      }
    }
    if (content) {
      content += '<div class="btn watch">Watch</div>'
    }

    var eventHandlers = function() {
      document.querySelector('.watch').addEventListener('click', function(){
        alert();
      });
    }
    return {content: content, eventHandlers: eventHandlers};
  }

  // =================================== multiLinks template
  popup.templates.multiLinks = function(data) {
    var content = '';
    return {content: content};
  }


})(window);


popup.init();