/* ------- view CANVAS -------- */

function ClockViewCanvas() {

    let clockContainer = null;
    let myClock = null;
    let ctx = null;
    let startBtn = null;
    let stopBtn = null;

    // let leftNum = null;
    // let topNum = null;
    // let clockNum = null;

    let objNum = {};


    this.init = function(field) {

        clockContainer = field;
        myClock = clockContainer.querySelector('.clock');
        ctx = myClock.getContext("2d");
    }


    this.drawNumbers = function(left, top, clock) { /* Сохраняем положение цифр часов в объект objNum */

        let arrNum = [];
        arrNum[0] = left;
        arrNum[1] = top;

        objNum[clock] = arrNum;


        // console.log(objNum);


        // leftNum = left;
        // topNum = top;
        // clockNum = clock;

        // console.log(leftNum);
        // console.log(topNum);
        // console.log(clockNum);



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


    this.startClock = function(seconds, minutes, hours) { /* Запускаем часы CANVAS */

        ctx.strokeStyle = "#fdc45d"; /* Отображаем контейнер часов */
        ctx.fillStyle = "#fdc45d";
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.arc(150, 150, 150, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();


        for (let i = 1; i <= 12; i++) { /* Отображаем цифры часов */

            ctx.strokeStyle = "#55b155";
            ctx.fillStyle = "#55b155";

            ctx.beginPath();
            ctx.arc(objNum[i][0] + 167.5, objNum[i][1] + 167.5, 22.5, 0, 2*Math.PI);
            ctx.fill();
            ctx.stroke();


            ctx.font = "20px Georgia";
            ctx.strokeStyle = "black";
            ctx.fillStyle = "black";

            ctx.fillText(i, objNum[i][0] + 160,  objNum[i][1] + 171);
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