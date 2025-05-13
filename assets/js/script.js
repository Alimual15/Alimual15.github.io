const inicioPantalla = document.getElementById('inicio');
const preguntasPantalla = document.getElementById('preguntas');
const resultadosPantalla = document.getElementById('resultados');
const comenzarBtn = document.getElementById('comenzar-btn');
const preguntaTexto = document.getElementById('pregunta-texto');
const opcionesLista = document.getElementById('opciones-lista');
const siguienteBtn = document.getElementById('siguiente-btn');
const puntajeFinal = document.getElementById('puntaje-final');
const retroalimentacionDiv = document.getElementById('retroalimentacion');
const porcentajeFinal = document.getElementById('porcentaje-final');
const preguntasCorrectasDiv = document.getElementById('preguntas-correctas');
const puntajeCorrectas = document.getElementById('puntaje-correctas');
const mensajeFinal = document.getElementById('mensaje-final');

let tiempoRestante = 30;
let preguntaActual = 0;
let puntaje = 0;
let preguntasCorrectas = 0;
let respuestasUsuario = [];

function iniciarTemporizador() {
    tiempoRestante = 30;
    document.getElementById('tiempo-restante').textContent = tiempoRestante;
    temporizadorInterval = setInterval(() => {
        tiempoRestante--;
        document.getElementById('tiempo-restante').textContent = tiempoRestante;
        if (tiempoRestante <= 0) {
            clearInterval(temporizadorInterval);
            avanzarPregunta();
        }
    }, 1000);
}

function pausarTemporizador() {
    clearInterval(temporizadorInterval);
}

const preguntas = [
  {
    pregunta: "¿Cuál es el lenguaje de marcado utilizado para crear páginas web?",
    opciones: ["JavaScript", "HTML", "CSS", "Python"],
    respuesta: "HTML",
    tipo: "seleccion",
    dificultad: "facil",
    puntos: 10 
  },
  {
    pregunta: "¿Cuál es el símbolo para seleccionar un elemento por clase en CSS?",
    opciones: [".", "#", "*", "&"],
    respuesta: ".",
    tipo: "seleccion",
    dificultad: "medio",
    puntos: 15
  },
  {
 pregunta: "¿Qué método se utiliza para añadir un elemento al final de un array en JavaScript?",
    opciones: ["push()", "pop()", "shift()", "unshift()"],
    respuesta: "push()",
    tipo: "seleccion",
    dificultad: "dificil",
    puntos: 20 
  },
  {
    pregunta: "¿Es verdadero que el atributo alt es obligatorio en la etiqueta img?",
    opciones: ["Verdadero", "Falso"],
    respuesta: "Verdadero",
    tipo: "verdaderoFalso",
    dificultad: "facil",
    puntos: 5 
  },
  {
    pregunta: "¿Cuál es el propósito de la etiqueta <header> en HTML?",
    opciones: [
      "Definir el encabezado de una página",
      "Definir el pie de página de una página",
      "Definir un enlace a otra página",
      "Definir un botón"
    ],
    respuesta: "Definir el encabezado de una página",
    tipo: "seleccion",
    dificultad: "facil",
    puntos: 5 
  },
  {
    pregunta: "¿Cuál es el propósito de la etiqueta <nav> en HTML?",
    opciones: [
      "Definir una barra de navegación",
      "Definir un enlace a otra página",
      "Definir un botón",
      "Definir un formulario"
    ],
    respuesta: "Definir una barra de navegación",
    tipo: "seleccion",
    dificultad: "medio",
    puntos: 20 
  },
  {
    pregunta: "¿Cuál es el propósito de la etiqueta <footer> en HTML?",
    opciones: [
      "Definir el pie de página de una página",
      "Definir el encabezado de una página",
      "Definir un enlace a otra página",
      "Definir un botón"
    ],
    respuesta: "Definir el pie de página de una página",
    tipo: "seleccion",
    dificultad: "facil",
    puntos: 10
  },
  {
    pregunta: "¿Cuál es el propósito de la etiqueta <section> en HTML?",
    opciones: [
      "Definir una sección de contenido",
      "Definir un enlace a otra página",
      "Definir un botón",
      "Definir un formulario"
    ],
    respuesta: "Definir una sección de contenido",
    tipo: "seleccion",
    dificultad: "medio",
    puntos: 15
  }
];

