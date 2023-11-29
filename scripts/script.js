window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll(".tel"), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) : a;
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i);
      }
      var reg = matrix
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return "\\d{1," + a.length + "}";
        })
        .replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      ) {
        this.value = new_value;
      }
      if (event.type == "blur" && this.value.length < 5) {
        this.value = "";
      }
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
  });

  const swiper_rev = new Swiper(".swiper-rev", {
    // Optional parameters
    direction: "horizontal",
    spaceBetween: 60,
    slidesPerView: 1,

    pagination: {
      el: ".swiper-pagination-rev",
    },

    navigation: {
      nextEl: ".swiper-next-rev",
      prevEl: ".swiper-prev-rev",
    },

    breakpoints: {
      1100: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  });

  const swiper_catalog = new Swiper(".swiper-catalog", {
    direction: "horizontal",
    spaceBetween: 60,
    slidesPerView: 1,

    pagination: {
      el: ".swiper-pagination-catalog",
    },

    breakpoints: {
      900: {
        slidesPerView: 2,
        spaceBetween: 125,
      },
      1100: {
        slidesPerView: 3,
        spaceBetween: 125,
      },
    },
  });

  // Выпадащка

  // const nav__link = document.querySelector('.nav__link--open-panel');
  // const nav__panel = document.querySelector('.nav__panel');

  // if (nav__link) {
  //   nav__link.addEventListener('mouseover', () => {
  //     nav__panel.classList.add('nav__panel-active');
  //   })

  //   nav__link.addEventListener('mouseout', () => {
  //     nav__panel.classList.remove('nav__panel-active');
  //   })

  //   if (nav__panel) {
  //     nav__panel.addEventListener('mouseover', () => {
  //       nav__panel.classList.add('nav__panel-active');
  //     })

  //     nav__panel.addEventListener('mouseout', () => {
  //       nav__panel.classList.remove('nav__panel-active');
  //     })
  //   }
  // }

  const nav__link = document.querySelectorAll(".nav__link--open-panel");

  console.log(nav__link);

  if (nav__link.length !== 0) {
    nav__link.forEach((e) => {
      let nav__panel = e.parentElement.lastElementChild;
      e.addEventListener("mouseover", () => {
        nav__panel.classList.add("nav__panel-active");
        console.log(nav__panel);
      });

      e.addEventListener("mouseout", () => {
        nav__panel.classList.remove("nav__panel-active");
      });

      if (nav__panel) {
        nav__panel.addEventListener("mouseover", () => {
          nav__panel.classList.add("nav__panel-active");
        });

        nav__panel.addEventListener("mouseout", () => {
          nav__panel.classList.remove("nav__panel-active");
        });
      }
    });
  }

  // Перемещение элемента

  const place = document.querySelector(".psmainHeader__weeksee-right");
  const enter = document.querySelector(".psmainHeader__auth");
  const back = document.querySelector(".psmainHeader__call");

  window.addEventListener(
    "resize",
    function (event) {
      if (event.target.innerWidth < 1001) {
        place.before(enter);

        // Выпадашка для мобилки

        const arrow_down = document.querySelector(".psmainNav__down");
        const menu_wrapper = document.querySelector(
          "psmainNav__podmenu-wrapper"
        );

        if (arrow_down) {
          arrow_down.addEventListener("click", () => {
            menu_wrapper.classList.add("psmainNav__podmenu-wrapper-active");
          });
        }
      } else {
        back.after(enter);
      }
    },
    true
  );

  // Заказать звонок

  const orderCall = document.querySelector(".orderCall");
  const orderCallModal = document.querySelector(".psmainModal");
  const orderCallModalInner = document.querySelector(".psmainModal__inner");

  if (orderCall) {
    orderCall.addEventListener("click", () => {
      orderCallModal.classList.add("psmainModal__active");
    });
  }

  if (orderCallModal) {
    orderCallModal.addEventListener("click", () => {
      orderCallModal.classList.remove("psmainModal__active");
    });
  }

  if (orderCallModalInner) {
    orderCallModalInner.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // Табы

  const tabBtns = Array.from(document.querySelectorAll(".tab__btn"));
  const tabIndicator = document.querySelector("#tab_indicator");
  const tabSlide = Array.from(document.querySelectorAll(".tab__slide"));
  const root = document.querySelector(":root");

  const numBtns = tabBtns.length;

  root.style.setProperty("--num-btns", numBtns);

  if (tabBtns && tabBtns[0]) {
    tabBtns[0].classList.add("active");
    tabSlide[0].classList.add("active");
  }

  let activeBtn = tabBtns[0];
  let activeSlide = tabSlide[0];

  tabBtns.forEach((el) => {
    el.addEventListener("click", onTabBtnClick);
  });

  function onTabBtnClick(e) {
    e.preventDefault();
    const btn = e.target.closest(".tab__btn");
    changeBtn(btn);
  }

  function changeBtn(btn) {
    if (btn.classList.contains("active")) {
      return;
    }
    activeBtn.classList.remove("active");
    btn.classList.add("active");
    activeBtn = btn;
    changeIndicator(btn);
  }

  function changeIndicator(btn) {
    const indexBtn = tabBtns.indexOf(btn);
    tabIndicator.style.left = `calc(${indexBtn}*100%/${numBtns})`;
    changeSlide(indexBtn);
  }

  function changeSlide(index) {
    activeSlide.classList.remove("active");
    tabSlide[index].classList.add("active");
    activeSlide = tabSlide[index];
  }

  // Бургер

  const burger_button = document.querySelector(".psmainHeader__weeksee-burger");
  const burger_close = document.querySelector(".nav__mobile-close");
  const menu = document.querySelector(".nav__mobile");
  const body_item = document.querySelector("body");
  const menu_wrapper = document.querySelector(".nav__mobile-wrapper");

  if (menu) {
    menu.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  if (menu_wrapper) {
    menu_wrapper.addEventListener("click", () => {
      menu.classList.remove("nav__mobile-active");
      body_item.classList.remove("body__toggle");
      menu_wrapper.classList.remove("nav__mobile-wrapper-active");
    });
  }

  if (burger_button) {
    burger_button.addEventListener("click", () => {
      menu.classList.add("nav__mobile-active");
      body_item.classList.add("body__toggle");
      menu_wrapper.classList.add("nav__mobile-wrapper-active");
    });
  }

  if (burger_close) {
    burger_close.addEventListener("click", () => {
      menu.classList.remove("nav__mobile-active");
      body_item.classList.remove("body__toggle");
      menu_wrapper.classList.remove("nav__mobile-wrapper-active");
    });
  }

  // мобильное меню

  const nav__mobile_subBtn = document.querySelectorAll(".nav__mobile-subBtn");

  const result = Array.from(nav__mobile_subBtn);

  result.forEach((e) => {
    e.addEventListener("click", () => {
      e.parentElement.parentElement.lastElementChild.classList.toggle(
        "nav__mobile-sub-acitve"
      );
    });
  });

  // аккордеон

  let acc = document.getElementsByClassName("psdetailQuestions__accordion");
  let i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      this.lastElementChild.classList.toggle("active");
      let panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

  // Модальное для диплома

  let diplom_open = document.querySelector(".psdetailSample__open");
  let diplom_close = document.querySelector(".psdetailDiplom__close");
  let diplom_modal = document.querySelector(".psdetailDiplom");

  if (diplom_open) {
    diplom_open.addEventListener("click", () => {
      diplom_modal.classList.add("psdetailDiplomOpen");
    });
  }

  if (diplom_close) {
    diplom_close.addEventListener("click", () => {
      diplom_modal.classList.remove("psdetailDiplomOpen");
    });
  }

  const contactAccordion = document.querySelector(
    ".contact__content__rekvizit__header"
  );
  const contactAccordionContent = document.querySelector(
    ".contact__content__rekvizit__content"
  );
  const contactAccordionCaret = document.querySelector(
    ".contact__content__rekvizit__header-caret"
  );

  contactAccordion.addEventListener("click", () => {
    if (
      contactAccordionContent.classList.contains(
        "contact__content__rekvizit__content_active"
      )
    ) {
      contactAccordionContent.classList.remove(
        "contact__content__rekvizit__content_active"
      );
      contactAccordionCaret.classList.remove(
        "contact__content__rekvizit__header-caret_active"
      );
    } else {
      contactAccordionContent.classList.add(
        "contact__content__rekvizit__content_active"
      );
      contactAccordionCaret.classList.add(
        "contact__content__rekvizit__header-caret_active"
      );
    }
  });
});
