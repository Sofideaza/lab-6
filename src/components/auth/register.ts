import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { navigateTo } from '../../router';

class RegisterForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this.querySelector('form')?.addEventListener('submit', this.handleRegister.bind(this));
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

  render() {
    this.innerHTML = `
      <form class="register-form">
        <h2>Registrarse</h2>
        <input type="email" id="register-email" placeholder="Correo" required />
        <input type="password" id="register-password" placeholder="Contraseña" required />
        <button type="submit">Crear cuenta</button>
      </form>
    `;
  }
}

customElements.define('register-form', RegisterForm);
