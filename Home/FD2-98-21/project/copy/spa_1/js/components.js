const Header = {
  render: (customClass = "") => {
    return `
      <header class="header ${customClass}" id="header">
        <a href="#statistics">Some logo here</a>
      </header>`;
  }
};


const NavBar = {
  render: (customClass = "") => {
    return `
      <nav class="mainmenu ${customClass}" id="mainmenu">
        <ul class="mainmenu__list">
          <li><a class="mainmenu__link" href="#statistics">Статистика</a></li>
          <li><a class="mainmenu__link" href="#health">Здоровье</a></li>
          <li><a class="mainmenu__link" href="#motivation">Мотивация</a></li>
          <li><a class="mainmenu__link" href="#other">Разное</a></li>
          <li><a class="mainmenu__link" href="#login">Настройка</a></li>
        </ul>
      </nav>`;
  }
};


const Content = {
  render: (customClass = "") => {
    return `<div class="content ${customClass}" id="content"></div>`;
  }
};


const Footer = {
  render: (customClass = "") => {
    return `<footer class="footer ${customClass}">
      <p>&copy; 2021 все будет хорошо!</p>
    </footer>`;
  }
};
