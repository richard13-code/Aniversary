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

  fechasImportantes.forEach((item) => {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'timeline-item';
    tarjeta.innerHTML = `