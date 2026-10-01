/* =================================================================
   LÓGICA: RECUERDOS (recuerdos.html)
   ================================================================= */


// Control del Menú Hamburguesa en Dispositivos Móviles
const btnMenuMovil = document.getElementById('btn-menu-movil');
const navbarTabs = document.getElementById('navbar-tabs');

if (btnMenuMovil && navbarTabs) {
  btnMenuMovil.addEventListener('click', () => {
    navbarTabs.classList.toggle('abierto');
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


// CERRAR al hacer clic FUERA de las tarjetas (en cualquier parte del documento)
document.addEventListener('click', (e) => {
  // Verificamos si el clic ocurrió FUERA de cualquier .ano-card
  if (!e.target.closest('.ano-card')) {
    const habiaAlgunaAbierta = document.querySelector('.ano-card.abierto');
    
    tarjetasAno.forEach(card => {
      card.classList.remove('abierto');
      const eventos = card.querySelector('.eventos-ano');
      if (eventos) {
        eventos.classList.add('oculto');
      }
    });
    if (contenedorAnos) {
      contenedorAnos.classList.remove('bloquear-fondo');
    }

    // Si había una tarjeta abierta y se cerró haciendo clic fuera, sube la página suavemente
    if (habiaAlgunaAbierta) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
});