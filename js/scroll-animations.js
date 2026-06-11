/* ================================================
   SCROLL-ANIMATIONS.JS
   Reveal on scroll, hero title split, counters,
   custom smooth scroll, hero parallax, active nav.
================================================ */

window.PortfolioScroll = (function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function initReveal() {
    const items = document.querySelectorAll(".reveal");

    items.forEach((el) => {
      const siblings = Array.from(el.parentElement.children).filter((c) =>
        c.classList.contains("reveal")
      );
      const index = siblings.indexOf(el);
      el.style.setProperty("--reveal-delay", `${Math.min(index * 0.1, 0.5)}s`);
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((el) => observer.observe(el));
  }

  function initHeroSplit() {
    const title = document.querySelector("[data-split-text]");
    if (!title) return;

    const text = title.textContent.trim();
    title.textContent = "";

    text.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = char === " " ? " " : char;
      span.style.setProperty("--char-delay", `${i * 0.04}s`);
      title.appendChild(span);
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => title.classList.add("is-revealed"));
    });
  }

  function initCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const target = parseFloat(el.dataset.target);
          const suffix = el.dataset.suffix || "";
          const duration = 1200;
          const start = performance.now();

          function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target * eased;
            el.textContent = (Number.isInteger(target) ? Math.round(value) : value.toFixed(1)) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          obs.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("href");
        if (!id || id.length < 2) return;

        const target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();

        const navHeight = document.querySelector(".navbar")?.offsetHeight || 0;
        const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;

        if (reduceMotion) {
          window.scrollTo(0, targetY);
          return;
        }

        const startY = window.scrollY;
        const distance = targetY - startY;
        const duration = Math.min(Math.abs(distance) / 1.5, 1000);
        const startTime = performance.now();

        function ease(t) {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function step(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          window.scrollTo(0, startY + distance * ease(progress));
          if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
      });
    });
  }

  function initParallax() {
    if (reduceMotion || !canHover) return;

    const hero = document.querySelector(".hero");
    const heroBg = document.querySelector(".hero-bg");
    if (!hero || !heroBg) return;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width - 0.5;
      targetY = (e.clientY - rect.top) / rect.height - 0.5;
    });

    function tick() {
      curX += (targetX - curX) * 0.05;
      curY += (targetY - curY) * 0.05;
      heroBg.style.transform = `translate(${curX * 30}px, ${curY * 30}px)`;
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function initSectionGraphics() {
    const charts = document.querySelectorAll(".market-chart, .volume-chart");
    if (!charts.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    charts.forEach((chart) => observer.observe(chart));
  }

  function initScrollProgress() {
    const root = document.documentElement;
    let ticking = false;

    function update() {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      root.style.setProperty("--scroll", progress.toFixed(4));
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    });

    update();
  }

  function initSectionTracking() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    if (!sections.length) return;

    let lastId = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;

          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
          });

          if (id !== lastId) {
            lastId = id;
            document.dispatchEvent(new CustomEvent("section:enter", { detail: { id } }));
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function init() {
    initReveal();
    initHeroSplit();
    initCounters();
    initSmoothScroll();
    initParallax();
    initSectionGraphics();
    initScrollProgress();
    initSectionTracking();
  }

  return { init };
})();
