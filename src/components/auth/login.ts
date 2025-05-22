import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { navigateTo } from '../../router';

class LoginForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this.querySelector('form')?.addEventListener('submit', this.handleLogin.bind(this));
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

  render() {
    this.innerHTML = `
      <form class="login-form">
        <h2>Iniciar sesión</h2>
        <input type="email" id="login-email" placeholder="Correo" required />
        <input type="password" id="login-password" placeholder="Contraseña" required />
        <button type="submit">Entrar</button>
      </form>
    `;
  }
}

customElements.define('login-form', LoginForm);
