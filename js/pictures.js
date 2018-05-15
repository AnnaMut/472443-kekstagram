'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIBTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var LIKES = {
  MIN: 15,
  MAX: 200
};

var getRandomPoint = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (arr) {
  var randomindex = Math.floor(Math.random() * arr.length);
  return arr[randomindex];
};

var showItem = function (item) {
  return item.classList.remove('hidden');
};

var hideItem = function (item) {
  return item.classList.add('visually-hidden');
};

var getPhotos = function () {
  var photos = [];
  for (var i = 0; i < 25; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomPoint(LIKES.MIN, LIKES.MAX),
      comments: getRandomElement(COMMENTS),
      description: getRandomElement(DESCRIBTIONS),
    };
  }
  return photos;
};

var photos = getPhotos();

var getPhoto = function (data) {
  var template = document.querySelector('template').content.querySelector('.picture__link').cloneNode(true);
  template.querySelector('.picture__img').src = data.url;
  template.querySelector('.picture__stats').querySelector('.picture__stat--comments').textContent = data.comments.length;
  template.querySelector('.picture__stats').querySelector('.picture__stat--likes').textContent = data.likes;
  return template;
};

var renderPhotos = function (data) {
  var photoBox = document.querySelector('.pictures');
  for (var i = 0; i < data.length; i++) {
    var photo = document.createDocumentFragment();
    photo = getPhoto(data[i]);
    photoBox.appendChild(photo);
  }
};

renderPhotos(photos);

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
  var commentsBox = document.querySelector('.social__comments');
  showItem(bigPic);
  bigPic.querySelector('.big-picture__img').querySelector('img').src = data.url;
  bigPic.querySelector('.likes-count').textContent = data.likes;
  bigPic.querySelector('.comments-count').textContent = data.comments.length;
  hideItem(bigPic.querySelector('.social__comment-count'));
  hideItem(bigPic.querySelector('.social__comment-loadmore'));
  commentsBox.appendChild(createComments());
};

showBigPhoto(photos[1]);
