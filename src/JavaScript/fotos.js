// Control del Menú Hamburguesa en Dispositivos Móviles
const btnMenuMovil = document.getElementById('btn-menu-movil');
const navbarTabs = document.getElementById('navbar-tabs');

if (btnMenuMovil && navbarTabs) {
  btnMenuMovil.addEventListener('click', () => {
    navbarTabs.classList.toggle('abierto'); // <--- Debe decir 'abierto' para activar el CSS
  });
}