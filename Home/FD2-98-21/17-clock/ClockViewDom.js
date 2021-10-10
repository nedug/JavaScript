/* ------- view DOM -------- */

function ClockViewDom() {

    let clockContainer = null;
    let myClock = null;
    let centerClock = null;
    let secondHand = null;
    let minuteHand = null;
    let hourHand = null;
    let startBtn = null;
    let stopBtn = null;


    this.init = function(field) {

        clockContainer = field;
        myClock = clockContainer.querySelector('.clock');
        centerClock = clockContainer.querySelector('.center');
    }


    this.drawNumbers = function(left, top, clock) { /* Рисуем цифры часов */

        let number = document.createElement('div');
        number.setAttribute("class", "green-number");
        centerClock.append(number);

        number.style.left = left + "px";
        number.style.top = top + "px";
        number.textContent = clock;
    }


    this.drawHands = function() { /* Рисуем стрелки */

        secondHand = document.createElement('div');
        secondHand.setAttribute("class", "second-hand");
        centerClock.append(secondHand);
        secondHand.style.transformOrigin = "0 0 0";

        minuteHand = document.createElement('div');
        minuteHand.setAttribute("class", "minute-hand");
        centerClock.append(minuteHand);
        minuteHand.style.transformOrigin = "2.5px 0 0";

        hourHand = document.createElement('div');
        hourHand.setAttribute("class", "hour-hand");
        centerClock.append(hourHand);
        hourHand.style.transformOrigin = "5px 5.25px 0";
    }


    this.drawButtons = function(city, timezone) { /* Создаем кнопки СТАРТ и СТОП */

        let header = document.createElement('div');
        header.style.cssText = `position: absolute;
                                top: -170px;
                                left: -150px;
                                width: 310px;
                                display: flex;`;
        centerClock.append(header);

        startBtn = document.createElement('button');
        startBtn.classList.add('start');
        startBtn.textContent = "START";
        header.append(startBtn);

        stopBtn = document.createElement('button');
        stopBtn.classList.add('stop');
        stopBtn.textContent = "STOP";
        header.append(stopBtn);

        let cityName = document.createElement('h3');
        if (timezone >= 0) cityName.textContent = `${city} (GMT+${timezone})`;
        else cityName.textContent = `${city} (GMT${timezone})`;
        cityName.style.cssText = `padding: 0; margin: 0;`;

        header.append(cityName);
    }


    this.startClock = function(seconds, minutes, hours) { /* Запускаем часы */

        secondHand.style.transform = `rotate(${seconds + 180}deg)`;
        minuteHand.style.transform = `rotate(${minutes + 180}deg)`;
        hourHand.style.transform = `rotate(${hours + 180}deg)`;
    }


    this.updateStateBtn = function (stateBtnStop, stateBtnStart) { /* Обновляем состояние кнопок */

        stopBtn.disabled = stateBtnStop;
        startBtn.disabled = stateBtnStart;
    }

}