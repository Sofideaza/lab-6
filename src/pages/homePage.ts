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

    const style = document.createElement('style');
    style.textContent = `
      .home-page {
        display: flex;
      }

      .main-board {
        margin-left: 240px;
        width: 100%;
        padding: 2rem;
      }
    `;
    this.appendChild(style);
  }
}
customElements.define('home-page', HomePage);
