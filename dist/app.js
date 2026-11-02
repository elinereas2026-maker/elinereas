'use strict';

// Reflexiones editoriales basadas en las imágenes. No son biografías ni citas.
const stories = [
  { image: 'sonrisa-que-inspira.jpg', category: 'La alegría de seguir', title: 'Una sonrisa que abre caminos', description: 'Detrás de cada jornada hay una mujer que lucha por sus sueños, trabaja con valentía y construye un futuro mejor para ella y su familia. Mujeres que convierten sus ideas en oportunidades y sus esfuerzos en sueños que poco a poco se hacen realidad.', alt: 'Una vendedora sonríe detrás de un puesto de bebidas con vasos de jugo.', position: 'center' },
  { image: 'mujeres-del-tinto.jpg', category: 'El valor de emprender', title: 'El impulso de empezar', description: 'Hay mujeres que comienzan el día con una idea y la valentía de hacerla realidad. Entre el aroma del café y el movimiento de la ciudad, el emprendimiento abre caminos para salir adelante. Cada jornada es una oportunidad para crecer y acercarse a sus sueños.', alt: 'Dos retratos de mujeres junto a sus puestos de café y bebidas, con termos verdes y blancos.', position: 'center' },
  { image: 'frutos-del-esfuerzo.jpg', category: 'Constancia que florece', title: 'Los frutos de la constancia', description: 'Los sueños también se cultivan con paciencia, dedicación y trabajo diario. Entre los colores de la ciudad, hay mujeres que ponen el corazón en lo que hacen y convierten su esfuerzo en oportunidades. Paso a paso, la constancia hace florecer la esperanza de un futuro mejor.', alt: 'Una mujer organiza plátanos en un puesto rodeado de frutas y verduras.', position: 'center' },
  { image: 'comercio-textil.jpg', category: 'Saberes que permanecen', title: 'La experiencia también inspira', description: 'Hay mujeres cuya experiencia nos enseña el valor de perseverar. En sus manos se reconoce la dedicación de quienes siguen construyendo oportunidades con su trabajo. Su presencia nos inspira a valorar cada esfuerzo y a recordar que siempre hay sueños por los que vale la pena seguir.', alt: 'Una mujer mayor con gafas permanece junto a un puesto de prendas de vestir.', position: 'center' },
  { image: 'venta-cotidiana.jpg', category: 'Dedicación cotidiana', title: 'Cada detalle cuenta', description: 'Detrás de cada pequeño negocio hay ideas, dedicación y sueños que merecen crecer. Mujeres que ponen empeño en cada detalle y encuentran en su trabajo una forma de salir adelante. Con valentía y constancia, convierten las tareas de cada día en pasos hacia nuevas oportunidades.', alt: 'Una mujer organiza productos en un puesto callejero de dulces, pasabocas y bebidas.', position: 'center' },
  { image: 'camino-propio.jpg', category: 'Salir adelante', title: 'Un camino propio', description: 'Salir adelante es atreverse a dar un paso más, incluso cuando el camino exige esfuerzo. Hay mujeres que recorren la ciudad con la determinación de construir sus propias oportunidades. Su trabajo y su valentía nos recuerdan que los grandes sueños también avanzan con pequeños pasos.', alt: 'Una mujer camina junto a un carrito de productos por una calle comercial.', position: 'center' },
  { image: 'encuentros-del-centro.jpg', category: 'Tejer comunidad', title: 'El valor de estar presente', description: 'Hay mujeres que, con su trabajo de cada día, hacen crecer mucho más que un negocio: construyen encuentros, confianza y comunidad. Su dedicación nos inspira a reconocerlas y acompañarlas. Porque cuando valoramos su esfuerzo, también ayudamos a que sus sueños encuentren nuevas posibilidades.', alt: 'Una mujer atiende su puesto de productos y bebidas mientras un hombre se acerca.', position: 'center' }
];

