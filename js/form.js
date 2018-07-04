'use strict';

(function () {

  var form = document.querySelector('.img-upload__form');

  var hashTags = form.querySelector('.text__hashtags');
  var invalidBorder = 'border-color: #ff4d4d';
  var submit = form.querySelector('#upload-submit');

  var HashTags = {
    MAX_LENGTH: 20,
    MAX_COUNT: 5
  };

  var showInvalidHashTags = function (message) {
    hashTags.setCustomValidity(message);
    hashTags.setAttribute('style', invalidBorder);
  };

  var hashTagsInvalidHandler = function () {
    var tags = hashTags.value.trim().toLowerCase().split(' ');

    if (hashTags.value.toLowerCase().trim() === '') {
      return;
    }

    if (tags.length > HashTags.MAX_COUNT) {
      showInvalidHashTags('Нельзя указать больше' + HashTags.MAX_COUNT + 'хэш-тегов ');
      return;
    }

    var isTagWithoutHash = tags.some(function (item) {
      return item[0] !== '#';
    });

    if (isTagWithoutHash) {
      showInvalidHashTags('Хэш-тег должен начинается с символа #');
      return;
    }

    var isTagContainOnlyHash = tags.some(function (item) {
      return item === '#';
    });

    if (isTagContainOnlyHash) {
      showInvalidHashTags('Хеш-тег не может состоять только из #');
      return;
    }

    var isTagVeryLong = tags.some(function (item) {
      return item.length > HashTags.MAX_LENGTH;
    });

    if (isTagVeryLong) {
      showInvalidHashTags('Максимальная длина одного хэш-тега 20 символов, включая #');
      return;
    }

    var checkIfArrayIsUnique = function (arr) {
      var myArray = arr.sort();
      for (var i = 0; i < myArray.length; i++) {
        if (myArray.indexOf(myArray[i]) !== myArray.lastIndexOf(myArray[i])) {
          return true;
        }
      }
      return false;
    };

    if (checkIfArrayIsUnique(tags)) {
      showInvalidHashTags('Нельзя дублировать хэш-тег');
      return;
    }

    hashTags.setCustomValidity('');
    hashTags.removeAttribute('style');
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();
    window.backend.sendData(new FormData(form), successHandler, window.backend.errorHandler);
  };

  var successHandler = function () {
    window.preview.removeUpload();
  };

  hashTags.addEventListener('input', hashTagsInvalidHandler);
  submit.addEventListener('click', hashTagsInvalidHandler);
  form.addEventListener('submit', formSubmitHandler);


})();

