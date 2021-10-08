
function Clock() {
	console.log("model")

		let myView = null;

		let angle = 30;
		let clockFirst = 1;
		let centerOfClockX = 5;
		let centerOfClockY = 5;
		let radius = 120;
		let diamOfNumber = 45;

	this.init = function(view){
		myView = view;
	}

	this.drawNumbers = function(){
		   for (let i = 0; i<12; i++) {


			var angleRadians = parseFloat(parseFloat(angle))/180*Math.PI;
			var greenCenterX = centerOfClockX+radius*Math.sin(angleRadians);
        	var greenCenterY = centerOfClockY-radius*Math.cos(angleRadians);

        	let numberLeft = Math.round(greenCenterX-diamOfNumber/2);
       		let numberTop = Math.round(greenCenterY-diamOfNumber/2);
        	

        	myView.drawNumbers(numberLeft, numberTop, clockFirst)

        	clockFirst++;
        	angle+=30;

        }
	}

	this.drawHands = function(){
		myView.drawHands();
	}
	this.startClock = function(IDInterval){
		//console.log('start')

      
		let	soon = new Date();
        let soonSeconds = soon.getSeconds();
        let soonMinutes = soon.getMinutes();
        let soonHour = soon.getHours()
/*
         if(timezone){
        	   soonHour = soonHour - timezone;

        	//console.log('LONDON')
        } */
			let secondHand;
        	let minuteHand; 
        	let hourHand;
            

       // console.log(soonHour+ "---" + soonMinutes + "---"+soonSeconds ) ;
                    if(IDInterval){
                            console.log('stop');
                            //console.log(startClock)
                            clearTimeout(IDInterval-1);
                            //clearTimeout(13);
                            clearInterval(IDInterval);
                           // clearInterval(14);

                        } else {
                                                    let startClock = setTimeout(start, 0);

                                            function start(){
                                                /*
                                                if(stop){
                                                    console.log('stop');
                                                    console.log(startClock)
                                                    clearTimeout(IDInterval-1);
                                                    clearTimeout(13);

                                                }
                        */
                                                secondHand = (soonSeconds*6)
                                                minuteHand = (soonMinutes*6)
                                                hourHand = (soonHour*30)+(soonMinutes/2)

                                                myView.startClock(secondHand, minuteHand, hourHand);


                                            }

                                           let clockGoSeconds = setInterval(go, 1000);

                                     

                                            function go(){
                                                /*
                                                if(stop){
                                                    console.log('stop')
                                                    console.log(clockGoSeconds);
                                                    clearInterval(IDInterval);
                                                    clearInterval(14);


                                                }
                                                */
                                                //console.log(clockGoSeconds)
                                                soonSeconds+=1;
                                                secondHand = (soonSeconds*6);
                                                                     //   console.log(clockGoSeconds)

                                                            myView.startClock(secondHand, minuteHand, hourHand, clockGoSeconds);

                                                if( (soonSeconds%60) === 0){
                                                    soonMinutes+=1;
                                                minuteHand = (soonMinutes*6);
                                                hourHand = (soonHour*30)+(soonMinutes/2);
                                                myView.startClock(secondHand, minuteHand, hourHand, clockGoSeconds);
                                                                        console.log(clockGoSeconds)


                                                
                                            }

                                    }

                        }




	}




    this.stopClock = function(){
        console.log(clockGoSeconds)
            clearInterval(clockGoSeconds);
    }


}