import { db } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { auth } from '../../firebase/config';

class TaskForm extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .task-form {
          background-color: var(--color-card-bg);
          padding: 2rem;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .task-form h3 {
          text-align: center;
          color: var(--color-primary);
        }

        .task-form input,
        .task-form textarea,
        .task-form select {
          padding: 0.75rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius);
          font-family: inherit;
        }

        .form-buttons {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }

        .form-buttons button {
          flex: 1;
          padding: 0.75rem;
          border: none;
          border-radius: var(--radius);
        }

        .form-buttons button:first-child {
          background-color: var(--color-primary);
          color: white;
        }

        .form-buttons button:last-child {
          background-color: #ccc;
          color: #333;
        }
      </style>

      <div class="modal-overlay">
        <form class="task-form">
          <h3>Nueva Tarea</h3>
          <input type="text" id="task-title" placeholder="Título" required />
          <textarea id="task-desc" placeholder="Descripción"></textarea>
          <select id="task-status">
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="In Review">In Review</option>
            <option value="Done">Done</option>
          </select>
          <div class="form-buttons">
            <button type="submit">Guardar</button>
            <button type="button" id="cancel">Cancelar</button>
          </div>
        </form>
      </div>
    `;

    shadow.querySelector('form')?.addEventListener('submit', this.handleSubmit.bind(this));
    shadow.querySelector('#cancel')?.addEventListener('click', () => this.remove());
  }

  async handleSubmit(e: Event) {
    e.preventDefault();

    const title = (this.shadowRoot?.querySelector('#task-title') as HTMLInputElement).value;
    const description = (this.shadowRoot?.querySelector('#task-desc') as HTMLTextAreaElement).value;
    const status = (this.shadowRoot?.querySelector('#task-status') as HTMLSelectElement).value;
    const user = auth.currentUser;

    if (!user) return;

    await addDoc(collection(db, 'tasks'), {
      title,
      description,
      status,
      userId: user.uid
    });

    this.remove();
  }
}

customElements.define('task-form', TaskForm);
