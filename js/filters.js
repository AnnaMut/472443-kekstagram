'use strict';
(function () {

  var popular = document.querySelector('#filter-popular');
  var discusssed = document.querySelector('#filter-discussed');
  var random = document.querySelector('#filter-new');

  var removePhoto = function () {
    var photoBox = document.querySelector('.pictures');
    var photo = photoBox.querySelectorAll('.picture__link');
    photo.forEach(function (item) {
      photoBox.removeChild(item);
    });
  };

  var removeActiveFilter = function () {
    var filters = document.querySelector('.img-filters');
    var filterEl = filters.querySelectorAll('.img-filters__button');
    filterEl.forEach(function (el) {
      if (el.classList.contains('img-filters__button--active')) {
        el.classList.remove('img-filters__button--active');
      }
    });
  };

  var sortPopular = function (arr) {
    return arr.slice().sort(function (a, b) {
      return b.likes - a.likes;
    });
  };

  var sortDiscussed = function (arr) {
    return arr.slice().sort(function (a, b) {
      return b.comments - a.comments;
    });
  };

  var randomSort = function () {
    return Math.random() - 0.5;
  };

  var sortRandom = function (arr) {
    return arr.slice(0).sort(randomSort);
  };


  var popularChangeHandler = function (evt) {
    removePhoto();
    removeActiveFilter();
    var photos = window.gallery.photos.slice(0);
    window.debounce.setDebounce(window.gallery.renderPics(sortPopular(photos)));
    evt.target.classList.add('img-filters__button--active');
  };

  var discussedChangeHandler = function (evt) {
    removePhoto();
    removeActiveFilter();
    var photos = window.gallery.photos.slice(0);
    window.debounce.setDebounce(window.gallery.renderPics(sortDiscussed(photos)));
    evt.target.classList.add('img-filters__button--active');
  };

  var randomChangeHandler = function (evt) {
    removePhoto();
    removeActiveFilter();
    var photos = window.gallery.photos.slice(0);
    window.debounce.setDebounce(window.gallery.renderPics(sortRandom(photos)));
    evt.target.classList.add('img-filters__button--active');
  };

  popular.addEventListener('click', popularChangeHandler);
  discusssed.addEventListener('click', discussedChangeHandler);
  random.addEventListener('click', randomChangeHandler);

})();

