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

window.addEventListener('DOMContentLoaded', () => {
  if (musicaRomantica) {
    const estadoMusica = sessionStorage.getItem('musicaSonando');
    const tiempoGuardado = sessionStorage.getItem('tiempoMusica');

    if (estadoMusica === 'true' && tiempoGuardado) {
      musicaRomantica.currentTime = parseFloat(tiempoGuardado);
      musicaRomantica.play().catch(error => {
        console.log("Audio continuo sincronizado entre pestañas.", error);
      });
    }
  }
});

if (musicaRomantica) {
  musicaRomantica.addEventListener('timeupdate', () => {
    sessionStorage.setItem('tiempoMusica', musicaRomantica.currentTime);
  });
}