'use strict';

(function () {

  var getPhoto = function (data) {
    var template = document.querySelector('template').content.querySelector('.picture__link').cloneNode(true);
    template.querySelector('.picture__img').src = data.url;
    template.querySelector('.picture__stats').querySelector('.picture__stat--comments').textContent = data.comments.length;
    template.querySelector('.picture__stats').querySelector('.picture__stat--likes').textContent = data.likes;
    template.addEventListener('click', function () {
      window.picture.showBigPhoto(data);
      document.querySelector('body').classList.add('modal-open');
    });
    return template;
  };

  var successHandler = function (data) {
    var photoBox = document.querySelector('.pictures');
    for (var i = 0; i < data.length; i++) {
      var photo = document.createDocumentFragment();
      photo = getPhoto(data[i]);
      photoBox.appendChild(photo);
    }
  };

  window.backend.loadData(successHandler, window.backend.errorHandler);

})();
