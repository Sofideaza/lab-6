import { db } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { auth } from '../../firebase/config';

class TaskForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
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

    this.querySelector('form')?.addEventListener('submit', this.handleSubmit.bind(this));
    this.querySelector('#cancel')?.addEventListener('click', () => this.remove());
  }

  async handleSubmit(e: Event) {
    e.preventDefault();

    const title = (this.querySelector('#task-title') as HTMLInputElement).value;
    const description = (this.querySelector('#task-desc') as HTMLTextAreaElement).value;
    const status = (this.querySelector('#task-status') as HTMLSelectElement).value;
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
