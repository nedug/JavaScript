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

const About = {
  id: "about",
  title: "Какой-то описательный текст данного SPA",
  render: (className = "container", ...rest) => {
    return `
      <section class="${className}">
        <h1>О нас</h1>
        <p>А здесь что-то как бы <strong>О нас</strong> или о них =)</p>
      </section>
    `;
  }
};

const Contacts = {
  id: "contacts",
  title: "Ну и страница Контакты, как без нее?",
  render: (className = "container", ...rest) => {
    return `
      <section class="${className}">
        <h1>Контакты</h1>
        <p>Ну а тут классически будет страница <strong>Контакты</strong>.</p>
      </section>
    `;
  }
};

const ErrorPage = {
  id: "error",
  title: "Achtung, warning, kujdes, attenzione, pozornost...",
  render: (className = "container", ...rest) => {
    return `
      <section class="${className}">
        <h1>Ошибка 404</h1>
        <p>Страница не найдена, попробуйте вернуться на <a href="#main">главную</a>.</p>
      </section>
    `;
  }
};
