/* ------- view CANVAS -------- */

function ClockViewCanvas() {

    let clockContainer = null;
    let myClock = null;
    let ctx = null;
    let startBtn = null;
    let stopBtn = null;


    this.init = function(field) {

        clockContainer = field;
        myClock = clockContainer.querySelector('.clock');
        ctx = myClock.getContext("2d");
    }


    this.drawNumbers = function(left, top, clock) { /* Рисуем цифры часов */

        // xxxx();
        //
        //
        // setInterval(xxxx, 1000);
        //
        // function xxxx() {
        //
        //
        //
        //
        //
        //     ctx.strokeStyle = "#55b155";
        //     ctx.fillStyle = "#55b155";
        //
        //     ctx.beginPath();
        //     ctx.arc(left+167.5, top+167.5, 22.5, 0, 2*Math.PI);
        //     ctx.fill();
        //     ctx.stroke();
        //
        //
        //     ctx.font = "20px Georgia";
        //     ctx.strokeStyle = "black";
        //     ctx.fillStyle = "black";
        //
        //     ctx.fillText(clock, left+160,  top+171);
        // }





    }


    this.drawHands = function() { /* Рисуем стрелки */



    }


    this.drawButtons = function(city, timezone) { /* Создаем кнопки СТАРТ и СТОП */

        let header = document.createElement('div');
        header.style.cssText = `position: absolute;
                                top: 25px;
                                left: 15px;
                                width: 340px;
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

        // DRAW ORANGE BACKGROUND
        ctx.strokeStyle = "#fdc45d";
        ctx.fillStyle = "#fdc45d";
        ctx.lineCap = "round";


        ctx.beginPath();
        ctx.arc(150, 150, 150, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        let angle = 30;
        let clockFirst = 1;
        let centerOfClockX = 5;
        let centerOfClockY = 5;
        let radius = 120;
        let diamOfNumber = 45;


        //DRAW NUMBERS

        for (let i = 0; i < 12; i++) {


            let angleRadians = parseFloat(parseFloat(angle))/180*Math.PI;
            let greenCenterX = centerOfClockX+radius*Math.sin(angleRadians);
            let greenCenterY = centerOfClockY-radius*Math.cos(angleRadians);

            let numberLeft = Math.round(greenCenterX-diamOfNumber/2);
            let numberTop = Math.round(greenCenterY-diamOfNumber/2);

            ctx.strokeStyle = "#55b155";
            ctx.fillStyle = "#55b155";

            ctx.beginPath();
            ctx.arc(numberLeft+167.5, numberTop+167.5, 22.5, 0, 2*Math.PI);
            ctx.fill();
            ctx.stroke();


            ctx.font = "20px Georgia";
            ctx.strokeStyle = "black";
            ctx.fillStyle = "black";

            ctx.fillText(clockFirst, numberLeft+160,  numberTop+171);

            clockFirst++;
            angle += 30;
        }

        ctx.save();



        //SECONDS

        let secondHandRadians = seconds*(Math.PI/180) + Math.PI;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.save();

        ctx.translate(145, 150);

        ctx.rotate(secondHandRadians);

        ctx.moveTo(0, 0);
        ctx.lineTo(0, 125);
        ctx.stroke();
        ctx.restore();



        //MINUTES

        let minuteHandRadians = minutes*(Math.PI/180)+3.14;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.save();

        ctx.translate(145, 150);

        ctx.rotate(minuteHandRadians);

        ctx.moveTo(0, 0);
        ctx.lineTo(0, 110);
        ctx.stroke();
        ctx.restore();



        //HOURS

        let hourHandRadians = hours * (Math.PI/180)+3.14;
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.save();

        ctx.translate(145, 150);

        ctx.rotate(hourHandRadians);

        ctx.moveTo(0, 0);
        ctx.lineTo(0, 75);
        ctx.stroke();
        ctx.restore();

        ctx.restore();





    }


    this.updateStateBtn = function (stateBtnStop, stateBtnStart) { /* Обновляем состояние кнопок */

        stopBtn.disabled = stateBtnStop;
        startBtn.disabled = stateBtnStart;
    }

}