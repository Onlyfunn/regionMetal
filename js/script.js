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

  for (let item of menuLinks) {
    item.addEventListener("click", function (e) {
      document.body.classList.remove("_lock");
      iconMenu.classList.remove("_active");
      menuBody.classList.remove("_active");
    });
  }
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

/*-------------------------------------------------------------------------------------------
-----------------------------------------MASK---------------------------------------------
-------------------------------------------------------------------------------------------*/

var element = document.querySelector(".form-contact__tel");
if (element) {
  var maskOptions = {
    mask: "+7 (900) 000-00-00",
    lazy: true,
  };
  var mask = new IMask(element, maskOptions);
}

/*-------------------------------------------------------------------------------------------
-------------------------------------------FORM CONTACT------------------------------------------
-------------------------------------------------------------------------------------------*/

const formContact = document.querySelector(".form-contact");
const submit = document.querySelector(".form-contact__submit");

if (formContact) {
  for (let item of formContact.querySelectorAll("input, textarea")) {
    item.addEventListener("input", function (e) {
      item.classList.remove("_empty", "_incorrect");
    });
  }

  submit.addEventListener("click", function (e) {
    e.preventDefault();

    if (checkCorrect()) {
      formContact.submit();
    }
  });

  function checkCorrect() {
    let itemsCorrect = 0;
    for (let item of formContact.querySelectorAll("input[required]")) {
      if (
        item.hasAttribute("required") &&
        (item.value == "" || (item.type === "checkbox" && !item.checked))
      ) {
        item.classList.add("_empty");
      } else if (
        (item.classList.contains("form-contact__tel") &&
          item.value.length != 18) ||
        (item.classList.contains("form-contact__email") &&
          regex.test(item.value) == false)
      ) {
        item.classList.add("_incorrect");
      } else {
        itemsCorrect += 1;
      }
    }
    if (itemsCorrect == 3) {
      return true;
    } else {
      return false;
    }
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
}

/*-------------------------------------------------------------------------------------------
---------------------------CATEGORIES SHOW MORE---------------------------------------------
-------------------------------------------------------------------------------------------*/

const buttonCategoriesShowMore = document.querySelector(
  ".categories__show-more",
);

const bodyCategories = document.querySelector(".categories__body");

if (buttonCategoriesShowMore) {
  buttonCategoriesShowMore.addEventListener("click", function (e) {
    bodyCategories.classList.toggle("_show");
  });
}

/*-------------------------------------------------------------------------------------------
--------------------------------------SWIPER GOODS---------------------------------------------
-------------------------------------------------------------------------------------------*/

const swiperGoods = new Swiper(".swiper-goods", {
  spaceBetween: 20,

  pagination: {
    el: ".swiper-goods__pagination",
    clickable: true,

    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
  navigation: {
    nextEl: ".swiper-goods__button-next",
    prevEl: ".swiper-goods__button-prev",
  },
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 5,
  grid: {
    rows: 2,
  },
  breakpoints: {
    799: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 10,
    },
    1023: {
      spaceBetween: 15,
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    1331: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 20,
    },
  },
});

if (swiperGoods) {
  const swiperGoodsSlider = document.querySelector(".swiper-goods");
  const swiperGoodsSlide = document.querySelector(".swiper-goods__slide");
  const swiperGoodsWrapper = document.querySelector(".swiper-goods__wrapper");

  if (!swiperGoodsSlide || !swiperGoodsSlider || !swiperGoodsWrapper) {
  } else {
    function scrollToSwiperGoods() {
      const slider = document.querySelector(".swiper-goods");
      if (slider) {
        slider.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }

    document.addEventListener("click", function (e) {
      // Клик на буллете пагинации
      if (
        e.target.closest(".swiper-goods__pagination .swiper-pagination-bullet")
      ) {
        // Небольшая задержка, чтобы Swiper успел переключить слайд
        setTimeout(scrollToSwiperGoods, 0);
      }

      // Клик на кнопках навигации
      if (
        e.target.closest(".swiper-goods__button-prev") ||
        e.target.closest(".swiper-goods__button-next")
      ) {
        setTimeout(scrollToSwiperGoods, 100);
      }
    });

    let swiperGoodsHeight;
    let swiperGoodsSlideLength;
    addSlides();

    calculateSwiperGoodsHeight();
    const swiperGoodsShowMore = document.querySelector(".swiper-goods__button");
    swiperGoodsShowMore.addEventListener("click", function (e) {
      for (let i of document.querySelectorAll(".added-slide")) {
        i.remove();
      }
      swiperGoodsShow(2);
    });
    function calculateSwiperGoodsHeight() {
      swiperGoodsHeight =
        parseInt(getComputedStyle(swiperGoodsSlide).minHeight) *
          swiperGoods.params.grid.rows +
        swiperGoods.params.spaceBetween * (swiperGoods.params.grid.rows - 1);
      swiperGoodsSlider.style.height = `${swiperGoodsHeight}px`;
      swiperGoodsSlideLength = document.querySelectorAll(
        ".swiper-goods__slide",
      ).length;
      addSlides();
    }

    function swiperGoodsShow(quantity) {
      if (
        swiperGoods.params.grid.rows * swiperGoods.params.slidesPerView +
          swiperGoods.params.slidesPerView * quantity <=
        swiperGoodsSlideLength +
          swiperGoods.params.slidesPerView * (quantity - 1)
      ) {
        swiperGoods.params.grid.rows += quantity;
        calculateSwiperGoodsHeight();
        if (
          swiperGoods.params.grid.rows * swiperGoods.params.slidesPerView +
            swiperGoods.params.slidesPerView * quantity >=
          swiperGoodsSlideLength +
            swiperGoods.params.slidesPerView * (quantity - 1)
        ) {
          swiperGoodsShowMore.style.display = "none";
        }
      } else {
        swiperGoodsShowMore.style.display = "none";
      }
    }
    function addSlides() {
      if (
        swiperGoodsSlideLength %
          (swiperGoods.params.grid.rows * swiperGoods.params.slidesPerView) !=
        0
      ) {
        for (
          let i = 0;
          i <
          swiperGoods.params.grid.rows * swiperGoods.params.slidesPerView -
            (swiperGoodsSlideLength %
              (swiperGoods.params.grid.rows *
                swiperGoods.params.slidesPerView));
          i++
        ) {
          swiperGoodsWrapper.insertAdjacentHTML(
            "beforeend",
            '<div class="swiper-goods__slide slide-goods swiper-slide added-slide"></div>',
          );
        }
      }
    }

    swiperGoodsBulletsCalculate();
    swiperGoods.on("slideChange", swiperGoodsBulletsCalculate);

    function swiperGoodsBulletsCalculate() {
      const swiperGoodsBullets = document.querySelector(
        ".swiper-goods__pagination",
      ).children;
      let swiperGoodsBulletsGroups = Math.ceil(swiperGoodsSlideLength / 3);
      let swiperGoodsBulletsIndexActive =
        Array.from(swiperGoodsBullets).findIndex((bullet) =>
          bullet.classList.contains("swiper-pagination-bullet-active"),
        ) + 1;
      let swiperGoodsBulletsGroup = Math.ceil(
        swiperGoodsBulletsIndexActive / 3,
      );
      for (let i = 0; i < swiperGoodsBullets.length; i++) {
        swiperGoodsBullets[i].style.display = "none";
        swiperGoodsBullets[i].classList.remove("_dotted");

        if (
          swiperGoodsBulletsGroup * 3 - 3 <= i &&
          i <= swiperGoodsBulletsGroup * 3
        ) {
          swiperGoodsBullets[i].style.display = "inline-flex";
        }
      }
      let i = 0;
      for (let bullet of swiperGoodsBullets) {
        if (i == 3) {
          bullet.classList.add("_dotted");

          break;
        }

        if (bullet.style.display == "inline-flex") {
          i += 1;
        }
      }
    }
  }

  const goodsCount = document.querySelectorAll(".slide-goods__count-count");
  for (let i of goodsCount) {
    i.previousElementSibling.addEventListener("click", function (e) {
      if (parseInt(i.value) + 1 < 100) {
        i.value = `${parseInt(i.value) + 1}`;
      }
    });
    i.nextElementSibling.addEventListener("click", function (e) {
      if (parseInt(i.value - 1) >= 0) {
        i.value = `${parseInt(i.value) - 1}`;
      }
    });
  }
}
