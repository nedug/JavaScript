"use strict";

const circleRadius = 100;

function UpdateTime(timeDiference) {
  this.valPosition = []; //часовые значения

  this.timeDiference = timeDiference; //числом от -12 до +12 при созднании класса мы будем задавать разницу во времени от стандартной по гринвичу

  //текущее время
  this.hour = 0;
  this.minute = 0;
  this.second = 0;
  this.timerID;
  this.timer = 0; //будем фиксировать состояние таймеро 0 - часы стоят  1 - часы идут
  var currTime = new Date();
  var myView = null;

  //методы
  //находим координаты всех часовых значений
  this.onloadPage = function (view) {
    myView = view;
    this.timeUpdate();

    this.timer = 1;
  };

  this.timeUpdate = function () {
    currTime = new Date();
    this.hour = currTime.getUTCHours() + this.timeDiference;
    this.minute = currTime.getUTCMinutes();
    this.second = currTime.getUTCSeconds();
    var ms = currTime.getUTCMilliseconds();
    myView.degUpdate();
    this.timerID = setTimeout(() => {
      this.timeUpdate();
    }, 1020 - ms);
  };

  this.onclickStart = function () {
    if (this.timer == 0) {
      this.timeUpdate();
      this.timer = 1;
    }
  };

  this.onclickStop = function () {
    clearTimeout(this.timerID);
    this.timer = 0;
  };
}
