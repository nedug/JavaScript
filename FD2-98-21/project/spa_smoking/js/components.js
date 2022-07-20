const Header = {
    render: (customClass = '') => {
        return `
      <header class="header ${customClass}" id="header">
        <a href="#statistics">STOP SMOKING<i class="fas fa-smoking-ban"></i></a>
      </header>`;
    }
};


const NavBar = {
    render: (customClass = '') => {
        return `
      <nav class="mainmenu ${customClass}" id="mainmenu">
        <ul class="mainmenu__list">
          <li><a class="mainmenu__link" href="#statistics">Статистика</a></li>
          <li><a class="mainmenu__link" href="#health">Здоровье</a></li>
          <li><a class="mainmenu__link" href="#motivation">Мотивация</a></li>
          <li><a class="mainmenu__link" href="#other">Разное</a></li>
          <li><a class="mainmenu__link" href="#login">Настройки</a></li>
        </ul>
      </nav>`;
    }
};


const Content = {
    render: (customClass = '') => {
        return `<div class="content ${customClass}" id="content"></div>`;
    }
};
