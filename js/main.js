/* ================================================
   MAIN.JS
   Mobile nav, tabs, and module bootstrap.
================================================ */

function initMobileNav() {
  const burger = document.getElementById("nav-burger");
  const links = document.getElementById("nav-links");
  if (!burger || !links) return;

  burger.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    burger.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      burger.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");
  if (!tabButtons.length) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("active")) return;
      const target = btn.dataset.tab;

      tabButtons.forEach((b) => {
        const isMatch = b === btn;
        b.classList.toggle("active", isMatch);
        b.setAttribute("aria-selected", String(isMatch));
      });

      panels.forEach((panel) => {
        if (panel.dataset.panel === target) {
          panel.hidden = false;
          panel.classList.add("is-entering");
          requestAnimationFrame(() => {
            requestAnimationFrame(() => panel.classList.remove("is-entering"));
          });
          panel.classList.add("active");
        } else {
          panel.classList.remove("active");
          panel.hidden = true;
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initTabs();

  if (window.PortfolioCursor) window.PortfolioCursor.init();
  if (window.PortfolioScroll) window.PortfolioScroll.init();
  if (window.PortfolioSound) window.PortfolioSound.init();
});
