;(function (window) {

  var popup = window.popup = window.popup || {};

  popup.data = {};

  popup.show = function() {
    document.body.innerHTML = popup.renderContent();
  };

  popup.renderContent = function() {
    return 'Popup Content';
  };


})(window);

popup.init();