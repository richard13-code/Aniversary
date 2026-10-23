/* =================================================================
   LÓGICA: PREGINATAS Y VIDEO SECRETO (preguntas.html)
   ================================================================= */
const preguntasContenedor = document.getElementById('preguntas-contenedor');
const videoModal = document.getElementById('video-sorpresa-modal');
const btnCerrarVideo = document.getElementById('btn-cerrar-video');
const videoSecreto = document.getElementById('video-secreto');

const preguntas = [
  {
    enunciado: '¿Cuándo es nuestro aniversario?',
    opciones: ['6 de cada mes', '13 de cada mes', '22 de cada mes'],
    correcta: 0,
    sorpresa: '¡Correcto! 🎉 De los dias mas especial a tu lado.'
  },
  {
    enunciado: '¿Cuántos años cumplimos este 6 de diciembre?',
    opciones: ['1 año', '2 años', '3 años'],
    correcta: 1,
    sorpresa: '2 años y quiero muchísimos más contigo 💕'
  },
  {
    enunciado: '¿Cuál es mi comida favorita?',
    opciones: ['Chilaquiles', 'Tacos', 'Pozole'],
    correcta: 2,
    sorpresa: '¡Correcto! 😋 Pero siempre elegiré comerte a ti.'
  },
  {
    enunciado: '¿A dónde salimos a festejar mi primer cumpleaños como novios?',
    opciones: ['Hasbro City', 'Maquinas de juegos', 'Balneario'],
    correcta: 0,
    sorpresa: '¡Correcto! 🎉 Ese día fue el comienzo de nuestras aventuras juntos.'
  },
  {
    enunciado: '¿Cuál es mi película favorita?',
    opciones: ['Star Wars', 'Transformers', 'Avengers'],
    correcta: 1,
    sorpresa: '¡Correcto! 🎬 Siempre me emociona ver esa película.'
  },
  {
    enunciado: '¿Cuál es mi jugador favorito?',
    opciones: ['LeBron James','Michael Jordan', 'Stephen Curry', 'Kevin Durant'],
    correcta: 2,
    sorpresa: '¡Correcto! 🏀 Pero ni sus tiros son tan perfectos como tú.'
  },
  {
    enunciado: '¿Nos vamos a casar?',
    opciones: ['Sí', 'No'],
    correcta: 0,
    sorpresa: '¡Correcto! 🎉 Mas te vale amor.'
  },
  {
    enunciado: '¿Te vas a aburrir de mi o me vas a cambiar por otro?',
    opciones: ['Sí', 'No'],
    correcta: 1,
    sorpresa: '¡Correcto! 🎉 Me vas aguantar toda la vida ehh.'
  }
];

function cargarPreguntas() {
  if (!preguntasContenedor) return;
  
  preguntasContenedor.innerHTML = '';

  preguntas.forEach((preg, index) => {
    const card = document.createElement('div');
    card.className = 'tarjeta-pregunta';

    const enunciado = document.createElement('p');
    enunciado.className = 'enunciado';
    enunciado.textContent = `${index + 1}. ${preg.enunciado}`;
    card.appendChild(enunciado);

    const opcionesDiv = document.createElement('div');
    opcionesDiv.className = 'opciones';

    const sorpresaDiv = document.createElement('div');
    sorpresaDiv.className = 'sorpresa-desbloqueada oculto';
    sorpresaDiv.style.cssText = "margin-top: 10px; font-style: italic; color: #ffd1dc;";
    sorpresaDiv.textContent = preg.sorpresa;

    preg.opciones.forEach((textoOpcion, indiceOpcion) => {
      const btn = document.createElement('button');
      btn.className = 'opcion-btn';
      btn.textContent = textoOpcion;
      // Estilo limpio para los botones de opción si no los tienes en el CSS
      btn.style.cssText = "display: block; width: 100%; margin: 8px 0; padding: 10px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.08); color: white; cursor: pointer; text-align: left;";

      btn.addEventListener('click', () => {
        const todosLosBotones = opcionesDiv.querySelectorAll('.opcion-btn');
        todosLosBotones.forEach((b) => (b.disabled = true));

        if (indiceOpcion === preg.correcta) {
          btn.classList.add('correcta');
          btn.style.background = "rgba(46, 125, 50, 0.6)";
          sorpresaDiv.classList.remove('oculto');
        } else {
          btn.classList.add('incorrecta');
          btn.style.background = "rgba(198, 40, 40, 0.6)";
          todosLosBotones[preg.correcta].classList.add('correcta');
          todosLosBotones[preg.correcta].style.background = "rgba(46, 125, 50, 0.6)";
          sorpresaDiv.classList.remove('oculto');
          sorpresaDiv.textContent = 'Nono 😑, esta no era.';
        }

        // Revisamos automáticamente si todas ya fueron respondidas correctamente
        verificarTodasCorrectas();
      });

      opcionesDiv.appendChild(btn);
    });

    card.appendChild(opcionesDiv);
    card.appendChild(sorpresaDiv);
    preguntasContenedor.appendChild(card);
  });
}

