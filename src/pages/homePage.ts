class HomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="home-page">
        <sidebar-component></sidebar-component>
        <main class="main-board">
          <topbar-component></topbar-component>
          <task-board></task-board>
        </main>
      </section>
    `;
  }
}

customElements.define('home-page', HomePage);
