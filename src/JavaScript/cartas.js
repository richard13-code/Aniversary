/* =================================================================
   LÓGICA: CARTAS MISTERIOSAS (cartas.html)
   ================================================================= */
const cartasGrid = document.getElementById('cartas-grid');
if (cartasGrid) {
  const mensajesCartas = [
    'Eres la primera persona en la que pienso al despertar 💭',
    'Recuerdo perfecto: el día que nos conocimos y no dejaba de sonreír',
    'Gracias por aguantar mis días pesados sin quejarte',
    'Si pudiera regresar el tiempo, elegiría conocerte otra vez',
    'Tienes la risa más bonita que he escuchado',
    'Cuenta los días conmigo, ya casi nos vemos'
  ];

  const cartaRevelada = document.getElementById('carta-revelada');
  const textoCarta = document.getElementById('texto-carta');
  const btnCerrarCarta = document.getElementById('cerrar-carta');

  mensajesCartas.forEach((mensaje) => {
    const sobre = document.createElement('button');
    sobre.className = 'sobre';
    sobre.textContent = '✉️';
    sobre.dataset.mensaje = mensaje;

    sobre.addEventListener('click', () => {
      if (sobre.classList.contains('abierto')) return;
      sobre.classList.add('abierto');
      sobre.textContent = '💌';
      if (textoCarta) textoCarta.textContent = sobre.dataset.mensaje;
      if (cartaRevelada) cartaRevelada.classList.remove('oculto');
    });

    cartasGrid.appendChild(sobre);
  });

  if (btnCerrarCarta && cartaRevelada) {
    btnCerrarCarta.addEventListener('click', () => {
      cartaRevelada.classList.add('oculto');
    });
  }
}