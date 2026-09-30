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

// Control para desplegar los eventos por año (Modo Acordeon: cierra los demás al abrir uno)
const tarjetasAno = document.querySelectorAll('.ano-card');

tarjetasAno.forEach(card => {
  card.addEventListener('click', () => {
    const eventosActuales = card.querySelector('.eventos-ano');
    const yaEstaAbierto = card.classList.contains('abierto');

    // 1. Cerramos y ocultamos TODAS las tarjetas primero
    tarjetasAno.forEach(otraCard => {
      otraCard.classList.remove('abierto');
      const otrosEventos = otraCard.querySelector('.eventos-ano');
      if (otrosEventos) {
        otrosEventos.classList.add('oculto');
      }
    });

    // 2. Si la tarjeta que tocó el usuario NO estaba abierta, la abrimos
    if (!yaEstaAbierto && eventosActuales) {
      eventosActuales.classList.remove('oculto');
      card.classList.add('abierto');
    }
  });
});