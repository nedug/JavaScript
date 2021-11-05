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
  other: Other,
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
        let timerStatisticTime = null;
        let timerStatisticOther = null;
        let timerTick = null;
        let placeChampionFut = null;
        let that = this;
        let numDiap = null;
        let numDiapF = null;
        let advice = null;
        let facts = null;

        let clickAudio = new Audio('sound/1.mp3');
        let tickAudio = new Audio('sound/2.mp3');

        var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
        var messages; // элемент массива - {name:'Иванов',mess:'Привет'};
        var updatePassword;
        var stringName='SASHA1_CHAT_MESSAGES';

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

            advice = ['Пульс и артериальное давление возращается в норму, нагрузка на сердце снижается.',
                'Поймите, что курение давно уже не модно.',
                'Избегайте курящих компаний.',
                'Не докуривайте сигарету до конца, оставляйте треть или даже половину. Таким образом, вы фактически выкуриваете меньше и не курите тогда, когда фильтр сигареты наиболее загрязнен.',
                'Стоит отказаться от ароматизированных сигарет. Их химический состав более обширен, и они могут содержать еще большее число опасных веществ, чем обычные.',
                'Не курите больше одной сигареты в час.',
                'Старайтесь курить в одно и то же время. Если организм в одно и то же время будет получать токсины, то со временем у него выработаются «биологические часы», которые будут активизировать защитные механизмы.',
                'Не стоит курить на голодный желудок, или натощак, поскольку в этом случае слюна смешивается с табаком и повреждает слизистую оболочку желудка. А при всасывании из кишечника токсичные вещества попадают сразу в кровь, по этой же причине не следует курить во время питья и еды.',
                'Постарайтесь не курить при ходьбе, особенно взбираясь в гору или поднимаясь по лестнице. При нагрузке дыхание становится интенсивнее, и токсичные вещества достигают самых отдаленных участков легких.',
                'Повышайте иммунный статус организма всеми доступными средствами: закаливание, сауна, прививки против гриппа, отпуск на море или в горах.',
                'Чаще гуляйте на свежем воздухе. Такие прогулки способствуют «проветриванию» легких и выведению из них канцерогенных и болезнетворных веществ.',
                'Не обманывайте себя мыслями о том, что можете начинать и прекращать курить, когда захотите.',
                'Курильщики обоих полов, отказавшись от курения в возрасте между 35 и 39 годами добавляют в среднем от трех до пяти лет к своей жизни.',
            ];

            facts = ['Табак - коварный "убийца". Вначале он увлекает, как правило, молодых, неопытных людей. Затем крепко привязывает к себе, заставляет курить, доставляя некоторое удовольствие, и только потом, спустя годы, убивает свою жертву.',
                'Из 10 000 видов ядовитых растений планеты наибольшее внимание людей привлекает табак, потому что в нем есть никотин.',
                'Табачный дым содержит более 4000 химических соединений, более сорока, из которых, вызывают рак, а также несколько сотен ядов, включая никотин, цианид, мышьяк, формальдегид, углекислый газ, окись углерода, синильную кислоту и т. д.',
                'Некоторые производители включают в свою продукцию следующие крайне опасные соединения: ацетальдегид, ацетон, аммиак, бензол, бутиламин, диметиламин, ДДТ, этиламин, формальдегид, сероводород, гидрохинон, метиловый спирт, метиламин, соединения никеля и пиридин.',
                'Размеры аэрозольных частичек, из которых состоит табачный дым, варьируются от 0,15 мкм до 1,3 мкм (в среднем 0,4 мкм). В дыме от сигареты, поступающем в окружающую среду, размер частичек значительно меньше - от 0,01 мкм до 0,1 мкм. Таким образом, эти частички при вдыхании могут достигать альвеол. Показано, что табачный дым проникает во все отделы трахеи, бронхов и легких. Установлено, что содержащиеся в табачном дыме химические соединения подвергаются фагоцитозу альвеолярными макрофагами.',
                'Концентратом табачных ядов является деготь, вызывающий раковую опухоль у многих курильщиков. Разорвите бумажный мундштук выкуренной сигареты. На его внутренних стенках, на фильтре, вы увидите маслянистую черноту. Это и есть смертоносный деготь.',
                'В сигаретном дыме присутствуют радиоактивные вещества: полоний, свинец, висмут. Особую опасность представляет выделенный из табачных листьев в 1964 г. радиоактивный изотоп полоний-210.',
                'Температура тлеющей сигареты 500 – 900 градусов. В тот момент, когда курильщик затягивается, температура на кончике сигареты достигает 600 °С.',
                'Урина, химический компонент, входящий в состав мочи, используется при производстве сигарет для придания специфического «аромата» и «вкуса» дыму.',
                'Никотин вызывает быстрое привыкание и является НАРКОТИЧЕСКИМ СРЕДСТВОМ, легко доступным и практически беспрепятственно распространяемым!',
                'По степени ядовитости никотин сравним с синильной кислотой, и даже обладает одинаковой смертельной дозой для человека.',
                'Если никотин частично выводится из организма, то остальные яды оседают надолго, накапливаются и вызывают различные болезни. От табачных ядов неминуемо страдает не только тот, кто курит табак, но и те, кого окуривают.',
                'Целых два года необходимо освобождаться от этих ядов организму человека, который бросил курить. Но последствия отравления остаются на всю жизнь. Через несколько лет человека начинают одолевать болезни, а он и не предполагает, что их причиной является курение табака в молодые годы. Чем раньше человек бросает курить, тем больше у него шансов остаться здоровым.',
            ];

            numDiap = 12;
            numDiapF = 12;
            placeChampionFut = 0;
            pageNameLink = pageName;

            if (userDataStorage && userDataStorage.soundSpaUser) playSound();

            this.getData();

            myModuleView.renderContent(pageNameLink, userDataStorage, sumSig, costSig);

            if ((pageNameLink === 'statistics' || pageNameLink === '') && userDataStorage) {

                this.calculateStatistics();
            }
            else if (pageNameLink === 'health' && userDataStorage) {

                clearInterval(timerStatisticTime);
                clearInterval(timerStatisticOther);
                clearInterval(timerTick);

                this.calculateHealth();
            }
            else {

                clearInterval(timerStatisticTime);
                clearInterval(timerStatisticOther);
                clearInterval(timerTick);
            }


        }


        this.saveData = function([inputName, inputDate, inputNumCig, inputCostCig, inputCigInBlock], typeFutbol, typeCity, soundSpa) { // Получаем данные пользователя и сохраняем в объект 'userData'

            if (+inputName.value || inputName.value.length < 3 || inputNumCig.value < 0 || inputNumCig.value > 100 || inputCostCig.value < 1 || inputCostCig.value > 20 || inputCigInBlock.value < 1 || inputCigInBlock.value > 50) { /* Проверка на корректность данных */

                myModuleView.validDate(false);
                return;
            }

            if (+inputDate.value.split('-')[0] > new Date().getFullYear() || +inputDate.value.split('-')[0] === new Date().getFullYear() && +inputDate.value.split('-')[2] > new Date().getDate() && +inputDate.value.split('-')[1] >= new Date().getMonth()+1 || +inputDate.value.split('-')[0] === new Date().getFullYear() && +inputDate.value.split('-')[1] > new Date().getMonth()+1) { /* Проверка на ввод даты пользователя через клавиатуру */

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
            }

            this.storeData(); /* Сохраняем данные в localStorage */

            myModuleView.validDate(true);
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


        this.calculateStatistics = function() {

            if (!userDataStorage) return

            let stopDay = +userDataStorage.userDate.split('-')[2];
            let stopMonth = +userDataStorage.userDate.split('-')[1];
            let stopYear = +userDataStorage.userDate.split('-')[0];

            let dateStopSmoking = new Date(stopYear, stopMonth - 1, stopDay);

            goTimer();
            timerStatisticTime = setInterval(goTimer, 1000); /* Запускаем таймер статистики */

            function goTimer() {

                if (userDataStorage && userDataStorage.soundSpaUser) {
                    timerTick = setTimeout(playSoundTick, 1000)
                }

                let timeNow = new Date();
                let sumDay = Math.floor((timeNow - dateStopSmoking) / 1000 / 60 / 60 / 24);
                let sumHour = Math.floor((timeNow - dateStopSmoking) / 1000 / 60 / 60 - sumDay * 24);
                let sumMin = Math.floor((timeNow - dateStopSmoking) / 1000 / 60 - sumDay * 24 * 60 - sumHour * 60);
                let sumSec = Math.floor((timeNow - dateStopSmoking) / 1000 - sumDay * 24 * 60 * 60 - sumHour * 60 * 60 - sumMin * 60);
                let sumYear = Math.floor(sumDay / 365);
                let dayWithYear = sumDay - sumYear * 365;

                myModuleView.renderStatisticTime(sumYear, dayWithYear, sumHour, sumMin, sumSec);
            }

            goTimerCig();
            timerStatisticOther = setInterval(goTimerCig, 300000); /* Запускаем таймер статистики */

            function goTimerCig() {

                let timeNow = new Date();
                let sumSecFull = Math.floor((timeNow - dateStopSmoking) / 1000);
                let timeOneCigarette = Math.floor(24 * 60 * 60 / userDataStorage.userNumCigarette);
                let sumFullCigarette = Math.floor(sumSecFull / timeOneCigarette);
                let nicotineMg = Math.floor(sumFullCigarette * 0.6);
                let resinMg = Math.floor(sumFullCigarette * 5);

                let costOneCigarette = userDataStorage.userCostCigarette / userDataStorage.cigarettesInBlock;
                let costFullCigarette = Math.floor(costOneCigarette * sumFullCigarette);
                let costOneMonth = Math.floor(userDataStorage.userNumCigarette * 30 / userDataStorage.cigarettesInBlock * userDataStorage.userCostCigarette);
                let costOneYear = costOneMonth * 12;

                let freeTimeMinFull = 4 * sumFullCigarette; /* Всего минут */
                let freeTimeHourFull = Math.floor(freeTimeMinFull / 60); /* Всего часов */
                let freeTimeMin = freeTimeMinFull - 60 * freeTimeHourFull; /* минут с учетом часов */
                let freeTimeDayFull = Math.floor(freeTimeHourFull / 24); /* Всего дней */
                let freeTimeHour = freeTimeHourFull - 24 * freeTimeDayFull; /* часов с учетом дней */
                let addTimeMinFull = 5.5 * sumFullCigarette;
                let addTimeHourFull = Math.floor(addTimeMinFull / 60);
                let addTimeMin = Math.floor(addTimeMinFull - 60 * addTimeHourFull);
                let addTimeDayFull = Math.floor(addTimeHourFull / 24);
                let addTimeHour = addTimeHourFull - 24 * addTimeDayFull;

                myModuleView.renderStatisticCig(sumFullCigarette, costFullCigarette, freeTimeDayFull, freeTimeHour, freeTimeMin, nicotineMg, resinMg, costOneMonth, costOneYear, addTimeDayFull, addTimeHour, addTimeMin);
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
        }


        this.showMoreInfo = function(parent, btn) {

            myModuleView.renderMoreInfo(parent, btn);
        }


        this.getFutbol = function() {

            myModuleView.renderFutbolLoader();

            let apiQuery = `https://api-football-standings.azharimm.site/leagues/${userDataStorage.typeFutbolUser}/standings?season=2021&sort=asc`;

            fetch(apiQuery, {method: 'get'})
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data.data);
                    myModuleView.renderFutbol(data, placeChampionFut);
                })
                .catch((error) => console.error("Ошибка получения футбола. Причина: " + error));
        }


        this.getWeather = function() {

            // navigator.geolocation.getCurrentPosition(success);
            // function success(pos) {
            //     var crd = pos.coords;
            //     console.log('Ваше текущее местоположение:');
            //     console.log(`Широта: ${crd.latitude}`);
            //     console.log(`Долгота: ${crd.longitude}`);
            //     console.log(`Плюс-минус ${crd.accuracy} метров.`);
            // }

            myModuleView.renderWeatherLoader();

            let apiUrl = "https://api.openweathermap.org/data/2.5/";
            let apiKey = "bdcb6183108ed3f3e6d230300e66ca2f";
            let apiQuery = apiUrl+"/weather?id=" + userDataStorage.typeWeatherUser + "&units=metric&lang=ru&appid="+apiKey;

            fetch(apiQuery, {method: 'get'})
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data.data);
                    myModuleView.renderWeather(data);
                })
                .catch((error) => console.error("Ошибка получения погоды. Причина: " + error));
        }


        this.getCurrency = function() {

            myModuleView.renderCurrency();
        }


        this.changeCurrency1 = function(inputCurrency1, inputCurrency2, selectCurrency1, selectCurrency2) {

            let apiQuery = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${selectCurrency1.value}/${selectCurrency2.value}.json`;

            fetch(apiQuery, {method: 'get'})
                .then((response) => response.json())
                .then((data) => {
                    // console.log('первый');
                    myModuleView.renderCurrencyInput1(Math.round(data[selectCurrency2.value] * inputCurrency1.value / 0.001) * 0.001);
                })
                .catch((error) => console.error("Ошибка получения валюты. Причина: " + error));
        }


        this.changeCurrency2 = function(inputCurrency1, inputCurrency2, selectCurrency1, selectCurrency2) {

            let apiQuery = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${selectCurrency2.value}/${selectCurrency1.value}.json`;

            fetch(apiQuery, {method: 'get'})
                .then((response) => response.json())
                .then((data) => {
                    // console.log('второй');
                    myModuleView.renderCurrencyInput2(Math.round(data[selectCurrency1.value] * inputCurrency2.value / 0.001) * 0.001);
                })
                .catch((error) => console.error("Ошибка получения валюты. Причина: " + error));
        }


        this.getFutbolFoward = function() {

            placeChampionFut++;
            if (placeChampionFut === 20) placeChampionFut = 0;
            this.getFutbol();
        }


        this.getFutbolBack = function() {

            placeChampionFut--;
            if (placeChampionFut === -1) placeChampionFut = 19;
            this.getFutbol();
        }


        this.showMessageChat = function() {

            myModuleView.showMessageChat();
        }


        this.checkInput = function(inputName, inputDate, inputNumCigs, inputCostCigs, inputCigsInBlock) {

            let stateBtn = !(inputName && inputDate && inputNumCigs && inputCostCigs && inputCigsInBlock);
            myModuleView.btnUpdate(stateBtn);
        }


        this.sendMessageChat = function(inputChat) {

            updatePassword = Math.random();
            $.ajax( {
                    url : ajaxHandlerScript,
                    type : 'POST', dataType:'json',
                    data : { f : 'LOCKGET', n : stringName,
                        p : updatePassword },
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
                    if (callresult.result != "") { // либо строка пустая - сообщений нет
                        // либо в строке - JSON-представление массива сообщений
                        messages = JSON.parse(callresult.result);
                        // вдруг кто-то сохранил мусор вместо SASHA1_CHAT_MESSAGES?
                        if (!Array.isArray(messages))
                            messages = [];
                    }

                    let senderName = userDataStorage.userName;
                    // let message = document.getElementById('IMess').value;
                    let message = inputChat.value;
                    if (message === '') message = '/тут должен быть текст/';
                    let timeNow = ` [${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]`;
                    let messageAll = message + timeNow;
                    messages.push( { name:senderName, mess:messageAll } );
                    if (messages.length > 10)
                        messages = messages.slice(messages.length - 10);

                    that.showMessagesForChat();

                    $.ajax( {
                            url : ajaxHandlerScript,
                            type : 'POST', dataType:'json',
                            data : { f : 'UPDATE', n : stringName,
                                v : JSON.stringify(messages), p : updatePassword },
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


        this.updateMessageChat = function() {

            // получает сообщения с сервера и потом показывает
            $.ajax( {
                    url : ajaxHandlerScript,
                    type : 'POST', dataType:'json',
                    data : { f : 'READ', n : stringName },
                    cache : false,
                    success : readReady,
                    error : errorHandler
                }
            );

            function readReady(callresult) { // сообщения получены - показывает
                if (callresult.error != undefined)
                    alert(callresult.error);
                else {
                    messages=[];
                    if (callresult.result != "") { // либо строка пустая - сообщений нет
                        // либо в строке - JSON-представление массива сообщений
                        messages = JSON.parse(callresult.result);
                        // вдруг кто-то сохранил мусор вместо LOKTEV_CHAT_MESSAGES?
                        if (!Array.isArray(messages))
                            messages = [];
                    }
                    that.showMessagesForChat();
                }
            }
        }


        this.showMessagesForChat = function() {

            var str = '';
            for (var m = 0; m < messages.length; m++) {
                var message = messages[m];
                str+="<b>"+escapeHTML(message.name) + ":</b> "
                    + escapeHTML(message.mess) + "<br/>";
            }

            myModuleView.renderChat(str);

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


        this.getAdviceUser = function() {

            let randomNumberAdvice = randomDiap(0, numDiap);

            myModuleView.renderAdviceUser(advice[randomNumberAdvice]);

            advice.splice(randomNumberAdvice, 1);
            --numDiap;
        }


        this.getFactsUser = function() {

            let randomNumberFacts = randomDiap(0, numDiapF);

            myModuleView.renderFactsUser(facts[randomNumberFacts]);

            facts.splice(randomNumberFacts, 1);
            --numDiapF;
        }


        this.setActiveBtn = function(activeBtn) {

            myModuleView.renderActiveBtn(activeBtn);
        }


        function playSound() {
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

        function randomDiap(n, m) {
            return Math.floor(Math.random() * (m - n + 1)) + n;
        }

        function errorHandler(jqXHR, statusStr, errorStr) {
            alert(statusStr+' '+errorStr);
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
                setMaxDate();
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
                const typeSoccer = myModuleContainer.querySelector(`option[value="${userStorage.typeFutbolUser}"]`);
                typeSoccer.selected='true';
                const typeWeather = myModuleContainer.querySelector(`option[value="${userStorage.typeWeatherUser}"]`);
                typeWeather.selected='true';
                let soundSpa = myModuleContainer.querySelector('#content #sound');
                soundSpa.checked = userStorage.soundSpaUser;
                setMaxDate();
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

            function setMaxDate() {

                let currentYear = new Date().getFullYear();
                let currentDay = new Date().getDate();
                if (currentDay < 10) currentDay = '0' + currentDay;
                let currentMonth = new Date().getMonth() + 1;
                if (currentMonth < 10) currentMonth = '0' + currentMonth;
                let dateLimit = `${currentYear}-${currentMonth}-${currentDay}`;
                const userStopSmok = myModuleContainer.querySelector(`.input__date-last`);
                userStopSmok.setAttribute('max', dateLimit);
            }

        }


        this.updateButtons = function(currentPage) {

            const menuLinks = menu.querySelectorAll(".mainmenu__link");

            for (let link of menuLinks) {
                currentPage === link.getAttribute("href").slice(1) ? link.classList.add("active") : link.classList.remove("active");
            }
        }


        this.renderStatisticTime = function(sumYear, dayWithYear, sumHour, sumMin, sumSec) {

            const sumTimeStop = myModuleContainer.querySelector("#content .sum__time__stop");

            if (sumSec < 10) sumSec = '0' + sumSec;
            if (sumMin < 10) sumMin = '0' + sumMin;
            if (sumHour < 10) sumHour = '0' + sumHour;

            if (sumYear > 0) sumTimeStop.innerHTML = `<span>${sumYear}</span> г <span>${dayWithYear}</span> дн <span>${sumHour}</span> ч <span>${sumMin}</span> мин <span>${sumSec}</span> сек`
            else sumTimeStop.innerHTML = `<span>${dayWithYear}</span> дн <span>${sumHour}</span> ч <span>${sumMin}</span> мин <span>${sumSec}</span> сек`;
        }


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

            function outNum(num, elem, unit) {
                let n = 0;
                let time = 0;
                if (num < 150) time = 2000;
                else time = 50;
                let t = Math.round(time/(num/step));
                let interval = setInterval(() => {
                        n = n + step;
                        if(n === num) clearInterval(interval);
                        elem.innerHTML = `<span>${n}</span> ${unit}`;
                    }, t);
            }

            outNum(sumFullCigarette, sumCigarette, 'шт');
            outNum(costFullCigarette, sumMoney, 'руб');

            freeTime.innerHTML = `<span>${freeTimeDayFull}</span> дн <span>${freeTimeHour}</span> ч <span>${freeTimeMin}</span> мин`;
            nicotine.innerHTML = nicotineMg + 'мг';
            resin.innerHTML = resinMg + 'мг';
            month.innerHTML = costOneMonth;
            year.innerHTML = costOneYear;
            addHealth.innerHTML = `+<span>${addTimeDayFull}</span> дн <span>${addTimeHour}</span> ч <span>${addTimeMin}</span> мин`;
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

            stateHeart.innerHTML = `<strong class="percent-H">${heart}%</strong>`;
            stateCarbonMonoxide.innerHTML = `<strong class="percent-H">${carbonMonoxide}%</strong>`;
            stateNicotine.innerHTML = `<strong class="percent-H">${nicotine}%</strong>`;
            stateSmell.innerHTML = `<strong class="percent-H">${smell}%</strong>`;
            stateLung.innerHTML = `<strong class="percent-H">${lung}%</strong>`;
            stateLiver.innerHTML = `<strong class="percent-H">${liver}%</strong>`;
            stateRiskHeart.innerHTML = `<strong class="percent-H">${riskHeart}%</strong>`;
            stateRiskCancer.innerHTML = `<strong class="percent-H">${riskCancer}%</strong>`;

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

            setTimeout(showChart, 200)
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


        this.renderMoreInfo = function(parent, btn) {

            parent.classList.toggle('wrap__more');
            btn.classList.toggle('arrow__click');
        }


        this.renderFutbol = function(data, placeChampionFut) {

            placeChampion = placeChampionFut;

            let loader = myModuleContainer.querySelector('#loader');
            loader.style.display = "none";
            let futbolLeagueWrap = myModuleContainer.querySelector('#content .futbol_wrap');
            futbolLeagueWrap.style.display = "block";

            const league = myModuleContainer.querySelector('#content .futbol-league .league');
            const icon = myModuleContainer.querySelector('#content .futbol-league .icon');
            const team = myModuleContainer.querySelector('#content .futbol-league .team');
            const teamPlace = myModuleContainer.querySelector('#content .futbol-league .team-place');
            const matches = myModuleContainer.querySelector('#content .futbol-league .matches');
            const stats = myModuleContainer.querySelector('#content .futbol-league .stats');

            league.innerHTML = `<h3>${data.data.name}</h3>`;
            icon.innerHTML = `<img src="${data.data.standings[placeChampion].team.logos[0].href}" height="80" width="auto">`;
            team.innerHTML = `${data.data.standings[placeChampion].team.location}`;
            teamPlace.innerHTML = `<span>Место в турнире: ${data.data.standings[placeChampion].stats[8].value}</span> <span>Очки: ${data.data.standings[placeChampion].stats[6].value}</span>`;
            matches.innerHTML = `<h4>Сыграно матчей: ${data.data.standings[placeChampion].stats[3].value}<h4><h4>Забитых голов: ${data.data.standings[placeChampion].stats[4].value}</h4> <h4>Пропущенных голов: ${data.data.standings[placeChampion].stats[5].value}</h4>`;
            stats.innerHTML = `<h4>Побед: ${data.data.standings[placeChampion].stats[0].value}</h4> <h4>Поражений: ${data.data.standings[placeChampion].stats[1].value}</h4> <h4>Ничей: ${data.data.standings[placeChampion].stats[2].value}</h4>`;
        }


        this.renderCurrency = function() {

            // placeChampion = placeChampionFut;

            // let loader = myModuleContainer.querySelector('#loader');
            // loader.style.display = "none";
            const futbolLeague = myModuleContainer.querySelector('#content .futbol-league');
            futbolLeague.style.display = "none";
            const nowWeather = myModuleContainer.querySelector('#content #forecast-now');
            nowWeather.style.display = "none";
            let currencyExchange = myModuleContainer.querySelector('#content #currency-exchange');
            currencyExchange.style.display = "block";

            // const league = myModuleContainer.querySelector('#content .futbol-league .league');
            // const icon = myModuleContainer.querySelector('#content .futbol-league .icon');
            // const team = myModuleContainer.querySelector('#content .futbol-league .team');
            // const teamPlace = myModuleContainer.querySelector('#content .futbol-league .team-place');
            // const matches = myModuleContainer.querySelector('#content .futbol-league .matches');
            // const stats = myModuleContainer.querySelector('#content .futbol-league .stats');
            //
            // league.innerHTML = `<h3>${data.data.name}</h3>`;
            // icon.innerHTML = `<img src="${data.data.standings[placeChampion].team.logos[0].href}" height="80" width="auto">`;
            // team.innerHTML = `${data.data.standings[placeChampion].team.location}`;
            // teamPlace.innerHTML = `<span>Место в турнире: ${data.data.standings[placeChampion].stats[8].value}</span> <span>Очки: ${data.data.standings[placeChampion].stats[6].value}</span>`;
            // matches.innerHTML = `<h4>Сыграно матчей: ${data.data.standings[placeChampion].stats[3].value}<h4><h4>Забитых голов: ${data.data.standings[placeChampion].stats[4].value}</h4> <h4>Пропущенных голов: ${data.data.standings[placeChampion].stats[5].value}</h4>`;
            // stats.innerHTML = `<h4>Побед: ${data.data.standings[placeChampion].stats[0].value}</h4> <h4>Поражений: ${data.data.standings[placeChampion].stats[1].value}</h4> <h4>Ничей: ${data.data.standings[placeChampion].stats[2].value}</h4>`;
        }


        this.renderCurrencyInput1 = function(resultCurrency) {

            let inputCurrency2 = myModuleContainer.querySelector("#currency-exchange .input_res-currency");
            inputCurrency2.value = resultCurrency;
        }


        this.renderCurrencyInput2 = function(resultCurrency) {

            let inputCurrency1 = myModuleContainer.querySelector("#currency-exchange .input_sum-currency");
            inputCurrency1.value = resultCurrency;
        }


        this.renderWeather = function(data) {

            let loaderW = myModuleContainer.querySelector('#loader-W');
            loaderW.style.display = "none";
            let weatherWrap = myModuleContainer.querySelector('#content .forecast_wrap');
            weatherWrap.style.display = "block";

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

            function round(value, decimals) {
                return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
            }
        }


        this.renderFutbolLoader = function() {

            let weatherWrap = myModuleContainer.querySelector('#content #forecast-now');
            weatherWrap.style.display = "none";
            let currencyExchange = myModuleContainer.querySelector('#content #currency-exchange');
            currencyExchange.style.display = "none";
            const futbolLeague = myModuleContainer.querySelector('#content .futbol-league');
            futbolLeague.style.display = "block";
            const loader = myModuleContainer.querySelector('#loader');
            loader.style.display = "block";
            const futbol = myModuleContainer.querySelector('#content .futbol_wrap');
            futbol.style.display = "none";
        }


        this.renderWeatherLoader = function() {

            let futbolLeagueWrap = myModuleContainer.querySelector('#content .futbol-league');
            futbolLeagueWrap.style.display = "none";
            let currencyExchange = myModuleContainer.querySelector('#content #currency-exchange');
            currencyExchange.style.display = "none";
            const nowWeather = myModuleContainer.querySelector('#content #forecast-now');
            nowWeather.style.display = "block";
            const loaderW = myModuleContainer.querySelector('#loader-W');
            loaderW.style.display = "block";
            const weather = myModuleContainer.querySelector('#content .forecast_wrap');
            weather.style.display = "none";
        }


        this.btnUpdate = function(stateBtn) {

            const buttonSave = myModuleContainer.querySelector('#content .data__save');
            buttonSave.disabled = stateBtn;
        }


        this.validDate = function(checkData) { /* Показываем валидацию данных */

            let validDate = myModuleContainer.querySelector("#content .valid-value");
            validDate.style.display = '';

            if (checkData) validDate.innerHTML = 'Данные <br> сохранены!';
            else validDate.innerHTML = 'Введите <br> корректно <br> данные!';

            setTimeout(function() {
                validDate.style.display = 'none';
            }, 1500)
        }


        this.showMessageChat = function() {

            let chatSpa = myModuleContainer.querySelector("#content .chat-spa");
            chatSpa.style.display = 'block';
            let adviceSpa = myModuleContainer.querySelector("#content .advice-spa");
            adviceSpa.style.display = 'none';
            let factsSpa = myModuleContainer.querySelector("#content .facts-spa");
            factsSpa.style.display = 'none';
        }


        this.renderChat = function(str) {

            let chatBorder = myModuleContainer.querySelector(".chat-spa .chat-border");
            chatBorder.innerHTML = str;
            let messageChat = myModuleContainer.querySelector(".chat-spa .message-chat");
            messageChat.value = '';
        }


        this.renderAdviceUser = function(textAdvice) {

            let adviceSpa = myModuleContainer.querySelector("#content .advice-spa");
            adviceSpa.style.display = 'block';
            let chatSpa = myModuleContainer.querySelector("#content .chat-spa");
            chatSpa.style.display = 'none';
            let factsSpa = myModuleContainer.querySelector("#content .facts-spa");
            factsSpa.style.display = 'none';
            let messageAdvice = myModuleContainer.querySelector(".advice-spa div");
            messageAdvice.innerHTML = textAdvice;
            if (!textAdvice) {
                messageAdvice.style.color = 'red';
                messageAdvice.innerHTML = 'Советы закончились! Заходите позже!';
            }
        }


        this.renderFactsUser = function(textFacts) {

            let factsSpa = myModuleContainer.querySelector("#content .facts-spa");
            factsSpa.style.display = 'block';
            let chatSpa = myModuleContainer.querySelector("#content .chat-spa");
            chatSpa.style.display = 'none';
            let adviceSpa = myModuleContainer.querySelector("#content .advice-spa");
            adviceSpa.style.display = 'none';

            let messageFacts = myModuleContainer.querySelector(".facts-spa div");
            messageFacts.innerHTML = textFacts;
            if (!textFacts) {
                messageFacts.style.color = 'red';
                messageFacts.innerHTML = 'Факты закончились! Заходите позже!';
            }
        }


        this.renderActiveBtn = function(activeBtn) {

            let buttonAll = myModuleContainer.querySelectorAll("#content > section > button");
            buttonAll.forEach(elem => elem.style.backgroundColor = '#919191');
            activeBtn.style.backgroundColor = '#303030'
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

                if (e.target.getAttribute('class') === 'fas fa-angle-double-down' || e.target.getAttribute('class') === 'fas fa-angle-double-down arrow__click') {

                    that.showMoreInfo(e.target.parentNode, e.target);
                }

                if (e.target.getAttribute('class') === 'btn-futbol') {

                    that.showFutbol();
                    that.setActiveBtn(e.target);
                }

                if (e.target.getAttribute('class') === 'btn-weather') {

                    that.showWeather();
                    that.setActiveBtn(e.target);
                }

                if (e.target.getAttribute('class') === 'fas fa-chevron-right' || e.target.getAttribute('class') === 'btn-futbol-foward') {

                    that.showFutbolFoward();
                }

                if (e.target.getAttribute('class') === 'fas fa-chevron-left' || e.target.getAttribute('class') === 'btn-futbol-back') {

                    that.showFutbolBack();
                }

                if (e.target.getAttribute('class') === 'far fa-envelope') {

                    that.sendMessageChat();
                }

                if (e.target.getAttribute('class') === 'btn-chat') {

                    that.showMessageChat();
                    that.setActiveBtn(e.target);
                }

                if (e.target.getAttribute('class') === 'fas fa-cloud-upload-alt') {

                    that.updateMessageChat();
                }

                if (e.target.getAttribute('class') === 'btn-advice') {

                    that.getAdviceUser();
                    that.setActiveBtn(e.target);
                }

                if (e.target.getAttribute('class') === 'btn-facts') {

                    that.getFactsUser();
                    that.setActiveBtn(e.target);
                }

                if (e.target.getAttribute('class') === 'btn-currency') {

                    that.showCurrency();
                    that.setActiveBtn(e.target);
                }
            }
        }


        this.updateState = function() {

            const hashPageName = location.hash.slice(1).toLowerCase(); /* Линк после # */

            myModuleModel.updateState(hashPageName);
            that.checkInputChange();
        }


        this.saveDataUser = function() { /* Сохраняем данные из инпутов в localStorage */

            // inputName = myModuleContainer.querySelector(".input__default");
            // inputDate = myModuleContainer.querySelector(".input__date-last");
            // inputNumCig = myModuleContainer.querySelector(".input__num-cigarette");
            // inputCostCig = myModuleContainer.querySelector(".input__cost-cigarette");
            // myModuleModel.saveData(inputName.value, inputDate.value, inputNumCig.value, inputCostCig.value);

            let inputData = myModuleContainer.querySelectorAll("#content input");
            let typeFutbol = myModuleContainer.querySelector('#type-futbol');
            let typeCity = myModuleContainer.querySelector('#type-city');
            let soundSpa = myModuleContainer.querySelector('#content #sound');

            myModuleModel.saveData(inputData, typeFutbol, typeCity, soundSpa);
            that.checkInputChange();
        }


        this.clearData = function() { /* Очищаем данные из localStorage */

            myModuleModel.clearData();
            that.checkInputChange();
        }


        this.showMoreInfo = function(parent, btn) {

            myModuleModel.showMoreInfo(parent, btn);
        }


        this.showFutbol = function() {

            myModuleModel.getFutbol();
        }

        this.showWeather = function() {

            myModuleModel.getWeather();
        }


        this.showFutbolFoward = function() {

            myModuleModel.getFutbolFoward();
        }


        this.showFutbolBack = function() {

            myModuleModel.getFutbolBack();
        }


        this.checkInputChange = function() {

            let inputAll = myModuleContainer.querySelectorAll(".modal__content input");
            inputAll.forEach(elem => elem.addEventListener('input', checkChangeInput));

            function checkChangeInput(e) {

                e.preventDefault();
                myModuleModel.checkInput(inputAll[0].value, inputAll[1].value, inputAll[2].value, inputAll[3].value, inputAll[4].value);
            }
        }


        this.showMessageChat = function() {

            myModuleModel.showMessageChat();
            myModuleModel.updateMessageChat();

            let inputChat = myModuleContainer.querySelector(".chat-spa input");
            inputChat.addEventListener('keyup', pressEnterHandler);

            function pressEnterHandler(e) {
                if (e.code === 'Enter') that.sendMessageChat();
            }
        }


        this.sendMessageChat = function() {

            let inputChat = myModuleContainer.querySelector(".chat-spa .message-chat");
            myModuleModel.sendMessageChat(inputChat);
        }


        this.updateMessageChat = function() {

            myModuleModel.updateMessageChat();
        }


        this.getAdviceUser = function() {

            myModuleModel.getAdviceUser();
        }


        this.getFactsUser = function() {

            myModuleModel.getFactsUser();
        }


        this.setActiveBtn = function(activeBtn) {

            myModuleModel.setActiveBtn(activeBtn);
        }


        this.showCurrency = function() {

            myModuleModel.getCurrency();

            let inputCurrency1 = myModuleContainer.querySelector("#currency-exchange .input_sum-currency");
            inputCurrency1.addEventListener('input', inputHandler1);

            let inputCurrency2 = myModuleContainer.querySelector("#currency-exchange .input_res-currency");
            inputCurrency2.addEventListener('input', inputHandler2);

            let selectCurrency1 = myModuleContainer.querySelector("#currency-exchange #currency-1");
            selectCurrency1.addEventListener('click', inputHandler1);

            let selectCurrency2 = myModuleContainer.querySelector("#currency-exchange #currency-2");
            selectCurrency2.addEventListener('click', inputHandler1);

            function inputHandler1() {
                myModuleModel.changeCurrency1(inputCurrency1, inputCurrency2, selectCurrency1, selectCurrency2);
            }
            function inputHandler2() {
                myModuleModel.changeCurrency2(inputCurrency1, inputCurrency2, selectCurrency1, selectCurrency2);
            }
            inputHandler1();
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
