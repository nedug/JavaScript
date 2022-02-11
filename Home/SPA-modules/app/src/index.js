import HomePage from "./pages/HomePage.js";
import About from "./pages/About.js";
import Contacts from "./pages/Contacts.js";
import ErrorPage from "./pages/ErrorPage.js";
import Navbar from "./components/NavBar.js";
import ContentContainer from "./components/ContentContainer.js";

const components = {

  navbar: Navbar,
  content: ContentContainer,
}

const routes = {
  main: HomePage,
  about: About,
  contacts: Contacts,
  default: HomePage,
  error: ErrorPage,
};

/* ----- spa init module --- */
const mySPA = (function () {

  /* ------- begin view -------- */
  function ModuleView() {
    let myModuleContainer = null;
    let menu = null;
    let contentContainer = null;
    let routes = null;

    this.init = function (_container, _routes) {
      myModuleContainer = _container;
      routes = _routes;
      menu = myModuleContainer.querySelector("#mainmenu");
      contentContainer = myModuleContainer.querySelector("#content");
    }

    this.updateButtons = function (_currentPage) {
      const menuLinks = menu.querySelectorAll(".mainmenu__link");

      for (let link of menuLinks) {
        _currentPage === link.getAttribute("href").slice(1) ? link.classList.add("active") : link.classList.remove("active");
      }
    }

    this.renderContent = function (_hashPageName) {
      let routeName = "default";

      if (_hashPageName.length > 0) {
        routeName = _hashPageName in routes ? _hashPageName : "error";
      }

      window.document.title = routes[routeName].title;
      contentContainer.innerHTML = routes[routeName].render(`${routeName}-page`);
      this.updateButtons(routes[routeName].id);
    }
  };
  /* -------- end view --------- */
  /* ------- begin model ------- */
  function ModuleModel() {
    let myModuleView = null;

    this.init = function (view) {
      myModuleView = view;
    }

    this.updateState = function(_pageName) {
      myModuleView.renderContent(_pageName);
    }
  }

  /* -------- end model -------- */
  /* ----- begin controller ---- */
  function ModuleController() {
    let myModuleContainer = null;
    let myModuleModel = null;

    this.init = function (root, model) {
      myModuleContainer = root;
      myModuleModel = model;

      // вешаем слушателей на событие hashchange и кликам по пунктам меню
      window.addEventListener("hashchange", this.updateState);

      myModuleContainer.querySelector("#mainmenu").addEventListener("click", function (event) {
        event.preventDefault();
        window.location.hash = event.target.getAttribute("href");
      });

      this.updateState(); //первая отрисовка
    }

    this.updateState = function() {
      const hashPageName = location.hash.slice(1).toLowerCase();
      myModuleModel.updateState(hashPageName);
    }
  }
  /* ------ end controller ----- */

  return {
    init: function (root, routes, components) {
      this.renderComponents(root, components);

      const view = new ModuleView();
      const model = new ModuleModel();
      const controller = new ModuleController();

      //связываем части модуля
      view.init(document.getElementById(root), routes);
      model.init(view);
      controller.init(document.getElementById(root), model);
    },

    renderComponents: function (root, components) {
      const container = document.getElementById(root);
      for (let item in components) {
        if (components.hasOwnProperty(item)) {
          container.innerHTML += components[item].render();
        }
      }
    },
  };

}());
/* ------ end app module ----- */

/*** --- init module --- ***/
mySPA.init("spa", routes, components);
