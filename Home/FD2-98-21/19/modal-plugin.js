
const myPlugin = (function() {

    /* -------  model ------- */

    function ModalModel () {

        let myModalView = null;
        let userData = {};


        this.init = function(view) { /* Получаем View */

            myModalView = view;
        }


        this.openModal = function(modal, tittle, content, buttonCloseNew) { /* Открываем модальное окно */

            if (modal && !tittle && !content) { /* Первое модально окно */

                myModalView.showModal1();

                myModalView.btnUpdate(true);
            }

            if (modal && tittle && content) { /* Второе модально окно */

                myModalView.showModal2(tittle, content);
            }

            if (!modal && tittle && content) { /* Третье модально окно */

                myModalView.showModal3(tittle, content, buttonCloseNew);
            }
        }


        this.closeModal = function() { /* Закрываем модальное окно */

            myModalView.hide();
        }


        this.saveModalData = function(inputName, inputDay, inputMonth, inputYear) { // Получаем данные из модалки и сохраняем в объект 'userData'

            if (inputDay > 31 || inputDay < 1 || inputMonth > 12 || inputMonth < 1 || inputYear < 1 || inputYear > new Date().getFullYear()) { /* Проверка на корректность данных */

                myModalView.validDate(false);
                return;
            }

            userData = {

                userName: inputName,
                userDate: inputDay,
                userMonth: inputMonth,
                userYear: inputYear,
            }

            this.storeData(); /* Сохраняем данные в localStorage */

            myModalView.validDate(true);
        }


        this.storeData = function() { // Сохраняем данные в localStorage, а если не доступно, то в cookies

            if (('localStorage' in window) && (window.localStorage !== null)) {

                let userDataSerial = JSON.stringify(userData);

                localStorage.setItem('userData', userDataSerial);
            }

            else {

                setCookie('userData', userData);

                function setCookie(name, value, options = { path: '/' }) {

                    if (options.expires instanceof Date) {
                        options.expires = options.expires.toUTCString();
                    }

                    if (value instanceof Object) {
                        value = JSON.stringify(value);
                    }

                    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
                    for (let optionKey in options) {
                        updatedCookie += "; " + optionKey;
                        if (options[optionKey] !== true) {
                            updatedCookie += "=" + options[optionKey];
                        }
                    }
                    document.cookie = updatedCookie;
                }
            }

        }


        this.getData = function() { // Достаем данные из хранилища

            if (('localStorage' in window) && (window.localStorage !== null)) {

                userData = JSON.parse(localStorage.getItem('userData'));

                if (!userData) { /* Проверяем на наличие данных в localStorage */
                    console.error("Ошибка получения данных из модели!");
                    return;
                }
            }

            else {

                userData = getCookie('userData', json = true);

                if (!userData) { /* Проверяем на наличие данных в cookies */
                    console.error("Ошибка получения данных из модели!");
                    return;
                }

                function getCookie(name, json = false) {
                    if (!name) {
                        return undefined;
                    }
                    const regExpStr = "(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + "=([^;]*)";
                    let matches = document.cookie.match(new RegExp(regExpStr));
                    if (matches) {
                        let res = decodeURIComponent(matches[1]);
                        if (json) {
                            try {
                                return JSON.parse(res);
                            } catch (e) {}
                        }
                        return res;
                    }
                    return undefined;
                }
            }

            myModalView.printViewData(userData.userName, userData.userDate, userData.userMonth, userData.userYear); /* Передаем данные на отображение во View */
        }


        this.clearData = function() { // Очищаем данные в хранилище

            if (('localStorage' in window) && (window.localStorage !== null)) {

                localStorage.removeItem('userData');
            }

            else {

                deleteCookie('userData');

                function deleteCookie(name) {

                    setCookie(name, null, {
                        expires: new Date(),
                        path: '/'
                    });

                    function setCookie(name, value, options = { path: '/' }) {

                        if (options.expires instanceof Date) {
                            options.expires = options.expires.toUTCString();
                        }

                        if (value instanceof Object) {
                            value = JSON.stringify(value);
                        }

                        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
                        for (let optionKey in options) {
                            updatedCookie += "; " + optionKey;
                            if (options[optionKey] !== true) {
                                updatedCookie += "=" + options[optionKey];
                            }
                        }
                        document.cookie = updatedCookie;
                    }
                }
            }

            myModalView.clearViewData();
        }


        this.checkInput = function(inputName, inputDay, inputMonth, inputYear) { /* Проверяем состоянин кнопки 'Сохранить' */

            let stateBtn = !(inputName && inputDay && inputMonth && inputYear);

            myModalView.btnUpdate(stateBtn); /* Отображаем состояние кнопки 'Сохранить' */
        }
    }




    /* ------- view -------- */

    function ModalView() {

        let myModalContainer = null;
        let myModalOverlay = null;

        let buttonSave = null;
        let modalData = null;
        let clearData = null;
        let validDate = null;
        let modalNew = null;
        let valueHeader = null;
        let headerText = null;
        let valueFooter = null;
        let valueField = null;
        let contentText = null;


        this.init = function(field) {

            myModalContainer = field;

            myModalOverlay = document.querySelector('.modal-overlay');
            buttonSave = myModalContainer.querySelector(".modal__save");
            modalData = document.querySelector('.modal-data');
            clearData = document.querySelector('.clear-data');
            validDate = myModalContainer.querySelector(".valid-date");
            valueHeader = myModalContainer.querySelector("h2");
            valueFooter = myModalContainer.querySelector(".modal__footer");
            valueField = myModalContainer.querySelector(".modal__content");
            headerText = myModalContainer.querySelector(".header-text");
            contentText = myModalContainer.querySelector(".content-text");
        }


        this.showModal1 = function () { /* Открываем модальное окно */

            myModalContainer.classList.remove('modal_closed');
            myModalOverlay.classList.remove('modal_closed');
        }


        this.showModal2 = function (tittle, content) { /* Открываем модальное окно */

            myModalContainer.classList.remove('modal_closed');
            myModalOverlay.classList.remove('modal_closed');

            valueHeader.style.display = 'none';
            valueFooter.style.display = 'none';
            valueField.style.display = 'none';
            headerText.style.display = '';
            headerText.innerHTML = `<h2>${tittle}<h2>`;
            contentText.style.display = '';
            contentText.innerHTML = content;
        }


        this.showModal3 = function (tittle, content, buttonCloseNew) { /* Открываем модальное окно */

            myModalOverlay.classList.remove('modal_closed');

            modalNew = document.createElement("div");
            modalNew.classList.add("modal");
            modalNew.style.height = "500px";
            document.body.append(modalNew);

            const modalNewHeader = document.createElement("header");
            modalNewHeader.classList.add("modal__header");
            modalNew.append(modalNewHeader);

            const modalNewTittle = document.createElement("h2");
            modalNewTittle.innerHTML = tittle;
            modalNewHeader.append(modalNewTittle);

            modalNewHeader.append(buttonCloseNew);
            buttonCloseNew.classList.add("modal__close__new");

            const modalNewContent = document.createElement("iframe");
            modalNewContent.setAttribute("src", content);
            modalNewContent.classList.add("modal__new__content");
            modalNewContent.setAttribute("frameborder", 0);
            modalNew.append(modalNewContent);
        }


        this.hide = function () { /* Закрываем модальное окно */

            myModalContainer.classList.add('modal_closed');
            myModalOverlay.classList.add('modal_closed');

            if (modalNew) {
                modalNew.classList.add("modal_closed");
                valueHeader.style.display = '';
                valueFooter.style.display = '';
                valueField.style.display = '';
                headerText.style.display = 'none';
                contentText.style.display = 'none';
            }

            const inputName = myModalContainer.querySelector(".input__default");
            const inputBirth = myModalContainer.querySelectorAll(".input__date-birth");

            inputName.value = '';
            inputBirth.forEach(elem => elem.value = '');

            validDate.style.display = 'none';
        }


        this.printViewData = function (name, day, month, year) { // Выводим данные из хранилища в div.modal-data

            modalData.innerHTML = `<h3>Привет, ${name}!</h3><p>У тебя День Рождения ${day}/${month}/${year}</p>`;

            clearData.style.display = '';
        }


        this.clearViewData = function () { // очистить или выдать дефолтное сообщение только для div.modal-data

            modalData.innerHTML = `Данные отсутствуют...`;

            clearData.style.display = 'none';
        }


        this.btnUpdate = function (stateBtn) { /* Показываем состояние кнопки 'Сохранить данные' */

            buttonSave.disabled = stateBtn;
        }


        this.validDate = function (checkData) { /* Показываем валидацию данных */

            validDate.style.display = '';

            if (checkData) validDate.innerHTML = 'Данные сохранены!';
            else validDate.innerHTML = 'Введите корректно данные!';
        }
    }




    /* ----- controller ---- */

    function ModalController () {

        let myModalModel = null;
        let myModalContainer = null;

        let inputName = null;
        let inputBirth = null;
        let buttonCloseNew = null;


        this.init = function(model, field) { // получаем кнопки и вешаем обработчики

            myModalModel = model;
            myModalContainer = field;

            myModalModel.getData(); /* Проверка на наличие данных в localStorage или Cookies */

            myModalModel.checkInput(); /* Проверка состояния кнопки 'Сохранить данные' */


            const buttonOpen = document.querySelectorAll(".modal-open");
            buttonOpen.forEach(elem => elem.addEventListener('click', this.openModal));

            const buttonClose = myModalContainer.querySelector(".modal__close");
            buttonClose.addEventListener("click", this.hideModal);

            buttonCloseNew = document.createElement("a");
            buttonCloseNew.addEventListener("click", this.hideModal);

            const buttonCancel = myModalContainer.querySelector(".modal__cancel");
            buttonCancel.addEventListener("click", this.hideModal);

            const buttonSave = myModalContainer.querySelector(".modal__save");
            buttonSave.addEventListener("click", this.saveModal);

            const buttonClear = document.querySelector(".clear-data");
            buttonClear.addEventListener("click", this.clearData);

            inputName = myModalContainer.querySelector(".input__default");
            inputBirth = myModalContainer.querySelectorAll(".input__date-birth");

            inputName.addEventListener('input', checkChangeInput);
            inputBirth.forEach(elem => elem.addEventListener('input', checkChangeInput));


            function checkChangeInput(e) {

                e.preventDefault();

                myModalModel.checkInput(inputName.value, inputBirth[0].value, inputBirth[1].value, inputBirth[2].value);
            }
        }


        this.openModal = function (e) { /* Открываем модальное окно */

            e.preventDefault();

            const dataModalId = e.target.dataset.supermodal;
            const modal = document.getElementById(dataModalId);
            const dataModalTittle = e.target.dataset.supermodalTitle;
            const dataModalContent = e.target.dataset.supermodalContent;

            myModalModel.openModal(modal, dataModalTittle, dataModalContent, buttonCloseNew);
        }


        this.hideModal = function (e) { /* Закрываем модальное окно */

            e.preventDefault();

            myModalModel.closeModal();

            myModalModel.getData(); /* Здороваемся с пользователем если данные сохранены */
        }


        this.saveModal = function (e) { /* Сохраняем данные из инпутов в localStorage или Cookies */

            e.preventDefault();

            myModalModel.saveModalData(inputName.value, inputBirth[0].value, inputBirth[1].value, inputBirth[2].value);
        }


        this.clearData = function (e) { /* Очищаем данные из localStorage или Cookies */

            e.preventDefault();

            myModalModel.clearData();
        }
    }



    return {

        version: "0.0.1",

        init: function(containerElem) {

            this.main();

            const appModalModel = new ModalModel();
            const appModalView = new ModalView();
            const appModalController = new ModalController();

            //связываем части модуля
            appModalModel.init(appModalView);
            appModalView.init(containerElem);
            appModalController.init(appModalModel, containerElem);
        },

        main: function () {

            console.log(`Modal plugin (v${this.version}) was initialized.`);
        },
    }
}());



myPlugin.init(document.getElementById("modal")); //инициализируем модуль с нужным контейнером