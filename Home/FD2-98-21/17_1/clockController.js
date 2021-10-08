"use strict";

function ClockController() {
  var myClock = null;
  var myModel = null;

  this.init = function (model, clockDiv) {
    myModel = model;
    myClock = clockDiv;

    var startBut = myClock.querySelector(".butStart");
    startBut.onclick = () => {
      myModel.onclickStart();
    };
    var stopBut = myClock.querySelector(".butStop");
    stopBut.onclick = () => {
      myModel.onclickStop();
    };
  };
}
