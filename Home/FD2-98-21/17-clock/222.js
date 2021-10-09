
function ClockViewCanvas() {


    let myField = null; // внутри какого элемента DOM наша вёрстка
    let myClock = null;
    let ctx = null;


      this.init = function(field) {

        myField = field;
        myClock = myField.querySelector('.clock')
        ctx = myClock.getContext("2d");

      }


      this.drawNumbers = function(left, top, clock) {

        // console.log('CANVAS numbers')

      }


      this.drawHands = function(city, timezone) {


        //draw header + buttons


        let header = document.createElement('div');
        header.style.position = "absolute";
        header.style.top = "25px";
        header.style.left = "50px";
        header.style.width = "300px";
        header.style.display = "flex";
        header.style.justifyContent = "space-between";

        header.style.hight = "40px";
        myField.append(header);


        let startBtn = document.createElement('button');
        startBtn.classList.add('start');
        startBtn.textContent = "START";
        header.append(startBtn);

        let stopBtn = document.createElement('button');
        stopBtn.classList.add('stop');
        stopBtn.textContent = "STOP";
        header.append(stopBtn);  

        let h2 = document.createElement('h4');
        if (timezone>=0) h2.textContent = `${city} (GMT+${timezone})`;
        else h2.textContent = `${city} (GMT${timezone})`;

        h2.style.padding = "0"
        h2.style.margin = "0"

        header.append(h2);

      }



      this.startClock = function(seconds, minutes, hours) {

        // let stopBtn = myField.querySelector('.stop');
        //
        // stopBtn.value = timerID;

        
        let ctx = myClock.getContext("2d");

        //DRAW ORANGE BACKGROUND
        ctx.strokeStyle = "orange";
        ctx.fillStyle = "orange";
        ctx.lineCap = "round";



        ctx.beginPath();
        ctx.arc(150, 150, 150, 0, 2*Math.PI )
        ctx.fill();
        ctx.stroke();


        let angle = 30;
        let clockFirst = 1;
        let centerOfClockX = 5;
        let centerOfClockY = 5;
        let radius = 120;
        let diamOfNumber = 45;


    //DRAW NUMBERS


for (let i = 0; i<12; i++) {


      var angleRadians = parseFloat(parseFloat(angle))/180*Math.PI;
      var greenCenterX = centerOfClockX+radius*Math.sin(angleRadians);
          var greenCenterY = centerOfClockY-radius*Math.cos(angleRadians);

          let numberLeft = Math.round(greenCenterX-diamOfNumber/2);
          let numberTop = Math.round(greenCenterY-diamOfNumber/2);
          



           ctx.strokeStyle = "green";
        ctx.fillStyle = "green";




        ctx.beginPath();
        ctx.arc(numberLeft+167.5, numberTop+167.5, 22.5, 0, 2*Math.PI )
        ctx.fill();
        ctx.stroke();


        ctx.font = "20px Georgia";
            ctx.strokeStyle = "black";
            ctx.fillStyle = "black";

            ctx.fillText(clockFirst, numberLeft+160,  numberTop+171 )

          clockFirst++;
          angle+=30;
        }

     ctx.save()


        //SECONDS

    let secondHandRadians = seconds*(Math.PI/180)+3.14;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
    ctx.save();

    ctx.translate(145, 150);
  
        ctx.rotate(secondHandRadians)

        ctx.moveTo(0, 0);
        ctx.lineTo(0, 125);
                ctx.stroke();
    ctx.restore();



    //MINUTES


    let minuteHandRadians = minutes*(Math.PI/180)+3.14;
        ctx.lineWidth = 7.5;
        ctx.beginPath();
    ctx.save();

    ctx.translate(145, 150);
  
                ctx.rotate(minuteHandRadians)

        ctx.moveTo(0, 0);
        ctx.lineTo(0, 100);
                ctx.stroke();
    ctx.restore();



    //HOURS

    let hourHandRadians = hours * (Math.PI/180)+3.14;
        ctx.lineWidth = 12.5;
        ctx.beginPath();
    ctx.save();

    ctx.translate(145, 150);

        ctx.rotate(hourHandRadians)

        ctx.moveTo(0, 0);
        ctx.lineTo(0, 75);
        ctx.stroke();
    ctx.restore();


ctx.restore();



       
      }

}