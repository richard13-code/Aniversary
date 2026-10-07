/* =================================================================
   LÓGICA: NOSOTROS (nosotros.html)
   ================================================================= */
const elDiasJuntos = document.getElementById('dias-juntos');
if (elDiasJuntos) {
  const fechaInicioRelacion = new Date(2024, 11, 6);

  function actualizarDiasJuntos() {
    const ahora = new Date();
    const inicioSinHora = new Date(
      fechaInicioRelacion.getFullYear(),
      fechaInicioRelacion.getMonth(),
      fechaInicioRelacion.getDate()
    );
    const hoySinHora = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
    const msPorDia = 1000 * 60 * 60 * 24;
    const dias = Math.round((hoySinHora - inicioSinHora) / msPorDia) + 1;
    elDiasJuntos.textContent = dias.toLocaleString('es-MX');
  }

  actualizarDiasJuntos();
  setInterval(actualizarDiasJuntos, 60 * 60 * 1000);
}

// =================================================================
// Control del Menú Hamburguesa en Dispositivos Móviles y Cierre Automático
// =================================================================
const btnMenuMovil = document.getElementById('btn-menu-movil');
const navbarTabs = document.getElementById('navbar-tabs');

if (btnMenuMovil && navbarTabs) {
  // 1. Abrir/Cerrar al dar clic en el botón de hamburguesa
  btnMenuMovil.addEventListener('click', () => {
    navbarTabs.classList.toggle('abierto');
  });

  // 2. CERRAR automáticamente el menú al hacer clic en cualquier pestaña/enlace dentro de él
  const enlacesMenu = navbarTabs.querySelectorAll('a');
  enlacesMenu.forEach(enlace => {
    enlace.addEventListener('click', () => {
      navbarTabs.classList.remove('abierto');
    });
  });
}

const musicaRomantica = document.getElementById('musica-romantica');

// 1. Sincronizar y mantener al cambiar de pestaña o usar el botón "Atrás"
window.addEventListener('pageshow', (event) => {
  if (musicaRomantica) {
    const estadoMusica = sessionStorage.getItem('musicaSonando');
    const tiempoGuardado = sessionStorage.getItem('tiempoMusica');

    // Si la página se cargó desde la caché del navegador (al presionar "Atrás")
    if (event.persisted || (estadoMusica === 'true' && tiempoGuardado)) {
      musicaRomantica.currentTime = parseFloat(tiempoGuardado || 0);
      musicaRomantica.play().catch(error => {
        console.log("Audio sincronizado:", error);
      });
    }
  }
});

// Guardar el segundo exacto constantemente
if (musicaRomantica) {
  musicaRomantica.addEventListener('timeupdate', () => {
    if (!musicaRomantica.paused) {
      sessionStorage.setItem('tiempoMusica', musicaRomantica.currentTime);
    }
  });

  // 2. DETECTOR PARA CELULARES: Si se salen de la app o minimizan el navegador, la música se pausa al instante
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      musicaRomantica.pause();
    } else {
      // Si regresan a la pestaña y la música iba sonando, se reanuda donde iba
      if (sessionStorage.getItem('musicaSonando') === 'true') {
        musicaRomantica.play().catch(e => console.log("Reanudación pausada:", e));
      }
    }
  });
}