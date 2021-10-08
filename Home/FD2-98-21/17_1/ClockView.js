"use strict";

function ClockViewDOM(clockDiv) {
  this.clock = document.getElementById(clockDiv); //див в котором находятся часы
  this.circle = document.createElement("div"); //циферблат
  var val; //часовые значения
  this.hourArrow = document.createElement("div");
  this.minuteArrow = document.createElement("div");
  this.secondArrow = document.createElement("div");
  var utc = document.createElement("div");

  var myModel = null;

  this.init = function (model) {
    myModel = model;
    //часовой пояс
    this.clock.appendChild(utc);
    utc.style.fontSize = "15px";
    utc.style.position = "absolute";
    utc.style.top = "2px";
    utc.style.left = "115px";
    var utcStr =
      myModel.timeDifference <= 0
        ? myModel.timeDifference
        : "+" + myModel.timeDifference;
    utc.innerHTML = "UTC" + " " + utcStr;

    //циферблат
    this.clock.appendChild(this.circle);
    this.circle.style.position = "relative";
    this.circle.style.backgroundColor = "#fcca66";
    this.circle.style.width = circleRadius * 2 + "px";
    this.circle.style.height = circleRadius * 2 + "px";
    this.circle.style.borderRadius = "50%";
    this.circle.style.marginTop = "10px";

    //часовые значения
    var valRadius = circleRadius * 0.15;
    var angle = 360;
    for (var i = 11; i >= 0; i--) {
      val = document.createElement("div");
      this.circle.appendChild(val);
      val.style.position = "absolute";
      val.style.backgroundColor = "#48b382";
      val.style.width = circleRadius * 2 * 0.15 + "px";
      val.style.height = circleRadius * 2 * 0.15 + "px";
      val.style.borderRadius = "50%";
      val.innerHTML = i + 1;
      val.style.textAlign = "center";
      val.style.lineHeight = "190%";
      var angleRad = (angle / 180) * Math.PI;
      angle = angle - 30;
      var valX = Math.round(
        circleRadius + circleRadius * 0.8 * Math.sin(angleRad) - valRadius
      );
      var valY = Math.round(
        circleRadius - circleRadius * 0.8 * Math.cos(angleRad) - valRadius
      );
      val.style.left = valX + "px";
      val.style.top = valY + "px";
    }

    this.circle.appendChild(this.hourArrow);
    var dHourArrow = 55; //длина стрелки
    this.hourArrow.style.backgroundColor = "black";
    this.hourArrow.style.width = "4px";
    this.hourArrow.style.height = dHourArrow + "px";
    this.hourArrow.style.borderRadius = "60% / 5%";
    this.hourArrow.style.position = "absolute";
    this.hourArrow.style.transformOrigin = "3px 50px";
    this.hourArrow.style.top = "50px";
    this.hourArrow.style.left = "100px";

    this.circle.appendChild(this.minuteArrow);
    var dMinuteArrow = 70; //длина стрелки
    this.minuteArrow.style.backgroundColor = "black";
    this.minuteArrow.style.width = "2px";
    this.minuteArrow.style.height = dMinuteArrow + "px";
    this.minuteArrow.style.borderRadius = "60% / 5%";
    this.minuteArrow.style.position = "absolute";
    this.minuteArrow.style.transformOrigin = "2px 65px";
    this.minuteArrow.style.top = "35px";
    this.minuteArrow.style.left = "100px";

    this.circle.appendChild(this.secondArrow);
    var dSecondArrow = 80; //длина стрелки
    this.secondArrow.style.backgroundColor = "black";
    this.secondArrow.style.width = "1px";
    this.secondArrow.style.height = dSecondArrow + "px";
    this.secondArrow.style.borderRadius = "60% / 5%";
    this.secondArrow.style.position = "absolute";
    this.secondArrow.style.transformOrigin = "1px 75px";
    this.secondArrow.style.top = "25px";
    this.secondArrow.style.left = "100px";
  };

  this.degUpdate = function () {
    var hourDeg = 30 * (myModel.hour + (1 / 60) * myModel.minute);
    var minuteDeg = 6 * (myModel.minute + (1 / 60) * myModel.second);
    var secondDeg = 6 * myModel.second;
    this.secondArrow.style.transform = `rotate(${secondDeg}deg)`;
    this.hourArrow.style.transform = `rotate(${hourDeg}deg)`;
    this.minuteArrow.style.transform = `rotate(${minuteDeg}deg)`;
  };
}














