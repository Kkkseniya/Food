import Swiper from "../js/swiper-bundle.esm.browser.min.js";

const cartCloseBtn = document.querySelector(".card-top__close");
const cartDetails = document.querySelector(".cart-details");
const notifCard = document.querySelector(".notif-cart");

// opening a cart menu by clicking on the cart icon
notifCard.addEventListener("click", (e) => {
  cartDetails.classList.toggle("cart-details_open");
});

cartCloseBtn.addEventListener("click", () => {
  cartDetails.classList.remove("cart-details_open");
});

//adding scroll for cart items list
new SimpleBar(document.querySelector(".cart-list"), {
  classNames: {
    scrollbar: "cart-list__scrollbar",
    track: "cart-list__track",
  },
});

// "sets" swiper from the main page
const setsSwiper = new Swiper(".sets__slider", {
  loop: true,
  slidesPerView: 1,

  navigation: {
    nextEl: ".sets__arrow_next",
    prevEl: ".sets__arrow_prev",
  },
});

// "reviews" swiper from the main page
const reviewsSwiper = new Swiper(".reviews-swiper", {
  slidesPerView: 3,
  spaceBetween: 50,
  loop: true,

  breakpoints: {
    // when window width is >= 1200px
    1200: {
      spaceBetween: 20,
    },
    // when window width is >= 1440px
    1440: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },

  navigation: {
    nextEl: ".reviews__arrow_next",
    prevEl: ".reviews__arrow_prev",
  },
  pagination: {
    el: ".reviews-pagination",
    clickable: true,
  },
});

// parallax for "subscription" section
const subscribImage = new simpleParallax(document.getElementsByClassName("subscription__parallax"), {
  delay: 1,
  scale: 1.2,
  orientation: "down",
});
