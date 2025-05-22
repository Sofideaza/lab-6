class SidebarComponent extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        .sidebar {
          background-color: var(--color-sidebar);
          color: white;
          padding: 2rem 1rem;
          width: 240px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          position: fixed;
          top: 0;
          left: 0;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          text-align: center;
        }

        .nav-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .nav-links li {
          display: flex;
          justify-content: center;
        }

        .nav-links a, .nav-links button {
          background: none;
          border: none;
          color: white;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          cursor: pointer;
          transition: background 0.2s ease;
          border-radius: var(--radius);
          width: 100%;
          text-align: center;
        }

        .nav-links a:hover, .nav-links button:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      </style>

      <nav class="sidebar">
        <h2 class="logo">Mi Tablero</h2>
        <ul class="nav-links">
          <li><a href="#" data-path="/home">Tareas</a></li>
          <li><button id="logout-btn">Cerrar sesión</button></li>
        </ul>
      </nav>
    `;

    shadow.querySelector('#logout-btn')?.addEventListener('click', () => {
      localStorage.clear();
      window.location.href = '/';
    });

    shadow.querySelectorAll('a[data-path]')?.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const path = (e.target as HTMLAnchorElement).dataset.path;
        if (path) {
          window.history.pushState({}, '', path);
          window.dispatchEvent(new Event('popstate'));
        }
      });
    });
  }
}

customElements.define('sidebar-component', SidebarComponent);
