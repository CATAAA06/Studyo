/* =============================================
   STUDYO — LANDING FX
   Nessuna libreria: IntersectionObserver, requestAnimationFrame e CSS.
   Tutto ciò che si muove passa da transform/translate/opacity.
   ============================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  var FX = root.classList.contains('fx');              // movimento consentito
  var POINTER = root.classList.contains('fx-pointer'); // mouse vero (non touch)

  // requestAnimationFrame con un solo aggiornamento per fotogramma
  function rafThrottle(fn) {
    var queued = false, lastArgs;
    return function () {
      lastArgs = arguments;
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; fn.apply(null, lastArgs); });
    };
  }

  /* =============================================
     1. HERO
     ============================================= */

  // Materie a rotazione: si ferma quando non è visibile o la scheda è in background
  (function rotator() {
    var items = [].slice.call(document.querySelectorAll('.rot-item'));
    if (!FX || items.length < 2) return;
    var i = 0, timer = null, visible = true;

    function step() {
      var cur = items[i];
      i = (i + 1) % items.length;
      var next = items[i];
      cur.classList.remove('is-on');
      cur.classList.add('is-out');
      next.classList.remove('is-out');
      next.classList.add('is-on');
      setTimeout(function () { cur.classList.remove('is-out'); }, 460);
    }
    function start() { if (!timer && visible && !document.hidden) timer = setInterval(step, 2500); }
    function stop() { clearInterval(timer); timer = null; }

    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        visible ? start() : stop();
      }).observe(items[0].closest('.rotator'));
    }
    start();
  })();

  // Griglia di puntini: parallax leggerissimo (max 8px), solo con il mouse
  (function dotParallax() {
    var header = document.querySelector('header');
    if (!FX || !POINTER || !header) return;
    var move = rafThrottle(function (x, y) {
      header.style.setProperty('--px', x.toFixed(1) + 'px');
      header.style.setProperty('--py', y.toFixed(1) + 'px');
    });
    header.addEventListener('pointermove', function (e) {
      var r = header.getBoundingClientRect();
      move(((e.clientX - r.left) / r.width - .5) * -16, ((e.clientY - r.top) / r.height - .5) * -16);
    });
    header.addEventListener('pointerleave', function () { move(0, 0); });
  })();

  // Pulsanti "magnetici": seguono il cursore di pochi pixel (max 6px)
  (function magnetic() {
    if (!FX || !POINTER) return;
    [].forEach.call(document.querySelectorAll('.magnetic'), function (el) {
      var set = rafThrottle(function (x, y) {
        el.style.setProperty('--mx', x.toFixed(1) + 'px');
        el.style.setProperty('--my', y.toFixed(1) + 'px');
      });
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        var dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        set(Math.max(-1, Math.min(1, dx)) * 6, Math.max(-1, Math.min(1, dy)) * 4);
      });
      el.addEventListener('pointerleave', function () { set(0, 0); });
    });
  })();
})();
