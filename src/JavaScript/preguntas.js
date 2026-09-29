/* =================================================================
   LÓGICA: PREGUNTAS (preguntas.html)
   ================================================================= */
const preguntasContenedor = document.getElementById('preguntas-contenedor');
if (preguntasContenedor) {
  const preguntas = [
    {
      enunciado: '¿En qué mes nos conocimos?',
      opciones: ['Diciembre', 'Marzo', 'Julio'],
      correcta: 0,
      sorpresa: '¡Correcto! 🎉 Ese mes cambió todo para mí.'
    },
    {
      enunciado: '¿Cuál es nuestra canción?',
      opciones: ['Opción A', 'Opción B', 'Opción C'],
      correcta: 1,
      sorpresa: '¡Sí! Cada vez que la escucho pienso en ti.'
    },
    {
      enunciado: '¿Cuántos años cumplimos este 6 de diciembre?',
      opciones: ['1 año', '2 años', '3 años'],
      correcta: 1,
      sorpresa: '2 años y quiero muchísimos más contigo 💕'
    }
  ];

  preguntas.forEach((preg) => {
    const card = document.createElement('div');
    card.className = 'pregunta-card';

    const enunciado = document.createElement('p');
    enunciado.className = 'enunciado';
    enunciado.textContent = preg.enunciado;
    card.appendChild(enunciado);

    const opcionesDiv = document.createElement('div');
    opcionesDiv.className = 'opciones';

    const sorpresaDiv = document.createElement('div');
    sorpresaDiv.className = 'sorpresa-desbloqueada oculto';
    sorpresaDiv.textContent = preg.sorpresa;

    preg.opciones.forEach((textoOpcion, indiceOpcion) => {
      const btn = document.createElement('button');
      btn.className = 'opcion-btn';
      btn.textContent = textoOpcion;

      btn.addEventListener('click', () => {
        const todosLosBotones = opcionesDiv.querySelectorAll('.opcion-btn');
        todosLosBotones.forEach((b) => (b.disabled = true));

        if (indiceOpcion === preg.correcta) {
          btn.classList.add('correcta');
          sorpresaDiv.classList.remove('oculto');
        } else {
          btn.classList.add('incorrecta');
          todosLosBotones[preg.correcta].classList.add('correcta');
          sorpresaDiv.classList.remove('oculto');
          sorpresaDiv.textContent = 'No era esa, pero te la regalo igual: ' + preg.sorpresa;
        }
      });

      opcionesDiv.appendChild(btn);
    });

    card.appendChild(opcionesDiv);
    card.appendChild(sorpresaDiv);
    preguntasContenedor.appendChild(card);
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