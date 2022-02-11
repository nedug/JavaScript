const HomePage = {
  id: "main",
  title: "Главная страница примера SPA",
  render: (className = "container", ...rest) => {
    return `
      <section class="${className}">
        <h1>Главная</h1>
        <p>Здесь будет контент <strong>Главной</strong> страницы.</p>
      </section>
    `;
  }
};

export default HomePage;
