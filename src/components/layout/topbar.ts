class TopbarComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="topbar">
        <div class="greeting">
          <h1>Bienvenido de nuevo</h1>
          <p>Administra tus tareas de manera eficiente</p>
        </div>
        <div class="controls">
          <input type="text" placeholder="Buscar tarea..." class="search-input" />
          <button class="new-task-btn" id="create-task">+ Nueva tarea</button>
        </div>
      </header>
    `;

    this.querySelector('#create-task')?.addEventListener('click', () => {
      const form = document.createElement('task-form');
      document.body.appendChild(form);
    });
  }
}

customElements.define('topbar-component', TopbarComponent);
