/* =================================================================
   LÓGICA: PREGUNTAS (preguntas.html)
   ================================================================= */
const preguntasContenedor = document.getElementById('preguntas-contenedor');
if (preguntasContenedor) {
  const preguntas = [
    {
      enunciado: '¿Cuándo es nuestro aniversario?',
      opciones: ['6 de cada mes', '13 de cada mes', '22 de cada mes'],
      correcta: 0,
      sorpresa: '¡Correcto! 🎉 De los dias mas especial a tu lado.'
    },
    {
      enunciado: '¿Cuántos años cumplimos este 6 de diciembre?',
      opciones: ['1 año', '2 años', '3 años'],
      correcta: 1,
      sorpresa: '2 años y quiero muchísimos más contigo 💕'
    },
    {
      enunciado: '¿Cuál es mi comida favorita?',
      opciones: ['Chilaquiles', 'Tacos', 'Pozole'],
      correcta: 2,
      sorpresa: '¡Correcto! 😋 Pero siempre elegiré comerte a ti.'
    },
    {
      enunciado: '¿A dónde salimos a festejar mi primer cumpleaños como novios?',
      opciones: ['Hasbro City', 'Maquinas de juegos', 'Balneario'],
      correcta: 0,
      sorpresa: '¡Correcto! 🎉 Ese día fue el comienzo de nuestras aventuras juntos.'
    },
    {
      enunciado: '¿Cuál es mi película favorita?',
      opciones: ['Star Wars', 'Transformers', 'Avengers'],
      correcta: 1,
      sorpresa: '¡Correcto! 🎬 Siempre me emociona ver esa película.'
    },
    {
      enunciado: '¿Cuál es mi jugador favorito?',
      opciones: ['LeBron James','Michael Jordan', 'Stephen Curry', 'Kevin Durant'],
      correcta: 2,
      sorpresa: '¡Correcto! 🏀 Pero ni sus tiros son tan perfectos como tú.'
    },
    {
      enunciado: '¿Nos vamos a casar?',
      opciones: ['Sí', 'No'],
      correcta: 0,
      sorpresa: '¡Correcto! 🎉 Mas te vale amor.'
    },
    {
      enunciado: '¿Te vas a aburrir de mi o me vas a cambiar por otro?',
      opciones: ['Sí', 'No'],
      correcta: 1,
      sorpresa: '¡Correcto! 🎉 Me vas aguantar toda la vida ehh.'
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
          sorpresaDiv.textContent = 'Nono 😑, intenta de nuevo ehh.';
        }
      });

      opcionesDiv.appendChild(btn);
    });

    card.appendChild(opcionesDiv);
    card.appendChild(sorpresaDiv);
    preguntasContenedor.appendChild(card);
  });
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