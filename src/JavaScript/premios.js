/* =================================================================
   LÓGICA: PREMIOS (premios.html)
   ================================================================= */
const btnGenerarPremio = document.getElementById('btn-generar-premio');
const premioModal = document.getElementById('premio-modal');
const premioTexto = document.getElementById('premio-texto');
const btnCerrarPremio = document.getElementById('btn-cerrar-premio');
const btnOtroPremio = document.getElementById('btn-otro-premio');
const ruletaBox = document.getElementById('ruleta-box');

if (btnGenerarPremio && premioModal && premioTexto) {
  const premios = [
    'Una cena a tu elección, invita el novio 🍝',
    'Un día completo sin celular, solo tú y yo 📱❌',
    'Una maratón de películas que tú elijas 🍿',
    'Un masaje de 20 minutos sin quejarme 💆‍♀️',
    'El postre que tú quieras, cuando quieras 🍰',
    'Un día donde tú decides todos los planes 👑'
  ];

  // Forzar el estado cerrado absoluto al entrar
  premioModal.classList.add('oculto');
  premioModal.style.display = 'none';

  function mostrarPremioSorpresa() {
    if (ruletaBox) {
      ruletaBox.classList.add('girando');
    }

    btnGenerarPremio.disabled = true;

    setTimeout(() => {
      const indiceAleatorio = Math.floor(Math.random() * premios.length);
      premioTexto.textContent = premios[indiceAleatorio];
      
      if (ruletaBox) {
        ruletaBox.classList.remove('girando');
      }
      btnGenerarPremio.disabled = false;

      // Mostramos la tarjeta modal y habilitamos el display
      premioModal.classList.remove('oculto');
      premioModal.style.display = 'flex';
      history.pushState({ modalAbierto: true }, '', window.location.href);

      // Lanzamos confeti festivo
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 130,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#d88fa0', '#b3123f', '#6a1b5c', '#c9a24b', '#ff6b8b']
        });
      }
    }, 1000);
  }

  function cerrarModalPremio() {
    premioModal.classList.add('oculto');
    premioModal.style.display = 'none';
  }

  btnGenerarPremio.addEventListener('click', mostrarPremioSorpresa);
  
  if (btnOtroPremio) {
    btnOtroPremio.addEventListener('click', () => {
      cerrarModalPremio();
      setTimeout(mostrarPremioSorpresa, 200);
    });
  }

  if (btnCerrarPremio) {
    btnCerrarPremio.addEventListener('click', cerrarModalPremio);
  }

  premioModal.addEventListener('click', (e) => {
    if (e.target === premioModal) {
      cerrarModalPremio();
    }
  });

  // Control del botón "Atrás"
  window.addEventListener('popstate', (e) => {
    const estaAbierto = !premioModal.classList.contains('oculto') && premioModal.style.display !== 'none';
    if (estaAbierto) {
      cerrarModalPremio();
      history.pushState(null, '', window.location.href);
    } else {
      window.history.back();
    }
  });
}

// =================================================================
// Control del Menú Hamburguesa en Dispositivos Móviles
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