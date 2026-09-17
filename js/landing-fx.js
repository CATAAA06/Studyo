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
     5b. NAVIGAZIONE — sfocatura più marcata dopo lo scroll
     ============================================= */
  (function navScrolled() {
    var nav = document.getElementById('nav');
    if (!nav) return;
    var update = rafThrottle(function () { nav.classList.toggle('on', window.scrollY > 8); });
    window.addEventListener('scroll', update, { passive: true });
    update();
  })();

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

  /* =============================================
     2. FOCUS POCUS — timer Pomodoro funzionante
     Il conto si basa sull'orario di fine, non sul numero di tick:
     resta preciso anche se il browser rallenta la scheda in background.
     ============================================= */
  (function focusWidget() {
    var box = document.getElementById('fpw');
    if (!box) return;

    var ROOMS = {
      rain:   { name: 'Biblioteca Piovosa', sound: 'audio/rain.mp3' },
      fire:   { name: 'Baita sul Fuoco',    sound: 'audio/fire.mp3' },
      cafe:   { name: 'Caffè Letterario',   sound: 'audio/cafe.mp3' },
      forest: { name: 'Foresta Silenziosa', sound: 'audio/nature2.mp3' },
      cosmos: { name: 'Notte Stellata',     sound: 'audio/crickets.mp3' },
      void:   { name: 'Cascata Zen',        sound: 'audio/waterfall.mp3' }
    };

    var elTime = document.getElementById('fpw-time');
    var elBar = document.getElementById('fpw-bar');
    var elRoom = document.getElementById('fpw-room');
    var elStart = document.getElementById('fpw-start');
    var elReset = document.getElementById('fpw-reset');
    var elSound = document.getElementById('fpw-sound');
    var elStatus = document.getElementById('fpw-status');
    var durBtns = [].slice.call(box.querySelectorAll('.fpw-dur'));
    var roomBtns = [].slice.call(document.querySelectorAll('.room[data-room]'));

    var total = 25 * 60, remaining = total, endAt = 0, ticker = null;
    var room = 'cosmos', audio = null, soundOn = false;

    // Stelle / lucciole / scintille (stesso livello, colore diverso per stanza)
    var sky = document.getElementById('sky');
    if (sky && !sky.children.length) {
      var html = '';
      for (var s = 0; s < 40; s++) {
        html += '<span style="left:' + (Math.random() * 100).toFixed(1) + '%;top:' + (Math.random() * 100).toFixed(1) +
                '%;animation-delay:' + (Math.random() * 3.5).toFixed(2) + 's"></span>';
      }
      sky.innerHTML = html;
    }

    function fmt(sec) {
      var m = Math.floor(sec / 60), r = sec % 60;
      return (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r;
    }

    function render() {
      elTime.textContent = fmt(remaining);
      elBar.style.transform = 'scaleX(' + ((total - remaining) / total).toFixed(4) + ')';
    }

    function setRunning(on) {
      box.classList.toggle('is-running', on);
      elStart.textContent = on ? 'Pausa' : (remaining < total ? 'Riprendi' : 'Avvia');
      durBtns.forEach(function (b) { b.disabled = on; });
    }

    function tick() {
      var left = Math.max(0, Math.round((endAt - Date.now()) / 1000));
      if (left !== remaining) { remaining = left; render(); }
      if (left <= 0) complete();
    }

    function start() {
      if (remaining <= 0) remaining = total;
      endAt = Date.now() + remaining * 1000;
      clearInterval(ticker);
      ticker = setInterval(tick, 250);
      elStatus.textContent = '';
      setRunning(true);
    }

    function pause() {
      clearInterval(ticker); ticker = null;
      tick();
      setRunning(false);
    }

    function reset() {
      clearInterval(ticker); ticker = null;
      remaining = total;
      render();
      setRunning(false);
      elStatus.textContent = '';
    }

    function complete() {
      clearInterval(ticker); ticker = null;
      remaining = total;
      elBar.style.transition = 'none';
      render();
      void elBar.offsetWidth;
      elBar.style.transition = '';
      setRunning(false);
      elStatus.innerHTML = 'Sessione completata. Nell\'app ogni sessione vale XP e tiene viva la streak: <a href="app.html">entra su Studyo</a>.';
    }

    elStart.addEventListener('click', function () { ticker ? pause() : start(); });
    elReset.addEventListener('click', reset);

    durBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        if (ticker) return;
        durBtns.forEach(function (x) { x.classList.toggle('is-on', x === b); x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        total = parseInt(b.dataset.min, 10) * 60;
        reset();
      });
    });

    // Suono: il file si scarica solo quando l'utente lo accende
    function playRoomSound() {
      if (!soundOn) return;
      var src = ROOMS[room].sound;
      if (!audio) { audio = new Audio(); audio.loop = true; audio.preload = 'none'; audio.volume = .6; }
      if (audio.getAttribute('src') !== src) audio.setAttribute('src', src);
      var p = audio.play();
      if (p && p.catch) p.catch(function () {
        soundOn = false;
        elSound.setAttribute('aria-pressed', 'false');
        elSound.textContent = 'Suono: off';
      });
    }
    elSound.addEventListener('click', function () {
      soundOn = !soundOn;
      elSound.setAttribute('aria-pressed', soundOn ? 'true' : 'false');
      elSound.textContent = soundOn ? 'Suono: on' : 'Suono: off';
      if (soundOn) playRoomSound(); else if (audio) audio.pause();
    });

    roomBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        room = b.dataset.room;
        if (!ROOMS[room]) return;
        box.dataset.room = room;
        elRoom.textContent = ROOMS[room].name;
        roomBtns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        playRoomSound();
      });
    });

    // Le animazioni dell'atmosfera si fermano quando il widget non è sullo schermo
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        box.classList.toggle('is-offscreen', !es[0].isIntersecting);
      }).observe(box);
    }

    render();
  })();

  /* =============================================
     5a. REVEAL ON SCROLL — un solo sistema per tutto il sito
     Scaglionato tra fratelli (70ms), al massimo 6 passi.
     ============================================= */
  (function reveal() {
    if (!FX || !('IntersectionObserver' in window)) return;

    var groups = [
      'main > section .tag', 'main > section h2', 'main > section .slede', 'main > section .fp-def',
      '.story p', '.story .quote', '.band', '.steps > .step', '.screens > .screen', '.shot-note',
      '.bento > .feat', '.plans > .plan', '.auds > .aud', '.faq > details', '.final .btn', '.final .micro'
    ];
    var els = [];
    groups.forEach(function (sel) {
      [].forEach.call(document.querySelectorAll(sel), function (el) {
        if (el.closest('header') || el.hasAttribute('data-reveal')) return;
        if (el.closest('.band') && !el.classList.contains('band')) return;   // la card entra intera
        el.setAttribute('data-reveal', '');
        // posizione tra i fratelli già marcati → ritardo
        var i = 0, p = el.previousElementSibling;
        while (p) { if (p.hasAttribute('data-reveal')) i++; p = p.previousElementSibling; }
        el.style.setProperty('--d', Math.min(i, 6) * 70 + 'ms');
        els.push(el);
      });
    });

    // Quello che è già sullo schermo si mostra subito: nessun lampeggio
    var vh = window.innerHeight;
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) el.classList.add('is-in');
    });
    root.classList.add('fx-js');

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    els.forEach(function (el) { if (!el.classList.contains('is-in')) io.observe(el); });
  })();

  /* =============================================
     4. PER CHI — ogni card rivela l'elenco (tocco, click, tastiera, hover)
     Funziona anche con movimento ridotto: cambia solo che non scorre.
     ============================================= */
  (function audiences() {
    var cards = [].slice.call(document.querySelectorAll('.aud'));
    if (!cards.length) return;
    root.classList.add('aud-js');

    function setOpen(card, open) {
      card.classList.toggle('is-open', open);
      var btn = card.querySelector('.aud-toggle');
      if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    cards.forEach(function (card) {
      var btn = card.querySelector('.aud-toggle');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var open = !card.classList.contains('is-open');
        // Su touch una sola card aperta alla volta
        if (open && !POINTER) cards.forEach(function (c) { if (c !== card) setOpen(c, false); });
        setOpen(card, open);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && card.classList.contains('is-open')) { setOpen(card, false); btn.focus(); }
      });
    });
  })();

  /* =============================================
     3. BENTO — inclinazione 3D (max 4°) e luce che segue il cursore
     ============================================= */
  (function bento() {
    var grid = document.querySelector('.bento');
    if (!grid) return;

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        grid.classList.toggle('is-offscreen', !es[0].isIntersecting);
      }).observe(grid);
    }

    if (!FX || !POINTER) return;
    [].forEach.call(grid.querySelectorAll('.feat'), function (card) {
      var apply = rafThrottle(function (px, py) {
        card.style.setProperty('--ry', ((px - .5) * 8).toFixed(2) + 'deg');   // ±4°
        card.style.setProperty('--rx', ((.5 - py) * 8).toFixed(2) + 'deg');
        card.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
      });
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        apply((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
      });
      card.addEventListener('pointerleave', function () {
        requestAnimationFrame(function () {
          card.style.setProperty('--rx', '0deg');
          card.style.setProperty('--ry', '0deg');
        });
      });
    });
  })();
})();
