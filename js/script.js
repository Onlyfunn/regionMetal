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
---------ВЛОЖЕННЫЕ СПИСКИ В ШАПКЕ И ДОБАВЛЕНИЕ КЛАССА BODY-----------------------------------
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

/*-------------------------------------------------------------------------------------------
-----------------------------------------МЕНЮ БУРГЕР---------------------------------------------
-------------------------------------------------------------------------------------------*/

const iconMenu = document.querySelector(".header__burger-icon");
const menuBody = document.querySelector(".burger-menu");
const menuLinks = menuBody.querySelectorAll("a");

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("_lock");
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
  });
}

for (let item of menuLinks) {
  item.addEventListener("click", function (e) {
    document.body.classList.remove("_lock");
    iconMenu.classList.remove("_active");
    menuBody.classList.remove("_active");
  });
}

/*-------------------------------------------------------------------------------------------
---------------------------------ЗАКРЫТИЕ ПО НАЖАТИЮ В ПРАВОЙ ЧАСТИ------------------------------
-------------------------------------------------------------------------------------------*/

document.addEventListener("click", function (e) {
  if (iconMenu.contains(e.target)) return;
  if (menuBody.classList.contains("_active")) {
    const clickX = e.clientX;
    if (clickX / window.innerWidth > 0.6) {
      document.body.classList.remove("_lock");
      iconMenu.classList.remove("_active");
      menuBody.classList.remove("_active");
      menuBody.style.left = "";
      menuBody.style.transition = "";
    }
  }
});

/*-------------------------------------------------------------------------------------------
-----------------------------------------SWIPER---------------------------------------------
-------------------------------------------------------------------------------------------*/

const swiperPromotion = new Swiper(".swiper-promotion", {
  direction: "horizontal",
  loop: false,

  pagination: {
    el: ".swiper-promotion__pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-promotion__button-next",
    prevEl: ".swiper-promotion__button-prev",
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: true,
  },
  speed: 600,
  slidesPerView: 1.07,
  spaceBetween: 15,

  breakpoints: {
    799: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  },
});
