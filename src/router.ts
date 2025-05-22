export const router = (pathname: string) => {
  const app = document.getElementById('app');
  if (!app) return;

  switch (pathname) {
    case '/':
    case '/login':
      app.innerHTML = '<auth-page></auth-page>';
      break;

    case '/home':
      app.innerHTML = '<home-page></home-page>';
      break;

    default:
      app.innerHTML = `<div style="padding: 2rem;">
        <h2>404 - Página no encontrada</h2>
        <a href="/">Volver al inicio</a>
      </div>`;
      break;
  }
};

export const navigateTo = (path: string) => {
  window.history.pushState({}, '', path);
  router(path);
};
