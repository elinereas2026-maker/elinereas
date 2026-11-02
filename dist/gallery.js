'use strict';

// Reflexiones editoriales basadas en las imágenes. No son biografías ni citas.
const portraits = [
  { image: 'sonrisa-que-inspira.jpg', category: 'La alegría de seguir', title: 'Una sonrisa que abre caminos', description: 'Detrás de cada jornada hay una mujer que lucha por sus sueños, trabaja con valentía y construye un futuro mejor para ella y su familia. Mujeres que convierten sus ideas en oportunidades y sus esfuerzos en sueños que poco a poco se hacen realidad.', alt: 'Una vendedora sonríe detrás de un puesto de bebidas con vasos de jugo.', position: 'center' },
  { image: 'mujeres-del-tinto.jpg', category: 'El valor de emprender', title: 'El impulso de empezar', description: 'Hay mujeres que comienzan el día con una idea y la valentía de hacerla realidad. Entre el aroma del café y el movimiento de la ciudad, el emprendimiento abre caminos para salir adelante. Cada jornada es una oportunidad para crecer y acercarse a sus sueños.', alt: 'Dos retratos de mujeres junto a sus puestos de café y bebidas, con termos verdes y blancos.', position: 'center' },
  { image: 'frutos-del-esfuerzo.jpg', category: 'Constancia que florece', title: 'Los frutos de la constancia', description: 'Los sueños también se cultivan con paciencia, dedicación y trabajo diario. Entre los colores de la ciudad, hay mujeres que ponen el corazón en lo que hacen y convierten su esfuerzo en oportunidades. Paso a paso, la constancia hace florecer la esperanza de un futuro mejor.', alt: 'Una mujer organiza plátanos en un puesto rodeado de frutas y verduras.', position: 'center' },
  { image: 'comercio-textil.jpg', category: 'Saberes que permanecen', title: 'La experiencia también inspira', description: 'Hay mujeres cuya experiencia nos enseña el valor de perseverar. En sus manos se reconoce la dedicación de quienes siguen construyendo oportunidades con su trabajo. Su presencia nos inspira a valorar cada esfuerzo y a recordar que siempre hay sueños por los que vale la pena seguir.', alt: 'Una mujer mayor con gafas permanece junto a un puesto de prendas de vestir.', position: 'center' },
  { image: 'venta-cotidiana.jpg', category: 'Dedicación cotidiana', title: 'Cada detalle cuenta', description: 'Detrás de cada pequeño negocio hay ideas, dedicación y sueños que merecen crecer. Mujeres que ponen empeño en cada detalle y encuentran en su trabajo una forma de salir adelante. Con valentía y constancia, convierten las tareas de cada día en pasos hacia nuevas oportunidades.', alt: 'Una mujer organiza productos en un puesto callejero de dulces, pasabocas y bebidas.', position: 'center' },
  { image: 'camino-propio.jpg', category: 'Salir adelante', title: 'Un camino propio', description: 'Salir adelante es atreverse a dar un paso más, incluso cuando el camino exige esfuerzo. Hay mujeres que recorren la ciudad con la determinación de construir sus propias oportunidades. Su trabajo y su valentía nos recuerdan que los grandes sueños también avanzan con pequeños pasos.', alt: 'Una mujer camina junto a un carrito de productos por una calle comercial.', position: 'center' },
  { image: 'encuentros-del-centro.jpg', category: 'Tejer comunidad', title: 'El valor de estar presente', description: 'Hay mujeres que, con su trabajo de cada día, hacen crecer mucho más que un negocio: construyen encuentros, confianza y comunidad. Su dedicación nos inspira a reconocerlas y acompañarlas. Porque cuando valoramos su esfuerzo, también ayudamos a que sus sueños encuentren nuevas posibilidades.', alt: 'Una mujer atiende su puesto de productos y bebidas mientras un hombre se acerca.', position: 'center' }
];

const track = document.querySelector('.photo-track');
const caption = {
  title: document.querySelector('#photo-title'),
  category: document.querySelector('#photo-category'),
  description: document.querySelector('#photo-description'),
  number: document.querySelector('#photo-number')
};
const dots = document.querySelector('#photo-dots');
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const dialog = document.querySelector('#photo-dialog');
let activePhoto = 0;
let requestedPhoto = 0;
let enlargedPhoto = 0;
let lastPhotoOpener = null;
let settleTimer;
const slides = [];
const selectors = [];
const pad = number => String(number + 1).padStart(2, '0');

