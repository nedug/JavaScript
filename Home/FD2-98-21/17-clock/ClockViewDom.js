/* ------- view -------- */

function ClockViewDom() {

  let clockContainer = null;
  let myClock = null;


  this.init = function(field) {

    clockContainer = field;

    myClock = clockContainer.querySelector('.clock');
  }


  this.drawNumbers = function(left, top, clock) {

    let number = document.createElement('div');
    number.setAttribute("class", "green");
    myClock.querySelector('.center').append(number);

    number.style.left = left + "px";
    number.style.top = top + "px";
    number.textContent = clock;
  }


  this.drawHands = function(city) {

    let secondHand = document.createElement('div'); /* Рисуем стрелки */
    secondHand.setAttribute("class", "secondHand_");
    myClock.querySelector('.center').append(secondHand);
    secondHand.style.transformOrigin = "0 0 0";

    let minuteHand = document.createElement('div');
    minuteHand.setAttribute("class", "minuteHand_");
    myClock.querySelector('.center').append(minuteHand);
    minuteHand.style.transformOrigin = "2.5px 0 0";

    let hourHand = document.createElement('div');
    hourHand.setAttribute("class", "hourHand_");
    myClock.querySelector('.center').append(hourHand);
    hourHand.style.transformOrigin = "5px 5.25px 0";



    let header = document.createElement('div'); /* Рисуем кнопки */
    header.style.position = "absolute";
    header.style.top = "-170px";
    header.style.left = "-150px";
    header.style.width = "250px";
    header.style.display = "flex";
    header.style.justifyContent = "space-between";

    header.style.hight = "40px";
    myClock.querySelector('.center').append(header);


    let startBtn = document.createElement('button');
    startBtn.classList.add('start');
    startBtn.textContent = "START";
    header.append(startBtn);

    let stopBtn = document.createElement('button');
    stopBtn.classList.add('stop');
    stopBtn.textContent = "STOP";
    header.append(stopBtn);

    let h2 = document.createElement('h3');
    h2.textContent = city;
    h2.style.padding = "0"
    h2.style.margin = "0"

    header.append(h2);
  }


  this.startClock = function(seconds, minutes, hours) {

    // let stopBtn = clockContainer.querySelector('.stop');
    // stopBtn.value = timerID;

    let secondHand = "rotate(" + (seconds + 180) + "deg)";
    let minuteHand = "rotate(" + (minutes + 180) + "deg)";
    let hourHand = "rotate(" + (hours + 180) + "deg)";


    myClock.querySelector('.secondHand_').style.transform = secondHand;
    myClock.querySelector('.minuteHand_').style.transform = minuteHand;
    myClock.querySelector('.hourHand_').style.transform = hourHand;
  }




}