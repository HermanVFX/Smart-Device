'use strict';
var footerMenuBtn = document.querySelector('.footer__menu-button');
var footerMenuBlock = document.querySelector('.footer__menu');
var footerContactBtn = document.querySelector('.footer__contact-button');
var footerContactBlock = document.querySelector('.footer__contact-list');
var callBtn = document.querySelector('.header__contact-button');
var callBlock = document.querySelector('.popup');
var callCloseBtn = document.querySelector('.popup__btn-close');
var callOverlay = document.querySelector('.popup-overlay');

var tel = document.querySelectorAll('.phone-input');

var popupSendBtn = document.getElementById('popup-send-button');
var popupPhone = document.getElementById('popup-tel');
var popupName = document.getElementById('popup-name');
var popupCheck = document.getElementById('popup-check');
var popupQuestion = document.getElementById('popup-question');

var mainSendBtn = document.getElementById('main-send-button');
var mainPhone = document.getElementById('main-tel');
var mainName = document.getElementById('main-name');
var mainCheck = document.getElementById('main-check');
var mainQuestion = document.getElementById('main-question');

var success = document.querySelector('.success');
var successOverlay = document.querySelector('.success-overlay');
var successBtn = document.querySelector('.success__close');
(function () {
  if (!footerContactBlock.classList.contains('accordeon-close')) {
    footerContactBtn.classList.add('footer__contact-button--close');
    footerContactBlock.classList.add('accordeon-close');
    footerContactBlock.classList.remove('accordeon-open');
  }
  if (!footerMenuBlock.classList.contains('accordeon-close')) {
    footerMenuBtn.classList.add('footer__menu-button--close');
    footerMenuBlock.classList.add('accordeon-close');
    footerMenuBlock.classList.remove('accordeon-open');
  }
  footerMenuBtn.addEventListener('click', function () {
    if (footerMenuBlock.classList.contains('accordeon-close')) {
      footerMenuBtn.classList.remove('footer__menu-button--close');
      footerMenuBlock.classList.remove('accordeon-close');
      footerMenuBlock.classList.add('accordeon-open');
    } else {
      footerMenuBtn.classList.add('footer__menu-button--close');
      footerMenuBlock.classList.add('accordeon-close');
      footerMenuBlock.classList.remove('accordeon-open');
    }
  });

  footerContactBtn.addEventListener('click', function () {
    if (footerContactBlock.classList.contains('accordeon-close')) {
      footerContactBtn.classList.remove('footer__contact-button--close');
      footerContactBlock.classList.remove('accordeon-close');
      footerContactBlock.classList.add('accordeon-open');
    } else {
      footerContactBtn.classList.add('footer__contact-button--close');
      footerContactBlock.classList.add('accordeon-close');
      footerContactBlock.classList.remove('accordeon-open');
    }
  });

  callBtn.addEventListener('click', function () {
    callBlock.classList.remove('popup--close');
  });
  callCloseBtn.addEventListener('click', function () {
    callBlock.classList.add('popup--close');
  });
  callOverlay.addEventListener('click', function () {
    callBlock.classList.add('popup--close');
  });
  successOverlay.addEventListener('click', function () {
    success.classList.add('success--close');
  });
  successBtn.addEventListener('click', function () {
    success.classList.add('success--close');
  });
  // Закрытие popup нажатием esc
  window.onkeydown = function (event) {
    if (event.keyCode === 27) {
      if (!callBlock.classList.contains('popup--close')) {
        callBlock.classList.add('popup--close');
      } if (!success.classList.contains('success--close')) {
        success.classList.add('success--close');
      }
    }
  };
  // Маска для поля телефона
  // https://javascript.ru/forum/dom-window/63870-kak-sdelat-masku-telefona-v-input-c-7-___-bez-jquery.html
  window.addEventListener('DOMContentLoaded', function () {
    function setCursorPosition(pos, elem) {
      elem.focus();
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    }
    function mask(event) {
      for (var index = 0; index < tel.length; index++) {
        var elem = tel[index];
        var matrix = '+7 (___) ___ ____';
        var i = 0;
        var def = matrix.replace(/\D/g, '');
        var val = elem.value.replace(/\D/g, '');
        if (def.length >= val.length) {
          val = def;
        }
        elem.value = matrix.replace(/./g, function (a) {
          if (/[_\d]/.test(a) && i < val.length) {
            return val.charAt(i++);
          } else if (i >= val.length) {
            return '';
          } else {
            return a;
          }
        });
        if (event.type === 'blur') {
          if (elem.value.length === 2) {
            elem.value = '';
          }
        } else {
          setCursorPosition(elem.value.length, elem);
        }
      }
    }
    popupPhone.addEventListener('input', mask, false);
    popupPhone.addEventListener('focus', mask, false);
    popupPhone.addEventListener('blur', mask, false);
    mainPhone.addEventListener('input', mask, false);
    mainPhone.addEventListener('focus', mask, false);
    mainPhone.addEventListener('blur', mask, false);
  });

  popupSendBtn.addEventListener('click', function () {
    if (popupPhone.checkValidity() === true && popupCheck.checked) {
      localStorage.setItem('name', popupName.value);
      localStorage.setItem('phone', popupPhone.value);
      localStorage.setItem('question', popupQuestion.value);
      callBlock.classList.add('popup--close');
      success.classList.remove('success--close');
    } else {
      popupName.style.outline = '1px solid #FE7865';
      popupPhone.style.outline = '1px solid #FE7865';
      popupCheck.style.outline = '1px solid #FE7865';
    }
  });

  mainSendBtn.addEventListener('click', function () {
    if (mainPhone.checkValidity() === true && mainCheck.checked) {
      localStorage.setItem('name', mainName.value);
      localStorage.setItem('phone', mainPhone.value);
      localStorage.setItem('question', mainQuestion.value);
      success.classList.remove('success--close');
    } else {
      mainName.style.outline = '1px solid #FE7865';
      mainPhone.style.outline = '1px solid #FE7865';
      mainCheck.style.outline = '1px solid #FE7865';
    }
  });
})();