let preguntasAleatorias = seleccionarPreguntasAleatorias();

function seleccionarPreguntasAleatorias() {
    const preguntasAleatorias = [];
    const indices = [];
    while (indices.length < 8) {
        const indiceAleatorio = Math.floor(Math.random() * preguntas.length);
        if (!indices.includes(indiceAleatorio)) {
            indices.push(indiceAleatorio);
            preguntasAleatorias.push(preguntas[indiceAleatorio]);
        }
    }
    return preguntasAleatorias;
}

comenzarBtn.addEventListener('click', () => {
    inicioPantalla.classList.add('ocultar');
    preguntasPantalla.classList.remove('ocultar');
    mostrarPregunta();
    iniciarTemporizador();
});

const barraProgreso = document.getElementById('barra-progreso');

function actualizarBarraProgreso() {
    const porcentaje = ((preguntaActual) / preguntasAleatorias.length) * 100;
    barraProgreso.style.width = `${porcentaje}%`;
}

function mostrarPregunta() {
    const pregunta = preguntasAleatorias[preguntaActual];
    preguntaTexto.textContent = pregunta.pregunta;
    opcionesLista.innerHTML = '';
    for (let i = 0; i < pregunta.opciones.length; i++) {
        const li = document.createElement('li');
        li.textContent = pregunta.opciones[i];
        li.classList.add('opcion');
        li.addEventListener('click', seleccionarOpcion);
        opcionesLista.appendChild(li);
    }
    actualizarBarraProgreso();
}

let opcionSeleccionada = null;

function seleccionarOpcion(e) {
    const opciones = document.querySelectorAll('.opcion');
    opciones.forEach((opcion) => opcion.classList.remove('seleccionado'));
    e.target.classList.add('seleccionado');
    opcionSeleccionada = e.target.textContent;
}

const retroalimentacion = document.getElementById('retroalimentacion');

siguienteBtn.addEventListener('click', () => {
  if (opcionSeleccionada === null) {
      alert("Debes seleccionar una respuesta antes de avanzar.");
      return;
  }
  pausarTemporizador();
  verificarRespuesta();
  avanzarPregunta();
});

function verificarRespuesta() {
    const pregunta = preguntasAleatorias[preguntaActual];
    const esCorrecta = opcionSeleccionada === pregunta.respuesta;

    // Guarda la respuesta del usuario
    respuestasUsuario.push({
        pregunta: pregunta.pregunta,
        seleccionada: opcionSeleccionada,
        correcta: pregunta.respuesta,
        esCorrecto: esCorrecta
    });

    if (esCorrecta) {
        puntaje += pregunta.puntos;
        preguntasCorrectas++;
        mostrarRetroalimentacion(true);
    } else {
        mostrarRetroalimentacion(false);
    }
    opcionSeleccionada = null;
}

function avanzarPregunta() {
    preguntaActual++;
    if (preguntaActual < preguntasAleatorias.length) {
        mostrarPregunta();
        iniciarTemporizador();
    } else {
        mostrarResultados();
        pausarTemporizador();
    }
}

function mostrarRetroalimentacion(esCorrecto) {
    retroalimentacion.classList.remove('ocultar', 'correcto', 'incorrecto');
    if (esCorrecto) {
        retroalimentacion.textContent = "¡Correcto!";
        retroalimentacion.classList.add('correcto');
    } else {
        retroalimentacion.textContent = `Incorrecto. La respuesta correcta era: ${preguntasAleatorias[preguntaActual].respuesta}`;
        retroalimentacion.classList.add('incorrecto');
    }
    setTimeout(() => {
        retroalimentacion.classList.add('ocultar');
    }, 2000);
}

