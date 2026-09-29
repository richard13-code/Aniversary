/* =================================================================
   LÓGICA: RECUERDOS (recuerdos.html)
   ================================================================= */
const timelineContenedor = document.getElementById('timeline-recuerdos');
if (timelineContenedor) {
  const fechasImportantes = [
  {
    fecha: '6 de diciembre',
    titulo: 'Nuestro aniversario',
    descripcion: 'El día que cumplimos un año más juntos'
  },
  {
    fecha: '4 de febrero, 2027',
    titulo: 'Nos volvemos a ver',
    descripcion: 'El día que se acaba la distancia (por un rato)'
  },
  {
    fecha: '14 de febrero',
    titulo: 'San Valentín',
    descripcion: 'Agrega aquí tu propio recuerdo de este día'
  }
];

const timelineContenedor = document.getElementById('timeline-recuerdos');

fechasImportantes.forEach((item) => {
  const tarjeta = document.createElement('div');
  tarjeta.className = 'timeline-item';

  tarjeta.innerHTML = `
    <p class="timeline-fecha">${item.fecha}</p>
    <p class="timeline-titulo">${item.titulo}</p>
    <p class="timeline-desc">${item.descripcion}</p>
  `;

  timelineContenedor.appendChild(tarjeta);
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