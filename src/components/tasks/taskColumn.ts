import { db } from '../../firebase/config';
import { collection, onSnapshot, query, where, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { auth } from '../../firebase/config';

class TaskColumn extends HTMLElement {
  status: string = '';

  connectedCallback() {
    this.status = this.getAttribute('data-status') || '';
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        .task-column {
          background-color: var(--color-secondary, #f4f5f7);
          border-radius: var(--radius);
          padding: 1rem;
          min-width: 250px;
          max-width: 300px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: var(--shadow);
        }

        .task-column h3 {
          margin-bottom: 0.5rem;
          font-size: 1.2rem;
          color: var(--color-text);
        }

        .task-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
      </style>

      <div class="task-column">
        <h3>${this.status}</h3>
        <div class="task-list" id="task-list-${this.status}"></div>
      </div>
    `;

    this.loadTasks(shadow);
  }

  loadTasks(shadow: ShadowRoot) {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', user.uid),
      where('status', '==', this.status)
    );

    onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const container = shadow.querySelector(`#task-list-${this.status}`);
      if (!container) return;
      container.innerHTML = '';
      snapshot.forEach((doc) => {
        const taskData = doc.data();
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
