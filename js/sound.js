/* ================================================
   SOUND.JS
   Centralized Web Audio module: hover / click /
   section-transition sounds. Muted by default,
   state persisted in localStorage. Fails silently
   if audio files are missing.
================================================ */

window.PortfolioSound = (function () {
  const STORAGE_KEY = "portfolio-sound-enabled";

  const SOUND_FILES = {
    hover: "assets/sounds/hover.mp3",
    click: "assets/sounds/click.mp3",
    transition: "assets/sounds/transition.mp3",
  };

  const HOVER_THROTTLE = 80;

  let audioCtx = null;
  let masterGain = null;
  let enabled = false;
  let lastHoverTime = 0;
  const buffers = {};

  function getContext() {
    if (audioCtx) return audioCtx;

    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return null;

    audioCtx = new AudioCtor();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.5;
    masterGain.connect(audioCtx.destination);
    return audioCtx;
  }

  async function loadSound(name, url) {
    const ctx = getContext();
    if (!ctx) return;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("missing audio file");
      const arrayBuffer = await response.arrayBuffer();
      buffers[name] = await ctx.decodeAudioData(arrayBuffer);
    } catch (err) {
      buffers[name] = null;
    }
  }

  function play(name) {
    if (!enabled) return;
    const ctx = getContext();
    if (!ctx || !buffers[name]) return;

    if (ctx.state === "suspended") ctx.resume();

    const source = ctx.createBufferSource();
    source.buffer = buffers[name];
    source.connect(masterGain);
    source.start(0);
  }

  function setEnabled(value) {
    enabled = value;
    localStorage.setItem(STORAGE_KEY, value ? "1" : "0");

    const btn = document.getElementById("sound-toggle");
    if (btn) {
      btn.classList.toggle("is-on", enabled);
      btn.setAttribute("aria-pressed", String(enabled));
      btn.setAttribute("aria-label", enabled ? "Couper le son" : "Activer le son");
    }

    if (enabled) {
      const ctx = getContext();
      if (ctx && ctx.state === "suspended") ctx.resume();
    }
  }

  function initToggle() {
    enabled = localStorage.getItem(STORAGE_KEY) === "1";

    const btn = document.getElementById("sound-toggle");
    if (!btn) return;

    btn.classList.toggle("is-on", enabled);
    btn.setAttribute("aria-pressed", String(enabled));
    btn.setAttribute("aria-label", enabled ? "Couper le son" : "Activer le son");

    btn.addEventListener("click", () => setEnabled(!enabled));
  }

  function initInteractionSounds() {
    document.addEventListener("mouseover", (e) => {
      const target = e.target.closest("a, button, .skill-tag, .tab-btn, .tilt");
      if (!target) return;

      const now = performance.now();
      if (now - lastHoverTime < HOVER_THROTTLE) return;
      lastHoverTime = now;

      play("hover");
    });

    document.addEventListener("click", (e) => {
      const target = e.target.closest("a, button");
      if (!target) return;
      play("click");
    });

    document.addEventListener("section:enter", () => play("transition"));
  }

  function init() {
    loadSound("hover", SOUND_FILES.hover);
    loadSound("click", SOUND_FILES.click);
    loadSound("transition", SOUND_FILES.transition);

    initToggle();
    initInteractionSounds();
  }

  return { init };
})();
