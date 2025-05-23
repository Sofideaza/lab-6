class TaskCard extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('data-title') || 'Sin título';
    const description = this.getAttribute('data-desc') || 'Sin descripción';
    const status = this.getAttribute('data-status') || '';

    const statusMap: Record<string, { label: string; bg: string; color: string }> = {
      'To Do':        { label: 'Por hacer',     bg: '#E0F2FF', color: '#0277BD' },
      'In Progress':  { label: 'En progreso',   bg: '#FFF8E1', color: '#FF8F00' },
      'In Review':    { label: 'En revisión',   bg: '#F3E5F5', color: '#6A1B9A' },
      'Done':         { label: 'Completada',    bg: '#E8F5E9', color: '#2E7D32' }
    };

    const badge = statusMap[status] || {
      label: status,
      bg: '#eeeeee',
      color: '#666666'
    };

    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        .card {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-family: 'Segoe UI', sans-serif;
        }

        .category {
          font-size: 0.75rem;
          color: #888;
        }

        .title {
          font-size: 1rem;
          font-weight: bold;
          color: #333;
        }

        .description {
          font-size: 0.875rem;
          color: #555;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.5rem;
        }

        .user {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: #ddd;
        }

        .badge {
          background-color: ${badge.bg};
          color: ${badge.color};
          font-size: 0.7rem;
          padding: 0.2rem 0.5rem;
          border-radius: 999px;
          font-weight: 600;
        }

        .meta {
          display: flex;
          gap: 0.8rem;
          font-size: 0.75rem;
          color: #999;
        }

        .meta span {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
      </style>

      <div class="card">
        <div class="title">${title}</div>
        <div class="description">${description}</div>

        <div class="footer">
          <div class="user">
            <div class="avatar"></div>
            <div class="badge">${badge.label}</div>
          </div>
          <div class="meta">
            <span>💬 2</span>
            <span>❤️ 1</span>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('task-card', TaskCard);
