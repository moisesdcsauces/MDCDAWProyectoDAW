const campo = document.getElementById('buscador-campo');

if (campo) {
  const formulario = campo.closest('form');
  const mensajeVacio = document.getElementById('buscador-vacio');
  const unidades = document.querySelectorAll('.unidad');

  // Minúsculas, sin tildes y con los espacios y saltos de línea colapsados:
  // "instalacion" encuentra "Instalación" y "p1 proximamente" encuentra "P1" + salto + "Próximamente"
  const normalizar = (texto) => texto
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  const filtrar = () => {
    const consulta = normalizar(campo.value);
    let visibles = 0;

    unidades.forEach((unidad) => {
      const tituloUnidad = normalizar(unidad.querySelector('.unidad__titulo').textContent);
      let visiblesUnidad = 0;

      unidad.querySelectorAll('.practica').forEach((practica) => {
        const coincide = consulta === ''
          || tituloUnidad.includes(consulta)
          || normalizar(practica.textContent).includes(consulta);
        practica.hidden = !coincide;
        if (coincide) visiblesUnidad++;
      });

      unidad.hidden = visiblesUnidad === 0;
      visibles += visiblesUnidad;
    });

    mensajeVacio.hidden = visibles !== 0;
  };

  campo.addEventListener('input', filtrar);

  // Un formulario con un solo campo se envía con Intro y recargaría la página
  formulario.addEventListener('submit', (evento) => evento.preventDefault());

  // Si el filtro oculta la unidad a la que apunta un botón, se borra para poder llegar a ella
  document.querySelectorAll('.unidades-nav__enlace[href^="#"]').forEach((enlace) => {
    enlace.addEventListener('click', () => {
      const destino = document.getElementById(enlace.hash.slice(1));
      if (destino && destino.hidden) {
        campo.value = '';
        filtrar();
      }
    });
  });
}
