import { db } from '../../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth } from '../../firebase/config';

class TaskColumn extends HTMLElement {
  status: string = '';

  connectedCallback() {
    this.status = this.getAttribute('data-status') || '';

    const statusMap: Record<string, string> = {
      'To Do': 'Por hacer',
      'In Progress': 'En progreso',
      'In Review': 'En revisión',
      'Done': 'Completadas'
    };

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        .task-column {
          background-color: var(--color-card-bg);
          border-radius: var(--radius);
          padding: 1rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow);
        }

        .task-column h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-text);
          text-align: center;
          margin-bottom: 0.5rem;
        }

        .task-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
      </style>

      <div class="task-column">
        <h3>${statusMap[this.status] || this.status}</h3>
        <div class="task-list" id="task-list-${this.status.replace(/\s+/g, '_')}"></div>
      </div>
    `;

    this.loadTasks(shadow);
  }

  async loadTasks(shadow: ShadowRoot) {
    const user = auth.currentUser;
    if (!user) {
      console.warn('Usuario no autenticado');
      return;
    }

    console.log('Cargando tareas para status:', this.status);
    console.log('UID actual:', user.uid);

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', user.uid),
      where('status', '==', this.status)
    );

    onSnapshot(q, (snapshot) => {
      const container = shadow.querySelector(`#task-list-${this.status.replace(/\s+/g, '_')}`);
      if (!container) {
        console.error('Contenedor de tareas no encontrado');
        return;
      }

      container.innerHTML = '';

      if (snapshot.empty) {
        console.log('📭 No hay tareas con este estado.');
        return;
      }

      snapshot.forEach((doc) => {
        const taskData = doc.data();
        console.log(' Tarea encontrada:', taskData);

        const taskCard = document.createElement('task-card');
        taskCard.setAttribute('data-id', doc.id);
        taskCard.setAttribute('data-title', taskData.title);
        taskCard.setAttribute('data-desc', taskData.description || '');
        taskCard.setAttribute('data-status', taskData.status);
        container.appendChild(taskCard);
      });
    });
  }
}

customElements.define('task-column', TaskColumn);
