/* ------- view SVG -------- */

function ClockViewSvg() {

    const svgNS = "http://www.w3.org/2000/svg";

    let clockContainer = null;
    let myClock = null;
    let startBtn = null;
    let stopBtn = null;


    this.init = function(field) {

        clockContainer = field;
        myClock = clockContainer.querySelector('.clock');

        let clockSvgCenter = document.createElementNS(svgNS,"circle");
        clockSvgCenter.setAttributeNS(null,"cx", 145);
        clockSvgCenter.setAttributeNS(null,"cy", 150);
        clockSvgCenter.setAttributeNS(null,"r", 5);
        clockSvgCenter.setAttributeNS(null,"fill","black");
        clockSvgCenter.setAttributeNS(null,"stroke","none");
        myClock.append(clockSvgCenter);

    }

    this.drawNumbers = function(left, top, clock) {


        let number = document.createElementNS(svgNS, "circle");
        number.setAttributeNS(null,"cx", left+162.5);
        number.setAttributeNS(null,"cy", top+165);
        number.setAttributeNS(null,"r", 22.5);
        number.setAttributeNS(null,"fill","green");



        let text = document.createElementNS(svgNS, "text");

        text.textContent = clock;
        text.setAttributeNS(null,"x", left+162.5-9);
        text.setAttributeNS(null,"y", top+165+5);
        text.setAttributeNS(null,"fill","black");
        myClock.append(number);

        myClock.append(text);

    }


    this.drawHands = function() {

        let secondHand = document.createElementNS(svgNS, 'line');
        secondHand.setAttributeNS(null,"x1", 145);
        secondHand.setAttributeNS(null,"x2", 145);
        secondHand.setAttributeNS(null,"y1", 150);
        secondHand.setAttributeNS(null,"y2", 25);
        secondHand.setAttributeNS(null,"stroke", "black");
        secondHand.setAttributeNS(null,"stroke-width", 2);
        secondHand.setAttribute("class", "secondHand_");
        secondHand.setAttributeNS(null,"transform-origin", 145, 150, 0);
        secondHand.setAttributeNS(null,"transform", "rotate(0)");
        myClock.append(secondHand);


        let minuteHand = document.createElementNS(svgNS, 'line');
        minuteHand.setAttributeNS(null,"x1", 145);
        minuteHand.setAttributeNS(null,"x2", 145);
        minuteHand.setAttributeNS(null,"y1", 150);
        minuteHand.setAttributeNS(null,"y2", 50);
        minuteHand.setAttributeNS(null,"stroke", "black");
        minuteHand.setAttributeNS(null,"stroke-width", 4);
        minuteHand.setAttribute("class", "minuteHand_");
        minuteHand.setAttributeNS(null,"transform-origin", 145, 150, 0);
        minuteHand.setAttributeNS(null,"transform", "rotate(0)");

        myClock.append(minuteHand);

        let hourHand = document.createElementNS(svgNS, 'line');
        hourHand.setAttributeNS(null,"x1", 145);
        hourHand.setAttributeNS(null,"x2", 145);
        hourHand.setAttributeNS(null,"y1", 150);
        hourHand.setAttributeNS(null,"y2", 70);
        hourHand.setAttributeNS(null,"stroke", "black");
        hourHand.setAttributeNS(null,"stroke-width", 6);
        hourHand.setAttribute("class", "hourHand_");
        hourHand.setAttributeNS(null,"transform-origin", 145, 150, 0);
        hourHand.setAttributeNS(null,"transform", "rotate(0)");

        myClock.append(hourHand);

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



    this.changeGMT = function(timezone){

        if(timezone<0){
            let arrCities = ["London", "Reykjavik", "Azores", "Rio de Janeiro", "New York", "Mexico", "Calgary", "Seattle", "Unalaska", "Taiohao", "Pappeete", "Honolulu"];

            myField.querySelector('h3').textContent = "SVG "+arrCities[timezone*(-1)]+" GMT "+timezone;

        } else {
            let arrCities = ["London", "Berlin", "Budapest", "Moscow", "Karachi", "Ekaterinburg", "Novosibirsk", "Pekin", "Tokio", "Canberra", "Vellington", "Anadir"];

            myField.querySelector('h3').textContent = "SVG "+arrCities[timezone]+" GMT+ "+timezone;

        }
    }


    this.startClock = function(seconds, minutes, hours, timerID){
        let stopBtn = clockContainer.querySelector('.stop');
        stopBtn.value = timerID;
        //console.log(seconds, minutes, hours)

        let secondHand = "rotate(" + (seconds + 180) + "deg)";

        let minuteHand = "rotate(" + (minutes + 180) + "deg)";
        let hourHand = "rotate(" + (hours + 180) + "deg)";
        clockContainer.querySelector('.secondHand_').style.transform = "rotate(" + seconds + "deg)";
        clockContainer.querySelector('.minuteHand_').style.transform = "rotate(" + minutes + "deg)";
        clockContainer.querySelector('.hourHand_').style.transform = "rotate(" + hours + "deg)";
    }



    this.updateStateBtn = function (stateBtnStop, stateBtnStart) { /* Обновляем состояние кнопок */

        stopBtn.disabled = stateBtnStop;
        startBtn.disabled = stateBtnStart;
    }

}