portraits.forEach((portrait, index) => {
  const slide = document.createElement('figure');
  slide.className = 'photo-slide';
  slide.setAttribute('role', 'group');
  slide.setAttribute('aria-roledescription', 'diapositiva');
  slide.setAttribute('aria-label', 'Fotografía ' + (index + 1) + ' de ' + portraits.length);
  const opener = document.createElement('button');
  opener.className = 'photo-enlarge';
  opener.setAttribute('aria-label', 'Ampliar fotografía: ' + portrait.title);
  opener.setAttribute('aria-haspopup', 'dialog');
  const image = document.createElement('img');
  image.src = 'assets/' + portrait.image;
  image.alt = portrait.alt;
  image.loading = index === 0 ? 'eager' : 'lazy';
  image.width = 1080;
  image.height = 734;
  const expandLabel = document.createElement('span');
  expandLabel.className = 'photo-expand-label';
  expandLabel.setAttribute('aria-hidden', 'true');
  expandLabel.textContent = 'Ampliar foto ';
  const expandIcon = document.createElement('span');
  expandIcon.textContent = '⤢';
  expandLabel.append(expandIcon);
  opener.append(image, expandLabel);
  opener.addEventListener('click', () => {
    lastPhotoOpener = opener;
    enlargePhoto(index);
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
  slide.append(opener);
  track.append(slide);
  slides.push(slide);

  const dot = document.createElement('button');
  dot.className = 'photo-dot';
  dot.setAttribute('aria-label', 'Ver fotografía ' + (index + 1) + ': ' + portrait.title);
  dot.addEventListener('click', () => goToPhoto(index));
  selectors.push(dot);
  dots.append(dot);
});

function activatePhoto(index) {
  activePhoto = index;
  const portrait = portraits[index];
  caption.title.textContent = portrait.title;
  caption.category.textContent = portrait.category;
  caption.description.textContent = portrait.description;
  caption.number.textContent = pad(index);
  slides.forEach((slide, i) => {
    slide.classList.toggle('is-active', i === index);
    slide.inert = i !== index;
    slide.setAttribute('aria-hidden', String(i !== index));
    selectors[i].setAttribute('aria-pressed', String(i === index));
  });
}

function photoOffset(index) {
  return slides[index].offsetLeft - (track.clientWidth - slides[index].offsetWidth) / 2;
}

function goToPhoto(index, instant = false) {
  const target = (index + portraits.length) % portraits.length;
  requestedPhoto = target;
  const wraps = Math.abs(target - activePhoto) > 1;
  track.scrollTo({ left: photoOffset(target), behavior: instant || motion.matches || wraps ? 'instant' : 'smooth' });
}

track.addEventListener('scroll', () => {
  clearTimeout(settleTimer);
  settleTimer = setTimeout(() => {
    let closest = 0;
    let distance = Infinity;
    slides.forEach((slide, index) => {
      const delta = Math.abs(photoOffset(index) - track.scrollLeft);
      if (delta < distance) { distance = delta; closest = index; }
    });
    requestedPhoto = closest;
    if (closest !== activePhoto) activatePhoto(closest);
  }, 100);
}, { passive: true });

document.querySelector('#previous-photo').addEventListener('click', () => goToPhoto(requestedPhoto - 1));
document.querySelector('#next-photo').addEventListener('click', () => goToPhoto(requestedPhoto + 1));
document.querySelector('.photo-carousel').addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    goToPhoto(requestedPhoto + (event.key === 'ArrowRight' ? 1 : -1));
  } else if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault();
    goToPhoto(event.key === 'Home' ? 0 : portraits.length - 1);
  }
});
new ResizeObserver(() => goToPhoto(activePhoto, true)).observe(track);
activatePhoto(0);

function enlargePhoto(index) {
  enlargedPhoto = (index + portraits.length) % portraits.length;
  const portrait = portraits[enlargedPhoto];
  document.querySelector('#lightbox-image').src = 'assets/' + portrait.image;
  document.querySelector('#lightbox-image').alt = portrait.alt;
  document.querySelector('#lightbox-caption').textContent = pad(enlargedPhoto) + ' / 07 · ' + portrait.title;
}
document.querySelector('#lightbox-previous').addEventListener('click', () => enlargePhoto(enlargedPhoto - 1));
document.querySelector('#lightbox-next').addEventListener('click', () => enlargePhoto(enlargedPhoto + 1));
document.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    enlargePhoto(enlargedPhoto + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  lastPhotoOpener?.focus({ preventScroll: true });
});
