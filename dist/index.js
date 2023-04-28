"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/globalFunctions.js
  var wrapLetters = (element) => {
    const processNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        if (!node.parentNode.classList.contains("letter")) {
          const codeText = node.textContent;
          const fragment = document.createDocumentFragment();
          for (let i = 0; i < codeText.length; i++) {
            const span = document.createElement("span");
            span.className = "letter";
            span.textContent = codeText[i];
            fragment.appendChild(span);
          }
          node.parentNode.replaceChild(fragment, node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName !== "BR") {
          const childNodes = Array.from(node.childNodes);
          childNodes.forEach(processNode);
        }
      }
    };
    $(element).contents().each(function() {
      processNode(this);
    });
  };
  var revealLetters = (elements, letterDelay) => {
    const codeTimeline = gsap.timeline();
    let globalLetterIndex = 0;
    $(elements).each((elementIndex, element) => {
      const letters = $(element).find(".letter").not(".line-numbers-row .code-letter");
      const highlights = $(element).find(".word-highlight");
      letters.each((letterIndex, letter) => {
        codeTimeline.fromTo(
          letter,
          { visibility: "hidden" },
          { visibility: "initial" },
          globalLetterIndex * letterDelay,
          "<"
        );
        globalLetterIndex++;
      });
      if (highlights.length) {
        console.log(highlights);
        const currentBgColor = window.getComputedStyle(document.body).getPropertyValue("background-color");
        const currentBgColorRGBA = currentBgColor.replace(/^rgb(a)?\(/, "").replace(/\)$/, "");
        const currentBgColorHex = currentBgColor.match(/^#(?:[0-9a-f]{3}){1,2}$/i) ? currentBgColor : null;
        const backgroundColor = currentBgColorHex || `rgba(${currentBgColorRGBA}, 0)`;
        codeTimeline.from(highlights, { backgroundColor, duration: 0.35 });
      }
    });
    return codeTimeline;
  };
  var letterAnimation = (elements, letterType) => {
    let letterDelay;
    if (letterType === "label") {
      letterDelay = 0.03;
    } else if (letterType === "heading") {
      letterDelay = 0.01;
    } else if (typeof letterType === "number") {
      letterDelay = letterType;
    } else {
      letterDelay = 0.01;
    }
    wrapLetters(elements);
    return revealLetters(elements, letterDelay);
  };
  var codeAnimation = (className) => {
    const codeBlock = $(className).find("code");
    const lineNumbers = codeBlock.find(".line-numbers-rows").eq(0).clone();
    codeBlock.find(".line-numbers-rows").remove();
    wrapLetters(codeBlock);
    codeBlock.prepend(lineNumbers);
    return revealLetters(codeBlock, 0.01);
  };
  var typeText = (element, text) => {
    const codeTimeline = gsap.timeline();
    codeTimeline.to(
      element,
      {
        text: { value: text, ease: "none", speed: 1 }
      },
      "<"
    );
    return codeTimeline;
  };

  // src/index.js
  document.documentElement.classList.add("js-enabled");
  $(document).ready(function() {
    $(".main-wrapper").delay(300).fadeTo("slow", 1);
    gsap.registerPlugin(ScrollTrigger);
    $("img").each(function() {
      $(this).removeAttr("loading");
      ScrollTrigger.refresh();
    });
    function addNoScrollbarClass() {
      const allElements = document.querySelectorAll("*");
      for (const element of allElements) {
        if (element.tagName.toLowerCase() === "body" || element.tagName.toLowerCase() === "html") {
          continue;
        }
        const style = window.getComputedStyle(element);
        if (style.overflow === "auto" || style.overflow === "scroll" || style.overflowX === "auto" || style.overflowX === "scroll" || style.overflowY === "auto" || style.overflowY === "scroll") {
          element.classList.add("no-scrollbar");
        }
      }
    }
    addNoScrollbarClass();
    let lineMaskTriggers = [];
    function setupLineMaskScrollTriggers() {
      lineMaskTriggers.forEach((st) => st.kill());
      lineMaskTriggers = [];
      $(".line-mask").attr("style", "");
      $(".line-mask").each(function() {
        const computedStyle = window.getComputedStyle($(this)[0]);
        const originalHeight = computedStyle.getPropertyValue("height");
        if ($(this).closest(".line-mask_wrap").hasClass("bottom")) {
          gsap.set($(this), { height: "0%" });
        } else {
          gsap.set($(this), { height: "100%" });
        }
        const scrollTrigger = ScrollTrigger.create({
          trigger: $(this).closest(".line-mask_wrap"),
          once: true,
          start: "70% bottom",
          invalidateOnRefresh: true,
          onEnter: () => {
            gsap.to($(this), { height: originalHeight, duration: 1.2 });
          }
        });
        lineMaskTriggers.push(scrollTrigger);
      });
    }
    function debounce(func, wait) {
      let timeout;
      return function() {
        const context = this, args = arguments;
        const later = function() {
          timeout = null;
          func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
    let lastWindowWidth = $(window).width();
    setupLineMaskScrollTriggers();
    $(window).on(
      "resize",
      debounce(() => {
        const currentWindowWidth = $(window).width();
        if (currentWindowWidth !== lastWindowWidth) {
          setupLineMaskScrollTriggers();
          lastWindowWidth = currentWindowWidth;
        }
      }, 250)
    );
    $(".dashboard_inner[code-animation]").each(function() {
      const codeBlock = $(this).find(".dashboard_code-block");
      codeBlock.hide();
      ScrollTrigger.create({
        trigger: $(this),
        once: true,
        start: "50% bottom",
        invalidateOnRefresh: true,
        toggleActions: "play null null null",
        onEnter: () => {
          codeBlock.show();
          codeAnimation($(this));
        }
      });
    });
    $("#ctaBox").each(function() {
      let label = $(this).find("#ctaLabel");
      let text = $(this).find("#ctaText");
      let triggerElement = $(this);
      let tl = gsap.timeline({
        ease: Power2.easeOut,
        paused: true,
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "center bottom",
          onEnter: () => {
            tl.play();
          }
        }
      });
      tl.add(letterAnimation(label)).add(letterAnimation(text));
    });
    var menuOpenAnim = false;
    var dropdownOpen = false;
    const menuLinks = ".navbar_part.links";
    const menuLinksItems = ".navbar_link";
    const menuButton = ".navbar_menu-btn";
    let revealAnim = {
      y: "100%",
      opacity: 0,
      stagger: {
        each: 0.05
      }
    };
    let menuText = "Close";
    function createNavReveal() {
      let navReveal2 = gsap.timeline({
        paused: true,
        onComplete: () => {
          disableScroll();
        }
      }).add(typeText(menuButton + " div", () => menuText)).fromTo(menuLinks, { display: "none" }, { display: "flex" }, "<").fromTo(menuLinks, { yPercent: -100 }, { yPercent: 0 }, "<").from(menuLinksItems, revealAnim, "-=0.2").fromTo(menuLinksItems, { pointerEvents: "none" }, { pointerEvents: "auto" }, "<");
      return navReveal2;
    }
    let scrollPosition;
    const disableScroll = () => {
      if (!menuOpenAnim) {
        scrollPosition = $(window).scrollTop();
        $("html, body").scrollTop(0).addClass("overflow-hidden");
      } else {
        $("html, body").scrollTop(scrollPosition).removeClass("overflow-hidden");
      }
      menuOpenAnim = !menuOpenAnim;
    };
    let navReveal;
    ScrollTrigger.matchMedia({
      "(max-width: 991px)": function() {
        navReveal = createNavReveal();
      }
    });
    $(".navbar_menu-btn").on("click", openMenu);
    $(".navbar_dropdown").on("click", function() {
      if (!dropdownOpen) {
      }
    });
    function openMenu() {
      if (navReveal) {
        playMenuAnimation();
      }
    }
    function playMenuAnimation() {
      updateMenuText();
      if (!menuOpenAnim) {
        $(".navbar_menu-btn").addClass("open");
        navReveal.timeScale(1).play();
      } else {
        $(".navbar_menu-btn").removeClass("open");
        navReveal.timeScale(1.5).reverse();
        disableScroll();
      }
    }
    function updateMenuText() {
      menuText = menuOpenAnim ? "Menu" : "Close";
    }
  });
})();
//# sourceMappingURL=index.js.map
