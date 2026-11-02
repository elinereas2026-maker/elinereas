# ELINEREAS

Landing informativa en español para visibilizar a las mujeres emprendedoras del centro de Medellín. Inspirada en la identidad rosada de [@elinereas.med](https://www.instagram.com/elinereas.med/).

## Incluye

- Diseño adaptable a móvil, tableta y escritorio.
- Carrusel de siete tarjetas con tres historias visibles en escritorio, desplazamiento táctil, flechas y navegación por teclado. Cada tarjeta abre su fotografía y descripción completa.
- Composición basada en la referencia de la clienta: portada compacta, cuatro pilares centrados, historias junto a su presentación, sección de voces y detalles rosados en los bordes.
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
- `dist/app.js`: imágenes, textos del carrusel e interacciones.
- `dist/assets/`: las siete fotos suministradas y el símbolo floral.

Las descripciones de la galería son reflexiones editoriales sobre las fotografías. No atribuyen nombres, testimonios ni datos biográficos a las personas retratadas. No se añadieron entrevistas o cifras sin fuentes. El contacto dirige al perfil real de Instagram; no hay un formulario que almacene datos.

Las fotografías fueron suministradas para este proyecto y se conservan sin alteraciones. Las tipografías Playfair Display y DM Sans se cargan desde Google Fonts, con Georgia y Arial como alternativas locales.

## Publicación

`dist/` contiene el sitio estático completo y puede publicarse en GitHub Pages, Cloudflare Pages o cualquier hosting estático. El workflow incluido publica en GitHub Pages desde `main` una vez que Pages esté configurado con **GitHub Actions** como fuente en la configuración del repositorio. La configuración de Sites se guarda en `.openai/hosting.json`.

Para actualizar el destino de Open Graph al usar otro dominio, cambia `og:image` en `dist/index.html`.
