import { db } from '../../firebase/config';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

class TaskCard extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute('data-id') || '';
    const title = this.getAttribute('data-title') || '';
    const desc = this.getAttribute('data-desc') || '';
    const status = this.getAttribute('data-status') || '';

    this.innerHTML = `
      <div class="task-card">
        <h4>${title}</h4>
        <p>${desc}</p>
        <div class="card-actions">
          <select class="status-selector">
            <option ${status === 'To Do' ? 'selected' : ''}>To Do</option>
            <option ${status === 'In Progress' ? 'selected' : ''}>In Progress</option>
            <option ${status === 'In Review' ? 'selected' : ''}>In Review</option>
            <option ${status === 'Done' ? 'selected' : ''}>Done</option>
          </select>
          <button class="delete-btn">🗑</button>
        </div>
      </div>
    `;

    this.querySelector('.delete-btn')?.addEventListener('click', async () => {
      if (confirm('¿Eliminar tarea?')) {
        await deleteDoc(doc(db, 'tasks', id));
      }
    });

    this.querySelector('.status-selector')?.addEventListener('change', async (e) => {
      const newStatus = (e.target as HTMLSelectElement).value;
      await updateDoc(doc(db, 'tasks', id), { status: newStatus });
    });
  }
}

customElements.define('task-card', TaskCard);
