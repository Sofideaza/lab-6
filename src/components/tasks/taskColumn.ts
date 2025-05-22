import { db } from '../../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth } from '../../firebase/config';

class TaskColumn extends HTMLElement {
  status: string = '';

  connectedCallback() {
    this.status = this.getAttribute('data-status') || '';
    this.innerHTML = `
      <div class="task-column">
        <h3>${this.status}</h3>
        <div class="task-list" id="task-list-${this.status}"></div>
      </div>
    `;
    this.loadTasks();
  }

  loadTasks() {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', user.uid),
      where('status', '==', this.status)
    );

    onSnapshot(q, (snapshot) => {
      const container = this.querySelector(`#task-list-${this.status}`);
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
