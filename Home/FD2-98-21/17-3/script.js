function ClockViewDOM () {       //ViewDOM
    let element = null;
    let clock = null;
    let secondsArrow = document.createElement('div');
    let minuteArrow = document.createElement('div');
    let hourArrow = document.createElement('div');

    this.init = function (elem){
        element = elem;
    };

    this.createClock = function({radius, angle, clockFaceSize, numbersSize, hourArrowHeight, hourArrowWidth, minuteArrowHeight, minuteArrowWidth, secondsArrowHeight, secondsArrowWidth}){

        let clockFace = document.createElement('div');
        clockFace.classList.add('clock-face'); // создаем циферблат

        clock.appendChild(clockFace);

        clockFace.style.width = clockFaceSize +'px'; // устанавливаем размер циферблата
        clockFace.style.height = clockFaceSize +'px';

        let clockFaceCenterX = clockFace.offsetLeft + clockFace.offsetWidth / 2; // центр циферблата
        let clockFaceCenterY = clockFace.offsetTop + clockFace.offsetHeight / 2;

        for ( let i = 1; i <= 12; i++){

            let numX = clockFaceCenterX + radius * Math.sin((angle* i) / 180 * Math.PI) ; //центр цифр
            let numY = clockFaceCenterY - radius * Math.cos((angle * i) / 180 * Math.PI);

            let number = document.createElement('div');
            number.classList.add('number'); //див для цифр
            number.innerHTML = i;

            clock.appendChild(number)

            number.style.width = numbersSize +'px'; // устанавливаем размер кругов цифр
            number.style.height = numbersSize +'px';

            number.style.left = Math.round(numX - number.offsetWidth / 2)+"px";   //позиционирование относительно родителя
            number.style.top = Math.round(numY - number.offsetHeight / 2)+"px";

        }

        secondsArrow.classList.add('seconds-arrow');
        clock.appendChild(secondsArrow)

        secondsArrow.style.width = secondsArrowWidth + 'px'; // устанавливаем размер секундной стрелки
        secondsArrow.style.height = secondsArrowHeight / 2 + 'px';

        secondsArrow.style.left = clockFaceCenterX + "px";  //позиционируем стрелку
        secondsArrow.style.top = clockFaceCenterY - secondsArrowHeight / 2 + "px";

        minuteArrow.classList.add('minute-arrow');
        clock.appendChild(minuteArrow)

        minuteArrow.style.width = minuteArrowWidth + 'px'; // устанавливаем размер минутной стрелки
        minuteArrow.style.height = minuteArrowHeight  + 'px';

        minuteArrow.style.left = clockFaceCenterX + "px";  //позиционируем стрелку
        minuteArrow.style.top = clockFaceCenterY  - minuteArrowHeight / 2 + "px";

        hourArrow.classList.add('hour-arrow');
        clock.appendChild(hourArrow)

        hourArrow.style.width = hourArrowWidth +'px'; // устанавливаем размер часовой стрелки
        hourArrow.style.height = hourArrowHeight +'px';

        hourArrow.style.left = clockFaceCenterX  + "px";  //позиционируем стрелку
        hourArrow.style.top = clockFaceCenterY  - hourArrowHeight / 2 + "px";


        let timeZone = new Date().toString();     //часовой пояс
        let btns = document.createElement('div');
        btns.innerHTML = `<button class="start-button">Старт</button><button class="stop-button">Стоп</button> ${timeZone}`;
        clock.appendChild(btns)
        this.clockWork();
    };

    this.clockWork = function (){      //функция на часы
        let date = new Date();
        let sec = date.getSeconds();
        let min = date.getMinutes();
        let hour = date.getHours();
        let count = 270; // стрелки на 12

        secondsArrow.style.transformOrigin = `top left`;
        secondsArrow.style.transform = 'rotate('+ Number(count + (sec * 6)) +'deg)'; // 360гр / 60 сек = 6гр/сек

        minuteArrow.style.transformOrigin = `top left`;
        minuteArrow.style.transform = 'rotate('+ Number(count + (min * 6)) +'deg)'; // 360гр / 60 мин = 6гр/мин

        hourArrow.style.transformOrigin = `top left`;
        hourArrow.style.transform = 'rotate('+ Number(count + hour * 30 + (min / 2) ) +'deg)'; // 360гр / 12 ч = 30гр/час
    };

    let timer = setInterval(this.clockWork, 1000);

    this.buttonClick = function(status){
        (status) ? timer = (this.clockWork(), setInterval(this.clockWork, 1000)): clearInterval(timer)
    };
    this.setDiv= function(el){
        clock = el;
    }
};
function ViewSVG () {       //ViewSVG
    const svgNS = "http://www.w3.org/2000/svg";  //svg инструкции
    let model = null;
    let container = null;
    let clockFaceSiz = null;
    let secondsArrow = document.createElementNS(svgNS, "line"); //рисуем секундную стрелку
    let minuteArrow = document.createElementNS(svgNS, "line");  //рисуем минутную стрелку
    let hourArrow = document.createElementNS(svgNS, "line");    //рисуем часовую стрелку
    this.init = function (mod){
        model = mod;
    };
    this.createClock = function({radius, angle, clockFaceSize, numbersSize, hourArrowHeight, hourArrowWidth, minuteArrowHeight, minuteArrowWidth, secondsArrowHeight, secondsArrowWidth}){
        clockFaceSiz = clockFaceSize;
        let clock = document.createElementNS(svgNS, 'svg'); //первый парам оч важный!
        clock.setAttribute('height', clockFaceSize);
        clock.setAttribute('width', clockFaceSize); //создаем родительский див
        container.append(clock);

        let clockFace = document.createElementNS(svgNS,"circle");
        clockFace.setAttributeNS(null,"cx", clockFaceSize / 2);
        clockFace.setAttributeNS(null,"cy", clockFaceSize / 2);
        clockFace.setAttributeNS(null,"r", (clockFaceSize-1) / 2); // рисуем циферблат(-1 чтоб не выходил за границы)
        clockFace.setAttributeNS(null,"fill","none");
        clockFace.setAttributeNS(null,"stroke","black");
        clock.appendChild(clockFace);

        for (let i = 1; i <= 12; i++){

            let numX = clockFaceSize / 2 + radius * Math.sin((angle* i) / 180 * Math.PI) ; //центр цифр
            let numY = clockFaceSize / 2 - radius * Math.cos((angle * i) / 180 * Math.PI);

            let number = document.createElementNS(svgNS, "circle");
            number.setAttributeNS(null,"cx", numX);
            number.setAttributeNS(null,"cy", numY);
            number.setAttributeNS(null,"r", numbersSize / 2); // рисуем круги цифр
            number.setAttributeNS(null,"fill","none");
            number.setAttributeNS(null,"stroke","black");

            let count = document.createElementNS(svgNS, "text");
            count.setAttribute('x', numX);
            count.setAttribute('y', numY);
            count.setAttribute('fill', 'black'); //добавляем сами цифры
            count.setAttribute('text-anchor', 'middle'); //выравниваем по горизонтали
            count.setAttribute('alignment-baseline', 'middle'); //выравниваем по вертикали
            count.textContent = i;
            clock.appendChild(count);

            clock.appendChild(number)

        };

        secondsArrow.setAttribute('id', 'seconds-arrow');
        secondsArrow.setAttributeNS(null,"x1", clockFaceSize / 2);
        secondsArrow.setAttributeNS(null,"x2", clockFaceSize / 2);  //позиционируем
        secondsArrow.setAttributeNS(null,"y1", clockFaceSize / 2);
        secondsArrow.setAttributeNS(null,"y2", secondsArrowWidth + clockFaceSize / 2);
        secondsArrow.setAttributeNS(null,"stroke", "red");
        secondsArrow.setAttributeNS(null,"stroke-width", secondsArrowHeight);
        clock.appendChild(secondsArrow)
        minuteArrow.setAttribute('id', 'minute-arrow');
        minuteArrow.setAttributeNS(null,"x1", clockFaceSize / 2);
        minuteArrow.setAttributeNS(null,"x2", clockFaceSize / 2);   //позиционируем
        minuteArrow.setAttributeNS(null,"y1", clockFaceSize / 2);
        minuteArrow.setAttributeNS(null,"y2", minuteArrowWidth + clockFaceSize / 2);
        minuteArrow.setAttributeNS(null,"stroke", "dimgray");
        minuteArrow.setAttributeNS(null,"stroke-width", minuteArrowHeight);
        clock.appendChild(minuteArrow)
        hourArrow.setAttribute('id', 'hour-arrow');
        hourArrow.setAttributeNS(null,"x1", clockFaceSize / 2);
        hourArrow.setAttributeNS(null,"x2", clockFaceSize / 2); //позиционируем
        hourArrow.setAttributeNS(null,"y1", clockFaceSize / 2);
        hourArrow.setAttributeNS(null,"y2", hourArrowWidth + clockFaceSize / 2);
        hourArrow.setAttributeNS(null,"stroke", "black");
        hourArrow.setAttributeNS(null,"stroke-width", hourArrowHeight);
        clock.appendChild(hourArrow)

        let timeZone = new Date().toString();     //часовой пояс
        let btns = document.createElement('div');
        btns.innerHTML = `<button class="start-button">Старт</button><button class="stop-button">Стоп</button> ${timeZone}`;
        container.appendChild(btns)
        this.clockWork();
    };
    this.clockWork = function(){      //функция на часы
        let date = new Date();
        let sec = date.getSeconds();
        let min = date.getMinutes();
        let hour = date.getHours();
        let count = 180; // стрелки на 12

        secondsArrow.setAttributeNS(null,"transform", `rotate(${Number(count + (sec * 6))} ${clockFaceSiz / 2} ${clockFaceSiz / 2})`);
        minuteArrow.setAttributeNS(null,"transform", `rotate(${Number(count + (min * 6))} ${clockFaceSiz / 2} ${clockFaceSiz / 2})`);
        hourArrow.setAttributeNS(null,"transform", `rotate(${Number(count + (hour * 30 + (min / 2)) )} ${clockFaceSiz / 2} ${clockFaceSiz / 2})`);
    };
    this.timer = setInterval(this.clockWork, 1000);
    this.buttonClick = function(status){
        (status) ? this.timer = (this.clockWork(), setInterval(this.clockWork, 1000)): clearInterval(this.timer)
    };
    this.setDiv = function(el){
        container = el;
    };
};
function ViewCanvas () {       //ViewCanvas
    let element = null;
    let clock = null;
    let clockFace = document.createElement('canvas');   //создаем канвас
    let settings = {
        clockFaceSize : null,
        hourArrowHeight : null,
        hourArrowWidth : null,
        minuteArrowHeight : null,
        minuteArrowWidth : null,
        secondsArrowHeight : null,
        secondsArrowWidth : null,
        radius : null,
        angle : null,
        numbersSize : null
    }

    this.init = function (elem){
        element = elem;
    };

    this.createClock = function({radius, angle, clockFaceSize, numbersSize, hourArrowHeight, hourArrowWidth, minuteArrowHeight, minuteArrowWidth, secondsArrowHeight, secondsArrowWidth}){
        settings.radius = radius, settings.angle = angle, settings.clockFaceSize = clockFaceSize, settings.numbersSize = numbersSize,
            settings.hourArrowHeight = hourArrowHeight, settings.hourArrowWidth = hourArrowWidth, settings.minuteArrowHeight = minuteArrowHeight,
            settings.minuteArrowWidth = minuteArrowWidth, settings.secondsArrowHeight = secondsArrowHeight,settings.secondsArrowWidth = secondsArrowWidth;

        clockFace.setAttribute('width', clockFaceSize); //задаем аттрибуты
        clockFace.setAttribute('height', clockFaceSize);
        clock.appendChild(clockFace)

        let timeZone = new Date().toString();     //часовой пояс
        let btns = document.createElement('div');
        btns.innerHTML = `<button class="start-button">Старт</button><button class="stop-button">Стоп</button> ${timeZone}`;
        clock.appendChild(btns);
        this.clockWork();
    };
    this.clockWork = function(){      //функция на часы
        let date = new Date();
        let sec = date.getSeconds();
        let min = date.getMinutes();
        let hour = date.getHours();
        ctx = clockFace.getContext('2d');   //Контекст
        let clockFaceSize = settings.clockFaceSize, radius = settings.radius, angle = settings.angle,numbersSize = settings.numbersSize,
            hourArrowWidth = settings.hourArrowWidth, hourArrowHeight = settings.hourArrowHeight, minuteArrowWidth = settings.minuteArrowWidth, minuteArrowHeight = settings.minuteArrowHeight,
            secondsArrowWidth = settings.secondsArrowWidth, secondsArrowHeight = settings.secondsArrowHeight;
        function createClockFace(){
            ctx.restore();
            ctx.clearRect(0, 0, clockFaceSize, clockFaceSize)       //очищаем холст
            ctx.strokeStyle = 'black';
            ctx.fillStyle = 'white';    //рисуем круг
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(clockFaceSize / 2, clockFaceSize / 2, clockFaceSize / 2, 0, 2*Math.PI);
            ctx.fill();
            ctx.stroke();

            for (let i = 1; i <= 12; i++){  //цикл на добавление цифр и кругов

                let numX = clockFaceSize / 2 + radius * Math.sin((angle * i) / 180 * Math.PI) ; //центр цифр
                let numY = clockFaceSize / 2 - radius * Math.cos((angle * i) / 180 * Math.PI);

                ctx.strokeStyle = 'black';
                ctx.fillStyle = 'white';    //рисуем круг
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(numX, numY, numbersSize / 2, 0, 2*Math.PI);
                ctx.fill();
                ctx.stroke();
                ctx.font = "18px Verdana";
                ctx.fillStyle = 'black';    //добавляем цифры
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';    //ровняем в центр по верт и гориз
                ctx.fillText(i, numX, numY);
                ctx.save(); //сохраняем параметры
            };
        };

        ctx.restore();  //загружаем последние параметры
        createClockFace()   //вызываем функцию на отрисовку цифеблата
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'red';
        ctx.lineWidth = secondsArrowHeight; //рисуем сек стрелку

        ctx.beginPath()
        ctx.translate(clockFaceSize / 2, clockFaceSize / 2); // переходим в центр
        ctx.rotate((Math.PI / 180) * sec * 6); // вращаем
        ctx.translate(-clockFaceSize / 2, -clockFaceSize / 2); // возвращаем исходные значения
        ctx.moveTo(clockFaceSize / 2, clockFaceSize / 2);
        ctx.lineTo(clockFaceSize / 2 , clockFaceSize / 2 - secondsArrowWidth );
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();  //загружаем последние параметры

        ctx.strokeStyle = 'dimgray';
        ctx.fillStyle = 'dimgray';
        ctx.lineWidth = minuteArrowHeight;
        ctx.beginPath()     //рисуем мин стрелку
        ctx.translate(clockFaceSize / 2, clockFaceSize / 2); // переходим в центр
        ctx.rotate((Math.PI / 180) * min * 6); // вращаем
        ctx.translate(-clockFaceSize / 2, -clockFaceSize / 2); // возвращаем исходные значения
        ctx.moveTo(clockFaceSize / 2, clockFaceSize / 2);
        ctx.lineTo(clockFaceSize / 2 , clockFaceSize / 2 - minuteArrowWidth );
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();  //загружаем последние параметры

        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'black';
        ctx.lineWidth = hourArrowHeight;
        ctx.beginPath()     //рисуем час стрелку
        ctx.translate(clockFaceSize / 2, clockFaceSize / 2); // переходим в центр
        ctx.rotate((Math.PI / 180) * (hour * 30 + (min/2))); // вращаем
        ctx.translate(-clockFaceSize / 2, -clockFaceSize / 2); // возвращаем исходные значения
        ctx.moveTo(clockFaceSize / 2, clockFaceSize / 2);
        ctx.lineTo(clockFaceSize / 2 , clockFaceSize / 2  - hourArrowWidth );
        ctx.lineCap = 'round';
        ctx.stroke();
    };
    this.timer = setInterval(this.clockWork, 1000);

    this.setDiv = function(el){
        clock = el;
    };
    this.buttonClick = function(status){
        (status) ? (this.clockWork(), this.timer = setInterval(this.clockWork, 1000)): clearInterval(this.timer)
    };
};






