const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navegacion');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); menuToggle.focus(); }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 701px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const navLinks = Array.from(document.querySelectorAll('.nav-link'));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  ['inicio', 'historias', 'voces', 'nosotras', 'contacto'].forEach(id => observer.observe(document.getElementById(id)));
}
document.querySelector('#year').textContent = String(new Date().getFullYear());
