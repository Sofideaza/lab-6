class TopbarComponent extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          background-color: var(--color-card-bg);
          border-bottom: 1px solid var(--color-border);
          box-shadow: var(--shadow);
          border-radius: var(--radius);
          margin-bottom: 1rem;
        }

        .greeting h1 {
          font-size: 1.5rem;
          color: var(--color-text);
        }

        .greeting p {
          font-size: 0.95rem;
          color: #777;
        }

        .controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .search-input {
          padding: 0.5rem 1rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius);
        }

        .new-task-btn {
          background-color: var(--color-primary);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: var(--radius);
          transition: 0.2s ease-in-out;
        }

        .new-task-btn:hover {
          background-color: #327ad7;
        }
      </style>

      <header class="topbar">
        <div class="greeting">
          <h1>Bienvenido de nuevo </h1>
          <p>Administra tus tareas de manera eficiente</p>
        </div>
        <div class="controls">
          <input type="text" placeholder="Buscar tarea..." class="search-input" />
          <button class="new-task-btn" id="create-task">+ Nueva tarea</button>
        </div>
      </header>
    `;

    shadow.querySelector('#create-task')?.addEventListener('click', () => {
      const form = document.createElement('task-form');
      document.body.appendChild(form);
    });
  }
}

customElements.define('topbar-component', TopbarComponent);

