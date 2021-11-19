const components = { /* Список компонентов (from components.js) */
  header: Header,
  navbar: NavBar,
  content: Content,
};

const routes = { /* Список поддердживаемых роутов (from pages.js) */
  login: LoginWeb,
  options: Options,
  authorization: AuthorPage,
  statistics: Statistics,
  health: Health,
  motivation: Motivation,
  other: Other,
  default: Statistics,
  error: ErrorPage,
};


/* ----- SPA module --- */
const SPA_Smoking = (function() {


    /* -------  model ------- */
    function ModuleModel() {

        let myModuleView = null;
        let userData = {};
        let userDataGoals = {};
        let pageNameLink = null;
        let userDataStorage = null;
        let sumSig = null;
        let costSig = null;
        let timerStatisticTime = null;
        let timerStatisticOther = null;
        let timerTick = null;
        let placeChampionFut = null;
        let that = this;
        let dateNow = null;
        let stateColorSpa = 'white';
        let costFullCigarette = null;
        let sumDay = null;
        let info;

        const clickAudio = new Audio('sound/1.mp3');
        const tickAudio = new Audio('sound/2.mp3');

        let ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php"; /* Серверный скрипт; Сервис AjaxStringStorage2 предназначен для сохранения в базе данных и получения из базы данных */
        let messages;
        let updatePassword;
        let stringName = 'SASHA1_CHAT_MESSAGES';
        let stringName1 = 'SASHA_RUS_BISE';

        const descriptionHealth = [['Пульс и артериальное давление возращается в норму, нагрузка на сердце снижается.',
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

        const rangeStateHealth = { /* Параметры времени для раздела ЗДОРОВЬЕ; в мин */
            heart: 20,
            carbonMonoxide: 720,
            nicotine: 2880,
            smell: 14400,
            lung: 129600,
            liver: 259200,
            riskHeart: 518400,
            riskCancer: 3628800,
        };

        this.init = function(view) { /* Инициализация Модели */
            myModuleView = view;
        }

        this.updateState = function(pageName) { /* Отрисовка основных блоков программы */

            pageNameLink = pageName; /* Линк после # */
            placeChampionFut = 0;

            if (userDataStorage && userDataStorage.soundSpaUser) playSound(); /* Воспроизводим ЗВУКИ */

            this.getData(); /* Получаем данные из LocalStorage */

            myModuleView.renderContent(pageNameLink, userDataStorage, sumSig, costSig); /* Отображаем необходимый блок из routes */

            if ((pageNameLink === 'statistics' || pageNameLink === '') && userDataStorage) {
                this.calculateStatistics(); /* Считаем раздел СТАТИСТИКИ */
            }
            else if (pageNameLink === 'health' && userDataStorage) {
                clearInterval(timerStatisticTime); /* Удаляем таймеры при переходе на другие разделы */
                clearInterval(timerStatisticOther);
                clearInterval(timerTick); /* Таймер звука */
                this.calculateHealth();
            }
            else {
                clearInterval(timerStatisticTime);
                clearInterval(timerStatisticOther);
                clearInterval(timerTick);
            }

            if (userDataStorage) stateColorSpa = userDataStorage.colorSpaUser; /* Забираем данные о цветовой схеме из LocalStorage */
            myModuleView.changeColorSpa(); /* Изменяем цветовую схему приложени */
        }

        this.saveData = function([inputName, inputDate, inputNumCig, inputCostCig, inputCigInBlock], typeFutbol, typeCity, soundSpa) { /* Получаем данные пользователя и сохраняем в объект 'userData' */

            /* Проверка на корректность данных */
            if (+inputName.value || inputName.value.length < 3 || inputNumCig.value < 0 || inputNumCig.value > 100 || inputCostCig.value < 1 || inputCostCig.value > 20 || inputCigInBlock.value < 1 || inputCigInBlock.value > 50) {
                myModuleView.validDate(false);
                return;
            }
            /* Проверка на ввод даты пользователя через клавиатуру */
            if (+inputDate.value.split('-')[0] > new Date().getFullYear() || +inputDate.value.split('-')[0] === new Date().getFullYear() && +inputDate.value.split('-')[2] > new Date().getDate() && +inputDate.value.split('-')[1] >= new Date().getMonth()+1 || +inputDate.value.split('-')[0] === new Date().getFullYear() && +inputDate.value.split('-')[1] > new Date().getMonth()+1) {
                myModuleView.validDate(false);
                return;
            }

            userData = {
                userName: inputName.value,
                userDate: inputDate.value,
                userNumCigarette: inputNumCig.value,
                userCostCigarette: inputCostCig.value,
                cigarettesInBlock: inputCigInBlock.value,
                typeFutbolUser: typeFutbol.value,
                typeWeatherUser: typeCity.value,
                soundSpaUser: soundSpa.checked,
                colorSpaUser: stateColorSpa,
            }

            this.storeData(); /* Сохраняем данные в localStorage */

            if ((pageNameLink === 'login')) myModuleView.validDate(true); /* Отображаем валидацию данных */
        }

        this.storeData = function() { /* Сохраняем данные в localStorage */

            let userDataSerial = JSON.stringify(userData);
            localStorage.setItem('userData', userDataSerial);

            this.updateState(pageNameLink); /* Обновляем приложение */
        }

        this.getData = function() { /* Получаем данные из LocalStorage */

            userDataStorage = JSON.parse(localStorage.getItem('userData'));
        }

        this.clearData = function() { /* Очищаем данные в хранилище localStorage */

            localStorage.removeItem('userData');
            stateColorSpa = 'white';
            this.updateState(pageNameLink); /* Обновляем приложение */
        }

        this.calculateStatistics = function() { /* Считаем СТАТИСТИКУ пользователя */

            if (!userDataStorage) return;

            const stopDay = +userDataStorage.userDate.split('-')[2];
            const stopMonth = +userDataStorage.userDate.split('-')[1];
            const stopYear = +userDataStorage.userDate.split('-')[0];
            const dateStopSmoking = new Date(stopYear, stopMonth - 1, stopDay); /* Устанавливаем дату СТОП КУРЕНИЯ */

            goTimer();
            timerStatisticTime = setInterval(goTimer, 1000); /* Запускаем таймер статистики ВРЕМЕНИ */

            function goTimer() {

                if (userDataStorage && userDataStorage.soundSpaUser) { /* Воспроизводим звуки ТИК-ТАК */
                    timerTick = setTimeout(playSoundTick, 1000)
                }
                const timeNow = new Date();
                const sumDay = Math.floor((timeNow - dateStopSmoking) / 1000 / 60 / 60 / 24); /* Подсчет дней */
                const sumHour = Math.floor((timeNow - dateStopSmoking) / 1000 / 60 / 60 - sumDay * 24); /* Подсчет часов */
                const sumMin = Math.floor((timeNow - dateStopSmoking) / 1000 / 60 - sumDay * 24 * 60 - sumHour * 60); /* Подсчет минут */
                const sumSec = Math.floor((timeNow - dateStopSmoking) / 1000 - sumDay * 24 * 60 * 60 - sumHour * 60 * 60 - sumMin * 60); /* Подсчет секунд */
                const sumYear = Math.floor(sumDay / 365); /* Подсчет лет */
                const dayWithYear = sumDay - sumYear * 365; /* Подсчет лет с учетом дней */

                myModuleView.renderStatisticTime(sumYear, dayWithYear, sumHour, sumMin, sumSec); /* Обновляем статистику каждую секунду */
            }

            goTimerCig();
            timerStatisticOther = setInterval(goTimerCig, 300000); /* Запускаем таймер статистики СИГ, ДЕНЕГ и тд */

            function goTimerCig() {

                const timeNow = new Date();
                const sumSecFull = Math.floor((timeNow - dateStopSmoking) / 1000);
                const timeOneCigarette = Math.floor(24 * 60 * 60 / userDataStorage.userNumCigarette);
                const sumFullCigarette = Math.floor(sumSecFull / timeOneCigarette); /* Не выкурено сигарет */
                const nicotineMg = Math.floor(sumFullCigarette * 0.6); /* не получено никотина */
                const resinMg = Math.floor(sumFullCigarette * 5); /* не получено смолы */

                const costOneCigarette = userDataStorage.userCostCigarette / userDataStorage.cigarettesInBlock;
                const costFullCigarette = Math.floor(costOneCigarette * sumFullCigarette); /* Сэкономлено средств */
                const costOneMonth = Math.floor(userDataStorage.userNumCigarette * 30 / userDataStorage.cigarettesInBlock * userDataStorage.userCostCigarette);
                const costOneYear = costOneMonth * 12;

                const freeTimeMinFull = 4 * sumFullCigarette; /* Всего минут */
                const freeTimeHourFull = Math.floor(freeTimeMinFull / 60); /* Всего часов */
                const freeTimeMin = freeTimeMinFull - 60 * freeTimeHourFull; /* минут с учетом часов */
                const freeTimeDayFull = Math.floor(freeTimeHourFull / 24); /* Всего дней */
                const freeTimeHour = freeTimeHourFull - 24 * freeTimeDayFull; /* часов с учетом дней */
                const addTimeMinFull = 5.5 * sumFullCigarette;
                const addTimeHourFull = Math.floor(addTimeMinFull / 60);
                const addTimeMin = Math.floor(addTimeMinFull - 60 * addTimeHourFull);
                const addTimeDayFull = Math.floor(addTimeHourFull / 24);
                const addTimeHour = addTimeHourFull - 24 * addTimeDayFull;

                /* Обновляем статистику каждые 5 мин */
                myModuleView.renderStatisticCig(sumFullCigarette, costFullCigarette, freeTimeDayFull, freeTimeHour, freeTimeMin, nicotineMg, resinMg, costOneMonth, costOneYear, addTimeDayFull, addTimeHour, addTimeMin);
            }
        }

        this.calculateHealth = function() { /* Считаем состояние ЗДОРОВЬЯ пользователя */

            if (!userDataStorage) return;

            const stopDay = +userDataStorage.userDate.split('-')[2];
            const stopMonth = +userDataStorage.userDate.split('-')[1];
            const stopYear = +userDataStorage.userDate.split('-')[0];
            const dateStopSmoking = new Date(stopYear, stopMonth - 1, stopDay);

            const timeNow = new Date();
            const sumMin = Math.floor((timeNow - dateStopSmoking) / 1000 / 60); /* минуты всего */
            let heart = Math.floor(sumMin * 100 / rangeStateHealth.heart); /* Проценты Сердце */
            if (heart > 100) heart = 100;
            let carbonMonoxide = Math.floor(sumMin * 100 / rangeStateHealth.carbonMonoxide); /* Проценты Угарный газ */
            if (carbonMonoxide > 100) carbonMonoxide = 100;
            let nicotine = Math.floor(sumMin * 100 / rangeStateHealth.nicotine); /* Проценты Никотин */
            if (nicotine > 100) nicotine = 100;
            let smell = Math.floor(sumMin * 100 / rangeStateHealth.smell); /* Проценты Запахи */
            if (smell > 100) smell = 100;
            let lung = Math.floor(sumMin * 100 / rangeStateHealth.lung); /* Проценты Легкие */
            if (lung > 100) lung = 100;
            let liver = Math.floor(sumMin * 100 / rangeStateHealth.liver); /* Проценты Печень */
            if (liver > 100) liver = 100;
            let riskHeart = Math.floor(sumMin * 100 / rangeStateHealth.riskHeart); /* Проценты Риск сердечного приступа */
            if (riskHeart > 100) riskHeart = 100;
            let riskCancer = Math.floor(sumMin * 100 / rangeStateHealth.riskCancer); /* Проценты Риск рака */
            if (riskCancer > 100) riskCancer = 100;

            myModuleView.renderHealth(descriptionHealth, heart, carbonMonoxide, nicotine, smell, lung, liver, riskHeart, riskCancer);
        }

        this.showMoreInfo = function(parent, btn) { /* Показываем больше данных в разделе Статистика */

            myModuleView.renderMoreInfo(parent, btn);
        }

        this.getFutbolSeason = function() { /* Показываем инпут выбора ГОДА футбольного сезона */

            myModuleView.renderFutbolSeason();
        }

        this.getFutbol = function(inputDateFutbol) { /* Показываем блок Футбол */

            myModuleView.renderFutbolLoader(); /* Показываем Лоудер загрузки */

            if (inputDateFutbol.value < 2015 || inputDateFutbol.value > new Date().getFullYear()) return; /* Ограничиваем возможность выбора не нужных дат */

            const apiQuery = `https://api-football-standings.azharimm.site/leagues/${userDataStorage.typeFutbolUser}/standings?season=${inputDateFutbol.value}&sort=asc`;

            fetch(apiQuery, {method: 'get'}) /* Загрузка ТУРНИРНОЙ ТАБЛИЦЫ команд */
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data.data);
                    myModuleView.renderFutbol(data, placeChampionFut); /* placeChampionFut = 0; */
                })
                .catch((error) => console.error("Ошибка получения футбола. Причина: " + error));

            const apiQueryLogo = `https://api-football-standings.azharimm.site/leagues/${userDataStorage.typeFutbolUser}`;

            fetch(apiQueryLogo, {method: 'get'})  /* Загрузка лого ЛИГИ */
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data.data);
                    myModuleView.renderFutbolLogo(data);
                })
                .catch((error) => console.error("Ошибка получения футбола. Причина: " + error));
        }

        this.getFutbolFoward = function(inputDateFutbol) { /* Листаем футбол ВПЕРЕД */

            placeChampionFut++;
            if (placeChampionFut === 20) placeChampionFut = 0;
            this.getFutbol(inputDateFutbol);
        }

        this.getFutbolBack = function(inputDateFutbol) { /* Листаем футбол НАЗАД */

            placeChampionFut--;
            if (placeChampionFut === -1) placeChampionFut = 19;
            this.getFutbol(inputDateFutbol);
        }

        this.getWeather = function() { /* Показываем блок ПОГОДА */

            // navigator.geolocation.getCurrentPosition(success);
            // function success(pos) {
            //     var crd = pos.coords;
            //     console.log('Ваше текущее местоположение:');
            //     console.log(`Широта: ${crd.latitude}`);
            //     console.log(`Долгота: ${crd.longitude}`);
            //     console.log(`Плюс-минус ${crd.accuracy} метров.`);
            // }

            myModuleView.renderWeatherLoader(); /* Показываем Лоудер загрузки */

            const apiUrl = "https://api.openweathermap.org/data/2.5/";
            const apiKey = "bdcb6183108ed3f3e6d230300e66ca2f";
            const apiQuery = apiUrl+"/weather?id=" + userDataStorage.typeWeatherUser.split('/')[0] + "&units=metric&lang=ru&appid="+apiKey;

            fetch(apiQuery, {method: 'get'}) /* Получаем погоду на СЕГОДНЯ */
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data.data);
                    myModuleView.renderWeather(data);
                })
                .catch((error) => console.error("Ошибка получения погоды. Причина: " + error));
        }

        this.getWeather3days = function() { /* Показываем прогноз ПОГОДЫ на 3 дня */

            myModuleView.renderWeather3daysLoader();

            const apiUrl = "https://api.openweathermap.org/data/2.5/";
            const apiKey = "bdcb6183108ed3f3e6d230300e66ca2f";
            const apiQuery = apiUrl+"/forecast?id=" + userDataStorage.typeWeatherUser.split('/')[0] + "&units=metric&lang=ru&appid="+apiKey;

            fetch(apiQuery, {method: 'get'}) /* Получаем погоду на 3 дня */
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data.data);
                    myModuleView.renderWeather3days(data);
                })
                .catch((error) => console.error("Ошибка получения погоды. Причина: " + error));
        }

        this.getPollution = function() { /* Показываем загрязнение ВОЗДУХА */

            myModuleView.renderWeather3daysLoader();

            const apiKey = "bdcb6183108ed3f3e6d230300e66ca2f";
            const apiQuery = 'http://api.openweathermap.org/data/2.5/air_pollution?lat='+ userDataStorage.typeWeatherUser.split('/')[1] +'&lon=' + userDataStorage.typeWeatherUser.split('/')[2] +'&appid='+apiKey;

            fetch(apiQuery, {method: 'get'}) /* Получаем загрязнении ВОЗДУХА */
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data);
                    myModuleView.renderPollution(data);
                })
                .catch((error) => console.error("Ошибка получения загрязнение воздуха. Причина: " + error));
        }

        this.getCurrency = function() { /* Показываем блок ОбМЕНА ВАЛЮТ */

            setTimeNow(); /* Функция установки текущей даты в объект для дальнейшего использования */
            myModuleView.renderCurrency(dateNow); /* Показываем блок и устаналиваем текущую дату и ограничиваем выбор даты позднее чем сегодня */
        }

        this.changeCurrency1 = function(inputCurrency1, inputCurrency2, selectCurrency1, selectCurrency2, selectDate) { /* Подсчет ОБМЕНА ВАЛЮТ при изменении инпута 1 и селектов */

            let dateCurrency = selectDate.value; /* Устанавливаем дату */
            if (!dateCurrency) return; /* Ограничиваем ввод пустой строки */
            if (dateCurrency === dateNow) dateCurrency = 'latest';

            const apiQuery = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${dateCurrency}/currencies/${selectCurrency1.value}/${selectCurrency2.value}.json`;

            fetch(apiQuery, {method: 'get'}) /* Получаем курс необходимой валюты к другой */
                .then((response) => response.json())
                .then((data) => {
                    // console.log('первый');
                    myModuleView.renderCurrencyInput1(Math.round(data[selectCurrency2.value] * inputCurrency1.value * 1000) / 1000); /* Получаем курс, умножаем на нужное количество денег, ограничиваем знаки после запятой до 3 */
                })
                .catch((error) => console.error("Ошибка получения валюты. Причина: " + error));
        }

        this.changeCurrency2 = function(inputCurrency1, inputCurrency2, selectCurrency1, selectCurrency2, selectDate) { /* Подсчет ОБМЕНА ВАЛЮТ при изменении инпута 2 */

            let dateCurrency = selectDate.value;
            if (dateCurrency === dateNow) dateCurrency = 'latest';

            const apiQuery = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${dateCurrency}/currencies/${selectCurrency2.value}/${selectCurrency1.value}.json`;

            fetch(apiQuery, {method: 'get'}) /* Получаем курс необходимой валюты к другой */
                .then((response) => response.json())
                .then((data) => {
                    // console.log('второй');
                    myModuleView.renderCurrencyInput2(Math.round(data[selectCurrency1.value] * inputCurrency2.value * 1000) / 1000); /* Получаем курс, умножаем на нужное количество денег, ограничиваем знаки после запятой до 3 */
                })
                .catch((error) => console.error("Ошибка получения валюты. Причина: " + error));
        }

        this.cleanCurrency = function() { /* Очищаем инпуты ввода валюты */

            myModuleView.renderCleanCurrency();
        }

        this.addCurrency = function(inputAddCurrency) { /* Возможность добавлять новую ВАЛЮТУ */

            if (inputAddCurrency.value === '') return;
            myModuleView.renderAddCurrency(inputAddCurrency.value);
        }

        this.showMessageChat = function() { /* Показываем блок ОНЛАЙН-ЧАТА */

            myModuleView.showMessageChat();
        }

        this.sendMessageChat = function(inputChat) { /* ОТПРАВКА сообщений в ОНЛАЙН-ЧАТе */
            /*  AjaxStringStorage2 предназначен для сохранения в базе данных и получения из базы данных произвольных именованных строк посредством jQuery AJAX. */

            updatePassword = Math.random();

            $.ajax( {
                    url : ajaxHandlerScript, /* скрипт */
                    type : 'POST', dataType:'json',
                    data : { f : 'LOCKGET', n : stringName, p : updatePassword }, /* LOCKGET — чтение строки и планирование её изменения */
                    cache : false,
                    success : lockGetReady,
                    error : errorHandler,
                }
            );

            function lockGetReady(callresult) {
                if (callresult.error != undefined)
                    alert(callresult.error);
                else {
                    messages = [];
                    if (callresult.result != "") { // проверка на пустую строку, Если такой строки нет в базе данных, возвращается пустая строка.

                        /* результат парсим из JSON и сохраняем */
                        messages = JSON.parse(callresult.result);

                        // вдруг кто-то сохранил мусор вместо SASHA1_CHAT_MESSAGES?
                        if (!Array.isArray(messages)) messages = [];
                    }

                    let senderName = userDataStorage.userName; /* Получаем имя Пользователя из LocalStorage */
                    let message = inputChat.value; /* Текст сообщения */
                    if (message === '') message = '/тут должен быть текст/';

                    /* Отметка времени для ЧАТА */
                    let timeNow = ` [${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]`;
                    let messageAll = message + timeNow;

                    messages.push( { name:senderName, mess:messageAll } ); /* Готовим сообщение как последний элемент массива */
                    if (messages.length > 10) /* Ограничиваем 10 значениями */
                        messages = messages.slice(messages.length - 10);

                    that.showMessagesForChat(); /* Отображаем сообщения чата */

                    $.ajax( {
                            url : ajaxHandlerScript,
                            type : 'POST', dataType:'json',
                            data : { f : 'UPDATE', n : stringName, v : JSON.stringify(messages), p : updatePassword },  /* UPDATE — изменение заблокированной строки; v : JSON.stringify(messages) - на какое значение нужно изменить строку */
                            cache : false,
                            success : updateReady,
                            error : errorHandler
                        }
                    );
                }
            }

            function updateReady(callresult) { // сообщения вместе с новым сохранены на сервере
                if (callresult.error != undefined)
                    alert(callresult.error);
            }
        }

        this.updateMessageChat = function() { /* Обновление окна сообщений в ОНЛАЙН-ЧАТе по нажатию на кнопку */

            $.ajax( { // получает сообщения с сервера и потом показывает
                    url : ajaxHandlerScript,
                    type : 'POST', dataType:'json',
                    data : { f : 'READ', n : stringName }, /* READ — чтение строки */
                    cache : false,
                    success : readReady,
                    error : errorHandler
                }
            );

            function readReady(callresult) { // сообщения получены - показывает
                if (callresult.error != undefined)
                    alert(callresult.error);
                else {
                    messages = [];
                    if (callresult.result != "") { // либо строка пустая - сообщений нет

                        /* результат парсим из JSON и сохраняем */
                        messages = JSON.parse(callresult.result);

                        // вдруг кто-то сохранил мусор вместо SASHA1_CHAT_MESSAGES?
                        if (!Array.isArray(messages))
                            messages = [];
                    }
                    that.showMessagesForChat(); /* Отображаем сообщения чата из БАЗЫ ДАнных */
                }
            }
        }

        this.showMessagesForChat = function() {

            let str = '';
            for (let m = 0; m < messages.length; m++) {
                let message = messages[m];
                str += "<b>" + escapeHTML(message.name) + ":</b> " + escapeHTML(message.mess) + "<br/>";
            }

            myModuleView.renderChat(str); /* Отображаем сообщения чата с версткой */

            function escapeHTML(text) {
                if (!text)
                    return text;
                text = text.toString()
                    .split("&").join("&amp;")
                    .split("<").join("&lt;")
                    .split(">").join("&gt;")
                    .split('"').join("&quot;")
                    .split("'").join("&#039;");
                return text;
            }
        }

        this.getAdviceUser = function() { /* Показываем блок СОВЕТОВ */

            $.ajax(
                {
                    url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                    data : { f : 'READ', n : stringName1 },  /* READ — чтение строки */
                    success : readReady, error : errorHandler
                }
            );

            function readReady(callresult) {
                if ( callresult.error!=undefined )
                    alert(callresult.error);

                else if ( callresult.result!="" ) {

                    /* READ — чтение строки */
                    info = JSON.parse(callresult.result);
                    getAdvice();
                }
            }

            function getAdvice() {

                const advice = info[info.length - 2]['mess']; /* Сохраняем массив СОВЕТОВ */
                const numDiap = info[info.length - 2]['mess'].length - 1; /* Узнаем сколько всего СОВЕТОВ */

                const randomNumberAdvice = randomDiap(0, numDiap); /* Получаем случайное значение номера массива */

                myModuleView.renderAdviceUser(advice[randomNumberAdvice]); /* Показываем пользователю нужный совет */

                // advice.splice(randomNumberAdvice, 1); /* Удаляем показанный совет из массива */
                // --numDiap;
            }


        }

        this.getVideoFactsUser = function() { /* Показываем блок ВИДЕО-ФАКТОВ */

            $.ajax(
                {
                    url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                    data : { f : 'READ', n : stringName1 }, /* READ — чтение строки */
                    success : readReady, error : errorHandler
                }
            );

            function readReady(callresult) {
                if ( callresult.error!=undefined )
                    alert(callresult.error);

                /* результат парсим из JSON и сохраняем */
                else if ( callresult.result!="" ) {

                    info = JSON.parse(callresult.result);
                    getVideoFact();
                }
            }

            function getVideoFact() {

                const links = info[info.length - 1]['mess']; /* Сохраняем массив ССЫЛОК на видео */
                const numDiap = info[info.length - 1]['mess'].length - 1; /* Узнаем сколько всего ВИДЕО */

                const randomNumberAdvice = randomDiap(0, numDiap); /* Получаем случайное значение номера массива */

                myModuleView.renderVideoFactsUser(links[randomNumberAdvice]); /* Показываем пользователю нужное видео */
            }
        }

        this.setActiveBtn = function(activeBtn) { /* Выделяем нажимаемую кнопку */

            myModuleView.renderActiveBtn(activeBtn);
        }

        this.showAboutSpa = function() { /* Показываем блок О ПРИЛОЖЕНИИ */

            myModuleView.renderAboutSpa();
        }

        this.changeColorSpa = function(btnColor) { /* Изменяем высоту КНОПКИ выбора цветовой схемы приложения */

            stateColorSpa = btnColor.getAttribute('class').split(' ')[1]; /* Получаем класс кнопки, делим строку на массив и получаем цвет вторым индексом массива */
            myModuleView.changeColorBtn(btnColor);
        }

        this.showGoalsUser = function() { /* Показываем блок УСТАНОВКИ ЦЕЛИ */

            myModuleView.showGoalsUser();
            this.getGoalsUser(); /* Проверяем наличие уже сохраненной ЦЕЛИ */
        }

        this.setGoalsUser = function([textGoal, costGoals]) { /* Устанавливаем ЦЕЛь пользователя в localStorage */

            if (!textGoal.value || !costGoals.value) return;

            userDataGoals = {
                userText: textGoal.value,
                userCost: costGoals.value,
            }
            localStorage.setItem('userDataGoals', JSON.stringify(userDataGoals));

            this.getGoalsUser(); /* Показываем статистику о цели пользователя */
        }

        this.getGoalsUser = function() { /* Показываем статистику о цели пользователя из localStorage */

            let userDataGoalsStorage = JSON.parse(localStorage.getItem('userDataGoals'));
            calculateDateUser(); /* Подсчет необходиммых данных */

            if (!userDataGoalsStorage) { /* Прячем статистику если данных в localStorage нет */
                myModuleView.renderGoalsHide();
                return;
            }

            /* Считаем статистику о ЦЕЛИ */
            let percentGoals = Math.floor(costFullCigarette * 100 / userDataGoalsStorage.userCost);
            if (percentGoals > 100) percentGoals = 100;
            let restDay = Math.ceil(sumDay * 100 / percentGoals) - sumDay;

            myModuleView.renderGoalsUser(userDataGoalsStorage, percentGoals, costFullCigarette, restDay);
        }

        this.clearDataGoals = function() { /* Удаляем ЦЕЛь пользователя из localStorage */

            localStorage.removeItem('userDataGoals');
        }

        this.checkInput = function(inputName, inputDate, inputNumCigs, inputCostCigs, inputCigsInBlock) { /* Проверка инпутов на ввод данных */

            let stateBtn = !(inputName && inputDate && inputNumCigs && inputCostCigs && inputCigsInBlock);
            myModuleView.btnUpdate(stateBtn); /* Обновление состояние кнопки 'Изменить/Сохранить' */
        }

        function playSound() { /* Звуки */
            clickAudio.currentTime = 0;
            clickAudio.play().then(() => {
                // Autoplay started!
            }).catch(error => {
                // Autoplay was prevented.
            });
        }
        function playSoundTick() {
            tickAudio.currentTime = 0;
            tickAudio.play().then(() => {
                // Autoplay started!
            }).catch(error => {
                // Autoplay was prevented.
            });
        }

        function randomDiap(n, m) { /* Случайное число в указанном диапазоне */
            return Math.floor(Math.random() * (m - n + 1)) + n;
        }

        function errorHandler(jqXHR, statusStr, errorStr) { /* Проверка ошибки в чате */
            alert(statusStr+' '+errorStr);
        }

        function setTimeNow() { /* Функция установки текущей даты в объект для дальнейшего исользования */
            let currentYear = new Date().getFullYear();
            let currentDay = new Date().getDate();
            if (currentDay < 10) currentDay = '0' + currentDay;
            let currentMonth = new Date().getMonth() + 1;
            if (currentMonth < 10) currentMonth = '0' + currentMonth;
            dateNow = `${currentYear}-${currentMonth}-${currentDay}`;
        }

        function calculateDateUser() { /* Функция подсчета необходимой статистики */
            let stopDay = +userDataStorage.userDate.split('-')[2];
            let stopMonth = +userDataStorage.userDate.split('-')[1];
            let stopYear = +userDataStorage.userDate.split('-')[0];
            let dateStopSmoking = new Date(stopYear, stopMonth - 1, stopDay);
            let timeNow = new Date();
            let sumSecFull = Math.floor((timeNow - dateStopSmoking) / 1000);
            let timeOneCigarette = Math.floor(24 * 60 * 60 / userDataStorage.userNumCigarette);
            let sumFullCigarette = Math.floor(sumSecFull / timeOneCigarette);
            let costOneCigarette = userDataStorage.userCostCigarette / userDataStorage.cigarettesInBlock;
            costFullCigarette = Math.floor(costOneCigarette * sumFullCigarette);
            sumDay = Math.floor((timeNow - dateStopSmoking) / 1000 / 60 / 60 / 24);
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
        let placeChampion = null;

        this.init = function(container, routes) { /* Инициализация ВЬЮ */

            myModuleContainer = container;
            routesObj = routes; /* Из pages */
            menu = myModuleContainer.querySelector("#mainmenu");
            contentContainer = myModuleContainer.querySelector("#content");
        }

        this.renderContent = function(hashPageName, userData, sumSig, costSig) { /* Отображаем необходимый блок из routes */

            let routeName = "default";
            userStorage = userData;

            if (hashPageName.length > 0 && hashPageName !== 'login' && !userStorage) { /* До авторизации и не ЛОГИН */
                // console.log(1111)
                routeName = "authorization";
                updateContent();
            }
            else if ((hashPageName === '' || hashPageName === 'login') && !userStorage) { /* До авторизации, если ЛОГИН или пусто */
                // console.log(2222)
                routeName = hashPageName in routes ? hashPageName : "login";
                updateContent();
                setMaxDate(); /* Устанавливаем в инпуте 'дата' максимум ввода */
                const btnColorSpa = myModuleContainer.querySelector(`#content .color_wrap .white`); /* Цветовая схема по умолчанию */
                btnColorSpa.style.height = '20px';
            }
            else if (hashPageName === '' || hashPageName === 'statistics' && userStorage) {  /* После авторизации, если statistics или пусто */
                // console.log(333)
                routeName = "statistics";
                updateContent();
            }
            else if (hashPageName === 'login' && userStorage) { /* После авторизации, если ЛОГИН */
                // console.log(444)
                routeName = "options";
                updateContent();
                const typeSoccer = myModuleContainer.querySelector(`option[value="${userStorage.typeFutbolUser}"]`);
                typeSoccer.selected = 'true'; /* Отображаем необходимое значение селекта Футбол из localStorage */
                const typeWeather = myModuleContainer.querySelector(`option[value="${userStorage.typeWeatherUser}"]`);
                typeWeather.selected = 'true'; /* Отображаем необходимое значение селекта Город из localStorage */
                const soundSpa = myModuleContainer.querySelector('#content #sound');
                soundSpa.checked = userStorage.soundSpaUser; /* Отображаем необходимое значение чекбокса ЗВУКА из localStorage */
                const btnColorSpa = myModuleContainer.querySelector(`#content .color_wrap .${userStorage.colorSpaUser}`);
                btnColorSpa.style.height = '20px'; /* Отображаем необходимое значение темы приложения из localStorage */
                setMaxDate(); /* Устанавливаем в инпуте 'дата' максимум ввода */
            }
            else {
                // console.log(555)
                routeName = hashPageName in routes ? hashPageName : "error";
                updateContent();
            }

            function updateContent() {

                window.document.title = routesObj[routeName].title; /* Изменянем тайтл */
                contentContainer.innerHTML = routesObj[routeName].render(`${routeName}-page`, userStorage, sumSig, costSig); /* Отображаем необходимый блок верстки из pages */
                that.updateButtons(routesObj[routeName].id);
            }

            function setMaxDate() {
                const currentYear = new Date().getFullYear();
                let currentDay = new Date().getDate();
                if (currentDay < 10) currentDay = '0' + currentDay;
                let currentMonth = new Date().getMonth() + 1;
                if (currentMonth < 10) currentMonth = '0' + currentMonth;
                const dateLimit = `${currentYear}-${currentMonth}-${currentDay}`;
                const userStopSmok = myModuleContainer.querySelector(`.input__date-last`);
                userStopSmok.setAttribute('max', dateLimit); /* Устанавливаем предел выбора даты сегодняшним числом */
            }

        }

        this.updateButtons = function(currentPage) { /* Выделяем активный элемент МЕНЮ */

            const menuLinks = menu.querySelectorAll(".mainmenu__link");
            for (let link of menuLinks) {
                currentPage === link.getAttribute("href").slice(1) ? link.classList.add("active") : link.classList.remove("active");
            }
        }

        this.renderStatisticTime = function(sumYear, dayWithYear, sumHour, sumMin, sumSec) { /* Показываем статистику ВРЕМЕНИ без сигарет */

            const sumTimeStop = myModuleContainer.querySelector("#content .sum__time__stop");

            if (sumSec < 10) sumSec = '0' + sumSec;
            if (sumMin < 10) sumMin = '0' + sumMin;
            if (sumHour < 10) sumHour = '0' + sumHour;

            if (sumYear > 0) sumTimeStop.innerHTML = `<span>${sumYear}</span> г <span>${dayWithYear}</span> дн <span>${sumHour}</span> ч <span>${sumMin}</span> мин <span>${sumSec}</span> сек`; /* Отображаем таймер ВРЕМЕНИ без курения */
            else sumTimeStop.innerHTML = `<span>${dayWithYear}</span> дн <span>${sumHour}</span> ч <span>${sumMin}</span> мин <span>${sumSec}</span> сек`;
        }

        /* Показываем статистику без сигарет, деньги, и другое */
        this.renderStatisticCig = function(sumFullCigarette, costFullCigarette, freeTimeDayFull, freeTimeHour, freeTimeMin, nicotineMg, resinMg, costOneMonth, costOneYear, addTimeDayFull, addTimeHour, addTimeMin) {

            const sumCigarette = myModuleContainer.querySelector("#content .num__cigarette");
            const sumMoney = myModuleContainer.querySelector("#content .num__money");
            const freeTime = myModuleContainer.querySelector("#content .free__time");
            const nicotine = myModuleContainer.querySelector("#content .nicotine");
            const resin = myModuleContainer.querySelector("#content .resin");
            const month = myModuleContainer.querySelector("#content .month");
            const year = myModuleContainer.querySelector("#content .year");
            const addHealth = myModuleContainer.querySelector("#content .add__health");
            const step = 1;

            function outNum(num, elem, unit) { /* Функция отображения нарастающего эффекта подсчета данных */
                let n = 0;
                let time = 0;
                if (num < 150) time = 2000;
                else time = 50;
                let t = Math.round(time/(num/step));
                let interval = setInterval(() => {
                        n = n + step;
                        if (n === num) clearInterval(interval); /* Удаляем таймер когда дошли до нужного значения */
                        elem.innerHTML = `<span>${n}</span> ${unit}`; /* Изменяем значения с указанныи интервалом времени */
                    }, t);
            }

            outNum(sumFullCigarette, sumCigarette, 'шт');
            outNum(costFullCigarette, sumMoney, 'руб');

            /* Отображаем количество сохраненного и дополнительного времени, никотина, смолы, и тд */
            freeTime.innerHTML = `<span>${freeTimeDayFull}</span> дн <span>${freeTimeHour}</span> ч <span>${freeTimeMin}</span> мин`;
            nicotine.innerHTML = nicotineMg + 'мг';
            resin.innerHTML = resinMg + 'мг';
            month.innerHTML = costOneMonth;
            year.innerHTML = costOneYear;
            addHealth.innerHTML = `+<span>${addTimeDayFull}</span> дн <span>${addTimeHour}</span> ч <span>${addTimeMin}</span> мин`;
        }

        /* Показываем состояние ЗДОРОВЬЯ пользователя */
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

            stateHeart.innerHTML = `<strong class="percent-H">${heart}%</strong>`; /* Отображаем проценты */
            stateCarbonMonoxide.innerHTML = `<strong class="percent-H">${carbonMonoxide}%</strong>`;
            stateNicotine.innerHTML = `<strong class="percent-H">${nicotine}%</strong>`;
            stateSmell.innerHTML = `<strong class="percent-H">${smell}%</strong>`;
            stateLung.innerHTML = `<strong class="percent-H">${lung}%</strong>`;
            stateLiver.innerHTML = `<strong class="percent-H">${liver}%</strong>`;
            stateRiskHeart.innerHTML = `<strong class="percent-H">${riskHeart}%</strong>`;
            stateRiskCancer.innerHTML = `<strong class="percent-H">${riskCancer}%</strong>`;

            if (heart < 100) heartDescription.innerHTML = descriptionHealth[0][0]; /* Отображаем описание, если 100% описание меняется */
            else heartDescription.innerHTML = descriptionHealth[0][1];
            if (carbonMonoxide < 100) carbonMonoxideDescription.innerHTML = descriptionHealth[1][0];
            else carbonMonoxideDescription.innerHTML = descriptionHealth[1][1];
            if (nicotine < 100) nicotineDescription.innerHTML = descriptionHealth[2][0];
            else nicotineDescription.innerHTML = descriptionHealth[2][1];
            if (smell < 100) smellDescription.innerHTML = descriptionHealth[3][0];
            else smellDescription.innerHTML = descriptionHealth[3][1];
            if (lung < 100) lungDescription.innerHTML = descriptionHealth[4][0];
            else lungDescription.innerHTML = descriptionHealth[4][1];
            if (liver < 100) liverDescription.innerHTML = descriptionHealth[5][0];
            else liverDescription.innerHTML = descriptionHealth[5][1];
            if (riskHeart < 100) riskHeartDescription.innerHTML = descriptionHealth[6][0];
            else riskHeartDescription.innerHTML = descriptionHealth[6][1];
            if (riskCancer < 100) riskCancerDescription.innerHTML = descriptionHealth[7][0];
            else riskCancerDescription.innerHTML = descriptionHealth[7][1];

            setTimeout(showChart, 200); /* Отображаем графики состояния */
            function showChart() {

                stateHeartChart.style.width = `${heart}%`;
                stateCarbonMonoxideChart.style.width = `${carbonMonoxide}%`;
                stateNicotineChart.style.width = `${nicotine}%`;
                stateSmellChart.style.width = `${smell}%`;
                stateLungChart.style.width = `${lung}%`;
                stateRiskLiverChart.style.width = `${liver}%`;
                stateRiskHeartChart.style.width = `${riskHeart}%`;
                stateRiskCancerChart.style.width = `${riskCancer}%`;

                /* Меняем цвет графиков если больше 50% */
                if (heart > 50) stateHeartChart.style.background = `linear-gradient(90deg, #65d3ba,#2cfab8,#3eef74)`;
                if (carbonMonoxide > 50) stateCarbonMonoxideChart.style.background = `linear-gradient(90deg, #65d3ba,#2cfab8,#3eef74)`;
                if (nicotine > 50) stateNicotineChart.style.background = `linear-gradient(90deg, #65d3ba,#2cfab8,#3eef74)`;
                if (smell > 50) stateSmellChart.style.background = `linear-gradient(90deg, #65d3ba,#2cfab8,#3eef74)`;
                if (lung > 50) stateLungChart.style.background = `linear-gradient(90deg, #65d3ba,#2cfab8,#3eef74)`;
                if (liver > 50) stateRiskLiverChart.style.background = `linear-gradient(90deg, #65d3ba,#2cfab8,#3eef74)`;
                if (riskHeart > 50) stateRiskHeartChart.style.background = `linear-gradient(90deg, #65d3ba,#2cfab8,#3eef74)`;
                if (riskCancer > 50) stateRiskCancerChart.style.background = `linear-gradient(90deg, #65d3ba,#2cfab8,#3eef74)`;
            }
        }

        this.renderMoreInfo = function(parent, btn) { /* Показываем больше данных в разделе Статистика */

            parent.classList.toggle('wrap__more');
            btn.classList.toggle('arrow__click');
        }

        this.renderFutbol = function(data, placeChampionFut) { /* Показываем блок Футбол */

            placeChampion = placeChampionFut; /* Сохраняем необходимое место в таблице */

            const loader = myModuleContainer.querySelector('#loader');
            loader.style.display = "none"; /* Скрываем лоудер */
            const futbolLeagueWrap = myModuleContainer.querySelector('#content .futbol_wrap');
            futbolLeagueWrap.style.display = "block";

            const league = myModuleContainer.querySelector('#content .futbol-league .league');
            const icon = myModuleContainer.querySelector('#content .futbol-league .icon');
            const team = myModuleContainer.querySelector('#content .futbol-league .team');
            const teamPlace = myModuleContainer.querySelector('#content .futbol-league .team-place');
            const matches = myModuleContainer.querySelector('#content .futbol-league .matches');
            const stats = myModuleContainer.querySelector('#content .futbol-league .stats');

            /* Строим блок с характеристиками по ФУТБОЛУ: лого, мячи, очки и тд */
            league.innerHTML = `<h3>${data.data.name} / ${data.data.seasonDisplay}</h3>`;
            icon.innerHTML = `<img src="${data.data.standings[placeChampion].team.logos[0].href}" height="80" width="auto">`;
            team.innerHTML = `${data.data.standings[placeChampion].team.location}`;
            teamPlace.innerHTML = `<span>Место в турнире: ${data.data.standings[placeChampion].stats[8].value}</span> <span>Очки: ${data.data.standings[placeChampion].stats[6].value}</span>`;
            matches.innerHTML = `<h4>Сыграно матчей: ${data.data.standings[placeChampion].stats[3].value}<h4><h4>Забитых голов: ${data.data.standings[placeChampion].stats[4].value}</h4> <h4>Пропущенных голов: ${data.data.standings[placeChampion].stats[5].value}</h4>`;
            stats.innerHTML = `<h4>Побед: ${data.data.standings[placeChampion].stats[0].value}</h4> <h4>Поражений: ${data.data.standings[placeChampion].stats[1].value}</h4> <h4>Ничей: ${data.data.standings[placeChampion].stats[2].value}</h4>`;
        }

        this.renderFutbolSeason = function() { /* Показываем инпут выбора ГОДА футбольного сезона */

            const futbolSeason = myModuleContainer.querySelector('#content .input__date-futbol');
            if (new Date().getMonth() + 1 === 1 || new Date().getMonth() + 1 === 2 || new Date().getMonth() + 1 === 3 || new Date().getMonth() + 1 === 4 || new Date().getMonth() + 1 === 5 || new Date().getMonth() + 1 === 6  || new Date().getMonth() + 1 === 7) {
                futbolSeason.value = new Date().getFullYear() - 1; /* Показываем прошлый год */
            }
            if (new Date().getMonth() + 1 === 8 || new Date().getMonth() + 1 === 9 || new Date().getMonth() + 1 === 10 || new Date().getMonth() + 1 === 11 || new Date().getMonth() + 1 === 12) {
                futbolSeason.value = new Date().getFullYear();  /* Показываем текущий год */
            }
            futbolSeason.setAttribute('max', `${new Date().getFullYear()}`); /* Ограничиваем инпут текущим годом */
        }

        this.renderFutbolLogo = function(data) { /* Показываем лого ЛИГИ */

            const logoWrap = myModuleContainer.querySelector('#content .logo_wrap');
            logoWrap.innerHTML = `<img src="${data.data.logos.light}" height="120" width="120">`;
        }

        this.renderCurrency = function(dateNow) { /* Показываем блок ОбМЕНА ВАЛЮТ */

            const dateCurrency = myModuleContainer.querySelector(`#content .input__date-currency`);
            dateCurrency.setAttribute('max', dateNow); /* Ограничиваем макс дату сегодняшним днем */
            dateCurrency.setAttribute('min', '2020-11-22');
            dateCurrency.setAttribute('value', dateNow); /* Значение при загрузке - сегодняшний день */

            const futbolSeason = myModuleContainer.querySelector('#content .futbol-season');
            futbolSeason.style.display = "none"; /* Прячем другие блоки */
            const futbolLeague = myModuleContainer.querySelector('#content .futbol-league');
            futbolLeague.style.display = "none";
            const nowWeather = myModuleContainer.querySelector('#content #forecast-now');
            nowWeather.style.display = "none";
            const btnForecast = myModuleContainer.querySelector('#content .btn-forecast_wrap');
            btnForecast.style.display = "none";
            const currencyExchange = myModuleContainer.querySelector('#content #currency-exchange');
            currencyExchange.style.display = "block";
        }

        this.renderCurrencyInput1 = function(resultCurrency) { /* Подсчет ОБМЕНА ВАЛЮТ при изменении инпута 1 и селектов */

            const inputCurrency2 = myModuleContainer.querySelector("#currency-exchange .input_res-currency");
            inputCurrency2.value = resultCurrency;
        }

        this.renderCurrencyInput2 = function(resultCurrency) { /* Подсчет ОБМЕНА ВАЛЮТ при изменении инпута 2 */

            const inputCurrency1 = myModuleContainer.querySelector("#currency-exchange .input_sum-currency");
            inputCurrency1.value = resultCurrency;
        }

        this.renderCleanCurrency = function() { /* Очищаем инпуты ввода валюты */

            const inputCurrency1 = myModuleContainer.querySelector("#currency-exchange .input_sum-currency");
            inputCurrency1.value = 0;
            const inputCurrency2 = myModuleContainer.querySelector("#currency-exchange .input_res-currency");
            inputCurrency2.value = 0;
        }

        this.renderAddCurrency = function(currency) { /* Возможность добавлять новую ВАЛЮТУ */

            const selectCurrency1 = myModuleContainer.querySelector("#currency-exchange #currency-1");
            const newCurrency = document.createElement('option');
            newCurrency.value = currency.toLowerCase();
            newCurrency.innerHTML = currency.toUpperCase();
            selectCurrency1.append(newCurrency); /* Создаем новый элемент OPTION и добавляем его в селект1 */
            const inputAddCurrency = myModuleContainer.querySelector("#currency-exchange .input_add-currency");
            inputAddCurrency.value = '';
        }

        this.renderWeather = function(data) { /* Показываем блок ПОГОДА */

            const loaderW = myModuleContainer.querySelector('#loader-W');
            loaderW.style.display = "none";
            const weatherWrap = myModuleContainer.querySelector('#content .forecast_wrap');
            weatherWrap.style.display = "block";

            /* Строим блок с данными по ПОГОДЕ */
            const icon = myModuleContainer.querySelector('#content .icon-weather');
            icon.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" height="50" width="auto">`;
            const location = myModuleContainer.querySelector('#content .location');
            location.innerHTML = `${data.name}`;
            const temperature = myModuleContainer.querySelector('#content .temperature');
            temperature.innerHTML = `${Math.round(data.main.temp)}°C`;
            const description = myModuleContainer.querySelector('#content .description');
            description.innerHTML = data.weather[0].description;
            const wind = myModuleContainer.querySelector('#content .wind');
            wind.innerHTML = `Ветер: ${round(data.wind.speed, 1)} м/с`;

            function round(value, decimals) { /* Округление температуры и ветра */
                return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
            }
        }

        this.renderWeather3days = function(data3day) { /* Показываем прогноз ПОГОДЫ на 3 дня */

            const loaderW = myModuleContainer.querySelector('#loader-W');
            loaderW.style.display = "none";

            const weather3days = myModuleContainer.querySelector('#content .forecast-3-days');
            weather3days.style.display = "flex";
            const afterTomorrow = myModuleContainer.querySelector('#forecast-now .after-tomorrow');
            afterTomorrow.style.display = "block";

            /* Строим блок с данными по ПОГОДЕ на 3 дня */
            const today = myModuleContainer.querySelector('#forecast-now .today');
            today.innerHTML = `
                Сегодня:<br>
                <img src="http://openweathermap.org/img/w/${data3day.list[1].weather[0]["icon"]}.png">
                <h3>${Math.round(data3day.list[1].main.temp)} °C</h3> 
                <p>Ветер:<br>
                ${round(data3day.list[1].wind.speed, 1)} м/с</p>
                ${data3day.list[1].weather[0]["description"]}`;

            const tomorrow = myModuleContainer.querySelector('#forecast-now .tomorrow');
            tomorrow.innerHTML = `
                Завтра:<br>
                <img src="http://openweathermap.org/img/w/${data3day.list[9].weather[0]["icon"]}.png">
                <h3>${Math.round(data3day.list[9].main.temp)} °C</h3>
                <p>Ветер:<br>
                ${round(data3day.list[9].wind.speed, 1)} м/с</p>
                ${data3day.list[9].weather[0]["description"]}`;

            afterTomorrow.innerHTML = `
                Послезавтра:<br>
                <img src="http://openweathermap.org/img/w/${data3day.list[17].weather[0]["icon"]}.png">
                <h3>${Math.round(data3day.list[17].main.temp)} °C</h3>
                <p>Ветер:<br>
                ${round(data3day.list[17].wind.speed, 1)} м/с</p>
                ${data3day.list[17].weather[0]["description"]}`;

            function round(value, decimals) { /* Округление температуры и ветра */
                return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
            }
        }

        this.renderPollution = function(data) { /* Показываем загрязнение ВОЗДУХА */

            const loaderW = myModuleContainer.querySelector('#loader-W');
            loaderW.style.display = "none";
            const weather3days = myModuleContainer.querySelector('#content .forecast-3-days');
            weather3days.style.display = "flex";

            /* Строим блок с данными о загрязнении ВОЗДУХА */
            const today = myModuleContainer.querySelector('#forecast-now .today');
            today.innerHTML = `
                Индекс загрязнение воздуха:<br>
                <h3>${data.list[0].main.aqi}</h3>
                <div class="level-pollution">1 - хорошо;<br> 2 - удовлетво-льно;<br> 3 - умеренно;<br> 4 - плохо;<br> 5 - очень плохо;</div>`;

            const tomorrow = myModuleContainer.querySelector('#forecast-now .tomorrow');
            tomorrow.innerHTML = `
                Концентрация (мкг/м3):<br>
                <p>CO - ${data.list[0].components.co}</p>
                <p>NO - ${data.list[0].components.no}</p>
                <p>NO<sub>2</sub> - ${data.list[0].components.no2}</p>
                <p>O<sub>3</sub> - ${data.list[0].components.o3}</p>
                <p>SO<sub>2</sub> - ${data.list[0].components.so2}</p>`;

            const afterTomorrow = myModuleContainer.querySelector('#forecast-now .after-tomorrow');
            afterTomorrow.style.display = "none";
        }

        this.renderFutbolLoader = function() { /* Отображаем Лойдер загрузки и скрываем другие блоки */

            const futbolSeason = myModuleContainer.querySelector('#content .futbol-season');
            futbolSeason.style.display = "block";
            const weatherWrap = myModuleContainer.querySelector('#content #forecast-now');
            weatherWrap.style.display = "none";
            const currencyExchange = myModuleContainer.querySelector('#content #currency-exchange');
            currencyExchange.style.display = "none";
            const btnForecast = myModuleContainer.querySelector('#content .btn-forecast_wrap');
            btnForecast.style.display = "none";
            const futbolLeague = myModuleContainer.querySelector('#content .futbol-league');
            futbolLeague.style.display = "block";
            const loader = myModuleContainer.querySelector('#loader');
            loader.style.display = "block";
            const futbol = myModuleContainer.querySelector('#content .futbol_wrap');
            futbol.style.display = "none";
        }

        this.renderWeatherLoader = function() { /* Отображаем Лойдер загрузки и скрываем другие блоки */

            const futbolSeason = myModuleContainer.querySelector('#content .futbol-season');
            futbolSeason.style.display = "none";
            const weather3days = myModuleContainer.querySelector('#content .forecast-3-days');
            weather3days.style.display = "none";
            const futbolLeagueWrap = myModuleContainer.querySelector('#content .futbol-league');
            futbolLeagueWrap.style.display = "none";
            const currencyExchange = myModuleContainer.querySelector('#content #currency-exchange');
            currencyExchange.style.display = "none";
            const nowWeather = myModuleContainer.querySelector('#content #forecast-now');
            nowWeather.style.display = "block";
            const loaderW = myModuleContainer.querySelector('#loader-W');
            loaderW.style.display = "block";
            const weather = myModuleContainer.querySelector('#content .forecast_wrap');
            weather.style.display = "none";
            const btnForecast = myModuleContainer.querySelector('#content .btn-forecast_wrap');
            btnForecast.style.display = "block";
        }

        this.renderWeather3daysLoader = function() { /* Отображаем Лойдер загрузки и скрываем другие блоки */

            const weatherWrap = myModuleContainer.querySelector('#content .forecast_wrap');
            weatherWrap.style.display = "none";
            const weather3days = myModuleContainer.querySelector('#content .forecast-3-days');
            weather3days.style.display = "none";
            const loaderW = myModuleContainer.querySelector('#loader-W');
            loaderW.style.display = "block";
        }

        this.btnUpdate = function(stateBtn) { /* Проверка инпутов на ввод данных */

            const buttonSave = myModuleContainer.querySelector('#content .data__save');
            buttonSave.disabled = stateBtn; /* Изменяем состояние кнопки 'Изменить/Сохранить' */
        }

        this.validDate = function(checkData) { /* Показываем валидацию данных */

            const validDate = myModuleContainer.querySelector("#content .valid-value");
            validDate.style.display = '';

            if (checkData) validDate.innerHTML = 'Данные <br> сохранены!';
            else validDate.innerHTML = 'Введите <br> корректно <br> данные!';

            setTimeout(function() {
                validDate.style.display = 'none';
            }, 1500); /* Скрываем данные через 1,5с */
        }

        this.showMessageChat = function() { /* Показываем блок ОНЛАЙН-ЧАТА */

            const adviceSpa = myModuleContainer.querySelector("#content .advice-spa");
            adviceSpa.style.display = 'none';
            const factsSpa = myModuleContainer.querySelector("#content .facts-spa");
            factsSpa.style.display = 'none';
            const goalsSpa = myModuleContainer.querySelector("#content .goals-spa");
            goalsSpa.style.display = 'none';
            const chatSpa = myModuleContainer.querySelector("#content .chat-spa");
            chatSpa.style.display = 'block';
        }

        this.renderChat = function(str) { /* Отображаем сообщения чата с версткой из БАЗЫ ДАННЫХ */

            const chatBorder = myModuleContainer.querySelector(".chat-spa .chat-border");
            chatBorder.innerHTML = str;
            const messageChat = myModuleContainer.querySelector(".chat-spa .message-chat");
            messageChat.value = ''; /* Чистим поле ввода текста */
        }

        this.renderAdviceUser = function(textAdvice) { /* Показываем блок СОВЕТОВ */

            const goalsSpa = myModuleContainer.querySelector("#content .goals-spa");
            goalsSpa.style.display = 'none';
            const chatSpa = myModuleContainer.querySelector("#content .chat-spa");
            chatSpa.style.display = 'none';
            const factsSpa = myModuleContainer.querySelector("#content .facts-spa");
            factsSpa.style.display = 'none';
            const adviceSpa = myModuleContainer.querySelector("#content .advice-spa");
            adviceSpa.style.display = 'block';
            const messageAdvice = myModuleContainer.querySelector(".advice-spa div");
            messageAdvice.innerHTML = textAdvice;
            if (!textAdvice) { /* Если советы закончились */
                messageAdvice.style.color = 'red';
                messageAdvice.innerHTML = 'Советы закончились! Заходите позже!';
            }
        }

        this.renderVideoFactsUser = function(videoFacts) { /* Показываем блок ВИДЕО-ФАКТОВ */

            const chatSpa = myModuleContainer.querySelector("#content .chat-spa");
            chatSpa.style.display = 'none';
            const adviceSpa = myModuleContainer.querySelector("#content .advice-spa");
            adviceSpa.style.display = 'none';
            const goalsSpa = myModuleContainer.querySelector("#content .goals-spa");
            goalsSpa.style.display = 'none';
            const factsSpa = myModuleContainer.querySelector("#content .facts-spa");
            factsSpa.style.display = 'block';
            const messageFacts = myModuleContainer.querySelector(".facts-spa iframe");
            messageFacts.setAttribute("src", videoFacts);

            if (!videoFacts) {
                messageFacts.setAttribute("src", '');
                messageFacts.style.display = 'none';
                factsSpa.style.height = 'auto';
                let factNone = myModuleContainer.querySelector("#content .fact_none"); /* Если факты закончились */
                factNone.style.display = 'block';
            }
        }

        this.renderActiveBtn = function(activeBtn) { /* Выделяем нажимаемую кнопку */

            const buttonAll = myModuleContainer.querySelectorAll("#content > section > button");
            buttonAll.forEach(elem => elem.style.backgroundColor = '#919191');
            activeBtn.style.backgroundColor = '#303030'; /* Находим все кнопки и меняем цвет по которой кликаем */

            if (userStorage.colorSpaUser === 'black') { /* Для темной темы оформления */
                buttonAll.forEach(elem => elem.style.backgroundColor = '#c3c3c3');
                activeBtn.style.backgroundColor = '#ffffff';
            }
        }

        this.renderAboutSpa = function() { /* Показываем блок О ПРИЛОЖЕНИИ */

            const modalAboutSpa = myModuleContainer.querySelector("#content .modal_about_spa");
            modalAboutSpa.classList.remove('modal_closed');
            const modalOverlay = myModuleContainer.querySelector("#content .modal-overlay");
            modalOverlay.classList.remove('modal_closed');

            $(document).ready(function() { /* Автоматическая прокрутка блока вниз */
                $('.modal_about_spa').animate({scrollTop: 0}, 0).animate({scrollTop: 200}, 7000);
            });

            setTimeout(function() { /* Автоматическая скрытие блока через 6 сек */
                modalAboutSpa.classList.add('modal_closed');
                modalOverlay.classList.add('modal_closed');
            }, 6000)
        }

        this.changeColorBtn = function(btnColor) { /* Изменяем высоту кнопки выбора цветовой схемы приложения */

            const btnColorSpa = myModuleContainer.querySelectorAll("#content .color_wrap .color-spa");
            btnColorSpa.forEach(elem => elem.style.height = '13px');
            btnColor.style.height = '20px'; /* У всех высоту 13px, у выбранной кнопки высота 20px */
        }

        this.changeColorSpa = function() { /* Изменяем цветовую схему приложения */

            const styleCSS = document.head.querySelector("link[href$='styles.css']"); /* Находим link со стилями */
            if (userStorage && userStorage.colorSpaUser === 'black') {

                styleCSS.setAttribute('href', `./styles/${userStorage.colorSpaUser}-styles.css`); /* Меняем на черную тему */
            }
            else {
                styleCSS.setAttribute('href', `./styles/styles.css`); /* Темы других цветов не загружены */
            }
        }

        this.showGoalsUser = function() { /* Показываем блок УСТАНОВКИ ЦЕЛИ */

            const adviceSpa = myModuleContainer.querySelector("#content .advice-spa");
            adviceSpa.style.display = 'none';
            const chatSpa = myModuleContainer.querySelector("#content .chat-spa");
            chatSpa.style.display = 'none';
            const factsSpa = myModuleContainer.querySelector("#content .facts-spa");
            factsSpa.style.display = 'none';
            const goalsSpa = myModuleContainer.querySelector("#content .goals-spa");
            goalsSpa.style.display = 'block';
        }

        this.renderGoalsUser = function({userText, userCost}, percentGoals, moneyNowUser, restDay) { /* Показываем статистику о цели пользователя из localStorage */

            const goalsWrap = myModuleContainer.querySelector("#content .goals__wrap");
            goalsWrap.style.display = 'block';

            const stateGoals = myModuleContainer.querySelector("#content .state__goals__chart .percent");
            const stateGoalsChart = myModuleContainer.querySelector("#content .state__goals__chart .chart");
            const stateGoalsText = myModuleContainer.querySelector("#content .state__goals__chart .state__text__goals");
            const moneyNow = myModuleContainer.querySelector("#content .state__goals__dicription .money_now");
            const moneyFull = myModuleContainer.querySelector("#content .state__goals__dicription .money_full");
            const restTime = myModuleContainer.querySelector("#content .state__goals__dicription .rest_time");
            const inputGoalsUser = myModuleContainer.querySelectorAll("#content .goals-spa input");

            inputGoalsUser.forEach(elem => elem.value = ''); /* Очищаем инпуты */
            stateGoals.innerHTML = `<strong class="percent-H">${percentGoals}%</strong>`; /* Показываем проценты достижения цели */
            setTimeout(function() {

                stateGoalsChart.style.width = `${percentGoals}%`;
            }, 100); /* Отображаем график цели */

            stateGoalsText.innerHTML = userText; /* Отображаем текст цели */
            moneyNow.innerHTML = moneyNowUser + ' руб'; /* Отображаем сколько есть денег */
            moneyFull.innerHTML = userCost + ' руб'; /* Отображаем сколько нужно денег */
            restTime.innerHTML = restDay + ' дн'; /* Отображаем сколько осталось дней */
            if (restDay === 0) restTime.innerHTML = 'Выполнено!';
        }

        this.renderGoalsHide = function() { /* Прячем статистику ЦЕЛИ пользователя */

            const goalsWrap = myModuleContainer.querySelector("#content .goals__wrap");
            goalsWrap.style.display = 'none';
        }
    }





    /* ----- controller ---- */
    function ModuleController() {

        let myModuleContainer = null;
        let myModuleModel = null;
        let that = this;

        this.init = function(container, model) { /* Инициализация контроллера */

            myModuleContainer = container;
            myModuleModel = model;

            window.addEventListener("hashchange", this.updateState); /* Вешаем слушателей на событие hashchange и кликам по пунктам меню */

            this.updateState(); /* первая отрисовка */

            myModuleContainer.addEventListener("click", clickHandler); /* Слушатели событий на клики от пользователя */

            function clickHandler(e) {

                if (e.target.getAttribute('class') === 'data__save') {
                    that.saveDataUser(); /* Сохранение данных пользователя */
                }
                if (e.target.getAttribute('class') === 'data__delete') {
                    that.clearData(); /* Удаление данных пользователя */
                }
                if (e.target.getAttribute('class') === 'fas fa-angle-double-down' || e.target.getAttribute('class') === 'fas fa-angle-double-down arrow__click') {
                    that.showMoreInfo(e.target.parentNode, e.target); /* Показываем больше данных в разделе Статистика */
                }
                if (e.target.getAttribute('class') === 'btn-futbol') {
                    that.showFutbol(); /* Показываем блок Футбол */
                    that.setActiveBtn(e.target); /* Выделяем нажимаемую кнопку */
                }
                if (e.target.getAttribute('class') === 'btn-weather') {
                    that.showWeather(); /* Показываем блок ПОГОДА */
                    that.setActiveBtn(e.target);
                }
                if (e.target.getAttribute('class') === 'fas fa-chevron-right' || e.target.getAttribute('class') === 'btn-futbol-foward') {
                    that.showFutbolFoward(); /* Листаем футбол ВПЕРЕД */
                }
                if (e.target.getAttribute('class') === 'fas fa-chevron-left' || e.target.getAttribute('class') === 'btn-futbol-back') {
                    that.showFutbolBack(); /* Листаем футбол НАЗАД */
                }
                if (e.target.getAttribute('class') === 'btn-chat') {
                    that.showMessageChat(); /* Показываем блок ОНЛАЙН-ЧАТА */
                    that.setActiveBtn(e.target);
                }
                if (e.target.getAttribute('class') === 'far fa-envelope') {
                    that.sendMessageChat(); /* Отправка сообщений в ОНЛАЙН-ЧАТе */
                }
                if (e.target.getAttribute('class') === 'fas fa-cloud-upload-alt') {
                    that.updateMessageChat(); /* Обновление сообщений в ОНЛАЙН-ЧАТе */
                }
                if (e.target.getAttribute('class') === 'btn-advice') {
                    that.getAdviceUser(); /* Показываем блок СОВЕТОВ */
                    that.setActiveBtn(e.target);
                }
                if (e.target.getAttribute('class') === 'btn-facts') {
                    that.getVideoFactsUser(); /* Показываем блок ВИДЕО-ФАКТОВ */
                    that.setActiveBtn(e.target);
                }
                if (e.target.getAttribute('class') === 'btn-currency') {
                    that.showCurrency(); /* Показываем блок ОбМЕНА ВАЛЮТ */
                    that.setActiveBtn(e.target);
                }
                if (e.target.getAttribute('class') === 'btn-clean-currency' || e.target.getAttribute('class') === 'fas fa-eraser') {
                    that.cleanCurrency(); /* Очищаем инпуты ввода валюты */
                }
                if (e.target.getAttribute('class') === 'btn-add-currency') {
                    that.addCurrency(); /* Возможность добавлять новую ВАЛЮТУ */
                }
                if (e.target.getAttribute('class') === 'about_spa') {
                    that.showAboutSpa(); /* Показываем блок О ПРИЛОЖЕНИИ */
                }
                if (e.target.classList.contains('color-spa')) {
                    that.changeColorSpa(e.target); /* Изменяем цветовую схему приложения */
                }
                if (e.target.classList.contains('btn-forecast-3days')) {
                    that.showWeather3days(); /* Показываем ПОГОДу на 3 дня */
                }
                if (e.target.getAttribute('class') === 'btn-forecast-now') {
                    that.showWeather();  /* Показываем ПОГОДу сейчас */
                }
                if (e.target.getAttribute('class') === 'btn-forecast-pollution') {
                    that.showPollution();  /* Показываем Загрязнение воздуха из ПОГОДЫ */
                }
                if (e.target.getAttribute('class') === 'btn-goals') { /* Показываем блок УСТАНОВКИ ЦЕЛИ */
                    that.showGoalsUser();
                    that.setActiveBtn(e.target);
                }
                if (e.target.getAttribute('class') === 'btn_goals_add' || e.target.getAttribute('class') === 'fas fa-fast-forward') {
                    that.setGoalsUser(); /* Устанавливаем ЦЕЛь пользователя в localStorage */
                }
                if (e.target.getAttribute('class') === 'modal__close') {
                    e.preventDefault();
                    that.clearDataGoals(); /* Удаляем ЦЕЛь пользователя из localStorage */
                }
            }

            document.addEventListener("keyup", keyHandler); /* Горячие клавиши */
            function keyHandler(e) {
                if (e.code === 'KeyZ' && e.shiftKey) window.location.hash = '#statistics'; /* закладка (якорь, хэш), т.е. часть URI */
                if (e.code === 'KeyX' && e.shiftKey) window.location.hash = '#health';
                if (e.code === 'KeyC' && e.shiftKey) window.location.hash = '#motivation';
                if (e.code === 'KeyV' && e.shiftKey) window.location.hash = '#other';
                if (e.code === 'KeyB' && e.shiftKey) window.location.hash = '#login';
            }
        }

        this.updateState = function() {

            const hashPageName = location.hash.slice(1).toLowerCase(); /* Линк после # */

            myModuleModel.updateState(hashPageName);
            that.checkInputChange(); /* Проверка инпутов на ввод данных */
        }

        this.saveDataUser = function() { /* Сохраняем данные из инпутов в localStorage */

            const inputData = myModuleContainer.querySelectorAll("#content input");
            const typeFutbol = myModuleContainer.querySelector('#type-futbol');
            const typeCity = myModuleContainer.querySelector('#type-city');
            const soundSpa = myModuleContainer.querySelector('#content #sound');

            myModuleModel.saveData(inputData, typeFutbol, typeCity, soundSpa);
            that.checkInputChange(); /* Проверка инпутов на ввод данных */
        }

        this.clearData = function() { /* Очищаем данные из localStorage */

            myModuleModel.clearData(); /* Общие настройки */
            myModuleModel.clearDataGoals(); /* Дополнительные настройки */
            that.checkInputChange();
        }

        this.showMoreInfo = function(parent, btn) { /* Показываем больше данных в разделе Статистика */

            myModuleModel.showMoreInfo(parent, btn); /* parent = e.target.parentNode; btn = e.target */
        }

        this.showFutbol = function() { /* Показываем блок Футбол */

            const inputDateFutbol = myModuleContainer.querySelector("#content .input__date-futbol");
            inputDateFutbol.addEventListener('input', inputDateHandler); /* Слушатель событий на инпут ГОД сезона */

            myModuleModel.getFutbolSeason(); /* Показываем инпут выбора ГОДА футбольного сезона */
            myModuleModel.getFutbol(inputDateFutbol);

            function inputDateHandler() {
                myModuleModel.getFutbol(inputDateFutbol);
            }
        }

        this.showWeather = function() { /* Показываем блок ПОГОДА */

            myModuleModel.getWeather();
        }

        this.showWeather3days = function() { /* Показываем ПОГОДу на 3 дня */

            myModuleModel.getWeather3days();
        }

        this.showPollution = function() { /* Показываем Загрязнение воздуха из ПОГОДЫ */

            myModuleModel.getPollution();
        }

        this.showFutbolFoward = function() { /* Листаем футбол ВПЕРЕД */

            const inputDateFutbol = myModuleContainer.querySelector("#content .input__date-futbol");
            myModuleModel.getFutbolFoward(inputDateFutbol);
        }

        this.showFutbolBack = function() { /* Листаем футбол НАЗАД */

            const inputDateFutbol = myModuleContainer.querySelector("#content .input__date-futbol");
            myModuleModel.getFutbolBack(inputDateFutbol);
        }

        this.checkInputChange = function() { /* Проверка инпутов на ввод данных */

            const inputAll = myModuleContainer.querySelectorAll(".modal__content input");
            inputAll.forEach(elem => elem.addEventListener('input', checkChangeInput));

            function checkChangeInput(e) {

                e.preventDefault();
                myModuleModel.checkInput(inputAll[0].value, inputAll[1].value, inputAll[2].value, inputAll[3].value, inputAll[4].value);
            }
        }

        this.showMessageChat = function() { /* Показываем блок ОНЛАЙН-ЧАТА */

            myModuleModel.showMessageChat(); /* Показываем чат */
            myModuleModel.updateMessageChat(); /* Обновляем чат */

            const inputChat = myModuleContainer.querySelector(".chat-spa input");
            inputChat.addEventListener('keyup', pressEnterHandler); /* Слушатель событий в чате для отправки сообщений на Enter */

            function pressEnterHandler(e) {
                if (e.code === 'Enter') that.sendMessageChat();
            }
        }

        this.sendMessageChat = function() { /* Отправка сообщений в ОНЛАЙН-ЧАТе */

            const inputChat = myModuleContainer.querySelector(".chat-spa .message-chat");
            myModuleModel.sendMessageChat(inputChat);
        }

        this.updateMessageChat = function() { /* Обновление сообщений в ОНЛАЙН-ЧАТе */

            myModuleModel.updateMessageChat();
        }

        this.getAdviceUser = function() { /* Показываем блок СОВЕТОВ */

            myModuleModel.getAdviceUser();
        }

        this.getVideoFactsUser = function() { /* Показываем блок ВИДЕО-ФАКТОВ */

            myModuleModel.getVideoFactsUser();
        }

        this.setActiveBtn = function(activeBtn) { /* Выделяем нажимаемую кнопку */

            myModuleModel.setActiveBtn(activeBtn); /* activeBtn = e.target */
        }

        this.showCurrency = function() { /* Показываем блок ОбМЕНА ВАЛЮТ */

            myModuleModel.getCurrency();

            const inputCurrency1 = myModuleContainer.querySelector("#currency-exchange .input_sum-currency");
            inputCurrency1.addEventListener('input', inputHandler1); /* Слушатель событий на 1 инпут */
            const inputCurrency2 = myModuleContainer.querySelector("#currency-exchange .input_res-currency");
            inputCurrency2.addEventListener('input', inputHandler2); /* Слушатель событий на 2 инпут */
            const selectCurrency1 = myModuleContainer.querySelector("#currency-exchange #currency-1");
            selectCurrency1.addEventListener('click', inputHandler1); /* Слушатель событий на клик по 1 селекту */
            const selectCurrency2 = myModuleContainer.querySelector("#currency-exchange #currency-2");
            selectCurrency2.addEventListener('click', inputHandler1); /* Слушатель событий на клик по 2 селекту */
            const selectDate = myModuleContainer.querySelector("#currency-exchange .input__date-currency");
            selectDate.addEventListener('input', inputHandler1);

            function inputHandler1() {
                myModuleModel.changeCurrency1(inputCurrency1, inputCurrency2, selectCurrency1, selectCurrency2, selectDate);
            }
            function inputHandler2() {
                myModuleModel.changeCurrency2(inputCurrency1, inputCurrency2, selectCurrency1, selectCurrency2, selectDate);
            }
            that.cleanCurrency(); /* Очищаем инпуты ввода валюты */
        }

        this.cleanCurrency = function() { /* Очищаем инпуты ввода валюты */

            myModuleModel.cleanCurrency();
        }

        this.addCurrency = function() { /* Возможность добавлять новую ВАЛЮТУ */

            const inputAddCurrency = myModuleContainer.querySelector("#currency-exchange .input_add-currency");
            myModuleModel.addCurrency(inputAddCurrency);
        }

        this.showAboutSpa = function() { /* Показываем блок О ПРИЛОЖЕНИИ */

            myModuleModel.showAboutSpa();
        }

        this.changeColorSpa = function(btnColor) { /* Изменяем цветовую схему приложения */

            myModuleModel.changeColorSpa(btnColor);
        }

        this.showGoalsUser = function() { /* Показываем блок УСТАНОВКИ ЦЕЛИ */

            myModuleModel.showGoalsUser();
        }

        this.setGoalsUser = function() { /* Устанавливаем ЦЕЛь пользователя в localStorage */

            const inputGoalsUser = myModuleContainer.querySelectorAll("#content .goals-spa input");
            myModuleModel.setGoalsUser(inputGoalsUser);
        }

        this.clearDataGoals = function() { /* Удаляем ЦЕЛь пользователя из localStorage */

            myModuleModel.clearDataGoals();
            myModuleModel.getGoalsUser();
        }
    }



  return {

      init: function({container, routes, components}) {

        this.renderComponents(container, components); /* Верстаем хэдер, навигацию и контент */

        const view = new ModuleView();
        const model = new ModuleModel();
        const controller = new ModuleController();

        view.init(document.getElementById(container), routes); /* связываем части модуля */
        model.init(view);
        controller.init(document.getElementById(container), model);
      },

      renderComponents: function (container, components) {
        const root = document.getElementById(container);
        const componentsList = Object.keys(components); /* const components = {header: Header, navbar: NavBar, content: Content,} */
        for (let item of componentsList) {
          root.innerHTML += components[item].render("component");
        }
      },
  };

}());



/* --- init module --- */
document.addEventListener("DOMContentLoaded", SPA_Smoking.init({
  container: "spa-smoking",
  routes: routes,
  components: components,
}));