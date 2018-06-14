'use strict';

(function () {

  var PIN_SIZE = 18;
  var RESIZE_STEP = 25;
  var RESIZE_MAX_VALUE = 100;
  var upload = document.querySelector('#upload-file');
  var closeUploadbutton = document.querySelector('.img-upload__cancel');
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

  var pin = document.querySelector('.scale__pin');
  var slider = document.querySelector('.img-upload__scale');
  var startCoordX;
  var line = document.querySelector('.scale__line');

  var showUpload = function () {
    var u = document.querySelector('.img-upload__overlay');
    window.picture.showItem(u);
  };

  upload.addEventListener('change', showUpload);

  var removeUpload = function () {
    var u = document.querySelector('.img-upload__overlay');
    u.classList.add('hidden');
  };

  closeUploadbutton.addEventListener('click', removeUpload);

  var resizePlusHandler = function () {
    if (parseInt(resize.value, 10) < RESIZE_MAX_VALUE) {
      resize.value = parseInt(resize.value, 10) + RESIZE_STEP + '%';
      uploadImg.style.transform = 'scale(0.' + parseInt(resize.value, 10) + ')';
    } else if (parseInt(resize.value, 10) === RESIZE_MAX_VALUE) {
      uploadImg.style.transform = 'none';
    }
  };

  var resizeMinusHandler = function () {
    if (parseInt(resize.value, 10) > RESIZE_STEP) {
      resize.value = parseInt(resize.value, 10) - RESIZE_STEP + '%';
      uploadImg.style.transform = 'scale(0.' + parseInt(resize.value, 10) + ')';
    }
  };

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
    getEffects();
  };
  chrome.addEventListener('click', getChromEffect);
  chrome.addEventListener('click', getEffects);

  var getNoneEffect = function () {
    uploadImg.classList.remove('effects__preview--chrome');
    uploadImg.classList.remove('effects__preview--sepia');
    uploadImg.classList.remove('effects__preview--marvin');
    uploadImg.classList.remove('effects__preview--phobos');
    uploadImg.classList.remove('effects__preview--heat');
    getEffects();
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
    getEffects();
  };
  sepia.addEventListener('click', getSepiaEffect);
  sepia.addEventListener('click', getEffects);

  var getMarvinEffect = function () {
    uploadImg.classList.remove('effects__preview--chrome');
    uploadImg.classList.remove('effects__preview--sepia');
    uploadImg.classList.remove('effects__preview--phobos');
    uploadImg.classList.remove('effects__preview--heat');
    uploadImg.classList.toggle('effects__preview--marvin');
    getEffects();
  };
  marvin.addEventListener('click', getMarvinEffect);
  marvin.addEventListener('click', getEffects);

  var getPhobosEffect = function () {
    uploadImg.classList.remove('effects__preview--chrome');
    uploadImg.classList.remove('effects__preview--sepia');
    uploadImg.classList.remove('effects__preview--marvin');
    uploadImg.classList.remove('effects__preview--heat');
    uploadImg.classList.toggle('effects__preview--phobos');
    getEffects();
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

    getEffects(pin.style.left);
    level.width = pinPositionX + '%';
  };

  var onMouseUp = function () {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  slider.addEventListener('mousedown', pinMouseDownHandler);

})();
