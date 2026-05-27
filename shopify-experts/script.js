/* ── Sticky header ── */
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  backTop.classList.toggle('visible', window.scrollY > 400);
});

/* ── Burger menu ── */
const burger = document.getElementById('burger');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ── Back to top ── */
backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));



/* ── FAQ accordion ── */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.classList.contains('open');
    document.querySelectorAll('.faq-q').forEach(b => { b.classList.remove('open'); b.nextElementSibling.classList.remove('open'); });
    if (!isOpen) { btn.classList.add('open'); btn.nextElementSibling.classList.add('open'); }
  });
});


/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll(
  '.step-card, .price-card, .testi-card, .faq-item, .feat-split, .chip, .logo-pill, .stat-item, .testi-case'
);
revealEls.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver(entries => {
  entries.forEach((en, i) => {
    if (en.isIntersecting) {
      setTimeout(() => en.target.classList.add('visible'), i * 55);
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
revealEls.forEach(el => io.observe(el));

/* ── Stat counters ── */
function countUp(el, target, isFloat) {
  const dur = 1800;
  const start = performance.now();
  const tick = now => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = isFloat ? (eased * target).toFixed(1) : Math.floor(eased * target);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const statsSection = document.querySelector('.stats-band');
let counted = false;
new IntersectionObserver(([e]) => {
  if (e.isIntersecting && !counted) {
    counted = true;
    document.querySelectorAll('.stat-n').forEach(el => {
      const t = parseFloat(el.dataset.target);
      const f = el.dataset.float === 'true';
      countUp(el, t, f);
    });
  }
}, { threshold: 0.5 }).observe(statsSection);
