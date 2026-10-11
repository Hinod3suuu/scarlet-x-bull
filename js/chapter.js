"use strict";

document.addEventListener("DOMContentLoaded", () => {

  // ========================================
  // READING PROGRESS INDICATOR
  // ========================================

  const progressBar = document.createElement("div");

  progressBar.className = "reading-progress";
  progressBar.setAttribute("aria-hidden", "true");

  document.body.appendChild(progressBar);

  let ticking = false;

  function updateReadingProgress() {
    const scrollTop = window.scrollY;

    const scrollHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      scrollHeight > 0
        ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100))
        : 100;

    progressBar.style.width = `${progress}%`;

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateReadingProgress);
        ticking = true;
      }
    },
    { passive: true }
  );

  window.addEventListener("resize", updateReadingProgress);

  updateReadingProgress();

  // ========================================
  // SCROLL-TRIGGERED IMAGE REVEALS
  // ========================================

  const images = document.querySelectorAll(".chapter-image");

  if (!("IntersectionObserver" in window)) {
    images.forEach((image) => {
      image.classList.add("is-visible");
    });

    return;
  }

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  images.forEach((image) => {
    imageObserver.observe(image);
  });

});