import { db } from '../../firebase/config';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

class TaskCard extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute('data-id') || '';
    const title = this.getAttribute('data-title') || '';
    const desc = this.getAttribute('data-desc') || '';
    const status = this.getAttribute('data-status') || '';

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        .task-card {
          background-color: var(--color-card-bg);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .task-card h4 {
          font-size: 1.1rem;
          color: var(--color-text);
        }

        .task-card p {
          font-size: 0.95rem;
          color: #666;
        }

        .card-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.5rem;
        }

        .status-selector {
          padding: 0.4rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius);
        }

        .delete-btn {
          background: transparent;
          border: none;
          font-size: 1.1rem;
          cursor: pointer;
          color: #e74c3c;
          transition: 0.2s ease-in-out;
        }

        .delete-btn:hover {
          transform: scale(1.1);
        }
      </style>

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

    shadow.querySelector('.delete-btn')?.addEventListener('click', async () => {
      if (confirm('¿Eliminar tarea?')) {
        await deleteDoc(doc(db, 'tasks', id));
      }
    });

    shadow.querySelector('.status-selector')?.addEventListener('change', async (e) => {
      const newStatus = (e.target as HTMLSelectElement).value;
      await updateDoc(doc(db, 'tasks', id), { status: newStatus });
    });
  }
}

customElements.define('task-card', TaskCard);
