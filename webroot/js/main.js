const header = document.getElementById('site-header');

window.addEventListener('scroll', () => {
  header.classList.toggle('cabecera--desplazada', window.scrollY > 10);
});

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = ' · ' + new Date().getFullYear();
}