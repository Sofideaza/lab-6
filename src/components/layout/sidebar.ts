class SidebarComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="sidebar">
        <h2 class="logo">Mi Tablero</h2>
        <ul class="nav-links">
          <li><a href="#" data-path="/home">Tareas</a></li>
          <li><button id="logout-btn">Cerrar sesión</button></li>
        </ul>
      </nav>
    `;

    this.querySelector('#logout-btn')?.addEventListener('click', () => {
      localStorage.clear();
      window.location.href = '/';
    });

    this.querySelectorAll('a[data-path]')?.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const path = (e.target as HTMLAnchorElement).dataset.path;
        if (path) window.history.pushState({}, '', path);
        window.dispatchEvent(new Event('popstate'));
      });
    });
  }
}

customElements.define('sidebar-component', SidebarComponent);
