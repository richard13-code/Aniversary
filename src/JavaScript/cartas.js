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