/* RISE project page — nav state, scroll reveal, bibtex copy. */

(function () {
  'use strict';

  // --- sticky nav border once scrolled ---
  var nav = document.getElementById('nav');
  var onScroll = function () {
    nav.classList.toggle('stuck', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // --- highlight the section currently in view ---
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        });
      });
    }, { rootMargin: '-64px 0px -70% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  // --- scroll reveal ---
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) {
    var targets = document.querySelectorAll(
      '.teaser .plate, .stats, .head, .prose, .split > *, .stages, .card, .feature,' +
      '.ds-card, .cta, .table-wrap, .bib-wrap, #method > .container > .plate,' +
      '#results .plate, #dataset .plate'
    );
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.06 });
    Array.prototype.forEach.call(targets, function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (Math.min(i % 4, 3) * 60) + 'ms';
      io.observe(el);
    });
  }

  // --- copy bibtex ---
  var btn = document.getElementById('copy-btn');
  var tick = '<svg viewBox="0 0 24 24" class="ic"><polyline points="20,6 9,17 4,12"/></svg>';
  var clip = '<svg viewBox="0 0 24 24" class="ic"><rect x="9" y="9" width="13" height="13" rx="2"/>' +
             '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';

  if (btn) {
    btn.addEventListener('click', function () {
      var text = document.getElementById('bibtex-text').textContent;
      var done = function () {
        btn.classList.add('done');
        btn.innerHTML = tick + ' Copied';
        setTimeout(function () {
          btn.classList.remove('done');
          btn.innerHTML = clip + ' Copy';
        }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (err) {}
        document.body.removeChild(ta);
      }
    });
  }
})();
