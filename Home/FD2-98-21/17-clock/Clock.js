/* -------  model ------- */

function Clock() {

    let clockView = null;
    let clockGoTimer = null;

    let angle = 30; /* Параметры и размеры часов */
    let clockFirst = 1;
    let centerOfClockX = 5;
    let centerOfClockY = 5;
    let radius = 120;
    let diamOfNumber = 45;


    this.init = function(view) {

        clockView = view;
    }


    this.drawNumbers = function() { /* Рисуем циферблат */

        for (let i = 0; i < 12; i++) {

            let angleRadians = angle / 180 * Math.PI;
            let greenCenterX = centerOfClockX + radius * Math.sin(angleRadians);
            let greenCenterY = centerOfClockY - radius * Math.cos(angleRadians);

            let numberLeft = Math.round(greenCenterX - diamOfNumber / 2);
            let numberTop = Math.round(greenCenterY - diamOfNumber / 2);

            clockView.drawNumbers(numberLeft, numberTop, clockFirst)

            clockFirst++;
            angle += 30;
        }
    }


    this.drawHands = function(city, timezone) { /* Рисуем стрелки */

        clockView.drawHands(city, timezone);
    }


    this.startClock = function(timezone) { /* Запускам часы */

        goClock(); /* Отображение текущего времени при загрузке страницы */

        clockGoTimer = setInterval(goClock, 1000); /* Запускаем часы */

        function goClock() {

            let soonSeconds = new Date().getUTCSeconds();
            let soonMinutes = new Date().getUTCMinutes();
            let soonHour = new Date().getUTCHours() + timezone;

            let secondHand = soonSeconds * 6; /* Поворот секундой стрелки */
            let minuteHand = soonMinutes * 6; /* Поворот минутной стрелки */
            let hourHand = soonHour * 30 + soonMinutes / 2; /* Поворот часовой стрелки */

            clockView.startClock(secondHand, minuteHand, hourHand);
        }
    }


    this.stopClock = function() { /* Останавливаем часы */

        clearInterval(clockGoTimer);
    }

}