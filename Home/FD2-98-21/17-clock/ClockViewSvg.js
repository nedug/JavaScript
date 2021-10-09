/* ------- view SVG -------- */

function ClockViewSvg() {

    const svgNS = "http://www.w3.org/2000/svg";

    let clockContainer = null;
    let myClock = null;
    let startBtn = null;
    let stopBtn = null;
    let secondHand = null;
    let minuteHand = null;
    let hourHand = null;


    this.init = function(field) {

        clockContainer = field;
        myClock = clockContainer.querySelector('.clock');

    }


    this.drawNumbers = function(left, top, clock) { /* Рисуем циферблат часов */

        let number = document.createElementNS(svgNS, "circle"); /* зеленые круги */
        number.setAttributeNS(null,"cx", left + 167);
        number.setAttributeNS(null,"cy", top + 167);
        number.setAttributeNS(null,"r", 22.5);
        number.setAttributeNS(null,"fill","#55b155");
        myClock.append(number);

        let text;
        if (clock < 10) { /* цифры */
            text = document.createElementNS(svgNS, "text");
            text.textContent = clock;
            text.setAttributeNS(null,"x", left + 161);
            text.setAttributeNS(null,"y", top + 171);
            text.setAttributeNS(null,"fill","black");
            text.setAttributeNS(null,"font-size","20");
        }
        else {
            text = document.createElementNS(svgNS, "text");
            text.textContent = clock;
            text.setAttributeNS(null,"x", left + 157);
            text.setAttributeNS(null,"y", top + 171);
            text.setAttributeNS(null,"fill","black");
            text.setAttributeNS(null,"font-size","20");
        }
        myClock.append(text);
    }


    this.drawHands = function() { /* Рисуем стрелки */

        secondHand = document.createElementNS(svgNS, 'line');
        secondHand.setAttributeNS(null,"x1", 145);
        secondHand.setAttributeNS(null,"x2", 145);
        secondHand.setAttributeNS(null,"y1", 150);
        secondHand.setAttributeNS(null,"y2", 20);
        secondHand.setAttributeNS(null,"stroke", "black");
        secondHand.setAttributeNS(null,"stroke-width", 2);
        secondHand.setAttributeNS(null,"transform-origin", 145, 150, 0);
        secondHand.setAttributeNS(null,"transform", "rotate(0)");
        myClock.append(secondHand);

        minuteHand = document.createElementNS(svgNS, 'line');
        minuteHand.setAttributeNS(null,"x1", 145);
        minuteHand.setAttributeNS(null,"x2", 145);
        minuteHand.setAttributeNS(null,"y1", 150);
        minuteHand.setAttributeNS(null,"y2", 35);
        minuteHand.setAttributeNS(null,"stroke", "black");
        minuteHand.setAttributeNS(null,"stroke-width", 5);
        minuteHand.setAttributeNS(null,"transform-origin", 145, 150, 0);
        minuteHand.setAttributeNS(null,"transform", "rotate(0)");
        myClock.append(minuteHand);

        hourHand = document.createElementNS(svgNS, 'line');
        hourHand.setAttributeNS(null,"x1", 145);
        hourHand.setAttributeNS(null,"x2", 145);
        hourHand.setAttributeNS(null,"y1", 150);
        hourHand.setAttributeNS(null,"y2", 70);
        hourHand.setAttributeNS(null,"stroke", "black");
        hourHand.setAttributeNS(null,"stroke-width", 8);
        hourHand.setAttributeNS(null,"transform-origin", 145, 150, 0);
        hourHand.setAttributeNS(null,"transform", "rotate(0)");
        myClock.append(hourHand);

        let clockSvgCenter = document.createElementNS(svgNS,"circle");
        clockSvgCenter.setAttributeNS(null,"cx", 145);
        clockSvgCenter.setAttributeNS(null,"cy", 150);
        clockSvgCenter.setAttributeNS(null,"r", 6);
        clockSvgCenter.setAttributeNS(null,"fill","black");
        clockSvgCenter.setAttributeNS(null,"stroke","none");
        myClock.append(clockSvgCenter);
    }


    this.drawButtons = function(city, timezone) { /* Создаем кнопки СТАРТ и СТОП */

        let header = document.createElement('div');
        header.style.cssText = `position: absolute;
                                top: 25px;
                                left: 50px;
                                width: 310px;
                                display: flex;`;
        clockContainer.append(header);


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

        secondHand.style.transform = `rotate(${seconds}deg)`;
        minuteHand.style.transform = `rotate(${minutes}deg)`;
        hourHand.style.transform = `rotate(${hours}deg)`;
    }


    this.updateStateBtn = function (stateBtnStop, stateBtnStart) { /* Обновляем состояние кнопок */

        stopBtn.disabled = stateBtnStop;
        startBtn.disabled = stateBtnStart;
    }

}


