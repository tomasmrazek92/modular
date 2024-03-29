import { codeAnimation, codeFile, letterAnimation, typeText } from '$utils/globalFunctions';
import { swiperCarousel, tabCarousel } from '$utils/tabCarousel';

$(document).ready(function () {
  // #region Tabs implementation

  const activeClass = 'tab-active';
  const progressLine = '.tabs_block-progress-line';
  const duration = 4000;

  // Animates a card, by typing the text and filename.
  function cardAnimation(card) {
    return new Promise((resolve) => {
      card.show();
      card.css('opacity', '0.0');
      card.animate({ opacity: '1' }, 200, resolve);
    });
  }

  // Initializes the tab carousel for desktop
  tabCarousel({
    tabs: $('.tabs .tabs_block-link-menu .tabs_block-link'),
    cards: $('.tabs .tabs_inner'),
    onCardLeave: (card) => {
      card.hide();
    },
    onTabLeave: (tab) => {
      tab.removeClass(activeClass);
      // If this is called mid animation (by a click) this will stop it.
      tab.find(progressLine).stop();
      tab.find(progressLine).css('width', '0');
    },
    onCardShow: cardAnimation,
    onTabShow: (tab) => {
      return new Promise((resolve) => {
        tab.addClass(activeClass);
        tab.find(progressLine).animate({ width: '100%' }, duration, resolve);
      });
    },
  });

  swiperCarousel({
    sliderSelector: '.tabs_slider',
    // On init and when the swiper slides, we animate the progressbar and code
    // block, but only animate the code the first time it's shown.
    animateOnSlide(activeSlide) {
      // Set progressLine to 0 and then start an animation for it.
      activeSlide
        .find(progressLine)
        .stop(true, true)
        .css('width', '0')
        .animate({ width: '100%' }, duration);
    },
    onInit() {},
    duration,
  });

  // #endregion
});