function mostrarResultados() {
    preguntasPantalla.classList.add('ocultar');
    resultadosPantalla.classList.remove('ocultar');
    const porcentaje = (preguntasCorrectas / preguntasAleatorias.length) * 100;
    porcentajeFinal.textContent = `${porcentaje.toFixed(2)}%`;  
    preguntasCorrectasDiv.textContent = ` ${preguntasCorrectas}`;
    puntajeCorrectas.textContent = `${puntaje}`;

    // Mensaje final según el porcentaje
    if (porcentaje === 100) {
        mensajeFinal.textContent = "¡Excelente! Respondiste todas las preguntas correctamente.";
    } else if (porcentaje >= 70) {
        mensajeFinal.textContent = "¡Muy bien! Tienes un buen conocimiento.";
    } else if (porcentaje >= 40) {
        mensajeFinal.textContent = "Está bien, pero puedes mejorar.";
    } else {
        mensajeFinal.textContent = "Necesitas estudiar más. ¡Inténtalo de nuevo!";
    }
    if (puntaje >= 80) {
        mensajeFinal.textContent += " ¡Has alcanzado el nivel de experto!";
    } else if (puntaje >= 60) {
        mensajeFinal.textContent += " ¡Has alcanzado el nivel de avanzado!";
    } else if (puntaje >= 40) {
        mensajeFinal.textContent += " ¡Has alcanzado el nivel de intermedio!";
    } else {
        mensajeFinal.textContent += " ¡Has alcanzado el nivel de principiante!";
    }

    reiniciarBtn.classList.remove('ocultar');
}



const reiniciarBtn = document.getElementById('reiniciar-btn');

reiniciarBtn.addEventListener('click', reiniciarQuiz);

function reiniciarQuiz() {
    // Ocultar la pantalla de resultados y mostrar la pantalla de inicio
    resultadosPantalla.classList.add("ocultar");
    inicioPantalla.classList.remove("ocultar");

    // Reiniciar variables del juego
    preguntaActual = 0;
    puntaje = 0;
    preguntasCorrectas = 0;
    respuestasUsuario = [];

    // Restablecer la barra de progreso
    barraProgreso.style.width = '0%';

    // Ocultar la retroalimentación
    retroalimentacionDiv.classList.add('ocultar');

    // Reiniciar el temporizador y mostrar la pantalla de inicio
    document.getElementById('tiempo-restante').textContent = 30;
}
// Agregar un botón para compartir resultados
const compartirBtn = document.getElementById('compartir-btn');
compartirBtn.textContent = 'Compartir resultados';
compartirBtn.classList.add('compartir-btn');
resultadosPantalla.appendChild(compartirBtn);

// Agregar evento para compartir resultados
compartirBtn.addEventListener('click', () => {
    const porcentaje = (preguntasCorrectas / preguntasAleatorias.length) * 100;
    const mensaje = `¡Acabo de obtener un ${porcentaje.toFixed(2)}% en el quiz de preguntas y respuestas!`;
    const url = `https://www.instagram.com/direct/new/?send_to=USERNAME&text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  });
function guardarHistorial() {
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    historial.push({
      fecha: new Date(),
      puntaje: puntaje,
      preguntasCorrectas: preguntasCorrectas,
    });
    localStorage.setItem('historial', JSON.stringify(historial));
  }
  reiniciarBtn.addEventListener('click', guardarHistorial);
// Agregar temporizador global
const temporizadorGlobal = 300; // 5 minutos
let tiempoRestanteGlobal = temporizadorGlobal;

// Agregar función para actualizar temporizador global
function actualizarTemporizadorGlobal() {
  tiempoRestanteGlobal--;
  const minutos = Math.floor(tiempoRestanteGlobal / 60);
  const segundos = tiempoRestanteGlobal % 60;
  document.getElementById('tiempo-restante-global').textContent = `${minutos}:${segundos.toString().padStart(2, '0')}`;
  if (tiempoRestanteGlobal <= 0) {
    // Terminar el quiz
    mostrarResultados();
  }
}

// Agregar evento para actualizar temporizador global
setInterval(actualizarTemporizadorGlobal, 1000);
  