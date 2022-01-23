"use strict";

var cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', function (e) {
  cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;");
});
document.addEventListener('click', function () {
  cursor.classList.add("expand");
  setTimeout(function () {
    cursor.classList.remove("expand");
  }, 500);
});

var debounce = function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = this;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

var target = document.querySelectorAll('[data-anime]');
var animationClass = 'animate';

function animeScroll() {
  var windowTop = window.pageYOffset + window.innerHeight * 3 / 4;
  target.forEach(function (element) {
    if (windowTop > element.offsetTop) {
      element.classList.add(animationClass);
    } else {
      element.classList.remove(animationClass);
    }
  });
}

animeScroll();

if (target.length) {
  window.addEventListener('scroll', debounce(function () {
    animeScroll();
  }, 200));
}