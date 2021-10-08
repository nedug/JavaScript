"use strict";
var modelDOM1 = new UpdateTime(-5);
var viewDOM1 = new ClockViewDOM("clock1");
var controllerDom1 = new ClockController();

var containerElem1 = document.getElementById("clock1");
viewDOM1.onloadPage(modelDOM1);
modelDOM1.onloadPage(viewDOM1);
controllerDom1.onloadPage(modelDOM1, containerElem1);

//

var modelDOM2 = new UpdateTime(+2);
var viewDOM2 = new ClockViewDOM("clock2");
var controllerDom2 = new ClockController();

var containerElem2 = document.getElementById("clock2");
viewDOM2.onloadPage(modelDOM2);
modelDOM2.onloadPage(viewDOM2);
controllerDom2.onloadPage(modelDOM2, containerElem2);

//

var modelSVG1 = new UpdateTime(-12);
var viewSVG1 = new ClockViewSVG("clock3");
var controllerSVG1 = new ClockController();

var containerElem3 = document.getElementById("clock3");
viewSVG1.onloadPage(modelSVG1);
modelSVG1.onloadPage(viewSVG1);
controllerSVG1.onloadPage(modelSVG1, containerElem3);
//

var modelSVG2 = new UpdateTime(-1);
var viewSVG2 = new ClockViewSVG("clock4");
var controllerSVG2 = new ClockController();

var containerElem3 = document.getElementById("clock4");
viewSVG2.onloadPage(modelSVG2);
modelSVG2.onloadPage(viewSVG2);
controllerSVG2.onloadPage(modelSVG2, containerElem3);

//

var modelCanvas1 = new UpdateTime(0);
var viewCanvas1 = new ClockViewCanvas("clock5");
var controllerCanvas1 = new ClockController();

var containerElem5 = document.getElementById("clock5");
viewCanvas1.onloadPage(modelCanvas1);
modelCanvas1.onloadPage(viewCanvas1);
controllerCanvas1.onloadPage(modelCanvas1, containerElem5);

//

var modelCanvas2 = new UpdateTime(-10);
var viewCanvas2 = new ClockViewCanvas("clock6");
var controllerCanvas2 = new ClockController();

var containerElem6 = document.getElementById("clock6");
viewCanvas2.onloadPage(modelCanvas2);
modelCanvas2.onloadPage(viewCanvas2);
controllerCanvas2.onloadPage(modelCanvas2, containerElem6);
