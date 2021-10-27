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
  options: Options,
  authorization: AuthorPage,
  main: HomePage,
  about: About,
  contacts: Contacts,
  default: HomePage,
  error: ErrorPage,
};


/* ----- SPA module --- */
const mySPA = (function() {


    /* ------- begin model ------- */
    function ModuleModel() {

        let myModuleView = null;
        let userData = {};

        let pageNameLink = null;
        let userDataStorage = null;


        this.init = function(view) {

            myModuleView = view;
        }


        this.updateState = function(pageName) {

            pageNameLink = pageName;

            userDataStorage = JSON.parse(localStorage.getItem('userData'));

            myModuleView.renderContent(pageNameLink, userDataStorage);
        }


        this.saveData = function(inputName, inputDate, inputNumCig, inputCostCig) { // Получаем данные из модалки и сохраняем в объект 'userData'

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


        this.storeData = function() { // Сохраняем данные в localStorage

            let userDataSerial = JSON.stringify(userData);

            localStorage.setItem('userData', userDataSerial);

            // myModuleView.renderContentLogin();

            // console.log(pageNameId)

            // userDataStorage = JSON.parse(localStorage.getItem('userData'));
            //
            // myModuleView.renderContent(pageNameLink, userDataStorage);

            this.updateState(pageNameLink); /* Обновляем приложение */

        }


        // this.getData = function(pageName) { // Достаем данные из хранилища
        //
        //     pageNameLink = pageName;
        //
        //     userDataStorage = JSON.parse(localStorage.getItem('userData'));
        //
        //     // this.updateState();
        //
        //     // if (!userDataStorage) return; /* Проверяем на наличие данных в localStorage */
        //
        //     // this.updateState(pageNameLink);
        //     myModuleView.renderContent(pageNameLink, userDataStorage);
        // }


        this.clearData = function() { // Очищаем данные в хранилище


            localStorage.removeItem('userData');


            this.updateState(pageNameLink);
        }

    }



    /* ------- begin view -------- */
    function ModuleView() {
        let myModuleContainer = null;
        let menu = null;
        let contentContainer = null;
        let routesObj = null;
        let that = this;

        let userStorage = null;

        this.init = function(container, routes) {
            myModuleContainer = container;
            routesObj = routes;
            menu = myModuleContainer.querySelector("#mainmenu");
            contentContainer = myModuleContainer.querySelector("#content");
        }

        this.renderContent = function(hashPageName, userData) {

            let routeName = "default";

            userStorage = userData;

            // console.log(userStorage);

            if (hashPageName.length > 0 && hashPageName !== 'login' && !userStorage) {
                routeName = "authorization";
                console.log(1111)
                something();
            }
            // else if ( )
            else if ((hashPageName === '' || hashPageName === 'login') && !userStorage) {

                console.log(2222)
                routeName = hashPageName in routes ? hashPageName : "login";
                // contentContainer.innerHTML = routesObj[routeName].render(`${routeName}-page`);
                something();
                // this.renderContentLogin();
            }
            else if ((hashPageName === '') && userStorage) {

                console.log(333)
                routeName = "main";
                // contentContainer.innerHTML = routesObj[routeName].render(`${routeName}-page`);
                something();
                // this.renderContentLogin();
            }
            else if ((hashPageName === 'login') && userStorage) {

                console.log(444)
                routeName = "options";
                // contentContainer.innerHTML = routesObj[routeName].render(`${routeName}-page`);
                something();
                // this.renderContentLogin();
            }
            else {
                console.log(555)
                routeName = hashPageName in routes ? hashPageName : "error";
                something();
            }

            // console.log(hashPageName);
            // console.log(routeName);





            function something() {
                window.document.title = routesObj[routeName].title;

                // console.log(routesObj)
                // console.log(routesObj[routeName].render(`${routeName}-page`))
                // console.log(routesObj[routeName].id)

                contentContainer.innerHTML = routesObj[routeName].render(`${routeName}-page`);

                // contentContainer.innerHTML = routesObj['options11'].render();

                that.updateButtons(routesObj[routeName].id);
            }



            // console.log(JSON.parse(localStorage.getItem('userData')))

            // if(JSON.parse(localStorage.getItem('userData'))) {
            //     this.renderContentLogin();
            // }
        }

        this.updateButtons = function(currentPage) {
            const menuLinks = menu.querySelectorAll(".mainmenu__link");

            // console.log(currentPage)

            for (let link of menuLinks) {
                currentPage === link.getAttribute("href").slice(1) ? link.classList.add("active") : link.classList.remove("active");
            }
        }


        this.renderContentLogin = function() {

            const linkLogin = myModuleContainer.querySelector('[href="#login"]');
            linkLogin.innerHTML = 'Настройки';
            // linkLogin.setAttribute('href', '#fff');

            const h3 = myModuleContainer.querySelector(".user__content");
            h3.innerHTML = 'Изменить данные пользователя:';

            const inputNumCig = myModuleContainer.querySelector(".input__num-cigarette");
            inputNumCig.value = JSON.parse(localStorage.getItem('userData')).userNumCigarette;


            const buttonSave = myModuleContainer.querySelector(".data__save");
            buttonSave.innerHTML = 'Изменить';




        }
    }



    /* ----- begin controller ---- */
    function ModuleController() {

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


            myModuleContainer.addEventListener("click", clickHandler);

            function clickHandler(e) {

                let target = e.target;

                // console.log(target.getAttribute('class'))

                if (target.getAttribute('class') === 'data__save') {

                    // console.log('текст')

                    that.saveDataUser();
                }

                if (target.getAttribute('class') === 'data__delete') {

                    // console.log('текст')

                    that.clearData();
                }


            }
        }


        this.updateState = function() {

            const hashPageName = location.hash.slice(1).toLowerCase(); /* Линк после # */

            myModuleModel.updateState(hashPageName);
        }


        this.saveDataUser = function () { /* Сохраняем данные из инпутов в localStorage */

            inputName = myModuleContainer.querySelector(".input__default");
            inputDate = myModuleContainer.querySelector(".input__date-last");
            inputNumCig = myModuleContainer.querySelector(".input__num-cigarette");
            inputCostCig = myModuleContainer.querySelector(".input__cost-cigarette");

            myModuleModel.saveData(inputName.value, inputDate.value, inputNumCig.value, inputCostCig.value);
        }


        this.clearData = function () { /* Очищаем данные из localStorage */

            myModuleModel.clearData();
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
