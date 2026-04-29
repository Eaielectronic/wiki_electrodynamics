/**
 * mcmeta-anim.js
 * Anime les textures Minecraft "sprite sheet" (PNG vertical multi-frames)
 * en lisant les attributs data-frames et data-frametime sur les <canvas>.
 *
 * Usage HTML :
 *   <canvas class="mc-anim"
 *           data-src="chemin/vers/sprite.png"
 *           data-frames="24"
 *           data-frametime="100"
 *           width="32" height="32"></canvas>
 */
(function () {
  'use strict';

  function initAnimCanvas(canvas) {
    const src       = canvas.dataset.src;
    const frames    = parseInt(canvas.dataset.frames, 10) || 1;
    const frametime = parseInt(canvas.dataset.frametime, 10) || 100; // ms
    const w         = canvas.width;
    const h         = canvas.height;
    const ctx       = canvas.getContext('2d');

    const img = new Image();
    img.onload = function () {
      let current = 0;
      // Désactiver le lissage pour garder le rendu pixelisé
      ctx.imageSmoothingEnabled = false;

      function draw() {
        ctx.clearRect(0, 0, w, h);
        // Chaque frame fait (img.width x img.width) pixels dans le sprite
        const frameH = img.width;
        ctx.drawImage(img,
          0, current * frameH,   // source x, y
          img.width, frameH,     // source w, h
          0, 0,                  // dest x, y
          w, h                   // dest w, h (scale to canvas size)
        );
        current = (current + 1) % frames;
      }

      draw();
      setInterval(draw, frametime);
    };
    img.src = src;
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('canvas.mc-anim').forEach(initAnimCanvas);
  });
})();
