'use strict';

(function () {

  var CLASS_PATH = 'effects__preview--';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var upload = document.querySelector('#upload-file');
  var closeUploadbutton = document.querySelector('.img-upload__cancel');
  var uploadImg = document.querySelector('.img-upload__preview');
  var scale = document.querySelector('.scale');
  var pin = document.querySelector('.scale__pin');
  var effects = document.querySelector('.effects__list');
  var level = document.querySelector('.scale__level');
  var imagesPreview = document.querySelector('.img-upload__preview').querySelector('img');

  var effectChangeHandler = function (evt) {
    if (evt.target.classList.contains('effects__radio')) {
      uploadImg.classList.remove('effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat', 'effects__preview--chrome');
      pin.style.left = '100%';
      level.style.width = '100%';
      uploadImg.style.filter = '';
      uploadImg.classList.add(CLASS_PATH + evt.target.value);
      if (evt.target.value === 'none') {
        scale.classList.add('hidden');
      } else {
        scale.classList.remove('hidden');
      }
    }
  };

  var showUpload = function () {
    var u = document.querySelector('.img-upload__overlay');
    window.picture.showItem(u);
    effects.addEventListener('click', effectChangeHandler);
  };

  upload.addEventListener('change', showUpload);

  var checkFileType = function (name) {
    return FILE_TYPES.some(function (item) {
      return name.endsWith(item);
    });
  };

  var loadImages = function (file) {
    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = checkFileType(fileName);
      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          imagesPreview.src = reader.result;
        });
        reader.readAsDataURL(file);
      }
    }
  };

  var imagesChangeHandler = function () {
    var files = upload.files;
    Array.prototype.forEach.call(files, (function (file) {
      loadImages(file);
    }));
    effects.addEventListener('click', effectChangeHandler);
  };

  upload.addEventListener('change', imagesChangeHandler);

  var removeUpload = function () {
    var u = document.querySelector('.img-upload__overlay');
    u.classList.add('hidden');
  };

  closeUploadbutton.addEventListener('click', removeUpload);

  var applyEffects = function (x) {
    var positionX = parseInt(x, 10);
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

  window.preview = {
    applyEffects: applyEffects,
    removeUpload: removeUpload
  };

})();
