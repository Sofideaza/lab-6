export const router = (pathname: string) => {
  const app = document.getElementById('app');
  if (!app) return;

  switch (pathname) {
    case '/':
    case '/login':
      app.innerHTML = `<login-form></login-form>`;
      break;
    case '/register':
      app.innerHTML = `<register-form></register-form>`;
      break;
    case '/home':
      app.innerHTML = `<home-page></home-page>`;
      break;
    default:
      app.innerHTML = `
        <div style="padding:2rem;">
          <h2>404 - Página no encontrada</h2>
          <a href="/" onclick="event.preventDefault(); window.history.pushState({}, '', '/'); window.dispatchEvent(new Event('popstate'));">Volver al inicio</a>
        </div>`;
  }
};

export const navigateTo = (path: string) => {
  window.history.pushState({}, '', path);
  router(path);
};
