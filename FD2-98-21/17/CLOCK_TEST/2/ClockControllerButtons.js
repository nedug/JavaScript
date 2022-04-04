
function ClockControllerButtons(){
//	console.log('controller')
	let myModel = null; // с какой моделью работаем
  let myField = null; // внутри какого элемента DOM наша вёрстка

      this.init = function(model, field) {
      	console.log('init')
        myModel = model;
        myField = field;
        	myModel.drawNumbers();
        	myModel.drawHands();


            let stopBtn = myField.querySelector('.stop');
            stopBtn.addEventListener('click', this.stop)

            let startBtn = myField.querySelector('.start');
            startBtn.addEventListener('click', this.start)


	}


	this.startClock = function(timezone){
		myModel.startClock();
	}

  this.stop = function() {
    console.log(event.target.value)
    myModel.startClock(event.target.value);
  }

  this.start = function() {
    console.log(event.target)
        myModel.startClock();

  }


}