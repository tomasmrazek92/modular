gsap.registerPlugin(ScrollTrigger);

import { animateHorizontalGraph, codeAnimation, letterAnimation } from '$utils/globalFunctions';

import { wrapLetters } from './utils/globalFunctions';

// --- Hero Dashboard Animation

function switchDeviceIcons() {
  const hideClass = 'hide';
  $('.hero-devices .hero-box_inner').each(function () {
    const icons = $(this).find('.hero-box_icon');

    const visibleIcon = icons.not('.' + hideClass);
    const nextIndex = visibleIcon.index() >= icons.length - 1 ? 0 : visibleIcon.index() + 1;
    icons.addClass(hideClass);
    icons.eq(nextIndex).removeClass(hideClass);
  });
}

// Base Hero Elements
const hightlightClass = 'word-highlight';
const baseDuration = 1.2;
const heroLabel = '#heroLabel';
const heroHeading = '#heroHeading';
const heroHeadingBox = '.header_highlight-head';
const heroButtons = '#heroButtons .button';
const modularBox = '#modularBox';
const heroBox = '.hero-box';
const heroBoxInner = '.hero-box_inner';
const brandBox = modularBox + ' ' + heroBoxInner;

const brandLogo = '#brandLogo';
const heroBoxesLeft = heroBox + '[box-direction=left] ' + heroBoxInner;
const heroBoxesRight = heroBox + '[box-direction=right] ' + heroBoxInner;
const metadata = '.hero-box_metadata-mask';
const iconBoxArrow = '.hero-dashboard_arrow';
const cloudBorder = '.hero-devices_border';

// Dashboard Elements
const dashboard = '#dashboard';
const dashboardInner = dashboard + ' .hero-dashboard_inner';
const dashboardCode = dashboard + ' .hero-dashboard_code';
const closeCircles = dashboard + ' .hero-dashboard_close circle';
const dashboardTitle = dashboard + ' .hero-dashboard_head-label';
const langTab = dashboard + ' .hero-dashboard_tab';
const pythonTab = dashboard + ' .hero-dashboard_tab-inner.python';
const mojoTab = dashboard + ' .hero-dashboard_tab-inner.mojo';
const pythonCode = dashboard + ' .hero-dashboard_code-block.python';
const mojoCode = dashboard + ' .hero-dashboard_code-block.mojo';

// Graphs
const graphs = '.hero-dashboard_graphs';
const graphHead = '.hero-dashboard_graph-head';
const graphBox = '.hero-dashboard_graph-box';
const graphLabel = '.hero-dashboard_graph-label';
const graphNumberLabel = '.hero-dashboard_graph-number-label';
const graphNumber = '.hero-dashboard_graph-number';
const graphLegend = '.hero-dashboard_graph-legend';

// Animation
const main = gsap.timeline({ delay: 0.5, ease: Power2.easeOut, paused: true, repeat: -1 });

