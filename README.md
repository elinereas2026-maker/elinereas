# ELINEREAS

Landing informativa en español para visibilizar a las mujeres emprendedoras del centro de Medellín. Inspirada en la identidad rosada de [@elinereas.med](https://www.instagram.com/elinereas.med/).

## Incluye

- Diseño adaptable a móvil, tableta y escritorio.
- Carrusel fotográfico con una imagen protagonista, vistas parciales de las siguientes, flechas grandes, siete indicadores, desplazamiento táctil y navegación por teclado. Las descripciones generales se muestran completas y las fotos se pueden ampliar.
- Composición basada en la referencia de la clienta: portada compacta, cuatro pilares centrados y detalles rosados en los bordes, con una nueva galería dedicada al trabajo cotidiano de las mujeres.
- Misión, visión, propósito y valores proporcionados por el proyecto.
- Llamadas a participar y contacto por Instagram.
- Menú móvil, enlaces accesibles, foco visible y soporte para movimiento reducido.

## Ejecutar

Requiere Node.js 18 o posterior. No necesita instalar dependencias.

```sh
npm run dev
```

Abre `http://127.0.0.1:4173`. Para comprobar archivos, enlaces internos y sintaxis:

```sh
npm run check
```

## Editar

- `dist/index.html`: estructura, misión, visión y textos.
- `dist/styles.css`: diseño, colores y adaptación a dispositivos.
- `dist/app.js`: navegación y menú móvil.
- `dist/gallery.js` y `dist/gallery.css`: fotografías, descripciones generales y carrusel.
- `dist/assets/`: las siete fotos suministradas y el símbolo floral.

Las descripciones de la galería son reflexiones editoriales sobre las fotografías. No atribuyen nombres, testimonios ni datos biográficos a las personas retratadas. No se añadieron entrevistas o cifras sin fuentes. El contacto dirige al perfil real de Instagram; no hay un formulario que almacene datos.

Las fotografías fueron suministradas para este proyecto y se conservan sin alteraciones. Las tipografías Playfair Display, DM Sans y Caveat se cargan desde Google Fonts, con alternativas locales.

## Publicación

`dist/` contiene el sitio estático completo y puede publicarse en GitHub Pages, Cloudflare Pages o cualquier hosting estático. GitHub Pages está configurado con **GitHub Actions** y el workflow incluido publica automáticamente los cambios enviados a `main`.

Dirección de la web: [elinereas2026-maker.github.io/elinereas](https://elinereas2026-maker.github.io/elinereas/).

La configuración adicional de Sites se guarda en `.openai/hosting.json`.

Para actualizar el destino de Open Graph al usar otro dominio, cambia `og:image` en `dist/index.html`.
