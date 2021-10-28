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

        let goTimerStatistic = null;


        this.init = function(view) {

            myModuleView = view;
        }


        this.updateState = function(pageName) {

            pageNameLink = pageName;

            this.getData();

            myModuleView.renderContent(pageNameLink, userDataStorage, sumSig, costSig);

            if ((pageNameLink === 'statistics' || pageNameLink === '') && userDataStorage) {

                this.calculateData();
            }
            else if (pageNameLink === 'health' && userDataStorage) {

                clearInterval(goTimerStatistic);

                this.calculateHealth();
            }
            else {

                clearInterval(goTimerStatistic);
            }

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

            goTimer();
            goTimerStatistic = setInterval(goTimer, 1000); /* Запускаем таймер статистики */

            function goTimer() {

                let stopDay = +userDataStorage.userDate.split('-')[2];
                let stopMonth = +userDataStorage.userDate.split('-')[1];
                let stopYear = +userDataStorage.userDate.split('-')[0];

                let dateStopSmoking = new Date(stopYear, stopMonth - 1, stopDay);

                let timeNow = new Date();

                let sumDay = Math.floor((timeNow - dateStopSmoking) / 1000 / 60 / 60 / 24);
                let sumHour = Math.floor((timeNow - dateStopSmoking) / 1000 / 60 / 60 - sumDay * 24);
                let sumMin = Math.floor((timeNow - dateStopSmoking) / 1000 / 60 - sumDay * 24 * 60 - sumHour * 60);
                let sumSec = Math.floor((timeNow - dateStopSmoking) / 1000 - sumDay * 24 * 60 * 60 - sumHour * 60 * 60 - sumMin * 60);
                let sumYear = Math.floor(sumDay / 365);
                let dayWithYear = sumDay - sumYear * 365;

                let sumSecFull = Math.floor((timeNow - dateStopSmoking) / 1000);
                let timeOneCigarette = Math.floor(24 * 60 * 60 / userDataStorage.userNumCigarette);
                let sumFullCigarette = Math.floor(sumSecFull / timeOneCigarette);

                let costOneCigarette = userDataStorage.userCostCigarette / userDataStorage.cigarettesInBlock;
                let costFullCigarette = Math.floor(costOneCigarette * sumFullCigarette);

                let freeTimeMinFull = 4 * sumFullCigarette; /* Всего минут */
                let freeTimeHourFull = Math.floor(freeTimeMinFull / 60); /* Всего часов */
                let freeTimeMin = freeTimeMinFull - 60 * freeTimeHourFull; /* минут с учетом часов */
                let freeTimeDayFull = Math.floor(freeTimeHourFull / 24); /* Всего дней */
                let freeTimeHour = freeTimeHourFull - 24 * freeTimeDayFull; /* часов с учетом дней */

                myModuleView.renderStatistic(sumYear, dayWithYear, sumHour, sumMin, sumSec, sumFullCigarette, costFullCigarette, freeTimeDayFull, freeTimeHour, freeTimeMin);
            }
        }


        this.calculateHealth = function() {

            if (!userDataStorage) return


            let stopDay = +userDataStorage.userDate.split('-')[2];
            let stopMonth = +userDataStorage.userDate.split('-')[1];
            let stopYear = +userDataStorage.userDate.split('-')[0];

            let dateStopSmoking = new Date(stopYear, stopMonth - 1, stopDay);

            let timeNow = new Date();

            let sumMin = Math.floor((timeNow - dateStopSmoking) / 1000 / 60); /* минуты всего */

            let heart = Math.floor(sumMin * 100 / 20); /* Сердце */
            if (heart > 100) heart = 100;

            let carbonMonoxide = Math.floor(sumMin * 100 / 720); /* Угарный газ */
            if (carbonMonoxide > 100) carbonMonoxide = 100;

            let nicotine = Math.floor(sumMin * 100 / 2880); /* Никотин */
            if (nicotine > 100) nicotine = 100;

            let lung = Math.floor(sumMin * 100 / 129600); /* Легкие */
            if (lung > 100) lung = 100;

            let liver = Math.floor(sumMin * 100 / 259200); /* Легкие */
            if (liver > 100) liver = 100;

            let riskHeart = Math.floor(sumMin * 100 / 518400); /* Риск сердечного приступа */
            if (riskHeart > 100) riskHeart = 100;





            // console.log(carbonMonoxide)


            myModuleView.renderHealth(heart, carbonMonoxide, nicotine, lung, liver, riskHeart);






            // let sumHour = Math.floor((timeNow - dateStopSmoking) / 1000 / 60 / 60 - sumDay * 24);
            // let sumMin = Math.floor((timeNow - dateStopSmoking) / 1000 / 60 - sumDay * 24 * 60 - sumHour * 60);
            // let sumSec = Math.floor((timeNow - dateStopSmoking) / 1000 - sumDay * 24 * 60 * 60 - sumHour * 60 * 60 - sumMin * 60);
            // let sumYear = Math.floor(sumDay / 365);
            // let dayWithYear = sumDay - sumYear * 365;
            //
            // let sumSecFull = Math.floor((timeNow - dateStopSmoking) / 1000);
            // let timeOneCigarette = Math.floor(24 * 60 * 60 / userDataStorage.userNumCigarette);
            // let sumFullCigarette = Math.floor(sumSecFull / timeOneCigarette);
            //
            // let costOneCigarette = userDataStorage.userCostCigarette / userDataStorage.cigarettesInBlock;
            // let costFullCigarette = Math.floor(costOneCigarette * sumFullCigarette);
            //
            // let freeTimeMinFull = 4 * sumFullCigarette; /* Всего минут */
            // let freeTimeHourFull = Math.floor(freeTimeMinFull / 60); /* Всего часов */
            // let freeTimeMin = freeTimeMinFull - 60 * freeTimeHourFull; /* минут с учетом часов */
            // let freeTimeDayFull = Math.floor(freeTimeHourFull / 24); /* Всего дней */
            // let freeTimeHour = freeTimeHourFull - 24 * freeTimeDayFull; /* часов с учетом дней */

            // myModuleView.renderStatistic(sumYear, dayWithYear, sumHour, sumMin, sumSec, sumFullCigarette, costFullCigarette, freeTimeDayFull, freeTimeHour, freeTimeMin);

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
                updateContent();
            }

            else if (hashPageName === 'login' && userStorage) {
                // console.log(444)
                routeName = "options";
                updateContent();

                // window.document.title = routesObj[routeName].title;
                // contentContainer.innerHTML = routesObj[routeName].render(`${routeName}-page`, userStorage);
                // that.updateButtons(routesObj[routeName].id);
            }

            else {
                // console.log(555)
                routeName = hashPageName in routes ? hashPageName : "error";
                updateContent();
            }

            function updateContent() {

                window.document.title = routesObj[routeName].title;
                contentContainer.innerHTML = routesObj[routeName].render(`${routeName}-page`, userStorage, sumSig, costSig);
                that.updateButtons(routesObj[routeName].id);
            }

        }


        this.updateButtons = function(currentPage) {

            const menuLinks = menu.querySelectorAll(".mainmenu__link");

            for (let link of menuLinks) {
                currentPage === link.getAttribute("href").slice(1) ? link.classList.add("active") : link.classList.remove("active");
            }
        }


        this.renderStatistic = function(sumYear, dayWithYear, sumHour, sumMin, sumSec, sumFullCigarette, costFullCigarette, freeTimeDayFull, freeTimeHour, freeTimeMin) {

            const sumCigarette = myModuleContainer.querySelector("#content .num__cigarette");
            const sumTimeStop = myModuleContainer.querySelector("#content .sum__time__stop");
            const sumMoney = myModuleContainer.querySelector("#content .num__money");
            const freeTime = myModuleContainer.querySelector("#content .free__time");

            sumCigarette.innerHTML = `Не выкурено сигарет: ${sumFullCigarette} шт.`;
            sumTimeStop.innerHTML = `Вы уже не курите: ${sumYear} г ${dayWithYear} дн ${sumHour} ч ${sumMin} мин ${sumSec} сек`;
            sumMoney.innerHTML = `Сэкономлено средств: ${costFullCigarette} руб.`;
            freeTime.innerHTML = `Сэкономлено времени: ${freeTimeDayFull} дн ${freeTimeHour} ч ${freeTimeMin} мин`;
        }


        this.renderHealth = function(heart, carbonMonoxide, nicotine, lung, liver, riskHeart) {

            const stateHeart = myModuleContainer.querySelector("#content .state__heart .percent");
            const stateCarbonMonoxide = myModuleContainer.querySelector("#content .state__carbonMonoxide .percent");
            const stateNicotine = myModuleContainer.querySelector("#content .state__nicotine .percent");
            const stateLung = myModuleContainer.querySelector("#content .state__lung .percent");
            const lungDescription = myModuleContainer.querySelector("#content .state__lung .description");
            const stateLiver = myModuleContainer.querySelector("#content .state__liver .percent");
            const stateRiskHeart = myModuleContainer.querySelector("#content .state__risk__heart .percent");
            const stateRiskHeartChart = myModuleContainer.querySelector("#content .state__risk__heart .chart");
            const stateRiskLiverChart = myModuleContainer.querySelector("#content .state__liver .chart");

            // console.log(stateRiskHeart)

            stateHeart.innerHTML = ` ${heart}`;
            stateCarbonMonoxide.innerHTML = ` ${carbonMonoxide}`;
            stateNicotine.innerHTML = ` ${nicotine}`;
            stateLung.innerHTML = ` ${lung}`;
            stateLiver.innerHTML = ` ${liver}`;
            stateRiskHeart.innerHTML = ` ${riskHeart}`;





            // setInterval(something, 500)
            //
            // function something() {
            //     for (let i = 0; i <= riskHeart; i++) {
            //         stateRiskHeartChart.style.width = `${i}%`;
            //     }
            // }


            // stateRiskHeartChart.style.transition = 3+'s';


            setTimeout(something, 10)

            function something() {

                if (riskHeart > 50) {
                    stateRiskHeartChart.style.backgroundColor = `green`;
                    stateRiskHeartChart.style.width = `${riskHeart}%`;

                }
                else {
                    stateRiskHeartChart.style.width = `${riskHeart}%`;
                }

                if (liver > 50) {
                    stateRiskLiverChart.style.backgroundColor = `green`;
                    stateRiskLiverChart.style.width = `${liver}%`;

                }
                else {
                    stateRiskLiverChart.style.width = `${liver}%`;
                }

            }


            // stateRiskHeartChart.style.cssText = `transition: 3s; width: ${riskHeart}%; height: 10px; background-color: #ff1c1a; display: block;`;


            if (lung === 100) lungDescription.innerHTML = `работа легких восстановлена`


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
