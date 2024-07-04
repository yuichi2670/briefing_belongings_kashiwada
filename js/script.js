var cssTargetString = "/css/app.";
var jsTargetString = "/js/app.";
var linkElements = document.head.getElementsByTagName("link");
var scriptElements = document.head.getElementsByTagName("script");
for (var i = 0; i < linkElements.length; i++) {
  var href = linkElements[i].getAttribute("href");
  if (href && href.includes(cssTargetString)) {
    linkElements[i].parentNode.removeChild(linkElements[i]);
  }
}
for (var j = 0; j < scriptElements.length; j++) {
  var src = scriptElements[j].getAttribute("src");
  if (src && src.includes(jsTargetString)) {
    scriptElements[j].remove();
  }
}
jQuery(function ($) {
  let header = $("#js-header-height").innerHeight();
  var urlHash = location.hash;
  if (urlHash) {
    $("body,html").stop().scrollTop(0);
    setTimeout(function () {
      var target = $(urlHash);
      var position = target.offset().top - header;
      $("body,html").stop().animate({ scrollTop: position }, 500);
    }, 100);
  }
  $(document).on("click", 'a[href*="#"]', function () {
    let speed = 400;
    let target = $(this.hash);
    if (!target.length) return;
    let targetY = target.offset().top - header;
    $("html,body").animate({ scrollTop: targetY }, speed, "swing");
    return false;
  });

  $(function () {
    $(".js-hamburger").click(function () {
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        $(".js-overlay").addClass("is-open");
        $(".js-menu").removeClass("is-visible");
        $(".js-menu").each(function (index) {
          const $menu = $(this);
          setTimeout(function () {
            $menu.addClass("is-visible");
          }, 500 + index * 60);
        });
        $(".js-header").addClass("is-open");
        $(".js-nav").addClass("is-open");
        $(".js-drawer-other").addClass("is-open");
      } else {
        $(".js-nav").removeClass("is-open");
        $(".js-overlay").removeClass("is-open");
        $(".js-header").removeClass("is-open");
        $(".js-drawer-other").removeClass("is-open");
        $(".js-menu").removeClass("is-visible");
        $("body").removeClass("is-fixed");
      }
    });
    $('a[href^="#"]').on("click", function () {
      $(".js-current").removeClass("is-current");
      $(this).addClass("is-current");
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        $(".js-nav").removeClass("is-open");
        $(".js-hamburger").removeClass("is-open");
        $(".js-menu").removeClass("is-visible");
        $(".js-overlay").removeClass("is-open");
      }
    });
    $(".js-overlay").on("click", function () {
      $(".js-nav").removeClass("is-open");
      $(".js-overlay").removeClass("is-open");
      $(".js-hamburger").removeClass("is-open");
      $(".js-menu").removeClass("is-visible");
      $(".js-header").removeClass("is-open");
      $(".js-drawer-other").removeClass("is-open");
      $("body").removeClass("is-fixed");
    });
    $(".js-nav").on("click", function () {
      $(".js-nav").removeClass("is-open");
      $(".js-overlay").removeClass("is-open");
      $(".js-hamburger").removeClass("is-open");
      $(".js-menu").removeClass("is-visible");
      $(".js-header").removeClass("is-open");
      $(".js-drawer-other").removeClass("is-open");
      $("body").removeClass("is-fixed");
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  var elms = document.querySelectorAll(".js-scroll");
  var speed = 300;
  var divisor = 100;
  var tolerance = 5;
  var headerHeight = 80;
  var interval = speed / divisor;

  Array.prototype.forEach.call(elms, function (elm) {
    elm.addEventListener("click", function (e) {
      e.preventDefault();
      var nowY = window.scrollY;
      var href = e.currentTarget.getAttribute("href");
      var target = document.querySelector(href);
      if (target) {
        var targetRectTop = target.getBoundingClientRect().top;
        var targetY = targetRectTop + nowY - headerHeight;
        var minY = Math.abs((targetY - nowY) / divisor);
        doScroll(minY, nowY, targetY, tolerance, interval);
      }
    });
  });
  var doScroll = function (minY, nowY, targetY, tolerance, interval) {
    var toY;
    if (targetY < nowY) {
      toY = nowY - minY;
    } else {
      toY = nowY + minY;
    }
    window.scrollTo(0, toY);
    if (targetY - tolerance > toY || toY > targetY + tolerance) {
      window.setTimeout(
        doScroll,
        interval,
        minY,
        toY,
        targetY,
        tolerance,
        interval
      );
    } else {
      return false;
    }
  };
});

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.refresh();
  const map = document.querySelector(".js-map");
  const fades = document.querySelectorAll(".js-fade");
  const fadesSp = document.querySelectorAll(".js-fade-sp");
  const fadesPc = document.querySelectorAll(".js-fade-pc");
  const fadesFix = document.querySelectorAll(".js-fade-fix");
  const lines = document.querySelectorAll(".js-marker-bold");
  const lineLights2 = document.querySelectorAll(".js-marker-light2");
  const lineLights = document.querySelectorAll(".js-marker-light");
  const lineLightsProduct = document.querySelectorAll(
    ".js-marker-light-product"
  );
  const centerLine = document.querySelector(".js-center-line");
  const centerLine02 = document.querySelector(".js-center-line02");
  const textElements = document.querySelectorAll(".js-text");
  const textElements02 = document.querySelectorAll(".js-text02");
  gsap.to(map, { duration: 1, opacity: 1, delay: 1 });
  lines.forEach((line) => {
    gsap.fromTo(
      line,
      { backgroundSize: "0% 2px" },
      {
        backgroundSize: "100% 2px",
        scrollTrigger: { trigger: line, start: "top 70%", end: "bottom 70%" },
      }
    );
  });
  lineLights2.forEach((lineLight) => {
    gsap.to(lineLight, {
      backgroundSize: "100% 1px",
      scrollTrigger: {
        trigger: lineLight,
        start: "top 80%",
        end: "bottom 80%",
        duration: 2,
      },
    });
  });
  gsap.fromTo(
    centerLine,
    { height: "0", marginTop: "0" },
    { height: "calc(100% - 100px)", marginTop: "0", duration: 30 }
  );
  gsap.fromTo(
    centerLine02,
    { height: "0", marginTop: "0" },
    { height: "100%", marginTop: "0", duration: 1 }
  );
  textElements.forEach((textElement) => {
    const wordsAndBrTags = textElement.innerHTML.split(
      /(<br\b[^>]*>|<br class="br-sp">|\s+)/
    );
    textElement.innerHTML = wordsAndBrTags
      .map((item) => {
        if (item.match(/<br\b[^>]*>|<br class="br-sp">|<br class="br-pc">/)) {
          return item;
        } else if (item.trim() !== "") {
          return `<span class="word"><span class="word--text">${item}</span></span>`;
        }
        return item;
      })
      .join(" ");
    const wordSpans = textElement.querySelectorAll(".word--text");
    gsap.fromTo(
      wordSpans,
      { y: "1.2em" },
      {
        y: 0,
        delay: 0.7,
        duration: 1.2,
        stagger: 0.048,
        ease: "expo.out",
        scrollTrigger: {
          trigger: textElement,
          start: "top 80%",
          end: "top center",
        },
      }
    );
  });
  fadesFix.forEach(function (fade) {
    const rect = fade.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.8;
    if (rect.top < triggerPoint) {
      fade.style.opacity = 1;
      fade.style.transform = "translateY(0)";
    }
    fade.style.transition = "opacity 1s, transform 1s";
  });
  fades.forEach(function (fade) {
    const rect = fade.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.8;
    if (rect.top < triggerPoint) {
      fade.style.opacity = 1;
      fade.style.transform = "translateY(0)";
    }
    fade.style.transition = "opacity 1s, transform 1s";
    window.addEventListener("scroll", function () {
      const rect = fade.getBoundingClientRect();
      if (rect.top < triggerPoint) {
        fade.style.opacity = 1;
        fade.style.transform = "translateY(0)";
      } else {
        fade.style.opacity = 0;
        fade.style.transform = "translateY(20px)";
      }
    });
  });
  if (window.innerWidth >= 768) {
    fadesPc.forEach(function (fade) {
      const rect = fade.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.8;
      if (rect.top < triggerPoint) {
        fade.style.opacity = 1;
        fade.style.transform = "translateY(0)";
      }
      fade.style.transition = "opacity 1s, transform 1s";
      window.addEventListener("scroll", function () {
        const rect = fade.getBoundingClientRect();
        if (rect.top < triggerPoint) {
          fade.style.opacity = 1;
          fade.style.transform = "translateY(0)";
        } else {
          fade.style.opacity = 0;
          fade.style.transform = "translateY(20px)";
        }
      });
    });
  }
  if (window.innerWidth <= 767) {
    fadesSp.forEach(function (fade) {
      const rect = fade.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.8;
      if (rect.top < triggerPoint) {
        fade.style.opacity = 1;
        fade.style.transform = "translateY(0)";
      }
      fade.style.transition = "opacity 1s, transform 1s";
      window.addEventListener("scroll", function () {
        const rect = fade.getBoundingClientRect();
        if (rect.top < triggerPoint) {
          fade.style.opacity = 1;
          fade.style.transform = "translateY(0)";
        } else {
          fade.style.opacity = 0;
          fade.style.transform = "translateY(20px)";
        }
      });
    });
  }

  function handleScroll() {
    lineLights.forEach((lineLight) => {
      const rect = lineLight.getBoundingClientRect();
      const isVisible =
        rect.top <= window.innerHeight * 0.8 &&
        rect.bottom >= window.innerHeight * 0.2;
      if (isVisible) {
        const scrollAmount =
          (rect.bottom - window.innerHeight * 0.2) / (window.innerHeight * 0.6);
        const animationSpeed = 0.3 + scrollAmount * 0.3;
        lineLight.style.transition = `background-size ${animationSpeed}s ease-in-out`;
        lineLight.style.backgroundSize = "100% 1px";
      }
    });
    lineLightsProduct.forEach((lineLight) => {
      const rect = lineLight.getBoundingClientRect();
      const isVisible =
        rect.top <= window.innerHeight * 0.8 &&
        rect.bottom >= window.innerHeight * 0.1;
      if (isVisible) {
        const scrollAmount =
          (rect.bottom - window.innerHeight * 0.1) / (window.innerHeight * 0.6);
        const animationSpeed = 0.3 + scrollAmount * 0.3;
        lineLight.style.transition = `background-size ${animationSpeed}s ease-in-out`;
        lineLight.style.backgroundSize = "100% 1px";
      }
    });
  }
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("DOMContentLoaded", handleScroll);
  textElements02.forEach((textElement) => {
    const wordsAndBrTags = textElement.innerHTML.split(
      /(<br\b[^>]*>|<br class="br-sp">|\s+)/
    );
    textElement.innerHTML = wordsAndBrTags
      .map((item) => {
        if (item.match(/<br\b[^>]*>|<br class="br-sp">|<br class="br-pc">/)) {
          return item;
        } else if (item.trim() !== "") {
          return `<span class="word"><span class="word--text">${item}</span></span>`;
        }
        return item;
      })
      .join(" ");
    const wordSpans = textElement.querySelectorAll(".word--text");
    gsap.fromTo(
      wordSpans,
      { x: "-1.2em" },
      {
        x: 0,
        delay: 0.7,
        duration: 1.2,
        stagger: 0.048,
        ease: "expo.out",
        visibility: "visible",
        scrollTrigger: {
          trigger: textElement,
          start: "top bottom",
          end: "top center",
        },
      }
    );
  });
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function () {
      this.classList.toggle("is-open");
      if (this.classList.contains("is-open")) {
        document.querySelector(".js-nav").classList.remove("is-open");
        document.querySelector(".js-hamburger").classList.remove("is-open");
        document.querySelectorAll(".js-menu").forEach(function (menu) {
          menu.classList.remove("is-visible");
        });
      }
    });
  });
  document.querySelector(".js-overlay").addEventListener("click", function () {
    document.querySelector(".js-nav").classList.remove("is-open");
    this.style.display = "none";
    document.querySelector(".js-hamburger").classList.remove("is-open");
    document.querySelector(".js-header").classList.remove("is-open");
    document.querySelector(".js-drawer-other").classList.remove("is-open");
    document.querySelectorAll(".js-menu").forEach(function (menu) {
      menu.classList.remove("is-visible");
    });
    document.body.classList.remove("is-fixed");
  });
  document.querySelector(".js-nav").addEventListener("click", function () {
    this.classList.remove("is-open");
    document.querySelector(".js-overlay").style.display = "none";
    document.querySelector(".js-hamburger").classList.remove("is-open");
    document.querySelectorAll(".js-menu").forEach(function (menu) {
      menu.classList.remove("is-visible");
    });
    document.querySelector(".js-header").classList.remove("is-open");
    document.querySelector(".js-drawer-other").classList.remove("is-open");
    document.body.classList.remove("is-fixed");
  });
});
const setFillHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
window.addEventListener("resize", setFillHeight);
setFillHeight();
const swiper = new Swiper(".swiper", {
  loop: false,
  speed: 1500,
  slidesPerView: 1.2,
  clickable: true,
  centeredSlides: true,
  spaceBetween: 20,
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  breakpoints: {
    767: {
      slidesPerView: 2.5,
      spaceBetween: 40,
      clickable: true,
      centeredSlides: true,
    },
    1300: {
      slidesPerView: 2.8,
      spaceBetween: 80,
      clickable: true,
      centeredSlides: true,
    },
  },
});

/**
|--------------------------------------------------
| 日本語テキストに半角英数字がある場合にspanタグを付与する
|--------------------------------------------------
*/
document.addEventListener("DOMContentLoaded", function() {
  var languageElements = document.querySelectorAll(".js-language");
  var languageRegex = /([A-Za-z0-9]+)/g;
  var brTagRegex = /(<br\s*\/?>|<br\s+class="br-pc"\s*\/?>|<br\s+class="br-sp"\s*\/?>)/g;

  languageElements.forEach(function(languageElement) {
    var htmlContent = languageElement.innerHTML;
    var parts = htmlContent.split(brTagRegex); // <br> タグおよび class を含む <br> タグで分割

    parts = parts.map(function(part) {
      if (!part.match(brTagRegex)) { // <br> タグでない部分だけを処理
        return part.replace(languageRegex, '<span>$1</span>');
      }
      return part;
    });

    languageElement.innerHTML = parts.join('');
  });
});
