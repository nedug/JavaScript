
const MyPlugin = (function() {

    /* -------  model ------- */

    function ModalModel () {

        let myModalView = null;


        this.init = function(view) { /* Получаем View */

            myModalView = view;
        }


        this.openModal = function(container, tittle, content, buttonCloseNew) { /* Открываем модальное окно */

            if (container && !tittle && !content) { /* Первое модально окно */

                myModalView.showModal1(container);
            }

            if (container && tittle && content) { /* Второе модально окно */

                myModalView.showModal2(container, tittle, content);
            }

            if (!container && tittle && content) { /* Третье модально окно */

                myModalView.showModal3(tittle, content, buttonCloseNew);
            }

        }


        this.closeModal = function(container) { /* Закрываем модальное окно */

            myModalView.hide(container);
        }
    }




    /* ------- view -------- */

    function ModalView() {

        let myModalOverlay = null;
        let modalNew = null;


        this.init = function() {

            myModalOverlay = document.querySelector('.modal-overlay');
        }


        this.showModal1 = function (container) { /* Открываем модальное окно */

            myModalOverlay.classList.remove('modal_closed');
            container.classList.remove('modal_closed');
            container.classList.remove('modal_closed');

        }


        this.showModal2 = function (container, tittle, content) { /* Открываем модальное окно */

            myModalOverlay.classList.remove('modal_closed');
            container.classList.remove('modal_closed');

            const headerText = container.querySelector(".header-text");
            const contentText = container.querySelector(".content-text");

            headerText.innerHTML = `<h2>${tittle}<h2>`;
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


        this.hide = function (container) { /* Закрываем модальное окно */

            myModalOverlay.classList.add('modal_closed');

            if (container) {
                container.classList.add('modal_closed');
            }

            else {
                modalNew.classList.add('modal_closed');
            }
        }
    }




    /* ----- controller ---- */

    function ModalController () {

        let myModalModel = null;
        let that = this;
        let container = null;


        this.init = function(model) { // получаем кнопки и вешаем обработчики

            myModalModel = model;

            const buttonOpen = document.querySelectorAll('[data-supermodal]');
            buttonOpen.forEach(elem => elem.addEventListener('click', that.openModal));
        }


        this.openModal = function (e) { /* Открываем модальное окно */

            e.preventDefault();

            let element = e.target;
            container = document.getElementById(element.dataset.supermodal);

            if (
                container &&
                !element.hasAttribute("data-supermodal-title") &&
                !element.hasAttribute("data-supermodal-content")) {

                myModalModel.openModal(container);

                const buttonClose = container.querySelector(".modal__close");
                buttonClose.addEventListener("click", that.hideModal);


            } else if (
                container &&
                element.hasAttribute("data-supermodal-title") &&
                element.hasAttribute("data-supermodal-content")
            ) {

                myModalModel.openModal(container, element.dataset.supermodalTitle, element.dataset.supermodalContent);

                const buttonClose = container.querySelector(".modal__close");
                buttonClose.addEventListener("click", that.hideModal);

            } else if (
                !container &&
                element.hasAttribute("data-supermodal") &&
                element.hasAttribute("data-supermodal-title") &&
                element.hasAttribute("data-supermodal-content")
            ) {

                let buttonCloseNew = document.createElement("a");
                buttonCloseNew.addEventListener("click", that.hideModal);

                myModalModel.openModal(container, element.dataset.supermodalTitle, element.dataset.supermodalContent, buttonCloseNew);
            }
        }


        this.hideModal = function (e) { /* Закрываем модальное окно */

            e.preventDefault();

            myModalModel.closeModal(container);
        }
    }



    return {

        version: "0.0.1",

        init: function() {

            this.main();

            const appModalModel = new ModalModel();
            const appModalView = new ModalView();
            const appModalController = new ModalController();

            appModalModel.init(appModalView);
            appModalView.init();
            appModalController.init(appModalModel);
        },

        main: function () {

            console.log(`Modal plugin (v${this.version}) was initialized.`);
        },
    }
}());



MyPlugin.init(); //инициализируем модуль с нужным контейнером