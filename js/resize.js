'use strict';

(function () {

  var RESIZE_STEP = 25;
  var RESIZE_MAX_VALUE = 100;
  var uploadImg = document.querySelector('.img-upload__preview');
  var resize = document.querySelector('.resize__control--value');
  var resizeMinus = document.querySelector('.resize__control--minus');
  var resizePlus = document.querySelector('.resize__control--plus');

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

})();
