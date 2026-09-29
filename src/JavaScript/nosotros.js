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