import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { navigateTo } from '../../router';

class RegisterForm extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        .register-form {
          background-color: var(--color-card-bg);
          padding: 2rem;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          max-width: 400px;
          margin: 2rem auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .register-form h2 {
          text-align: center;
          color: var(--color-primary);
        }

        .register-form input {
          padding: 0.75rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius);
        }

        .register-form button {
          background-color: var(--color-primary);
          color: white;
          padding: 0.75rem;
          border: none;
          border-radius: var(--radius);
        }

        .register-form button:hover {
          background-color: #327ad7;
        }
      </style>

      <form class="register-form">
        <h2>Registrarse</h2>
        <input type="email" id="register-email" placeholder="Correo" required />
        <input type="password" id="register-password" placeholder="Contraseña" required />
        <button type="submit">Crear cuenta</button>
      </form>
    `;

    shadow.querySelector('form')?.addEventListener('submit', this.handleRegister.bind(this));
  }

  async handleRegister(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.querySelector('#register-email') as HTMLInputElement).value;
    const password = (form.querySelector('#register-password') as HTMLInputElement).value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigateTo('/home');
    } catch {
      alert('Error al registrar. Revisa los datos.');
    }
  }
}

customElements.define('register-form', RegisterForm);
