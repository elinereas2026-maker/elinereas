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
