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

var uploadImg = document.querySelector('.img-upload__preview');
var chrome = document.querySelector('#effect-chrome');
var none = document.querySelector('#effect-none');
var sepia = document.querySelector('#effect-sepia');
var marvin = document.querySelector('#effect-marvin');
var phobos = document.querySelector('#effect-phobos');
var heat = document.querySelector('#effect-heat');

var range = document.querySelector('.scale__value');
var level = document.querySelector('.scale__level');
var resize = document.querySelector('.resize__control--value');
var resizeMinus = document.querySelector('.resize__control--minus');
var resizePlus = document.querySelector('.resize__control--plus');

var scaleChangeHandler = function () {
  if (resize.value === '25%') {
    uploadImg.style.transform = 'scale(0.25)';
  }
  if (resize.value === '50%') {
    uploadImg.style.transform = 'scale(0.50)';
  }
  if (resize.value === '75%') {
    uploadImg.style.transform = 'scale(0.75)';
  }
  if (resize.value === '100%') {
    uploadImg.style.transform = '';
  }
};

var resizePlusHandler = function () {
  resize.value = parseInt(resize.value, 10) + 25 + '%';
  scaleChangeHandler();
};

var resizeMinusHandler = function () {
  resize.value = parseInt(resize.value, 10) - 25 + '%';
  scaleChangeHandler();
};

// resizePlus.addEventListener('click', scaleChangeHandler);
// resizeMinus.addEventListener('click', scaleChangeHandler);

resizePlus.addEventListener('click', resizePlusHandler);
resizeMinus.addEventListener('click', resizeMinusHandler);

var getEffects = function (x) {
  var positionX = parseInt(x, 10);
  range.value = positionX;
  // level.width = positionX + '%';
  var filtervalue;
  if (uploadImg.classList.contains('effects__preview--chrome')) {
    filtervalue = positionX / 100;
    uploadImg.style.webkitFilter = 'grayscale(' + filtervalue + ')';
  }
  if (uploadImg.classList.contains('effects__preview--sepia')) {
    filtervalue = positionX / 100;
    uploadImg.style.webkitFilter = 'sepia(' + filtervalue + ')';
  }
  if (uploadImg.classList.contains('effects__preview--marvin')) {
    filtervalue = positionX;
    uploadImg.style.webkitFilter = 'invert(' + filtervalue + '%' + ')';
  }
  if (uploadImg.classList.contains('effects__preview--phobos')) {
    filtervalue = positionX * 3 / 100;
    uploadImg.style.webkitFilter = 'blur(' + filtervalue + 'px' + ')';
  }
  if (uploadImg.classList.contains('effects__preview--heat')) {
    filtervalue = positionX * 3 / 100;
    uploadImg.style.webkitFilter = 'brightness(' + filtervalue + ')';
  }
};
// var effects = document.querySelector('.effects__list');
// effects.addEventListener('input', getEffects);

var getChromEffect = function () {
  uploadImg.classList.remove('effects__preview--sepia');
  uploadImg.classList.remove('effects__preview--marvin');
  uploadImg.classList.remove('effects__preview--phobos');
  uploadImg.classList.remove('effects__preview--heat');
  uploadImg.classList.toggle('effects__preview--chrome');
};
chrome.addEventListener('click', getChromEffect);
chrome.addEventListener('click', getEffects);

var getNoneEffect = function () {
  uploadImg.classList.remove('effects__preview--chrome');
  uploadImg.classList.remove('effects__preview--sepia');
  uploadImg.classList.remove('effects__preview--marvin');
  uploadImg.classList.remove('effects__preview--phobos');
  uploadImg.classList.remove('effects__preview--heat');
  // u.style.webkitFilter = '';
};
none.addEventListener('click', getNoneEffect);
none.addEventListener('click', getEffects);

var getSepiaEffect = function () {
  uploadImg.classList.remove('effects__preview--chrome');
  uploadImg.classList.remove('effects__preview--marvin');
  uploadImg.classList.remove('effects__preview--phobos');
  uploadImg.classList.remove('effects__preview--heat');
  uploadImg.classList.toggle('effects__preview--sepia');
};
sepia.addEventListener('click', getSepiaEffect);
sepia.addEventListener('click', getEffects);

var getMarvinEffect = function () {
  uploadImg.classList.remove('effects__preview--chrome');
  uploadImg.classList.remove('effects__preview--sepia');
  uploadImg.classList.remove('effects__preview--phobos');
  uploadImg.classList.remove('effects__preview--heat');
  uploadImg.classList.toggle('effects__preview--marvin');
};
marvin.addEventListener('click', getMarvinEffect);
marvin.addEventListener('click', getEffects);

var getPhobosEffect = function () {
  uploadImg.classList.remove('effects__preview--chrome');
  uploadImg.classList.remove('effects__preview--sepia');
  uploadImg.classList.remove('effects__preview--marvin');
  uploadImg.classList.remove('effects__preview--heat');
  uploadImg.classList.toggle('effects__preview--phobos');
};
phobos.addEventListener('click', getPhobosEffect);
phobos.addEventListener('click', getEffects);

var getHeatEffect = function () {
  uploadImg.classList.remove('effects__preview--chrome');
  uploadImg.classList.remove('effects__preview--sepia');
  uploadImg.classList.remove('effects__preview--marvin');
  uploadImg.classList.remove('effects__preview--phobos');
  uploadImg.classList.toggle('effects__preview--heat');
  getEffects();
};
heat.addEventListener('click', getHeatEffect);
heat.addEventListener('click', getEffects);

var pin = document.querySelector('.scale__pin');

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
  pin.style.left = Math.round(pinPositionX / 4.5) + '%';
  level.width = pin.style.left;
  getEffects(pin.style.left);
};

var onMouseUp = function () {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
};

slider.addEventListener('mousedown', pinMouseDownHandler);


