/* =================================================================
   LÓGICA: PREMIOS (premios.html)
   ================================================================= */
const btnGenerarPremio = document.getElementById('btn-generar-premio');
const premioResultado = document.getElementById('premio-resultado');
const premioTexto = document.getElementById('premio-texto');

if (btnGenerarPremio && premioResultado && premioTexto) {
  const premios = [
    'Una cena a tu elección, invita el novio 🍝',
    'Un día completo sin celular, solo tú y yo',
    'Una maratón de películas que tú elijas',
    'Un masaje de 20 minutos sin quejarme',
    'El postre que tú quieras, cuando quieras',
    'Un día donde tú decides todos los planes'
  ];

  btnGenerarPremio.addEventListener('click', () => {
    const indiceAleatorio = Math.floor(Math.random() * premios.length);
    premioTexto.textContent = premios[indiceAleatorio];
    premioResultado.classList.remove('oculto');
  });
}

// Control del Menú Hamburguesa en Dispositivos Móviles
const btnMenuMovil = document.getElementById('btn-menu-movil');
const navbarTabs = document.getElementById('navbar-tabs');

if (btnMenuMovil && navbarTabs) {
  btnMenuMovil.addEventListener('click', () => {
    navbarTabs.classList.toggle('abierto');
  });
}