function ClockViewSVG(clockDiv) {
  this.clockDiv = clockDiv;
  this.clock = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  this.circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  var secondArrow = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  var minuteArrow = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  var hourArrow = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );

  var utc = document.createElement("div");

  var myModel = null;

  this.onloadPage = function (model) {
    myModel = model;
    //svg elem
    document.getElementById(this.clockDiv).appendChild(this.clock);
    this.clock.setAttribute("width", `${circleRadius * 2}`);
    this.clock.setAttribute("height", `${circleRadius * 2}`);
    this.clock.style.marginTop = "10px";

    //циферблат
    this.clock.appendChild(this.circle);
    this.circle.setAttribute("cx", `${circleRadius}`);
    this.circle.setAttribute("cy", `${circleRadius}`);
    this.circle.setAttribute("r", `${circleRadius}`);
    this.circle.setAttribute("fill", "#fcca66");

    //часовой пояс
    document.getElementById(this.clockDiv).appendChild(utc);
    utc.style.fontSize = "15px";
    utc.style.position = "absolute";
    utc.style.top = "2px";
    utc.style.left = "115px";
    var utcStr =
      myModel.timeDiference <= 0
        ? myModel.timeDiference
        : "+" + myModel.timeDiference;
    utc.innerHTML = "UTC" + " " + utcStr;

    //часовые значения
    var valRadius = circleRadius * 0.15;
    var angle = 360;
    for (var i = 11; i >= 0; i--) {
      var val; //часовые значения
      val = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      this.clock.appendChild(val);
      val.innerHTML = i + 1;
      val.style.textAlign = "center";
      val.style.lineHeight = "190%";
      var angleRad = (angle / 180) * Math.PI;
      angle = angle - 30;
      var valX = Math.round(
        circleRadius + circleRadius * 0.8 * Math.sin(angleRad)
      );
      var valY = Math.round(
        circleRadius - circleRadius * 0.8 * Math.cos(angleRad)
      );
      val.setAttribute("cx", `${valX}`);
      val.setAttribute("cy", `${valY}`);
      val.setAttribute("r", `${valRadius}`);
      val.setAttribute("fill", "#48b382");

      var txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
      this.clock.appendChild(txt);
      txt.innerHTML = i + 1;
      txt.setAttribute("x", `${valX}`);
      txt.setAttribute("y", `${valY + 5}`);
      txt.style.textAnchor = "middle";
    }

    //стрелки
    this.clock.appendChild(secondArrow);
    secondArrow.setAttribute("x1", circleRadius);
    secondArrow.setAttribute("y1", circleRadius + 5);
    secondArrow.setAttribute("x2", circleRadius);
    secondArrow.setAttribute("y2", "20");
    secondArrow.setAttribute("stroke", "black");
    secondArrow.setAttribute("stroke-width", "1");
    secondArrow.setAttribute("stroke-linecap", "round");
    secondArrow.style.transformOrigin = "center";

    this.clock.appendChild(minuteArrow);
    minuteArrow.setAttribute("x1", circleRadius);
    minuteArrow.setAttribute("y1", circleRadius + 5);
    minuteArrow.setAttribute("x2", circleRadius + 5);
    minuteArrow.setAttribute("y2", "30");
    minuteArrow.setAttribute("stroke", "black");
    minuteArrow.setAttribute("stroke-width", "2");
    minuteArrow.setAttribute("stroke-linecap", "round");
    minuteArrow.style.transformOrigin = "center";

    this.clock.appendChild(hourArrow);
    hourArrow.setAttribute("x1", circleRadius);
    hourArrow.setAttribute("y1", circleRadius);
    hourArrow.setAttribute("x2", circleRadius);
    hourArrow.setAttribute("y2", "45");
    hourArrow.setAttribute("stroke", "black");
    hourArrow.setAttribute("stroke-width", "4");
    hourArrow.setAttribute("stroke-linecap", "round");
    hourArrow.style.transformOrigin = "center";
  };

  this.degUpdate = function () {
    var hourDeg = 30 * (myModel.hour + (1 / 60) * myModel.minute);
    var minuteDeg = 6 * (myModel.minute + (1 / 60) * myModel.second);
    var secondDeg = 6 * myModel.second;
    secondArrow.style.transform = `rotate(${secondDeg}deg)`;
    hourArrow.style.transform = `rotate(${hourDeg}deg)`;
    minuteArrow.style.transform = `rotate(${minuteDeg}deg)`;
  };
}

