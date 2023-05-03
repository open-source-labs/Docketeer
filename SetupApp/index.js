document.addEventListener('DOMContentLoaded', () => {
  const promInstall = document.querySelector('#prom');
  const grafInstall = document.querySelector('#metrics');
  const portForward = document.querySelector('#port');

  promInstall.addEventListener('click', () => {
    fetch('/api/setup/promInstall');
  });

  grafInstall.addEventListener('click', () => {
    fetch('/api/setup/applyGraf');
  });

  portForward.addEventListener('click', () => {
    fetch('/api/setup/portForward');
  });
});