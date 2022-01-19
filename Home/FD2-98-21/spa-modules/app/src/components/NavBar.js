const NavBar = {
  render: () => {
    return `
      <nav class="mainmenu" id="mainmenu">
        <ul class="mainmenu__list">
          <li><a class="mainmenu__link" href="#main">Главная!</a></li>
          <li><a class="mainmenu__link" href="#about">О нас</a></li>
          <li><a class="mainmenu__link" href="#contacts">Контакты</a></li>
        </ul>
      </nav>
    `;
  }
};

export default NavBar;
