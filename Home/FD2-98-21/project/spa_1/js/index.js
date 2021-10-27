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
  statistics: Statistics,
  health: Health,
  motivation: Motivation,
  default: Statistics,
  error: ErrorPage,
};


/* ----- SPA module --- */
const mySPA = (function() {


    /* -------  model ------- */
    function ModuleModel() {

        let myModuleView = null;
        let userData = {};

        let pageNameLink = null;
        let userDataStorage = null;

        let sumSig = null;
        let costSig = null;


        this.init = function(view) {

            myModuleView = view;
        }


        this.updateState = function(pageName) {

            pageNameLink = pageName;

            this.getData();

            this.calculateData();

            // console.log(userDataStorage)

            // sumSig = 10 * userDataStorage.userNumCigarette;

            console.log(pageNameLink);

            // if (pageNameLink === 'statistics') {
            //
            //
            //
            //     setInterval(something, 1000);
            //
            //     function something() {
            //
            //         console.log('тест')
            //
            //         myModuleView.renderContent(pageNameLink, userDataStorage, sumSig, costSig);
            //     }
            // }
            //
            // else {
            //     myModuleView.renderContent(pageNameLink, userDataStorage, sumSig, costSig);
            // }

            myModuleView.renderContent(pageNameLink, userDataStorage, sumSig, costSig);

        }


        this.saveData = function([inputName, inputDate, inputNumCig, inputCostCig, inputCigInBlock]) { // Получаем данные пользователя и сохраняем в объект 'userData'

            // if (inputDay > 31 || inputDay < 1 || inputMonth > 12 || inputMonth < 1 || inputYear < 1 || inputYear > new Date().getFullYear()) { /* Проверка на корректность данных */
            //
            //     myModalView.validDate(false);
            //     return;
            // }

            userData = {
                userName: inputName.value,
                userDate: inputDate.value,
                userNumCigarette: inputNumCig.value,
                userCostCigarette: inputCostCig.value,
                cigarettesInBlock: inputCigInBlock.value,
            }

            this.storeData(); /* Сохраняем данные в localStorage */
        }


        this.storeData = function() { /* Сохраняем данные в localStorage */

            let userDataSerial = JSON.stringify(userData);

            localStorage.setItem('userData', userDataSerial);

            this.updateState(pageNameLink); /* Обновляем приложение */


            // this.calculateData();
        }


        this.getData = function() {

            userDataStorage = JSON.parse(localStorage.getItem('userData'));
        }


        this.clearData = function() { /* Очищаем данные в хранилище */

            localStorage.removeItem('userData');

            this.updateState(pageNameLink); /* Обновляем приложение */
        }


        this.calculateData = function() {

            if (!userDataStorage) return

            const time = 9;


            const time11 = new Date().getSeconds();

            console.log(time11)


            // const clockGoTimer = setInterval(goClock, 1000); /* Запускаем часы */
            //
            // function goClock() {
            //
            //     let soonSeconds = new Date().getUTCSeconds();
            //     let soonMinutes = new Date().getUTCMinutes();
            //     let soonHour = new Date().getUTCHours() + timezone;
            //
            //     let secondHand = soonSeconds * 6; /* Поворот секундой стрелки */
            //     let minuteHand = soonMinutes * 6; /* Поворот минутной стрелки */
            //     let hourHand = soonHour * 30 + soonMinutes / 2; /* Поворот часовой стрелки */
            //
            //     clockView.startClock(secondHand, minuteHand, hourHand);
            //
            //     clockView.updateStateBtn(false, true);
            // }




            sumSig = time11 * userDataStorage.userNumCigarette;

            costSig = sumSig / userDataStorage.cigarettesInBlock * userDataStorage.userCostCigarette;

            // console.log(sumSig)
            // console.log(costSig)



            // this.updateState(pageNameLink);
        }


    }



    /* ------- view -------- */
    function ModuleView() {

        let myModuleContainer = null;
        let menu = null;
        let contentContainer = null;
        let routesObj = null;
        let that = this;
        let userStorage = null;

        let timer = null;


        this.init = function(container, routes) {

            myModuleContainer = container;
            routesObj = routes;
            menu = myModuleContainer.querySelector("#mainmenu");
            contentContainer = myModuleContainer.querySelector("#content");
        }


        this.renderContent = function(hashPageName, userData, sumSig, costSig) {

            let routeName = "default";
            userStorage = userData;

            if (hashPageName.length > 0 && hashPageName !== 'login' && !userStorage) {
                // console.log(1111)
                routeName = "authorization";
                updateContent();
            }

            else if ((hashPageName === '' || hashPageName === 'login') && !userStorage) {
                // console.log(2222)
                routeName = hashPageName in routes ? hashPageName : "login";
                updateContent();
            }

            else if (hashPageName === '' || hashPageName === 'statistics' && userStorage) {
                // console.log(333)
                routeName = "statistics";
                // updateContent();

                timer = setInterval(updateContent, 1000);
            }

            else if (hashPageName === 'login' && userStorage) {
                // console.log(444)

                clearInterval(timer);

                routeName = "options";
                updateContent();

                // window.document.title = routesObj[routeName].title;
                // contentContainer.innerHTML = routesObj[routeName].render(`${routeName}-page`, userStorage);
                // that.updateButtons(routesObj[routeName].id);
            }

            else {
                clearInterval(timer);
                // console.log(555)
                routeName = hashPageName in routes ? hashPageName : "error";
                updateContent();
            }

            function updateContent() {

                const time11 = new Date().getSeconds();

                window.document.title = routesObj[routeName].title;
                contentContainer.innerHTML = routesObj[routeName].render(`${routeName}-page`, userStorage, sumSig, costSig, time11);
                that.updateButtons(routesObj[routeName].id);
            }
        }


        this.updateButtons = function(currentPage) {

            const menuLinks = menu.querySelectorAll(".mainmenu__link");

            for (let link of menuLinks) {
                currentPage === link.getAttribute("href").slice(1) ? link.classList.add("active") : link.classList.remove("active");
            }
        }


    }



    /* ----- controller ---- */
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

            window.addEventListener("hashchange", this.updateState); // вешаем слушателей на событие hashchange и кликам по пунктам меню

            this.updateState(); //первая отрисовка


            myModuleContainer.addEventListener("click", clickHandler);

            function clickHandler(e) {

                if (e.target.getAttribute('class') === 'data__save') {

                    that.saveDataUser();
                }

                if (e.target.getAttribute('class') === 'data__delete') {

                    that.clearData();
                }
            }
        }


        this.updateState = function() {

            const hashPageName = location.hash.slice(1).toLowerCase(); /* Линк после # */

            // myModuleModel.calculateData();

            myModuleModel.updateState(hashPageName);
        }


        this.saveDataUser = function() { /* Сохраняем данные из инпутов в localStorage */

            // inputName = myModuleContainer.querySelector(".input__default");
            // inputDate = myModuleContainer.querySelector(".input__date-last");
            // inputNumCig = myModuleContainer.querySelector(".input__num-cigarette");
            // inputCostCig = myModuleContainer.querySelector(".input__cost-cigarette");
            // myModuleModel.saveData(inputName.value, inputDate.value, inputNumCig.value, inputCostCig.value);

            let inputData = myModuleContainer.querySelectorAll("#content input");

            myModuleModel.saveData(inputData);
        }


        this.clearData = function() { /* Очищаем данные из localStorage */

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
