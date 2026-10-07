/* =================================================================
   LÓGICA: RECUERDOS (recuerdos.html)
   ================================================================= */


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
// Control para desplegar los eventos por año tipo acordeón
const tarjetasAno = document.querySelectorAll('.ano-card');
const contenedorAnos = document.getElementById('anos-contenedor');

tarjetasAno.forEach(card => {
  card.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que el clic se propague al fondo de inmediato

    const eventosActuales = card.querySelector('.eventos-ano');
    const yaEstaAbierto = card.classList.contains('abierto');
    const esCelular = window.innerWidth <= 768;

    // Si estamos en celular y ya hay OTRA tarjeta abierta, bloqueamos el clic
    const hayAlgunaAbierta = document.querySelector('.ano-card.abierto');
    if (esCelular && hayAlgunaAbierta && !yaEstaAbierto) {
      return; // No hace nada si intenta abrir otra tarjeta sin cerrar la actual
    }

    // Cerramos y ocultamos todas las tarjetas primero
    tarjetasAno.forEach(otraCard => {
      otraCard.classList.remove('abierto');
      const otrosEventos = otraCard.querySelector('.eventos-ano');
      if (otrosEventos) {
        otrosEventos.classList.add('oculto');
      }
    });

    // Si no estaba abierta, la abrimos
    if (!yaEstaAbierto && eventosActuales) {
      eventosActuales.classList.remove('oculto');
      card.classList.add('abierto');
      if (esCelular) {
        contenedorAnos.classList.add('bloquear-fondo');
      }
    } else if (esCelular) {
      contenedorAnos.classList.remove('bloquear-fondo');
    }
  });
});


// Función definitiva para cerrar y asegurar la subida completa
function cerrarTarjetasYSubir() {
  const habiaAlgunaAbierta = document.querySelector('.ano-card.abierto');
  
  if (tarjetasAno) {
    tarjetasAno.forEach(card => {
      card.classList.remove('abierto');
      const eventos = card.querySelector('.eventos-ano');
      if (eventos) {
        eventos.classList.add('oculto');
      }
    });
  }
  
  if (contenedorAnos) {
    contenedorAnos.classList.remove('bloquear-fondo');
  }

  // Si había una tarjeta abierta, forzamos la subida con doble seguridad
  if (habiaAlgunaAbierta) {
    // Primer intento inmediato
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Segundo respaldo por si el navegador estaba ocupado renderizando el cierre
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }
}

// Escuchador global de clics optimizado
document.addEventListener('click', (e) => {
  const cardClickeada = e.target.closest('.ano-card');
  const cardAbierta = document.querySelector('.ano-card.abierto');

  // Si se hizo clic fuera de cualquier tarjeta
  const clicFuera = !cardClickeada;
  
  // O si ya hay una tarjeta abierta y se hace clic en esa misma tarjeta (en cualquier parte de ella)
  const clicEnMismaTarjetaAbierta = cardAbierta && cardClickeada === cardAbierta;

  if (clicFuera || clicEnMismaTarjetaAbierta) {
    e.stopPropagation(); // Evita interferencias con otros scripts o eventos internos
    cerrarTarjetasYSubir();
  }
}, true); // Usamos 'true' (capturing phase) para atrapar el clic antes de que se pierda en los elementos internos de la tarjeta

// Botón "Atrás" SOLO para teléfonos (móviles)
const esDispositivoMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

if (esDispositivoMovil) {
  window.addEventListener('popstate', (e) => {
    const tarjetaAbierta = document.querySelector('.ano-card.abierto');
    if (tarjetaAbierta) {
      history.pushState(null, null, window.location.href);
      cerrarTarjetasYSubir();
    }
  });

  window.history.pushState(null, null, window.location.href);
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