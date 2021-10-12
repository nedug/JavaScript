(function() {
    /* ------- begin view -------- */
    function ModalView() {
        let myModal = null;
        let myModalNew = null;

        const modalOverlay = document.getElementById("modal-overlay");
        const buttonSave = document.getElementById("modal-save");
        const inputAll = document.querySelectorAll("#name, #birth-day, #birth-month, #birth-year");
        const headerTitle = document.querySelector("header h2");
        const headerTitleGuest = document.querySelector(".title-guest");
        const modalContent = document.querySelectorAll(".form-field");
        const modalContentGuest = document.querySelector(".content-guest");
        const footer = document.querySelector("footer");

        this.init = function(modalContainer) {
            myModal = modalContainer;
        };

        this.showModal1 = function() {
            modalOverlay.classList.remove("modal_closed");
            myModal.classList.remove("modal_closed");
        };

        this.showModal2 = function(title, content) {
            modalOverlay.classList.remove("modal_closed");
            myModal.classList.remove("modal_closed");

            headerTitleGuest.innerHTML = title;
            modalContentGuest.innerHTML = content;

            for (i = 0; i < modalContent.length; i++) {
                modalContent[i].classList.add("modal_closed");
            }
            headerTitle.classList.add("modal_closed");
            footer.classList.add("modal_closed");
        };

        this.showModal3 = function(title, content) {
            modalOverlay.classList.remove("modal_closed");

            myModalNew = document.createElement("div");
            myModalNew.classList.add("modal");
            myModalNew.style.height = "488px";
            document.body.append(myModalNew);

            let myModalNewHeader = document.createElement("header");
            myModalNewHeader.style.padding = "10px 15px";

            let myModalNewHeaderTxt = document.createElement("h2");
            myModalNewHeaderTxt.innerHTML = title;
            myModalNewHeader.append(myModalNewHeaderTxt);

            myModalNew.append(myModalNewHeader);

            let myModalNewContent = document.createElement("iframe");
            myModalNewContent.setAttribute("src", content);
            myModalNewContent.classList.add("modal_iframe");
            myModalNewContent.setAttribute("frameborder", 0);
            myModalNew.append(myModalNewContent);
        };        

        this.hide = function() {
            myModal.classList.add("modal_closed");
            modalOverlay.classList.add("modal_closed");

            if (myModalNew) {
                myModalNew.classList.add("modal_closed");
            }

            headerTitleGuest.innerHTML = "";
            modalContentGuest.innerHTML = "";

            for (i = 0; i < modalContent.length; i++) {
                modalContent[i].classList.remove("modal_closed");
            }
            headerTitle.classList.remove("modal_closed");
            footer.classList.remove("modal_closed");
        };

        this.clearViewData = function() {
            inputAll.forEach(element => element.value = "");
        };

        this.disButtonSave = function(state) {
            buttonSave.disabled = state;
        };
    }
    /* -------- end view --------- */

    /* ------- begin model ------- */
    function ModalModel () {
        let myModalView = null;
        let userData = {};

        this.init = function(view) {
            myModalView = view;
        };

        this.openModal = function(modal, valueTitle, valueContent) {

            if (modal && !valueTitle && !valueContent) {
                myModalView.showModal1();
                myModalView.disButtonSave(true);
            }

            if (modal && valueTitle && valueContent) {
                myModalView.showModal2(valueTitle, valueContent);
            }

            if (!modal && valueTitle && valueContent) {
                myModalView.showModal3(valueTitle, valueContent);
            }
        };

        this.closeModal = function() {
            myModalView.hide();
        };

        this.saveModalData = function(val1, val2, val3, val4) {              
            userData.name = val1;
            userData.day = val2;
            userData.month = val3;
            userData.year = val4;
            this.storeData();
        };

        this.storeData = function() {//сохранить данные в localStorage, а если не доступно, то в cookies
            if (this.checkStorage()) {
                localStorage.setItem("user IT-COM", JSON.stringify(userData));
                myModalView.hide();
            } else {
                let name = "user IT-COM";
                let value = JSON.stringify(userData);
                document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
                myModalView.hide();
            }
        };

        this.clearForm = function() {
            myModalView.clearViewData();
        };

        this.checkInputValue = function(val1, val2, val3, val4) {
            if (val1 && val2 && val3 && val4) {
                myModalView.disButtonSave(false);
            } else {
                myModalView.disButtonSave(true);
            }
        };

        this.checkStorage = function() {
            try {
                localStorage.setItem("test", "test");
                localStorage.removeItem("test");
                return true;
            }
            catch(e) {
                return false;
            }
        };
    }
    /* -------- end model -------- */

    /* ----- begin controller ---- */
    function ModalController () {
        let myModalModel = null;
        const that = this;

        const inputName = document.getElementById("name");
        const inputDay = document.getElementById("birth-day");
        const inputMonth = document.getElementById("birth-month");
        const inputYear = document.getElementById("birth-year");

        this.init = function(model, container) { //получаем кнопки и вешаем обработчики
            myModalModel = model;
            myModalContainer = container;
        
            myModalContainer.addEventListener("input", this.checkInputValue);          
            document.addEventListener("click", this.makeModal);            
        };

        this.makeModal = function(event) {
            const elemLink = event.target.closest("[data-supermodal]");

            if (elemLink) {
                let valueDataId = elemLink.dataset.supermodal;
                let valueDataTitle = elemLink.dataset.supermodalTitle;
                let valueDataContent = elemLink.dataset.supermodalContent;
                let modal = document.getElementById(valueDataId);

                myModalModel.openModal(modal, valueDataTitle, valueDataContent);
            }

            if (event.target.closest("#modal-save")) {
                that.saveModal();
            }

            if ((event.target.closest("#modal-close")) || 
                (event.target.closest("#modal-cancel")) || 
                (event.target.closest("#modal-overlay"))) {
                    myModalModel.closeModal();
                }
        };        

        this.saveModal = function() {
            myModalModel.saveModalData(inputName.value, inputDay.value, inputMonth.value, inputYear.value);
            myModalModel.closeModal();
            myModalModel.clearForm();
        }

        this.checkInputValue = function() {
            myModalModel.checkInputValue(inputName.value, inputDay.value, inputMonth.value, inputYear.value);
        };
    }
    /* ------ end controller ----- */

    // глобальная инициализация
    const appModalModel = new ModalModel();
    const appModalView = new ModalView();
    const appModalController = new ModalController();

    //вызвать init-методы...
    const modalContainer = document.getElementById("modal");
    
    appModalModel.init(appModalView);
    appModalView.init(modalContainer);
    appModalController.init(appModalModel, modalContainer);

}());