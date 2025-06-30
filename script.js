AOS.init();

const toggle = document.querySelector('.theme-toggle');
const body = document.body;

toggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

window.onload = () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') body.classList.add('dark');
};