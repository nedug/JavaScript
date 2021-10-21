(function () {
// model
function Model(view) {
    var objUser = null;
    var userData = null;
    var outputValue = null;

    this.userData = {
        name: null,
        day: null,
        month: null,
        year: null,
    };

    this.openModal = function(modal, modal_overlay, titles, messages) {
        view.showModal(modal, modal_overlay, titles, messages);
    }

    this.generateModal = function(id, title, message) {
        view.generateViewModal(id, title, message);
    }

    this.closeModal = function(modal, modal_overlay) {
        view.hideModal(modal, modal_overlay);
        this.outputFromLocalStorage();
    }

    this.sendtoLocalStorage = function() {
        let userDataObj = {
            name: this.userData.name,
            day: this.userData.day,
            month: this.userData.month,
            year: this.userData.year
        };
        objUser = localStorage.setItem('information', JSON.stringify(userDataObj));
    }
    this.outputFromLocalStorage = function() {
        outputValue = JSON.parse(window.localStorage.getItem('information'));
        if (outputValue) {
            view.show(outputValue);
        }
    }
};


// view
function View(func) {
    var wrapper = null;
    this.renderFunct = func;

    this.show = function(outputValue) {
        var outputValue = outputValue;

        if (!wrapper) {

            wrapper = document.createElement('div');
            wrapper.id = "wraperId";
            var wrapercontainer = document.querySelector('#wraper');
            wrapercontainer.appendChild(wrapper);
        }
        wrapper.innerHTML = `<p id="outName"> Привет,${outputValue.name}</p><p id="outBirth" >Да, у тебя ДР ${outputValue.day}/ ${outputValue.month}/${outputValue.year}</p><p><a href="#" id="clearData" onclick="view.clearLocalStorage()">Очистить данные</a></p>`;
    }

    this.showModal = function(modal, modal_overlay, titles, messages) {
        var modal = modal;
        var modal_overlay = modal_overlay;
        modal.classList.remove('modal_closed');
        modal_overlay.classList.remove('modal_closed');
        var headerText = document.querySelector('.mod-title');
        headerText.innerHTML = `${titles}`;
        var bodyText = document.querySelector('.body-text');
        bodyText.innerHTML = `${messages}`;
    }

    this.hideModal = function(modal, modal_overlay) {
        var modal = modal;
        var modal_overlay = modal_overlay;
        modal.classList.add('modal_closed');
        modal_overlay.classList.add('modal_closed');
        this.clearModal();

    }

    this.generateViewModal = function(id, title, message) {

        this.renderFunct(id, title, message);
    }

    this.clearModal = function() {
        var input = document.getElementsByTagName('input');
        for (var i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    }

    this.clearLocalStorage = function() {
        localStorage.clear();
        wrapper.innerHTML = 'Данные отсутствуют';
    }
};


// controller
function Controller(model) {
    var modal;

    var modal_overlay = document.querySelector(' .modal-overlay');
    var btncloseModal = document.querySelector(' .modal__close');

    this.handlerControllerOpen = function(target) {
        var target = event.target;

        if (target.getAttribute('data-supermodal-title') && target.getAttribute('data-supermodal-content') && target.getAttribute('data-supermodal')) {

            var title = target.getAttribute('data-supermodal-title');
            var message = target.getAttribute('data-supermodal-content');
            var id = target.getAttribute('data-supermodal');
            model.generateModal(id, title, message);
            modal = document.getElementById(id);
            model.openModal(modal, modal_overlay);

        }

        if (target.getAttribute('data-supermodal-title') && target.getAttribute('data-supermodal-content') && !target.hasAttribute('data-supermodal')) {
            modal = document.querySelector('.thanks');
            var titles = target.getAttribute('data-supermodal-title');
            var messages = target.getAttribute('data-supermodal-content');
            model.openModal(modal, modal_overlay, titles, messages);

        }

        if (target.getAttribute('data-supermodal') && !target.hasAttribute('data-supermodal-title')) {
            var id = target.getAttribute('data-supermodal');
            modal = document.getElementById(id);
            model.openModal(modal, modal_overlay);
        }
    }

    this.handlerControllerClose = function() {
        model.closeModal(modal, modal_overlay);
    }


    this.handlerControllerSave = function(inputNameValue, inputBirthDayValue, inputBirthMonthValue, inputBirthYearValue) {

        model.userData.name = inputNameValue;
        model.userData.day = inputBirthDayValue;
        model.userData.month = inputBirthMonthValue;
        model.userData.year = inputBirthYearValue;

        if (model.userData.name == "") {
            alert('Введите Ваше имя');
            return;
        }

        if (model.userData.day == "" || model.userData.month == "" || model.userData.year == "") {
            alert('Введите полностью дату рождения');
            return;
        }
        model.sendtoLocalStorage();

    }

    var btncloseModal = document.querySelectorAll(' .modal__close'); //коллекция кнопок закрыть
    Array.from(btncloseModal).forEach(btn => btn.addEventListener('click', this.handlerControllerClose));
    var links = document.querySelector('.link-wrapper-container').getElementsByTagName('a'); //коллекция links
    Array.from(links).forEach(link => link.addEventListener('click', this.handlerControllerOpen)); //переводим к массиву и для каждого link вешаем событие click
}
    var modalApp = {
        init: function() {
                view = new View(createModal);
                model = new Model(view);
                controller = new Controller(model);


        }
    }
    modalApp.init();
})();
    
function createModal(id, title, message) {
    var body = document.querySelector('body');
    var modal_overlay = document.createElement('div');
    modal_overlay.classList.add('modal_overlay');
    modal_overlay.classList.add('modal_closed');
    modal_overlay.classList.add('overlay');
    body.appendChild(modal_overlay);

    var modal = document.createElement('div');
    modal.classList.add('modal');
    modal.classList.add('modal_closed');
    modal.id = id;

    var header = document.createElement('div');
    header.classList.add('modal__header');

    var exit = document.createElement('a');
    exit.classList.add('modal__close');
    exit.classList.add('close-add');
    exit.textContent = "Закрыть";
    exit.addEventListener('click', controller.handlerControllerClose);
    header.appendChild(exit);

    var h3 = document.createElement('h3');
    h3.classList.add('mod-title');
    h3.textContent = title;
    header.appendChild(h3);
    modal.appendChild(header);

    var main = document.createElement('div');
    main.classList.add('modal__content');

    var p = document.createElement('p');
    p.classList.add('body-text');
    p.textContent = message;
    main.appendChild(p);

    var divName = document.createElement('div');
    divName.classList.add('form-field');

    var labelName = document.createElement('label');
    labelName.setAttribute("for", "name");
    labelName.textContent = "Ваше имя:";
    divName.appendChild(labelName);

    var inputName = document.createElement('input');
    inputName.classList.add('input__default');
    inputName.setAttribute("type", "text");
    inputName.setAttribute("name", "name");
    divName.appendChild(inputName);

    main.appendChild(divName);

    var divBirthday = document.createElement('div');
    divBirthday.classList.add('form-field');

    var labelBirthday = document.createElement('label');
    labelBirthday.textContent = "Ваш день рождения:";
    divBirthday.appendChild(labelBirthday);

    var inputBirthDay = document.createElement('input');
    inputBirthDay.classList.add('input__date-birth');
    inputBirthDay.classList.add('birth-day');
    inputBirthDay.setAttribute("type", "text");
    inputBirthDay.setAttribute("name", "name");
    inputBirthDay.setAttribute("placeholder", "День");
    divBirthday.appendChild(inputBirthDay);

    var inputBirthMonth = document.createElement('input');
    inputBirthMonth.classList.add('input__date-birth');
    inputBirthMonth.classList.add('birth-month');
    inputBirthMonth.setAttribute("type", "text");
    inputBirthMonth.setAttribute("name", "name");
    inputBirthMonth.setAttribute("placeholder", "Месяц");
    divBirthday.appendChild(inputBirthMonth);

    var inputBirthYear = document.createElement('input');
    inputBirthYear.classList.add('input__date-birth');
    inputBirthYear.classList.add('birth-year');
    inputBirthYear.setAttribute("type", "text");
    inputBirthYear.setAttribute("name", "name");
    inputBirthYear.setAttribute("placeholder", "Год");
    divBirthday.appendChild(inputBirthYear);

    main.appendChild(divBirthday);
    modal.appendChild(main);

    var footer = document.createElement('div');
    footer.classList.add('modal__footer');

    var btnCancel = document.createElement('button');
    btnCancel.classList.add('modal__cancel');
    btnCancel.setAttribute("title", "Отмена");
    btnCancel.textContent = 'Отмена';
    btnCancel.addEventListener('click', controller.handlerControllerClose);
    footer.appendChild(btnCancel);

    var btnSave = document.createElement('button');
    btnSave.classList.add('modal__save');
    btnSave.setAttribute("title", "Сохранить");
    btnSave.textContent = 'Сохранить данные';
    btnSave.addEventListener('click', function() {
        var inputNameValue = inputName.value;
        var inputBirthDayValue = inputBirthDay.value;
        var inputBirthMonthValue = inputBirthMonth.value;
        var inputBirthYearValue = inputBirthYear.value;
        controller.handlerControllerSave(inputNameValue, inputBirthDayValue, inputBirthMonthValue, inputBirthYearValue)
    });

    footer.appendChild(btnSave);
    modal.appendChild(footer);
    body.appendChild(modal);
}