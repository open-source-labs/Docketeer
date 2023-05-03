document.addEventListener('DOMContentLoaded', () => {
  const promInstall = document.querySelector('#prom');
  const grafInstall = document.querySelector('#metrics');
  const portForward = document.querySelector('#port');
  const promCheck = document.querySelector('#promCheck');
  const grafCheck = document.querySelector('#grafCheck');
  const portCheck = document.querySelector('#portCheck');


  promInstall.addEventListener('click', () => {
    fetch('/api/setup/promInstall')
      .then(() => {
        promCheck.setAttribute('style', 'visibility: visible;');
      });
  });

  grafInstall.addEventListener('click', () => {
    fetch('/api/setup/applyGraf')
      .then(() => {
        grafCheck.setAttribute('style', 'visibility: visible;');
      });
  });

  portForward.addEventListener('click', () => {
    fetch('/api/setup/portForward')
      .then(() => {
        portCheck.setAttribute('style', 'visibility: visible;');
      });
  });
});