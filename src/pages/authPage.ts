class AuthPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="auth-page">
        <login-form></login-form>
        <register-form></register-form>
      </section>
    `;
  }
}

customElements.define('auth-page', AuthPage);
