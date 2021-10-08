function ClockViewDom(){
		console.log("viewDOM")



  let myField = null; // внутри какого элемента DOM наша вёрстка
    let myClock = null;


      this.init = function(field) {
        myField = field;
        myClock = myField.querySelector('.clock_')
      }




      this.drawNumbers = function(left, top, clock){


      		let number = document.createElement('div');
			number.setAttribute("class", "green");
			myClock.querySelector('.center_').append(number)

			console.log('create')
			number.style.left = left + "px";
       		number.style.top = top + "px";
       		number.textContent = clock;

      }







      this.drawHands = function(){

        let secondHand = document.createElement('div');
        secondHand.setAttribute("class", "secondHand_");
        myClock.querySelector('.center_').append(secondHand);
        secondHand.style.transformOrigin = "0 0 0";

        let minuteHand = document.createElement('div');
        minuteHand.setAttribute("class", "minuteHand_");
        myClock.querySelector('.center_').append(minuteHand);
        minuteHand.style.transformOrigin = "2.5px 0 0";

        let hourHand = document.createElement('div');
        hourHand.setAttribute("class", "hourHand_");
        myClock.querySelector('.center_').append(hourHand);
        hourHand.style.transformOrigin = "5px 5.25px 0";

        //draw header + buttons
        console.log(myField.querySelector('.clockContainer'))
        let header = document.createElement('div');
        header.style.position = "absolute";
        header.style.top = "-170px";
        header.style.left = "-150px";
        header.style.width = "300px";
        header.style.display = "flex";
        header.style.justifyContent = "space-between";

        header.style.hight = "40px";
        myClock.querySelector('.center_').append(header);


        let startBtn = document.createElement('button');
        startBtn.classList.add('start');

        startBtn.textContent = "START";
        header.append(startBtn);

        let stopBtn = document.createElement('button');
        stopBtn.classList.add('stop');

        stopBtn.textContent = "STOP";
        header.append(stopBtn);  

        let h2 = document.createElement('h3');
        h2.textContent = "DOM clock";
        h2.style.padding = "0"
        h2.style.margin = "0"

        header.append(h2);

      }

      this.startClock = function(seconds, minutes, hours, timerID){

        let stopBtn = myField.querySelector('.stop');
        stopBtn.value = timerID;

        let secondHand = "rotate(" + (seconds + 180) + "deg)";

        let minuteHand = "rotate(" + (minutes + 180) + "deg)";
        let hourHand = "rotate(" + (hours + 180) + "deg)";



      	myClock.querySelector('.secondHand_').style.transform = secondHand;
        myClock.querySelector('.minuteHand_').style.transform = minuteHand;
        myClock.querySelector('.hourHand_').style.transform = hourHand;
      }



}