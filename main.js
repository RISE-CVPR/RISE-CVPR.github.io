// Copy BibTeX
function copyBib() {
  const text = document.getElementById('bibtex-text').textContent;
  const btn = document.getElementById('copy-btn');
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add('done');
    btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20,6 9,17 4,12"/></svg> Copied!`;
    setTimeout(() => {
      btn.classList.remove('done');
      btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy`;
    }, 2200);
  });
}

// Scroll fade-in
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(
  '.mcard, .ds-stat, .stat, figure, .abstract-box, .inversion-row, .comp-table'
).forEach(el => {
  el.classList.add('fade-up');
  io.observe(el);
});
