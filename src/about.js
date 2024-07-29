const swiper = new Swiper('.about-team_slider', {
  // Optional parameters
  slidesPerView: 'auto',
  spaceBetween: 20,
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-arrow.next',
    prevEl: '.swiper-arrow.prev',
  },
});

const swiperModal = new Swiper('.about-team_modal-slider .max-width-full', {
  // Optional parameters
  slidesPerView: 1,

  mousewheel: {
    enabled: true,
    forceToAxis: true,
    thresholdDelta: 25,
  },
  freeMode: false,
  shortSwipes: false,
  breakpoints: {
    0: {
      direction: 'horizontal',
      spaceBetween: 8,
    },
    992: {
      direction: 'vertical',
      spaceBetween: 20,
    },
  },
});

$('.about-team_card').on('click', function () {
  revealModal($(this).closest('.w-dyn-item').index());
});

$('[data-modal="hide"]').on('click', hideModal);

function revealModal(index) {
  swiperModal.slideTo(index);
  $('.about-team_modal').fadeIn();
}

function hideModal() {
  $('.about-team_modal').fadeOut();
}
