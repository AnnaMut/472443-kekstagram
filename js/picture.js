'use strict';

(function () {

  var showItem = function (item) {
    return item.classList.remove('hidden');
  };

  var hideItem = function (item) {
    return item.classList.add('visually-hidden');
  };

  var closeBigPhoto = function () {
    var bigPic = document.querySelector('.big-picture');
    document.querySelector('body').classList.remove('modal-open');
    return bigPic.classList.add('hidden');
  };

  var getRandomPoint = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var createComments = function () {
    var comment = document.createElement('li');
    comment.classList.add('social__comment');
    comment.classList.add('social__comment--text');
    var img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = 'img/avatar-' + getRandomPoint(1, 6) + '.svg';
    img.alt = 'Аватар комментатора фотографии';
    img.width = 35;
    img.height = 35;
    comment.appendChild(img);
    return comment;
  };

  var showBigPhoto = function (data) {
    var bigPic = document.querySelector('.big-picture');
    var commentsBox = bigPic.querySelector('.social__comments');
    var closeButton = bigPic.querySelector('#picture-cancel');
    showItem(bigPic);
    bigPic.querySelector('.big-picture__img').querySelector('img').src = data.url;
    bigPic.querySelector('.likes-count').textContent = data.likes;
    bigPic.querySelector('.comments-count').textContent = data.comments.length;
    hideItem(bigPic.querySelector('.social__comment-count'));
    hideItem(bigPic.querySelector('.social__comment-loadmore'));
    closeButton.addEventListener('click', closeBigPhoto);
    commentsBox.appendChild(createComments());
  };

  window.picture = {
    showBigPhoto: showBigPhoto,
    showItem: showItem
  };

})();
