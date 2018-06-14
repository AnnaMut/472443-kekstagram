'use strict';

(function () {

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

  window.data = {
    getPhotos: getPhotos,
    getRandomPoint: getRandomPoint
  };


})();
