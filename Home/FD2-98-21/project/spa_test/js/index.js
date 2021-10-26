// Список компонент (from components.js)
const components = {
  header: Header,
  navbar: NavBar,
  content: Content,
  footer: Footer,
};

// Список поддердживаемых роутов (from pages.js)
const routes = {
  login: LoginWeb,
  main: HomePage,
  about: About,
  contacts: Contacts,
  default: HomePage,
  error: ErrorPage,
};


/* ----- SPA module --- */
const mySPA = (function() {

    /* ------- begin model ------- */
    function ModuleModel () {

        let myModuleView = null;
        let userData = null;

        this.init = function(view) {
            myModuleView = view;
        }

        this.updateState = function(pageName) {

            // if(!userData) {
            //     console.log(userData);
            //     myModuleView.renderContent("error");
            // }
            // else {
            //     myModuleView.renderContent(pageName);
            // }
            myModuleView.renderContent(pageName);

        }

        this.saveModalData = function(inputName, inputDate, inputNumCig, inputCostCig) { // Получаем данные из модалки и сохраняем в объект 'userData'

            // if (inputDay > 31 || inputDay < 1 || inputMonth > 12 || inputMonth < 1 || inputYear < 1 || inputYear > new Date().getFullYear()) { /* Проверка на корректность данных */
            //
            //     myModalView.validDate(false);
            //     return;
            // }

            userData = {

                userName: inputName,
                userDate: inputDate,
                userNumCigarette: inputNumCig,
                userCostCigarette: inputCostCig,
            }

            this.storeData(); /* Сохраняем данные в localStorage */

            // myModalView.validDate(true);
        }


        this.storeData = function() { // Сохраняем данные в localStorage, а если не доступно, то в cookies

            let userDataSerial = JSON.stringify(userData);

            localStorage.setItem('userData', userDataSerial);

            myModuleView.renderContentLogin();


        }
    }



    /* ------- begin view -------- */
    function ModuleView() {
        let myModuleContainer = null;
        let menu = null;
        let contentContainer = null;
        let routesObj = null;

        this.init = function(container, routes) {
            myModuleContainer = container;
            routesObj = routes;
            menu = myModuleContainer.querySelector("#mainmenu");
            contentContainer = myModuleContainer.querySelector("#content");
        }

        this.renderContent = function(hashPageName) {
            let routeName = "default";

            if (hashPageName.length > 0) {
                routeName = hashPageName in routes ? hashPageName : "error";
            }

            console.log(hashPageName);





            window.document.title = routesObj[routeName].title;
            contentContainer.innerHTML = routesObj[routeName].render(`${routeName}-page`);
            this.updateButtons(routesObj[routeName].id);

            if(JSON.parse(localStorage.getItem('userData')) && hashPageName === 'login') {
                this.renderContentLogin();
            }
        }

        this.updateButtons = function(currentPage) {
            const menuLinks = menu.querySelectorAll(".mainmenu__link");

            for (let link of menuLinks) {
                currentPage === link.getAttribute("href").slice(1) ? link.classList.add("active") : link.classList.remove("active");
            }
        }


        this.renderContentLogin = function() {

            const linkLogin = myModuleContainer.querySelector('[href="#login"]');
            linkLogin.innerHTML = 'Настройки';
            // linkLogin.setAttribute('href', '#fff');

            const h3 = myModuleContainer.querySelector(".login-page h3");
            h3.innerHTML = 'Изменить данные пользователя:';

            const inputNumCig = myModuleContainer.querySelector(".input__num-cigarette");
            inputNumCig.value = JSON.parse(localStorage.getItem('userData')).userNumCigarette;


            const buttonSave = myModuleContainer.querySelector(".data__save");
            buttonSave.innerHTML = 'Изменить';




        }
    }



    /* ----- begin controller ---- */
    function ModuleController () {

        let myModuleContainer = null;
        let myModuleModel = null;

        let inputName = null;
        let inputDate = null;
        let inputNumCig = null;
        let inputCostCig = null;
        let that = this;

        this.init = function(container, model) {

            myModuleContainer = container;
            myModuleModel = model;

            // вешаем слушателей на событие hashchange и кликам по пунктам меню
            window.addEventListener("hashchange", this.updateState);

            this.updateState(); //первая отрисовка


            // const buttonSave = myModuleContainer.querySelector(".data__save");
            // buttonSave.addEventListener("click", this.saveModal);
            //
            // inputName = myModuleContainer.querySelector(".input__default");
            // inputDate = myModuleContainer.querySelector(".input__date-last");
            // inputNumCig = myModuleContainer.querySelector(".input__num-cigarette");
            // inputCostCig = myModuleContainer.querySelector(".input__cost-cigarette");
        }

        this.updateState = function() {

            const hashPageName = location.hash.slice(1).toLowerCase();
            myModuleModel.updateState(hashPageName);

            if (hashPageName === 'login') {
                const buttonSave = myModuleContainer.querySelector(".data__save");

                // console.log(buttonSave);

                buttonSave.addEventListener("click", that.saveModal);

                inputName = myModuleContainer.querySelector(".input__default");
                inputDate = myModuleContainer.querySelector(".input__date-last");
                inputNumCig = myModuleContainer.querySelector(".input__num-cigarette");
                inputCostCig = myModuleContainer.querySelector(".input__cost-cigarette");
            }


        }

        this.saveModal = function (e) { /* Сохраняем данные из инпутов в localStorage */

            e.preventDefault();
            myModuleModel.saveModalData(inputName.value, inputDate.value, inputNumCig.value, inputCostCig.value);
        }
    }



  return {
      init: function({container, routes, components}) {
        this.renderComponents(container, components);

        const view = new ModuleView();
        const model = new ModuleModel();
        const controller = new ModuleController();

        //связываем части модуля
        view.init(document.getElementById(container), routes);
        model.init(view);
        controller.init(document.getElementById(container), model);
      },

      renderComponents: function (container, components) {
        const root = document.getElementById(container);
        const componentsList = Object.keys(components);
        for (let item of componentsList) {
          root.innerHTML += components[item].render("component");
        }
      },
  };

}());


/*** --- init module --- ***/
document.addEventListener("DOMContentLoaded", mySPA.init({
  container: "spa",
  routes: routes,
  components: components,
}));
