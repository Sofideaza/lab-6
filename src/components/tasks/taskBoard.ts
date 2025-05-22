class TaskBoard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
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