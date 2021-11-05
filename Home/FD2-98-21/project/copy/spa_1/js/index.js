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

        let descriptionHealth = [['Пульс и артериальное давление возращается в норму, нагрузка на сердце снижается.',
                                  'Пульс и артериальное давление пришло в норму, нагрузка на сердце снижается.'],
                                ['Концентрация угарного газа в организме уменьшается.',
                                 'Угарный газ полностью выведен из организма. Ткани и органы лучше снобжаются кислородом.'],
                                ['Никотин постепенно выводится из организма, скоро вы почувствуете себя лучше.',
                                 'Никотин выведен из организма. Обогощение крови кислородом снова в норме.'],
                                ['Восстанавливается обоняние и вкус. Скоро вы заметите разницу.',
                                 'Возвращаются настоящие запахи и вкус: раньше рецепторы угнетали табачный дым.'],
                                ['Если в прошлые недели у вас был влажный кашель, то теперь он пойдет на спад. Одышка уменьшается.',
                                 'Легкие очистились от слизи, одышка и кашель исчезли.'],
                                ['Восстанавливаются клетки печени, нормализируется работа желчного пузыря.',
                                 'Клетки печени и работа желчного пузыря нормализованы.'],
                                ['Риск сердечного приступа постепенно снижается.',
                                 'Риск сердечного приступа снижен до уровня, как у некурящего человека.'],
                                ['Вероятность развития рака легких медленно снижается.',
                                 'Вероятность развития рака легких снижена до уровня, как у некурящего человека.'],];

        let rangeStateHealth = {
            heart: 20,
            carbonMonoxide: 720,
            nicotine: 2880,
            smell: 14400,
            lung: 129600,
            liver: 259200,
            riskHeart: 518400,
            riskCancer: 3628800,
        };

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

            let heart = Math.floor(sumMin * 100 / rangeStateHealth.heart); /* Сердце */
            if (heart > 100) heart = 100;
            let carbonMonoxide = Math.floor(sumMin * 100 / rangeStateHealth.carbonMonoxide); /* Угарный газ */
            if (carbonMonoxide > 100) carbonMonoxide = 100;
            let nicotine = Math.floor(sumMin * 100 / rangeStateHealth.nicotine); /* Никотин */
            if (nicotine > 100) nicotine = 100;
            let smell = Math.floor(sumMin * 100 / rangeStateHealth.smell); /* Запахи */
            if (smell > 100) smell = 100;
            let lung = Math.floor(sumMin * 100 / rangeStateHealth.lung); /* Легкие */
            if (lung > 100) lung = 100;
            let liver = Math.floor(sumMin * 100 / rangeStateHealth.liver); /* Печень */
            if (liver > 100) liver = 100;
            let riskHeart = Math.floor(sumMin * 100 / rangeStateHealth.riskHeart); /* Риск сердечного приступа */
            if (riskHeart > 100) riskHeart = 100;
            let riskCancer = Math.floor(sumMin * 100 / rangeStateHealth.riskCancer); /* Риск рака */
            if (riskCancer > 100) riskCancer = 100;

            myModuleView.renderHealth(descriptionHealth, heart, carbonMonoxide, nicotine, smell, lung, liver, riskHeart, riskCancer);


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

            if (sumSec < 10) sumSec = '0' + sumSec;
            if (sumMin < 10) sumMin = '0' + sumMin;
            if (sumHour < 10) sumHour = '0' + sumHour;

            if (sumYear > 0) sumTimeStop.innerHTML = `<span>${sumYear}</span> г <span>${dayWithYear}</span> дн <span>${sumHour}</span> ч <span>${sumMin}</span> мин <span>${sumSec}</span> сек`
            else sumTimeStop.innerHTML = `<span>${dayWithYear}</span> дн <span>${sumHour}</span> ч <span>${sumMin}</span> мин <span>${sumSec}</span> сек`;
            sumCigarette.innerHTML = `<span>${sumFullCigarette}</span> шт`;
            sumMoney.innerHTML = `<span>${costFullCigarette}</span> руб`;
            freeTime.innerHTML = `<span>${freeTimeDayFull}</span> дн <span>${freeTimeHour}</span> ч <span>${freeTimeMin}</span> мин`;
        }


        this.renderHealth = function(descriptionHealth, heart, carbonMonoxide, nicotine, smell, lung, liver, riskHeart, riskCancer) {

            const stateHeart = myModuleContainer.querySelector("#content .state__heart__chart .percent");
            const stateHeartChart = myModuleContainer.querySelector("#content .state__heart__chart .chart");
            const heartDescription = myModuleContainer.querySelector("#content .state__heart .description");

            const stateCarbonMonoxide = myModuleContainer.querySelector("#content .state__carbonMonoxide__chart .percent");
            const stateCarbonMonoxideChart = myModuleContainer.querySelector("#content .state__carbonMonoxide__chart .chart");
            const carbonMonoxideDescription = myModuleContainer.querySelector("#content .state__carbonMonoxide .description");

            const stateNicotine = myModuleContainer.querySelector("#content .state__nicotine__chart .percent");
            const stateNicotineChart = myModuleContainer.querySelector("#content .state__nicotine__chart .chart");
            const nicotineDescription = myModuleContainer.querySelector("#content .state__nicotine .description");

            const stateSmell = myModuleContainer.querySelector("#content .state__smell__chart .percent");
            const stateSmellChart = myModuleContainer.querySelector("#content .state__smell__chart .chart");
            const smellDescription = myModuleContainer.querySelector("#content .state__smell .description");

            const stateLung = myModuleContainer.querySelector("#content .state__lung__chart .percent");
            const stateLungChart = myModuleContainer.querySelector("#content .state__lung__chart .chart");
            const lungDescription = myModuleContainer.querySelector("#content .state__lung .description");

            const stateLiver = myModuleContainer.querySelector("#content .state__liver__chart .percent");
            const stateRiskLiverChart = myModuleContainer.querySelector("#content .state__liver__chart .chart");
            const liverDescription = myModuleContainer.querySelector("#content .state__liver .description");

            const stateRiskHeart = myModuleContainer.querySelector("#content .state__risk__heart__chart .percent");
            const stateRiskHeartChart = myModuleContainer.querySelector("#content .state__risk__heart__chart .chart");
            const riskHeartDescription = myModuleContainer.querySelector("#content .state__risk__heart .description");

            const stateRiskCancer = myModuleContainer.querySelector("#content .state__risk__cancer__chart .percent");
            const stateRiskCancerChart = myModuleContainer.querySelector("#content .state__risk__cancer__chart .chart");
            const riskCancerDescription = myModuleContainer.querySelector("#content .state__risk__cancer .description");

            stateHeart.innerHTML = ` ${heart}`;
            stateCarbonMonoxide.innerHTML = ` ${carbonMonoxide}`;
            stateNicotine.innerHTML = ` ${nicotine}`;
            stateSmell.innerHTML = ` ${smell}`;
            stateLung.innerHTML = ` ${lung}`;
            stateLiver.innerHTML = ` ${liver}`;
            stateRiskHeart.innerHTML = ` ${riskHeart}`;
            stateRiskCancer.innerHTML = ` ${riskCancer}`;

            if (heart < 100) heartDescription.innerHTML = descriptionHealth[0][0]
            else heartDescription.innerHTML = descriptionHealth[0][1];
            if (carbonMonoxide < 100) carbonMonoxideDescription.innerHTML = descriptionHealth[1][0]
            else carbonMonoxideDescription.innerHTML = descriptionHealth[1][1];
            if (nicotine < 100) nicotineDescription.innerHTML = descriptionHealth[2][0]
            else nicotineDescription.innerHTML = descriptionHealth[2][1];
            if (smell < 100) smellDescription.innerHTML = descriptionHealth[3][0]
            else smellDescription.innerHTML = descriptionHealth[3][1];
            if (lung < 100) lungDescription.innerHTML = descriptionHealth[4][0]
            else lungDescription.innerHTML = descriptionHealth[4][1];
            if (liver < 100) liverDescription.innerHTML = descriptionHealth[5][0]
            else liverDescription.innerHTML = descriptionHealth[5][1];
            if (riskHeart < 100) riskHeartDescription.innerHTML = descriptionHealth[6][0]
            else riskHeartDescription.innerHTML = descriptionHealth[6][1];
            if (riskCancer < 100) riskCancerDescription.innerHTML = descriptionHealth[7][0]
            else riskCancerDescription.innerHTML = descriptionHealth[7][1];

            setTimeout(showChart, 10)
            function showChart() {

                stateHeartChart.style.width = `${heart}%`;
                stateCarbonMonoxideChart.style.width = `${carbonMonoxide}%`;
                stateNicotineChart.style.width = `${nicotine}%`;
                stateSmellChart.style.width = `${smell}%`;
                stateLungChart.style.width = `${lung}%`;
                stateRiskLiverChart.style.width = `${liver}%`;
                stateRiskHeartChart.style.width = `${riskHeart}%`;
                stateRiskCancerChart.style.width = `${riskCancer}%`;

                if (heart > 50) stateHeartChart.style.backgroundColor = `#5eef5e`;
                if (carbonMonoxide > 50) stateCarbonMonoxideChart.style.backgroundColor = `#5eef5e`;
                if (nicotine > 50) stateNicotineChart.style.backgroundColor = `#5eef5e`;
                if (smell > 50) stateSmellChart.style.backgroundColor = `#5eef5e`;
                if (lung > 50) stateLungChart.style.backgroundColor = `#5eef5e`;
                if (liver > 50) stateRiskLiverChart.style.backgroundColor = `#5eef5e`;
                if (riskHeart > 50) stateRiskHeartChart.style.backgroundColor = `#5eef5e`;
                if (riskCancer > 50) stateRiskCancerChart.style.backgroundColor = `#5eef5e`;
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
