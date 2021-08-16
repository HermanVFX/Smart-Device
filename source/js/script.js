'use strict';
var footerMenuBtn = document.querySelector('.footer__menu-button');
var footerMenuBlock = document.querySelector('.footer__menu');
var footerContactBtn = document.querySelector('.footer__contact-button');
var footerContactBlock = document.querySelector('.footer__contact-list');
var callBtn = document.querySelector('.header__contact-button');
var callBlock = document.querySelector('.popup');
var callCloseBtn = document.querySelector('.popup__btn-close');
var callOverlay = document.querySelector('.popup-overlay');
(function () {
  if (!footerContactBlock.classList.contains('accordeon-close')) {
    footerContactBtn.classList.add('footer__contact-button--close');
    footerContactBlock.classList.add('accordeon-close');
    footerContactBlock.classList.remove('accordeon-open');
  };
  if (!footerMenuBlock.classList.contains('accordeon-close')) {
    footerMenuBtn.classList.add('footer__menu-button--close');
    footerMenuBlock.classList.add('accordeon-close');
    footerMenuBlock.classList.remove('accordeon-open');
  };
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

  window.onkeydown = function( event ) {
    if ( event.keyCode === 27 ) {
      if (openPaopup === true) {
        callBlock.classList.add('popup--close');
      }
    }
  };
})();