function ClockViewCanvas(clockDiv) {
  var myModel;
  this.clockDiv = clockDiv;
  this.clock = document.createElement("canvas");
  document.getElementById(this.clockDiv).appendChild(this.clock);
  this.clock.setAttribute("width", `${circleRadius * 2}`);
  this.clock.setAttribute("height", `${circleRadius * 2}`);
  this.clock.style.marginTop = "10px";
  var context = this.clock.getContext("2d");

  var utc = document.createElement("div");

  this.onloadPage = function (model) {
    myModel = model;
    //часовой пояс
    document.getElementById(this.clockDiv).appendChild(utc);
    utc.style.fontSize = "15px";
    utc.style.position = "absolute";
    utc.style.top = "2px";
    utc.style.left = "115px";
    var utcStr =
      myModel.timeDiference <= 0
        ? myModel.timeDiference
        : "+" + myModel.timeDiference;
    utc.innerHTML = "UTC" + " " + utcStr;
  };

  this.degUpdate = function () {
    //очищаем область
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, circleRadius * 2, circleRadius * 2);

    //циферблат
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.beginPath();
    context.arc(
      circleRadius,
      circleRadius,
      circleRadius - 1,
      0,
      Math.PI * 2,
      false
    );
    context.stroke();

    //часовые значения
    var angle = 360;
    var radiusPoint;
    for (var i = 0; i < 60; i++) {
      context.beginPath();
      context.lineCap = "round";
      if (i % 5 == 0) {
        radiusPoint = 7;
        (context.lineWidth = 1), 5;
      } else {
        radiusPoint = 4;
        (context.lineWidth = 0), 5;
      } //для выделения часовых рисочек
      var angleRad = (angle / 180) * Math.PI;
      var radiusNum = circleRadius - radiusPoint;
      var xPointN = circleRadius + radiusNum * Math.cos(angleRad);
      var yPointN = circleRadius - radiusNum * Math.sin(angleRad);
      var xPoint = circleRadius + circleRadius * Math.cos(angleRad);
      var yPoint = circleRadius - circleRadius * Math.sin(angleRad);
      angle = angle - 6;
      context.moveTo(xPoint, yPoint);
      context.lineTo(xPointN, yPointN);
      context.stroke();
      context.closePath();
    }

    //цифровые значения
    angle = 360;
    for (var i = 12; i >= 1; i--) {
      context.beginPath();
      context.font = "bold 15px sans-serif";
      context.lineWidth = 1;
      var angleRad = (angle / 180) * Math.PI;
      var xText = circleRadius + (circleRadius - 15) * Math.sin(angleRad);
      var yText = circleRadius - (circleRadius - 15) * Math.cos(angleRad);
      angle = angle - 30;
      if (i <= 9) {
        context.strokeText(i, xText - 3, yText + 5);
      } else {
        context.strokeText(i, xText - 7, yText + 6);
      }
      context.stroke();
      context.closePath();
    }

    //стрелки
    var hourDeg = 30 * (myModel.hour + (1 / 60) * myModel.minute);
    var minuteDeg = 6 * (myModel.minute + (1 / 60) * myModel.second);
    var secondDeg = 6 * myModel.second;
    var lengthHour = circleRadius * 0.55;
    var lengthMinutes = circleRadius * 0.7;
    var lengthSeconds = circleRadius * 0.9;

    //часовая
    context.beginPath();
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 3;
    context.moveTo(circleRadius, circleRadius);
    context.lineTo(
      circleRadius +
        lengthHour * Math.cos(Math.PI / 2 - hourDeg * (Math.PI / 180)),
      circleRadius -
        lengthHour * Math.sin(Math.PI / 2 - hourDeg * (Math.PI / 180))
    );
    context.stroke();
    context.closePath();

    //минутная
    context.beginPath();
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.moveTo(circleRadius, circleRadius);
    context.lineTo(
      circleRadius +
        lengthMinutes * Math.cos(Math.PI / 2 - minuteDeg * (Math.PI / 180)),
      circleRadius -
        lengthMinutes * Math.sin(Math.PI / 2 - minuteDeg * (Math.PI / 180))
    );
    context.stroke();
    context.closePath();

    //секундная
    context.beginPath();
    context.lineCap = "round";
    context.strokeStyle = "red";
    context.lineWidth = 1;
    context.moveTo(circleRadius, circleRadius);
    context.lineTo(
      circleRadius +
        lengthSeconds * Math.cos(Math.PI / 2 - secondDeg * (Math.PI / 180)),
      circleRadius -
        lengthSeconds * Math.sin(Math.PI / 2 - secondDeg * (Math.PI / 180))
    );
    context.stroke();
    context.closePath();

    //центр
    context.strokeStyle = "black";
    context.lineWidth = 3;
    context.beginPath();
    context.arc(circleRadius, circleRadius, 2, 0, Math.PI * 2, false);
    context.stroke();
    context.fill();
  };
}