$(document).ready(function () {
  // Initial Reveal
  main
    .addLabel('Start')
    .add(letterAnimation(heroLabel, 0.01))
    .add(letterAnimation(heroHeading, 'heading'), '<')
    .call(() => {
      $(brandLogo).trigger('click');
    })
    .from(heroButtons, { opacity: 0, stagger: 0.1, duration: baseDuration }, '<0.1')
    .fromTo(
      $(modularBox),
      { width: '19em', opacity: 0 },
      { width: '12.2em', opacity: 1, duration: baseDuration },
      'Start'
    )
    .add(letterAnimation($(modularBox).find(metadata).find('div'), 'label'));

  // Hero Boxes on Left
  main
    .addLabel('heroBoxesLeft')
    .from(
      heroBoxesLeft,
      { opacity: 0, left: '-6em', stagger: 0.15, duration: baseDuration / 2 },
      'heroBoxesLeft'
    )
    .add(
      letterAnimation($(heroBoxesLeft).closest(heroBox).find(metadata).children(), 'label'),
      '<'
    );

  // Hero Boxes on Right
  main
    .addLabel('heroBoxesRight')
    .from(
      heroBoxesRight,
      { opacity: 0, left: '6em', stagger: 0.15, duration: baseDuration / 2 },
      'heroBoxesLeft'
    )
    .add(
      letterAnimation(
        $(heroBoxesRight).closest('.hero-devices_box').find(metadata).children(),
        'label'
      ),
      '<'
    );

  // Arrows + Border
  main
    .addLabel('arrowsAndBorder')
    .to([cloudBorder, iconBoxArrow], { opacity: 1, duration: baseDuration }, 'arrowsAndBorder');

  // Loop Devices
  main.addLabel('loopDevices');
  const CloudsSwitch = gsap
    .timeline()
    .to(heroBoxesRight, { opacity: 0 })
    .to(heroBoxesRight, { x: '1em' })
    .call(switchDeviceIcons)
    .to(heroBoxesRight, { opacity: 1, x: '0' });

  const repeatedCloudsSwitch = gsap.timeline().add(CloudsSwitch).delay(1).repeat(1).repeatDelay(1);
  main.add(repeatedCloudsSwitch, 'loopDevices');

  // Expand the Square
  main
    .addLabel('expandSquare')
    .fromTo(
      modularBox,
      { width: '12.2em', height: '12.2em' },
      { width: '90.4em', height: '37.2em', duration: baseDuration },
      'expandSquare'
    )
    .to(
      [brandBox, heroBoxesLeft, heroBoxesRight, metadata, iconBoxArrow, cloudBorder],
      { opacity: 0, duration: baseDuration },
      '<'
    )
    // Update Heading
    .addLabel('headingUpdate1')
    .to(heroHeading, { opacity: 0, y: '2em', duration: 0.2 })
    .call(() => {
      $(heroHeading).html(
        'A <span class="word-highlight">new language</span> that <span class="word-highlight">extends</span> <span class="word-highlight">Python</span> but thats <span class="word-highlight">as fast as C</span>'
      );
      wrapLetters(heroHeading);
      $(heroHeadingBox).css('width', '80%');
    })
    .to(heroHeading, { opacity: 1, y: '0em', duration: 0.2 });

  // Show Dashboard
  main
    .addLabel('showDashboard')
    .fromTo(
      [dashboard, dashboardInner],
      { autoAlpha: 0 },
      { autoAlpha: 1, stagger: 0.2 },
      'showDashboard'
    )
    .to(closeCircles, { opacity: 1, stagger: 0.1, duration: baseDuration })
    .add(letterAnimation(dashboardTitle + ' div', 'label'), '<')
    .to([dashboardTitle, langTab], { opacity: 1, duration: baseDuration, stagger: 0.2 }, '<')
    .to(dashboardCode, { opacity: 1, duration: baseDuration }, '<');

  // Animate the Python Code
  main.addLabel('pythonCode').add(codeAnimation(pythonCode), 'pythonCode+0.3');

  // Switch Code Tabs
  main
    .addLabel('switchCodeTabs')
    .to(pythonTab, { opacity: 0, duration: baseDuration / 2 }, 'switchCodeTabs')
    .to(mojoTab, { opacity: 1, display: 'flex', duration: baseDuration }, '<')
    .set(pythonCode, { display: 'none' }, '<')
    .set(mojoCode, { display: 'block' }, '<');
  // Animate the Python Code
  main.addLabel('mojoCode').add(codeAnimation(mojoCode), 'mojoCode+0.3');

  // Transition Code
  let graphWidth;
  const firstGraph = $(graphBox).eq(0);
  main
    .call(() => {
      graphWidth = firstGraph.css('width');
    })
    .set(firstGraph, { width: '100%' })
    .set($(graphBox).not(':first-child'), { scaleY: 0 })
    .addLabel('transitionCode')
    .to(
      [dashboardCode, firstGraph],
      {
        width: () => {
          return graphWidth;
        },
        duration: baseDuration,
      },
      'showGraphs'
    )
    // Update Heading
    .addLabel('headingUpdate2')
    .to(heroHeading, { opacity: 0, y: '2em', duration: 0.2 })
    .call(() => {
      $(heroHeading).html(
        'The <span class="word-highlight">fastest unified AI inference</span> <span class="word-highlight">engine</span> in the world.'
      );
      wrapLetters(heroHeading);
    })
    .to(heroHeading, { opacity: 1, y: '0em', duration: 0.2 });

  // Show Graphs
  main
    .addLabel('showGraph')
    .to(graphs, { autoAlpha: 1, duration: baseDuration }, '<')
    .to(dashboard, { autoAlpha: 0, duration: baseDuration }, '<');

  // Animate Graphs
  const animateLabel = (element) => {
    main.set(element, { opacity: 1 }).add(letterAnimation(element, 'label'), '<');
  };
  const animateGraph = (parent) => {
    main
      .add(animateLabel($(parent).find(graphLabel).children()), '<')
      .add(animateLabel($(parent).find(graphNumberLabel).children()), '<')
      .add(animateLabel($(parent).find(graphLegend).children()), '<')
      .set($(parent).find(graphNumber), { yPercent: 10, opacity: 0 }, '<')
      .to($(parent).find(graphNumber), { yPercent: 0, opacity: 1, duration: baseDuration }, '<');
  };
  main.addLabel('animateGraph1').add(animateGraph($(graphBox).eq(0)));
  main
    .to($(graphBox).eq(1), { scaleY: 1, duration: baseDuration })
    .addLabel('animateGraph2')
    .add(animateGraph($(graphBox).eq(1)));
  main
    .to($(graphBox).eq(2), { scaleY: 1, duration: baseDuration })
    .addLabel('animateGraph3')
    .add(animateGraph($(graphBox).eq(2)));

  // End Animation
  main.to(modularBox, {
    keyframes: {
      '50%': { opacity: 0 },
      '100%': { scale: 0.5 },
    },
    duration: baseDuration,
  });

  // --- Homepage Rest
  // Model Deployment
  $('#deployment-visual').each(function () {
    let triggerElement = $(this);
    let tl = gsap.timeline({
      ease: Power2.easeOut,
      paused: true,
      scrollTrigger: {
        trigger: triggerElement,
        // trigger element - viewport
        start: '50% bottom',
        onEnter: () => {
          // Play the timeline when the trigger element enters the viewport
          tl.play();
        },
      },
    });
    let icons = $(this).find('.cardj_row1').add('.cardj_row2').find('.w-embed');
    tl.fromTo(icons, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.05 });
    tl.fromTo($(this).find('.cardj_row2'), { opacity: 0 }, { opacity: 1 }, '<').add(
      letterAnimation($(this).find('.text-size-tiny'), 'label')
    );
  });

  // Hardware Animation
  $('.cardd_visual.hardware').each(function () {
    let triggerElement = $(this);
    let tl = gsap.timeline({
      ease: Power2.easeOut,
      paused: true,
      scrollTrigger: {
        trigger: triggerElement,
        // trigger element - viewport
        start: '50% bottom',
        onEnter: () => {
          // Play the timeline when the trigger element enters the viewport
          tl.play();
        },
      },
    });
    tl.fromTo(
      $(this).find('.cardd_logo-box'),
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.05 }
    );
    tl.fromTo(
      $(this).find('.cardd_logo-line-2').add('.cardd_logo-line-1'),
      { opacity: 0 },
      { opacity: 1 }
    );
  });

  // Discord Animation
  $('.discord_box').each(function () {
    let triggerElement = $(this);
    let tl = gsap.timeline({
      ease: Power2.easeOut,
      paused: true,
      scrollTrigger: {
        trigger: triggerElement,
        // trigger element - viewport
        start: '50% bottom',
        onEnter: () => {
          // Play the timeline when the trigger element enters the viewport
          tl.play();
        },
      },
    });
    // Add the animation to the timeline
    tl.fromTo(
      $(this).find('.discord_card'),
      1,
      { y: '1rem', opacity: 0 },
      { y: '0rem', opacity: 1 }
    )
      .fromTo(
        $(this).find('.discord_bg'),
        1,
        { y: '1rem', opacity: 0 },
        { y: '0rem', opacity: 1 },
        '<0.3'
      )
      .from(
        $(this).find('.discord_avatar,.discord_message-text:first-child, .discord_message-time'),
        0.5,
        {
          opacity: 0,
          stagger: 0.15,
        },
        '<'
      )
      .add(letterAnimation($(this).find('.discord_message-text').eq(1), 0.03));
  });

  // Animate Graph
  $('.grapha_row').each(function () {
    animateHorizontalGraph($(this), 'a', '.grapha');
  });

  main.play();
});
