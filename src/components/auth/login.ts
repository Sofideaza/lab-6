import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { navigateTo } from '../../router';

class LoginForm extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        .login-form {
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
        .login-form h2 {
          text-align: center;
          color: var(--color-primary);
        }
        .login-form input {
          padding: 0.75rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius);
        }
        .login-form button {
          background-color: var(--color-primary);
          color: white;
          padding: 0.75rem;
          border: none;
          border-radius: var(--radius);
        }
        .login-form button:hover {
          background-color: #327ad7;
        }
      </style>

      <form class="login-form">
        <h2>Iniciar sesión</h2>
        <input type="email" id="login-email" placeholder="Correo" required />
        <input type="password" id="login-password" placeholder="Contraseña" required />
        <button type="submit">Entrar</button>
      </form>
    `;

    shadow.querySelector('form')?.addEventListener('submit', this.handleLogin.bind(this));
  }

  async handleLogin(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.querySelector('#login-email') as HTMLInputElement).value;
    const password = (form.querySelector('#login-password') as HTMLInputElement).value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigateTo('/home');
    } catch {
      alert('Usuario o contraseña incorrectos');
    }
  }
}

customElements.define('login-form', LoginForm);
