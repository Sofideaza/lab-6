class TaskBoard extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        .task-board {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          padding: 2rem;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .task-board {
            display: flex;
            flex-direction: column;
          }
        }
      </style>

      <section class="task-board">
        <task-column data-status="To Do"></task-column>
        <task-column data-status="In Progress"></task-column>
        <task-column data-status="In Review"></task-column>
        <task-column data-status="Done"></task-column>
      </section>
    `;
  }
}

customElements.define('task-board', TaskBoard);

