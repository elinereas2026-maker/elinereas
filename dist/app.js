'use strict';

// Reflexiones editoriales basadas en las imágenes. No son biografías ni citas.
const stories = [
  { image: 'sonrisa-que-inspira.jpg', category: 'La alegría de seguir', title: 'Una sonrisa que abre caminos', description: 'Un puesto de bebidas también puede ser un lugar de encuentro. Esta imagen nos recuerda la energía de las mujeres que, con su trabajo cotidiano, dan vida a las calles y encuentran motivos para seguir adelante.', alt: 'Una vendedora sonríe detrás de un puesto de bebidas con vasos de jugo.', position: 'center' },
  { image: 'mujeres-del-tinto.jpg', category: 'El valor de emprender', title: 'El impulso de empezar', description: 'Un termo, un carrito y la disposición de salir cada día. En estos retratos, el café nos acerca a mujeres que hacen del emprendimiento una forma de avanzar. Reconocer su trabajo es reconocer su lugar en la vida de la ciudad.', alt: 'Dos retratos de mujeres junto a sus puestos de café y bebidas, con termos verdes y blancos.', position: 'center' },
  { image: 'frutos-del-esfuerzo.jpg', category: 'Constancia que florece', title: 'Los frutos de la constancia', description: 'Entre frutas, colores y productos de todos los días, una mujer atiende su puesto. Su presencia nos invita a valorar el cuidado que hay detrás del comercio de barrio y a mirar con gratitud el trabajo que nos acompaña a diario.', alt: 'Una mujer organiza plátanos en un puesto rodeado de frutas y verduras.', position: 'center' },
  { image: 'comercio-textil.jpg', category: 'Saberes que permanecen', title: 'La experiencia también inspira', description: 'Detrás de un puesto de ropa hay atención, organización y tiempo. Este retrato nos invita a reconocer la presencia de las mujeres mayores en el comercio y el valor de una experiencia que sigue haciendo parte de nuestra ciudad.', alt: 'Una mujer mayor con gafas permanece junto a un puesto de prendas de vestir.', position: 'center' },
  { image: 'venta-cotidiana.jpg', category: 'Dedicación cotidiana', title: 'Cada detalle cuenta', description: 'Organizar los productos, atender el puesto y estar pendiente de cada detalle son parte del trabajo que muchas veces pasa desapercibido. En lo cotidiano también hay capacidad, dedicación y una manera de construir nuevas oportunidades.', alt: 'Una mujer organiza productos en un puesto callejero de dulces, pasabocas y bebidas.', position: 'center' },
  { image: 'camino-propio.jpg', category: 'Salir adelante', title: 'Un camino propio', description: 'Las calles del centro son también lugares de trabajo. Un carrito y un recorrido hablan de la iniciativa de quienes encuentran en el comercio una forma de avanzar. Esta imagen nos invita a mirar esos caminos con respeto y empatía.', alt: 'Una mujer camina junto a un carrito de productos por una calle comercial.', position: 'center' },
  { image: 'encuentros-del-centro.jpg', category: 'Tejer comunidad', title: 'El valor de estar presente', description: 'En un pequeño puesto se cruzan conversaciones, compras y encuentros. Las mujeres que trabajan en estos espacios hacen parte del tejido cotidiano del centro. Acercarnos a su trabajo es una forma de reconocerlas y construir comunidad.', alt: 'Una mujer atiende su puesto de productos y bebidas mientras un hombre se acerca.', position: 'center' }
];

let currentStory = 0;
const image = document.querySelector('#story-image');
const title = document.querySelector('#story-title');
const description = document.querySelector('#story-description');
const category = document.querySelector('#story-category');
const photoOpen = document.querySelector('.photo-open');
const thumbnails = Array.from(document.querySelectorAll('[data-story]'));
const dialog = document.querySelector('#photo-dialog');
const dialogImage = document.querySelector('#dialog-image');
const dialogCaption = document.querySelector('#dialog-caption');

function showStory(index) {
  currentStory = (index + stories.length) % stories.length;
  const story = stories[currentStory];
  image.src = `assets/${story.image}`;
  image.alt = story.alt;
  image.style.objectPosition = story.position;
  title.textContent = story.title;
  description.textContent = story.description;
  category.textContent = story.category;
  document.querySelector('#story-number').textContent = String(currentStory + 1).padStart(2, '0');
  photoOpen.setAttribute('aria-label', `Ampliar fotografía: ${story.title}`);
  thumbnails.forEach((thumbnail, i) => {
    thumbnail.classList.toggle('selected', i === currentStory);
    thumbnail.setAttribute('aria-pressed', String(i === currentStory));
  });
  if (dialog.open) updateDialog();
}

function updateDialog() {
  const story = stories[currentStory];
  dialogImage.src = `assets/${story.image}`;
  dialogImage.alt = story.alt;
  dialogCaption.textContent = `${currentStory + 1} / ${stories.length} — ${story.title}`;
}

document.querySelector('#previous-story').addEventListener('click', () => showStory(currentStory - 1));
document.querySelector('#next-story').addEventListener('click', () => showStory(currentStory + 1));
thumbnails.forEach(thumbnail => thumbnail.addEventListener('click', () => showStory(Number(thumbnail.dataset.story))));
document.querySelector('.story-viewer').addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    showStory(currentStory + (event.key === 'ArrowRight' ? 1 : -1));
  }
});

// El carrusel no avanza solo: la lectura y el movimiento quedan en manos de cada visitante.
let touchStart = null;
photoOpen.addEventListener('touchstart', event => {
  touchStart = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
}, { passive: true });
let suppressPhotoClick = false;
photoOpen.addEventListener('touchend', event => {
  if (!touchStart) return;
  const dx = event.changedTouches[0].clientX - touchStart.x;
  const dy = event.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.3) {
    suppressPhotoClick = true;
    showStory(currentStory + (dx < 0 ? 1 : -1));
    setTimeout(() => { suppressPhotoClick = false; }, 400);
  }
  touchStart = null;
}, { passive: true });

photoOpen.addEventListener('click', () => {
  if (suppressPhotoClick) return;
  updateDialog();
  dialog.showModal();
  document.body.classList.add('dialog-open');
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  photoOpen.focus({ preventScroll: true });
});
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    showStory(currentStory + (event.key === 'ArrowRight' ? 1 : -1));
  }
});

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
  ['inicio', 'historias', 'nosotras', 'comunidad'].forEach(id => observer.observe(document.getElementById(id)));
}
document.querySelector('#year').textContent = String(new Date().getFullYear());
