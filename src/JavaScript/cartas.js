/* =================================================================
   LÓGICA: CARTAS MISTERIOSAS (cartas.html)
   ================================================================= */
const cartasGrid = document.getElementById('cartas-grid');
if (cartasGrid) {
  const mensajesCartas = [
    'Mi lugar seguro eres tú.',
    'No sabía que me faltabas hasta que llegaste.',
    'Mi parte favorita de la vida eres tú.',
    'Tus ojos son mi debilidad y tus besos, mi perdición',
    'Que pasen los días, los meses y los años; yo seguiré eligiéndote una y otra vez.',
    'No hay nada que me guste más que verte sonreír, pero más me gusta ser la razón detrás de esa sonrisa.'
  ];

  const cartaRevelada = document.getElementById('carta-revelada');
  const textoCarta = document.getElementById('texto-carta');
  const btnCerrarCarta = document.getElementById('cerrar-carta');

  // Función para barajar los mensajes aleatoriamente sin repetirlos
  const mensajesMezclados = [...mensajesCartas].sort(() => Math.random() - 0.5);

  mensajesMezclados.forEach((mensaje) => {
    const sobre = document.createElement('button');
    sobre.className = 'sobre';
    sobre.textContent = '✉️';
    
    // Guardamos el mensaje fijo que le pertenece a ESTE sobre para siempre
    sobre.dataset.mensaje = mensaje;

    sobre.addEventListener('click', (e) => {
      sobre.classList.add('abierto');
      sobre.textContent = '💌';
      
      if (textoCarta) textoCarta.textContent = sobre.dataset.mensaje;
      if (cartaRevelada) cartaRevelada.classList.remove('oculto');

      // --- CREAR BRILLOS MÁGICOS AL CLIC ---
      const rect = sobre.getBoundingClientRect();
      for (let i = 0; i < 3; i++) {
        const brillo = document.createElement('div');
        brillo.className = 'particula-brillo';
        brillo.textContent = i % 2 === 0 ? '✨' : '💖';
        brillo.style.left = `${rect.left + rect.width / 2 + (Math.random() * 40 - 20)}px`;
        brillo.style.top = `${rect.top + window.scrollY}px`;
        document.body.appendChild(brillo);
        
        setTimeout(() => brillo.remove(), 800);
      }
    });

    cartasGrid.appendChild(sobre);
  });

  if (btnCerrarCarta && cartaRevelada) {
    btnCerrarCarta.addEventListener('click', () => {
      // Al cerrar la ventana emergente, el sobre se queda con su icono 💌 
      // y si lo vuelves a presionar, te volverá a mostrar exactamente su misma frase.
      cartaRevelada.classList.add('oculto');
    });
  }
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