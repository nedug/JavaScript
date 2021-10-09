/* ----- controller ---- */

function ClockControllerButtons(timezone, city) {

    let clockModel = null;
    let clockContainer = null;


    this.init = function(model, field) {

        clockModel = model;
        clockContainer = field;

        clockModel.drawNumbers(); /* Рисуем цифры */
        clockModel.drawHands(city, timezone); /* Рисуем стрелки */
        clockModel.startClock(timezone); /* Запускаем часы при загрузке страницы */


        let stopBtn = clockContainer.querySelector('.stop');
        stopBtn.addEventListener('click', this.stop);

        let startBtn = clockContainer.querySelector('.start');
        startBtn.addEventListener('click', this.start);
    }


    this.stop = function() { /* Останавливаем часы по кнопке "СТОП" */

        clockModel.stopClock();
    }


    this.start = function() { /* Запускаем часы по кнопке "СТАРТ" */

        clockModel.startClock(timezone);
    }

}