function verificarTodasCorrectas() {
  const tarjetas = document.querySelectorAll('.tarjeta-pregunta');
  let todasRespondidas = true;
  let todoCorrecto = true;

  tarjetas.forEach((card, index) => {
    const botones = card.querySelectorAll('.opcion-btn');
    let respondidaEsta = false;

    botones.forEach((btn, optIndex) => {
      if (btn.disabled) {
        respondidaEsta = true;
        if (optIndex === preguntas[index].correcta && !btn.classList.contains('correcta')) {
          todoCorrecto = false;
        }
      }
    });

    if (!respondidaEsta) {
      todasRespondidas = false;
    }
  });

  // Si ya respondió todas y el puntaje es perfecto, lanzamos el video secreto
  if (todasRespondidas && todoCorrecto) {
    if (videoModal) {
      videoModal.classList.remove('oculto');
      videoModal.style.display = 'flex';
      
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#d88fa0', '#b3123f', '#6a1b5c', '#c9a24b', '#ff6b8b']
        });
      }
    }
  }
}

// Control del botón de cerrar el video secreto
if (btnCerrarVideo && videoModal) {
  btnCerrarVideo.addEventListener('click', () => {
    videoModal.classList.add('oculto');
    videoModal.style.display = 'none';
    if (videoSecreto) {
      videoSecreto.pause();
    }
  });
}

// =================================================================
// Control del Menú Hamburguesa en Dispositivos Móviles y Cierre
// =================================================================
const btnMenuMovil = document.getElementById('btn-menu-movil');
const navbarTabs = document.getElementById('navbar-tabs');

if (btnMenuMovil && navbarTabs) {
  btnMenuMovil.addEventListener('click', () => {
    navbarTabs.classList.toggle('abierto');
  });

  const enlacesMenu = navbarTabs.querySelectorAll('a');
  enlacesMenu.forEach(enlace => {
    enlace.addEventListener('click', () => {
      navbarTabs.classList.remove('abierto');
    });
  });
}

// =================================================================
// Control de Audio Continuo
// =================================================================
const musicaRomantica = document.getElementById('musica-romantica');

window.addEventListener('pageshow', (event) => {
  if (musicaRomantica) {
    const estadoMusica = sessionStorage.getItem('musicaSonando');
    const tiempoGuardado = sessionStorage.getItem('tiempoMusica');

    if (event.persisted || (estadoMusica === 'true' && tiempoGuardado)) {
      musicaRomantica.currentTime = parseFloat(tiempoGuardado || 0);
      musicaRomantica.play().catch(error => {
        console.log("Audio sincronizado:", error);
      });
    }
  }
});

if (musicaRomantica) {
  musicaRomantica.addEventListener('timeupdate', () => {
    if (!musicaRomantica.paused) {
      sessionStorage.setItem('tiempoMusica', musicaRomantica.currentTime);
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      musicaRomantica.pause();
    } else {
      if (sessionStorage.getItem('musicaSonando') === 'true') {
        musicaRomantica.play().catch(e => console.log("Reanudación pausada:", e));
      }
    }
  });
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', cargarPreguntas);