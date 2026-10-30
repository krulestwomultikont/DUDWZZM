(() => {
  const desktop = window.matchMedia('(hover: hover) and (pointer: fine)');
  for (const details of document.querySelectorAll('.portal-nav details')) {
    details.addEventListener('mouseenter', () => {
      if (desktop.matches) details.open = true;
    });
    details.addEventListener('mouseleave', () => {
      if (desktop.matches) details.open = false;
    });
    details.querySelector('summary').addEventListener('click', event => {
      if (desktop.matches && event.detail > 0) {
        event.preventDefault();
        details.open = true;
      }
    });
  }
})();
