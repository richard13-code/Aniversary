/* =================================================================
   LÓGICA: VIDEOS (videos.html)
   ================================================================= */
const videoCards = document.querySelectorAll('.video-card');
const videosCarrusel = document.querySelector('.videos-carrusel');

const tieneMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

function ajustarMarcoAlVideo(video) {
  if (!video.videoWidth || !video.videoHeight) return; // aún no hay datos que usar
  const marco = video.closest('.video-marco');
  if (marco) {
    marco.style.aspectRatio = `${video.videoWidth} / ${video.videoHeight}`;
  }
}

document.querySelectorAll('.video-marco video').forEach((video) => {
  // Si el navegador YA leyó los metadatos (por ejemplo, al recargar
  // la página con el video en caché), "readyState" ya es mayor a 0
  // y el evento "loadedmetadata" nunca volvería a dispararse —por
  // eso probamos las dos formas.
  if (video.readyState >= 1) {
    ajustarMarcoAlVideo(video);
  } else {
    video.addEventListener('loadedmetadata', () => ajustarMarcoAlVideo(video));
  }
});


function activarVideo(tarjeta) {
  videoCards.forEach((otra) => {
    const video = otra.querySelector('video');
    if (otra === tarjeta) {
      otra.classList.add('activo');
      if (video) {
        video.currentTime = 0;
        video.muted = false;
        // "vueltas" cuenta cuántas veces ha terminado y vuelto a
        // empezar ESTE video desde que se activó — lo reiniciamos
        // en 0 cada vez que lo vuelves a poner (ver el evento
        // "ended" más abajo, que es quien de verdad lo detiene tras
        // la 2ª vuelta).
        video.dataset.vueltas = '0';
        // .play() puede fallar si el navegador de todos modos decide
        // bloquear el sonido (por ejemplo, si alguien llega a esta
        // pestaña con un link directo, sin pasar por la intro) — el
        // .catch(() => {}) solo evita que eso tire un error en la
        // consola; en ese caso el video simplemente no arranca.
        video.play().catch(() => {});
      }
    } else {
      otra.classList.remove('activo');
      if (video) video.pause();
    }
  });
  videosCarrusel.classList.add('reproduciendo');
}

function apagarTodosLosVideos() {
  videoCards.forEach((tarjeta) => {
    tarjeta.classList.remove('activo');
    const video = tarjeta.querySelector('video');
    if (video) video.pause();
  });
  videosCarrusel.classList.remove('reproduciendo');
}


  document.querySelectorAll('.video-marco video').forEach((video) => {
  video.addEventListener('ended', () => {
    const vueltas = Number(video.dataset.vueltas || '0') + 1;
    video.dataset.vueltas = String(vueltas);

    if (vueltas < 2) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      apagarTodosLosVideos();
    }
  });
});


  document.addEventListener('visibilitychange', () => {
  if (document.hidden) apagarTodosLosVideos();
});

videoCards.forEach((tarjeta) => {
  if (tieneMouse) {
    // En compu: pasar el mouse encima ya reproduce CON sonido y apaga
    // los demás; al quitar el mouse, se detiene todo.
    tarjeta.addEventListener('mouseenter', () => activarVideo(tarjeta));
    tarjeta.addEventListener('mouseleave', () => apagarTodosLosVideos());
  } else {
    // En celular (sin mouse): un toque activa el video con sonido (y
    // apaga los demás); tocar el mismo otra vez lo detiene.
    tarjeta.addEventListener('click', () => {
      if (tarjeta.classList.contains('activo')) {
        apagarTodosLosVideos();
      } else {
        activarVideo(tarjeta);
      }
    });
  }
});


  const videosPista = document.getElementById('videos-pista');
const btnVideoIzq = document.getElementById('video-flecha-izq');
const btnVideoDer = document.getElementById('video-flecha-der');
const totalVideos = videoCards.length;


  function itemsPorVista() {
  return window.matchMedia('(min-width: 601px)').matches ? 2 : 1;
}

let indiceVideoActual = 0; // índice del primer video que se alcanza a ver

function moverCarruselVideos() {
  const porVista = itemsPorVista();
  // El índice más alto que tiene sentido: no queremos dejar un hueco
  // vacío mostrando "más allá" del último video.
  const indiceMaximo = Math.max(0, totalVideos - porVista);
  if (indiceVideoActual > indiceMaximo) indiceVideoActual = indiceMaximo;

  // Medimos el ancho real de una tarjeta (cambia según 1 o 2 por
  // vista, y según el ancho de la pantalla) para saber exactamente
  // cuántos píxeles hay que correr la pista por cada video que
  // avanzamos.
  const anchoTarjeta = videoCards[0].getBoundingClientRect().width;
  const gap = 24; // debe coincidir con el "gap" de ".videos-pista" en el CSS
  const desplazamiento = indiceVideoActual * (anchoTarjeta + gap);
  videosPista.style.transform = `translateX(-${desplazamiento}px)`;

  btnVideoIzq.disabled = indiceVideoActual === 0;
  btnVideoDer.disabled = indiceVideoActual >= indiceMaximo;

  // Si algo se estaba reproduciendo, lo apagamos al cambiar de vista
  // (si no, seguiría sonando ya fuera de la mirilla visible).
  apagarTodosLosVideos();
}

btnVideoIzq.addEventListener('click', () => {
  indiceVideoActual = Math.max(0, indiceVideoActual - itemsPorVista());
  moverCarruselVideos();
});

btnVideoDer.addEventListener('click', () => {
  const indiceMaximo = Math.max(0, totalVideos - itemsPorVista());
  indiceVideoActual = Math.min(indiceMaximo, indiceVideoActual + itemsPorVista());
  moverCarruselVideos();
});

// Si giras el celular o cambias el tamaño de la ventana, "1 o 2 por
// vista" puede cambiar -> recalculamos la posición para que no quede
// a medias.
window.addEventListener('resize', moverCarruselVideos);

moverCarruselVideos();
