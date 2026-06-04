"use strict";

/*-------------------------------------------------------------------------------------------
------------------------------------ОПРЕДЕЛЕНИЕ ВИДА УСТРОЙСТВА---------------------------------------------
-------------------------------------------------------------------------------------------*/

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

/*-------------------------------------------------------------------------------------------
---------------------------------ВЛОЖЕННЫЕ СПИСКИ В ШАПКЕ И ДОБАВЛЕНИЕ КЛАССА BODY---------------------------------------------
-------------------------------------------------------------------------------------------*/

let menuArrows = document.querySelectorAll(".menu-header-bottom__arrow");
if (isMobile.any()) {
  document.body.classList.add("_touch");

  if (menuArrows.length > 0) {
    for (let index = 0; index < menuArrows.length; index++) {
      const menuArrow = menuArrows[index];
      menuArrow.addEventListener("click", function (e) {
        menuArrow.parentElement.classList.toggle("_active");
      });
    }
  }
} else {
  if (menuArrows.length > 0) {
    for (let index = 0; index < menuArrows.length; index++) {
      const menuArrow = menuArrows[index];
      menuArrow.parentElement.addEventListener("mouseenter", function (e) {
        menuArrow.parentElement.classList.add("_active");
      });
      menuArrow.parentElement.addEventListener("mouseleave", function (e) {
        menuArrow.parentElement.classList.remove("_active");
      });
    }
  }
  document.body.classList.add("_pc");
}

/*-------------------------------------------------------------------------------------------
------------------------------------РЕЗУЛЬТАТЫ ПОИСКА---------------------------------------------
-------------------------------------------------------------------------------------------*/

const search = document.querySelector(".search__input");
const results = document.querySelector(".search__results-body");

if (search) {
  search.addEventListener("input", function (e) {
    if (search.value != "") {
      results.classList.add("_active");
    } else {
      results.classList.remove("_active");
    }
  });
}

//закрытие по нажатию вне элемента

document.addEventListener("click", function (e) {
  if (results.contains(e.target) || search.contains(e.target)) {
    if (search.value != "") {
      results.classList.add("_active");
    }
    return;
  }
  results.classList.remove("_active");
});
