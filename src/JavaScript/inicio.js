/* =================================================================
   LÓGICA: INICIO (index.html)
   ================================================================= */

// Pantalla de intro y confeti (Con memoria de sesión para no repetirse)
const introScreen = document.getElementById('intro-screen');
const btnAbrirIntro = document.getElementById('btn-abrir-intro');
const canvas = document.getElementById('confetti-canvas');

if (introScreen) {
  if (sessionStorage.getItem('sorpresaAbierta') === 'true') {
    // Si ya se abrió antes en esta sesión, ocultamos la intro de golpe
    introScreen.style.display = 'none';
  } else if (btnAbrirIntro) {
    // Si es la primera vez, dejamos que funcione el botón y guardamos la sesión
    btnAbrirIntro.addEventListener('click', () => {
      introScreen.classList.add('cerrado');
      if (typeof window.lanzarConfeti === 'function') {
        window.lanzarConfeti(150);
      }
      sessionStorage.setItem('sorpresaAbierta', 'true');
    });
  }
}

if (canvas) {
  const ctx = canvas.getContext('2d');

  function ajustarTamanoCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  ajustarTamanoCanvas();
  window.addEventListener('resize', ajustarTamanoCanvas);

  let particulas = [];
  const coloresConfeti = ['#e0245e', '#ff4d6d', '#c1121f', '#9d0d4a', '#7b2cbf', '#a239ea'];

  function crearParticula() {
    return {
      x: Math.random() * canvas.width,
      y: -20,
      velocidadY: 2 + Math.random() * 3,
      velocidadX: (Math.random() - 0.5) * 2,
      rotacion: Math.random() * 360,
      velocidadRotacion: (Math.random() - 0.5) * 6,
      tamano: 16 + Math.random() * 18,
      color: coloresConfeti[Math.floor(Math.random() * coloresConfeti.length)],
      esCorazon: true
    };
  }

  function dibujarCorazon(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotacion * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    const s = p.tamano / 2;
    ctx.moveTo(0, s);
    ctx.bezierCurveTo(-s, -s / 2, -s * 2, s, 0, s * 2);
    ctx.bezierCurveTo(s * 2, s, s, -s / 2, 0, s);
    ctx.fill();
    ctx.restore();
  }

  let animacionActiva = false;

  function loopConfeti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particulas.forEach((p) => {
      p.y += p.velocidadY;
      p.x += p.velocidadX;
      p.rotacion += p.velocidadRotacion;
      dibujarCorazon(p);
    });
    particulas = particulas.filter((p) => p.y < canvas.height + 30);
    if (animacionActiva || particulas.length > 0) {
      requestAnimationFrame(loopConfeti);
    }
  }

  window.lanzarConfeti = function(cantidad = 120) {
    for (let i = 0; i < cantidad; i++) {
      setTimeout(() => particulas.push(crearParticula()), i * 15);
    }
    if (!animacionActiva) {
      animacionActiva = true;
      loopConfeti();
      setTimeout(() => (animacionActiva = false), cantidad * 15 + 500);
    }
  };
}

// Carrusel del Hero
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');
let indiceHeroActual = 0;
let temporizadorHero;

function mostrarHeroSlide(indice) {
  heroSlides.forEach((slide, i) => {
    slide.classList.toggle('activo', i === indice);
  });
  heroDots.forEach((dot, i) => {
    dot.classList.toggle('activo', i === indice);
  });
  indiceHeroActual = indice;
}

function siguienteHeroSlide() {
  mostrarHeroSlide((indiceHeroActual + 1) % heroSlides.length);
}

if (heroSlides.length > 0) {
  mostrarHeroSlide(0);
  temporizadorHero = setInterval(siguienteHeroSlide, 4000);

  heroDots.forEach((dot, indice) => {
    dot.addEventListener('click', () => {
      mostrarHeroSlide(indice);
      clearInterval(temporizadorHero);
      temporizadorHero = setInterval(siguienteHeroSlide, 4000);
    });
  });
}

const btnHeroExplorar = document.getElementById('btn-hero-explorar');
if (btnHeroExplorar) {
  btnHeroExplorar.addEventListener('click', () => {
    window.location.href = 'cartas.html';
  });
}

// Cuenta regresiva
const elDias = document.getElementById('cd-dias');
const elHoras = document.getElementById('cd-horas');
const elMin = document.getElementById('cd-min');
const elSeg = document.getElementById('cd-seg');

if (elDias && elHoras && elMin && elSeg) {
  const fechaObjetivo = new Date(2027, 1, 4, 0, 0, 0);

  function actualizarCountdown() {
    const ahora = new Date();
    const diferenciaMs = fechaObjetivo - ahora;

    if (diferenciaMs <= 0) {
      elDias.textContent = '0';
      elHoras.textContent = '0';
      elMin.textContent = '0';
      elSeg.textContent = '0';
      return;
    }

    const segundosTotales = Math.floor(diferenciaMs / 1000);
    const dias = Math.floor(segundosTotales / (60 * 60 * 24));
    const horas = Math.floor((segundosTotales % (60 * 60 * 24)) / (60 * 60));
    const minutos = Math.floor((segundosTotales % (60 * 60)) / 60);
    const segundos = segundosTotales % 60;

    elDias.textContent = String(dias).padStart(2, '0');
    elHoras.textContent = String(horas).padStart(2, '0');
    elMin.textContent = String(minutos).padStart(2, '0');
    elSeg.textContent = String(segundos).padStart(2, '0');
  }

  actualizarCountdown();
  setInterval(actualizarCountdown, 1000);
}

// Control del Menú Hamburguesa en Dispositivos Móviles
const btnMenuMovil = document.getElementById('btn-menu-movil');
const navbarTabs = document.getElementById('navbar-tabs');

if (btnMenuMovil && navbarTabs) {
  btnMenuMovil.addEventListener('click', () => {
    navbarTabs.classList.toggle('abierto'); // <--- Debe decir 'abierto' para activar el CSS
  });
}