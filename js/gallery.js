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

  var renderPics = function (data) {
    var photo = document.createDocumentFragment();
    var photoBox = document.querySelector('.pictures');
    var filters = document.querySelector('.img-filters');
    for (var i = 0; i < data.length; i++) {
      photo.appendChild(getPhoto(data[i]));
    }
    photoBox.appendChild(photo);
    filters.classList.remove('img-filters--inactive');
  };

  var successHandler = function (data) {
    window.gallery.photos = data.slice(0);
    renderPics(window.gallery.photos);
  };


  window.backend.loadData(successHandler, window.backend.errorHandler);

  window.gallery = {
    photos: [],
    renderPics: renderPics
  };

})();
