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

var closeBigPhoto = function () {
  var bigPic = document.querySelector('.big-picture');
  return bigPic.classList.add('hidden');
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
  template.addEventListener('click', function () {
    showBigPhoto(data);
  });
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

var showUpload = function () {
  var u = document.querySelector('.img-upload__overlay');
  showItem(u);
};

var upload = document.querySelector('#upload-file');
upload.addEventListener('change', showUpload);
var closeUploadbutton = document.querySelector('.img-upload__cancel');

var removeUpload = function () {
  var u = document.querySelector('.img-upload__overlay');
  u.classList.add('hidden');
};

closeUploadbutton.addEventListener('click', removeUpload);

var showEffects = function () {
  var chromeEf = document.querySelector('#effect-chrome');
  if (chromeEf.checked) {
    // var ue = u.querySelector('img');
    u.style.webkitFilter = 'grayscale(1)';
  }
};

var u = document.querySelector('.img-upload__preview');
var chrome = document.querySelector('#effect-chrome');
var none = document.querySelector('#effect-none');
var sepia = document.querySelector('#effect-sepia');
var marvin = document.querySelector('#effect-marvin');
var phobos = document.querySelector('#effect-phobos');
var heat = document.querySelector('#effect-heat');

var rng = document.querySelector('.scale__value');
// var fun1 = function () {
// rng - это Input
// var div=document.getElementById('test'); // div - блок test
// div.style.width=rng.value+'px';
// u.style.webkitFilter = rng.value;
// };

var getEffects = function (x) {
  var positionX = parseInt(x, 10);
  // var positionY = parseInt(y, 10);
  rng.value = positionX;
};

// rng.addEventListener('input', fun1);
var getChromEffect = function () {
  // u.style.webkitFilter = 'grayscale(1)';
  u.classList.remove('effects__preview--sepia');
  u.classList.remove('effects__preview--marvin');
  u.classList.remove('effects__preview--phobos');
  u.classList.remove('effects__preview--heat');
  u.classList.toggle('effects__preview--chrome');
};
chrome.addEventListener('click', getChromEffect);

var getNoneEffect = function () {
  u.classList.remove('effects__preview--chrome');
  u.classList.remove('effects__preview--sepia');
  u.classList.remove('effects__preview--marvin');
  u.classList.remove('effects__preview--phobos');
  u.classList.remove('effects__preview--heat');
  // u.style.webkitFilter = '';
};
none.addEventListener('click', getNoneEffect);

var getSepiaEffect = function () {
  // u.style.webkitFilter = 'sepia(1)';
  u.classList.remove('effects__preview--chrome');
  u.classList.remove('effects__preview--marvin');
  u.classList.remove('effects__preview--phobos');
  u.classList.remove('effects__preview--heat');
  u.classList.toggle('effects__preview--sepia');
};
sepia.addEventListener('click', getSepiaEffect);

var getMarvinEffect = function () {
  // u.style.webkitFilter = 'invert(100%)';
  u.classList.remove('effects__preview--chrome');
  u.classList.remove('effects__preview--sepia');
  u.classList.remove('effects__preview--phobos');
  u.classList.remove('effects__preview--heat');
  u.classList.toggle('effects__preview--marvin');
};
marvin.addEventListener('click', getMarvinEffect);

var getPhobosEffect = function () {
  // u.style.webkitFilter = 'blur(5px)';
  u.classList.remove('effects__preview--chrome');
  u.classList.remove('effects__preview--sepia');
  u.classList.remove('effects__preview--marvin');
  u.classList.remove('effects__preview--heat');
  u.classList.toggle('effects__preview--phobos');
};
phobos.addEventListener('click', getPhobosEffect);

var getHeatEffect = function () {
  // u.style.webkitFilter = 'brightness(3)';
  u.classList.remove('effects__preview--chrome');
  u.classList.remove('effects__preview--sepia');
  u.classList.remove('effects__preview--marvin');
  u.classList.remove('effects__preview--phobos');
  u.classList.toggle('effects__preview--heat');
};
heat.addEventListener('click', getHeatEffect);

var pin = document.querySelector('.scale__pin');
pin.addEventListener('mouseup', showEffects);
var slider = document.querySelector('.img-upload__scale');
var startCoordX;
var line = document.querySelector('.scale__line');
var PIN_SIZE = 18;

var pinMouseDownHandler = function (downEvt) {
  downEvt.preventDefault();
  startCoordX = downEvt.clientX;
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

var onMouseMove = function (moveEvt) {
  moveEvt.preventDefault();
  var shift = startCoordX - moveEvt.clientX;

  startCoordX = moveEvt.clientX;
  var pinPositionX = pin.offsetLeft - shift;

  if (pinPositionX < 0) {
    pinPositionX = 0;
  }
  var rightPosition = line.offsetWidth - pin.offsetWidth;
  if (pinPositionX > rightPosition) {
    pinPositionX = rightPosition + PIN_SIZE;
  }
  pin.style.left = pinPositionX + 'px';
  getEffects(pinPositionX);
};

var onMouseUp = function () {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
};

slider.addEventListener('mousedown', pinMouseDownHandler);


