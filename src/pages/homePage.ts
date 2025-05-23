import { auth } from '../firebase/config';
import { navigateTo } from '../router';

class HomePage extends HTMLElement {
  connectedCallback() {
    if (!auth.currentUser) {
      console.warn("Usuario no autenticado. Redirigiendo al login...");
      navigateTo('/login');
      return;
    }

    this.innerHTML = `
      <section class="home-page">
        <sidebar-component></sidebar-component>
        <main class="main-board">
          <topbar-component></topbar-component>
          <task-board></task-board>
        </main>
      </section>
    `;

    const style = document.createElement('style');
    style.textContent = `
      .home-page {
        display: flex;
        height: 100vh;
        background-color: var(--color-bg);
        color: var(--color-text);
        font-family: 'Poppins', sans-serif;
      }

      .main-board {
        margin-left: 240px;
        padding: 2rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      task-board {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
        padding-bottom: 2rem;
      }

      @media (max-width: 768px) {
        .main-board {
          margin-left: 0;
          padding: 1rem;
        }

        task-board {
          display: flex;
          flex-direction: column;
        }
      }
    `;

    this.appendChild(style);
  }
}

customElements.define('home-page', HomePage);
