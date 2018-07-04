'use strict';

(function () {

  var PIN_SIZE = 18;
  var startCoordX;
  var pin = document.querySelector('.scale__pin');
  var slider = document.querySelector('.img-upload__scale');
  var line = document.querySelector('.scale__line');
  var level = document.querySelector('.scale__level');

  var pinMouseMoveHandler = function (moveEvt) {
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

    window.preview.applyEffects(pin.style.left);
    level.style.width = pinPositionX + 'px';
  };

  var mouseUpHandler = function () {
    document.removeEventListener('mousemove', pinMouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  var pinMouseDownHandler = function (downEvt) {
    downEvt.preventDefault();
    startCoordX = downEvt.clientX;
    document.addEventListener('mousemove', pinMouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  slider.addEventListener('mousedown', pinMouseDownHandler);


})();

