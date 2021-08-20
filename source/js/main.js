'use strict';
(function () {
  var body = document.querySelector('.page-body');

  var footerMenuBtn = document.querySelector('.footer__menu-button');
  var footerMenuBlock = document.querySelector('.footer__menu');
  var footerContactBtn = document.querySelector('.footer__contact-button');
  var footerContactBlock = document.querySelector('.footer__contact-list');

  var callBtn = document.querySelector('.header__contact-button');
  var callBlock = document.querySelector('.popup');
  var callCloseBtn = document.querySelector('.popup__btn-close');
  var callOverlay = document.querySelector('.popup-overlay');

  var tel = document.querySelectorAll('.phone-input');

  var popupForm = document.getElementById('popup-form');
  var popupSendBtn = document.getElementById('popup-send-button');
  var popupPhone = document.getElementById('popup-tel');
  var popupName = document.getElementById('popup-name');
  var popupCheck = document.getElementById('popup-check');
  var popupQuestion = document.getElementById('popup-question');

  var mainForm = document.getElementById('main-form');
  var mainSendBtn = document.getElementById('main-send-button');
  var mainPhone = document.getElementById('main-tel');
  var mainName = document.getElementById('main-name');
  var mainCheck = document.getElementById('main-check');
  var mainQuestion = document.getElementById('main-question');

  var success = document.querySelector('.success');
  var successOverlay = document.querySelector('.success-overlay');
  var successBtn = document.querySelector('.success__close');
  // Открыть попап
  function openPopup() {
    if (callBlock && body && popupName) {
      callBlock.classList.remove('popup--close');
      body.classList.add('overlay');
      // Поставил задержку на focus из за бага (Срабатывало через раз)
      setTimeout(function () {
        if (!callBlock.classList.contains('popup--close')) {
          popupName.focus();
        }
      }, 250);
      trapFocus(callBlock);
    }
  }
  // Закрыть попап
  function closePopup() {
    if (callBlock && body && callBtn) {
      callBlock.classList.add('popup--close');
      body.classList.remove('overlay');
      setTimeout(function () {
        if (callBlock.classList.contains('popup--close')) {
          callBtn.focus();
        }
      }, 500);
    }
  }
  // Окно подтверждения
  function openSuccess() {
    if (callBlock && success && successBtn) {
      if (!callBlock.classList.contains('popup--close')) {
        closePopup();
      }
      success.classList.remove('success--close');
      setTimeout(function () {
        successBtn.focus();
      }, 500);
      trapFocus(success);
    }
  }

  function closeSuccess() {
    if (success && popupForm && mainForm) {
      success.classList.add('success--close');
      mainForm.reset();
      popupForm.reset();
    }
  }

  // Открыть меню
  function closeAccordeon(elemBtn, elemBlock) {
    elemBtn.classList.add('accordeon-btn-close');
    elemBlock.classList.add('accordeon-close');
    elemBlock.classList.remove('accordeon-open');
  }
  // Закрыть меню
  function openAccordeon(elemBtn, elemBlock) {
    elemBtn.classList.remove('accordeon-btn-close');
    elemBlock.classList.remove('accordeon-close');
    elemBlock.classList.add('accordeon-open');
  }
  // Ошибка
  function error(elem) {
    elem.classList.add('error');
  }

  function clearError() {
    var errorElements = document.querySelectorAll('.error');
    if (errorElements) {
      for (var index = 0; index < errorElements.length; index++) {
        errorElements[index].classList.remove('error');
      }
    }
  }

  // Аккордеон
  if (
    footerMenuBtn &&
    footerMenuBlock &&
    footerContactBtn &&
    footerContactBlock
  ) {
    // В случае загрузки js закроет один из пунктов
    if (!footerMenuBlock.classList.contains('accordeon-close')) {
      closeAccordeon(footerMenuBtn, footerMenuBlock);
    }

    footerMenuBtn.addEventListener('click', function () {
      if (footerMenuBlock.classList.contains('accordeon-close')) {
        openAccordeon(footerMenuBtn, footerMenuBlock);
        if (!footerContactBlock.classList.contains('accordeon-close')) {
          closeAccordeon(footerContactBtn, footerContactBlock);
        }
      } else {
        closeAccordeon(footerMenuBtn, footerMenuBlock);
      }
    });

    footerContactBtn.addEventListener('click', function () {
      if (footerContactBlock.classList.contains('accordeon-close')) {
        openAccordeon(footerContactBtn, footerContactBlock);
        if (!footerMenuBlock.classList.contains('accordeon-close')) {
          closeAccordeon(footerMenuBtn, footerMenuBlock);
        }
      } else {
        closeAccordeon(footerContactBtn, footerContactBlock);
      }
    });
  }
  // Попап с формой
  if (
    callBlock &&
    callBtn &&
    callCloseBtn &&
    callOverlay &&
    successOverlay &&
    successBtn &&
    popupName &&
    success
  ) {
    callBtn.addEventListener('click', function () {
      openPopup();
    });
    callCloseBtn.addEventListener('click', function () {
      closePopup();
      clearError();
    });
    callOverlay.addEventListener('click', function () {
      closePopup();
      clearError();
    });
    successOverlay.addEventListener('click', function () {
      closeSuccess();
    });
    successBtn.addEventListener('click', function () {
      closeSuccess();
    });
    // Закрытие popup нажатием esc
    window.onkeydown = function (event) {
      if (event.keyCode === 27) {
        if (!callBlock.classList.contains('popup--close')) {
          closePopup();
        }
        if (!success.classList.contains('success--close')) {
          closeSuccess();
        }
      }
    };
  }
  // Отправка формы (popup)
  if (
    popupForm &&
    popupSendBtn &&
    popupPhone &&
    popupName &&
    popupQuestion &&
    popupCheck
  ) {
    popupSendBtn.addEventListener('click', function () {
      if (
        popupForm.checkValidity() === true &&
        popupCheck.checked &&
        popupPhone.value.length === 17
      ) {
        localStorage.setItem('name', popupName.value);
        localStorage.setItem('phone', popupPhone.value);
        localStorage.setItem('question', popupQuestion.value);
        closePopup();
        setTimeout(function () {
          openSuccess();
        }, 250);
      } else {
        error(popupName);
        error(popupPhone);
        error(popupCheck);
        setTimeout(function () {
          clearError();
        }, 5000);
      }
    });
  }
  // Отправка формы
  if (
    mainForm &&
    mainSendBtn &&
    mainPhone &&
    mainName &&
    mainQuestion &&
    mainCheck
  ) {
    mainSendBtn.addEventListener('click', function () {
      if (
        mainForm.checkValidity() === true &&
        mainCheck.checked &&
        mainPhone.value.length === 17
      ) {
        localStorage.setItem('name', mainName.value);
        localStorage.setItem('phone', mainPhone.value);
        localStorage.setItem('question', mainQuestion.value);
        setTimeout(function () {
          openSuccess();
        }, 250);
      } else {
        error(mainName);
        error(mainPhone);
        error(mainCheck);
        setTimeout(function () {
          clearError();
        }, 5000);
      }
    });
  }
  // Маска для поля телефона
  // https://javascript.ru/forum/dom-window/63870-kak-sdelat-masku-telefona-v-input-c-7-___-bez-jquery.html
  if (popupPhone && mainPhone) {
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
  }
  // Ловушка Tabindex
  function trapFocus(element) {
    var focusableEls = element.querySelectorAll('input, textarea, button');
    var firstFocusableEl = focusableEls[0];
    var lastFocusableEl = focusableEls[focusableEls.length - 1];
    var KEYCODE_TAB = 9;

    firstFocusableEl.focus();

    document.addEventListener('keydown', function (e) {
      var isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    });
  }
})();
