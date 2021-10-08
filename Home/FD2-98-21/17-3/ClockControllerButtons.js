
function ClockControllerButtons() {

    let clockModel = null; // с какой моделью работаем
    let clockContainer = null; // внутри какого элемента DOM наша вёрстка


    this.init = function(model, field) {

        clockModel = model;
        clockContainer = field;


        clockModel.drawNumbers(); /* Рисуем цифры */

        clockModel.drawHands(); /* Рисуем стрелки */


        // clockModel.startClock(); /* Запускаем часы */


        // let stopBtn = clockContainer.querySelector('.stop');
        // stopBtn.addEventListener('click', this.stop)
        //
        // let startBtn = clockContainer.querySelector('.start');
        // startBtn.addEventListener('click', this.start)
    }


	// this.startClock = function(timezone){
    //     clockModel.startClock();
	// }


    // this.stop = function(event) {
    //
    //     clockModel.startClock(event.target.value);
    //
    //     console.log(event.target)
    // }


    // this.start = function() {
    //
    //     clockModel.startClock();
    // }
}