const rail = document.querySelector('.story-rail');
const dialog = document.querySelector('#photo-dialog');
let currentStory = 0;
let lastOpener = null;
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const pad = number => String(number).padStart(2, '0');

function element(tag, className, text) {
  const node = document.createElement(tag);
  node.className = className;
  if (text) node.textContent = text;
  return node;
}

stories.forEach((story, index) => {
  const card = element('article', 'story-card');
  card.setAttribute('aria-label', 'Historia ' + (index + 1) + ' de 7: ' + story.title);
  const photo = element('button', 'card-photo');
  photo.setAttribute('aria-label', 'Ver fotografía e historia: ' + story.title);
  photo.setAttribute('aria-haspopup', 'dialog');
  const image = document.createElement('img');
  image.src = 'assets/' + story.image;
  image.alt = story.alt;
  image.loading = 'lazy';
  image.width = 1080;
  image.height = 734;
  photo.append(image);
  const copy = element('div', 'card-copy');
  const category = element('span', 'eyebrow', story.category);
  const title = element('h3', '', story.title);
  const description = element('p', '', story.description);
  const link = element('button', 'card-link', 'Conoce su historia ');
  const arrow = element('span', '', '→');
  arrow.setAttribute('aria-hidden', 'true');
  link.append(arrow);
  link.setAttribute('aria-label', 'Leer historia: ' + story.title);
  link.setAttribute('aria-haspopup', 'dialog');
  [photo, link].forEach(button => button.addEventListener('click', () => {
    lastOpener = button;
    showStory(index);
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }));
  copy.append(category, title, description, link);
  card.append(photo, copy);
  rail.append(card);
});

function galleryState() {
  const cardWidth = rail.firstElementChild.getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(rail).columnGap);
  const step = cardWidth + gap;
  const visible = Math.max(1, Math.floor((rail.clientWidth + gap + 1) / step));
  const max = Math.max(0, stories.length - visible);
  const index = Math.min(max, Math.max(0, Math.round(rail.scrollLeft / step)));
  return { index, visible, max, step };
}

function updateRange() {
  const state = galleryState();
  const end = Math.min(stories.length, state.index + state.visible);
  document.querySelector('#gallery-range').textContent = state.visible === 1 ? pad(state.index + 1) : pad(state.index + 1) + '–' + pad(end);
}

function moveGallery(direction) {
  const state = galleryState();
  let index = state.index + direction;
  if (index > state.max) index = 0;
  if (index < 0) index = state.max;
  rail.scrollTo({ left: index * state.step, behavior: motion.matches ? 'instant' : 'smooth' });
}

document.querySelector('#previous-story').addEventListener('click', () => moveGallery(-1));
document.querySelector('#next-story').addEventListener('click', () => moveGallery(1));
rail.addEventListener('scroll', updateRange, { passive: true });
new ResizeObserver(updateRange).observe(rail);
rail.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    moveGallery(event.key === 'ArrowRight' ? 1 : -1);
  }
});
updateRange();

function showStory(index) {
  currentStory = (index + stories.length) % stories.length;
  const story = stories[currentStory];
  document.querySelector('#dialog-image').src = 'assets/' + story.image;
  document.querySelector('#dialog-image').alt = story.alt;
  document.querySelector('#dialog-title').textContent = story.title;
  document.querySelector('#dialog-category').textContent = story.category;
  document.querySelector('#dialog-description').textContent = story.description;
  document.querySelector('#dialog-counter').textContent = pad(currentStory + 1) + ' / 07';
}

document.querySelector('#dialog-previous').addEventListener('click', () => showStory(currentStory - 1));
document.querySelector('#dialog-next').addEventListener('click', () => showStory(currentStory + 1));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  lastOpener?.focus({ preventScroll: true });
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
  ['inicio', 'historias', 'voces', 'nosotras', 'contacto'].forEach(id => observer.observe(document.getElementById(id)));
}
document.querySelector('#year').textContent = String(new Date().getFullYear());
