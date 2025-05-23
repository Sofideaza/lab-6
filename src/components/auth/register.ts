import { auth } from '../../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { navigateTo } from '../../router';

class RegisterForm extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        :host {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: var(--color-bg);
        }
        .card {
          background: white;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          padding: 2rem;
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        h2 {
          text-align: center;
          color: var(--color-primary);
        }
        input {
          padding: 0.75rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius);
          font-size: 1rem;
        }
        button {
          background-color: var(--color-primary);
          color: white;
          padding: 0.75rem;
          border: none;
          border-radius: var(--radius);
          font-size: 1rem;
          cursor: pointer;
        }
        button:hover {
          opacity: 0.95;
        }
        .link {
          text-align: center;
          font-size: 0.9rem;
        }
        .link a {
          color: var(--color-primary);
          cursor: pointer;
          text-decoration: underline;
        }
      </style>

      <form class="card">
        <h2>Registrarse</h2>
        <input type="email" placeholder="Correo electrónico" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="submit">Crear cuenta</button>
        <div class="link">¿Ya tienes cuenta? <a id="go-login">Inicia sesión aquí</a></div>
      </form>
    `;

    shadow.querySelector('form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const inputs = shadow.querySelectorAll('input');
      const email = (inputs[0] as HTMLInputElement).value;
      const password = (inputs[1] as HTMLInputElement).value;

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigateTo('/home');
      } catch {
        alert('No se pudo crear la cuenta.');
      }
    });

    shadow.getElementById('go-login')?.addEventListener('click', () => {
      navigateTo('/login');
    });
  }
}

customElements.define('register-form', RegisterForm);