function ClockModel () {     //Model
    let element = null,
        view = null,
        settings = {}; //обьект с настройками

    this.setSettings = function({_radius, _angle, _clockFaceSize, _numbersSize, _hourArrowHeight, _hourArrowWidth, _minuteArrowHeight, _minuteArrowWidth, _secondsArrowHeight, _secondsArrowWidth}){
        settings.radius = _radius,
            settings.angle = _angle,
            settings.clockFaceSize = _clockFaceSize,
            settings.numbersSize = _numbersSize,
            settings.hourArrowHeight = _hourArrowHeight,
            settings.hourArrowWidth = _hourArrowWidth,
            settings.minuteArrowHeight = _minuteArrowHeight,
            settings.minuteArrowWidth = _minuteArrowWidth,
            settings.secondsArrowHeight = _secondsArrowHeight,
            settings.secondsArrowWidth = _secondsArrowWidth;

        view.createClock(settings);
    };
    this.init = function (vie){
        view = vie;
    };

    this.buttonClick = function(status){ //пуш да баттон
        view.buttonClick(status);
    };
    this.setDiv = function(el){
        element = el;
        view.setDiv(element);
    };
};



function ClockController () {        //Controller
    let element = null,
        model = null;

    this.init = function (elem, mod, set){
        element = elem;
        model = mod;
        this.setDiv();  //передаем див с листенером вверх
        model.setSettings(set);
    };
    this.buttonClick = function (event) {
        if(event.target.classList.contains('start-button')){    //пуш старт
            model.buttonClick(true);
        };

        if(event.target.classList.contains('stop-button')){     //пуш стоп
            model.buttonClick(false);
        };

    };
    this.setDiv = function(){
        let clock = document.createElement('div');
        clock.classList.add('clock');
        clock.addEventListener('click', this.buttonClick)
        element.append(clock);
        model.setDiv(clock);
    };
};