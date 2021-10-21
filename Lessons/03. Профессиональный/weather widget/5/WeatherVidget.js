



function WeatherVidget(){
	//data for request
	this.cityID = 625144;
	this.apiUrl = "https://api.openweathermap.org/data/2.5/";
    this.apiKey = "054eb9ed878899956e14a66aabb206b8";
    this.apiQuery = this.apiUrl+"/weather?id=" + this.cityID + "&units=metric&lang=ru&appid="+ this.apiKey;




    //first request for current time
    fetch(this.apiQuery)
        .then(response => response.json())
        .then(data => {
          this.getWeather(data)
      })
      .catch(error => console.error("Ошибка получение погоды. Причина: " + error));



      //make request for data

    this.addThreeDaysRequest = function(){
     		document.querySelector('.main').style.opacity = '0.3';
     		floatingBarsG.style.display = "block";
     		this.apiKey = "054eb9ed878899956e14a66aabb206b8";
     		this.apiQueryFor7days = "https://api.openweathermap.org/data/2.5/onecall?lat=53.9&lon=27.5667&exclude=hourly,3&units=metric&lang=ru&appid="+this.apiKey;

			fetch(this.apiQueryFor7days)
        	.then(response => response.json())
        	.then(data => {
         	 drawWeatherThreeDays(data)
      			})
      			.catch(error => console.error("Ошибка получение погоды. Причина: " + error));
		}



    
		


		//draw main block with weather
	this.getWeather = function(data){
	

	if(data){
		//parse data from request
		let city = data.name;
		let date = new Date(data.dt*1000);
		let dateDay = date.getDate();
		let dateMonth = date.getMonth()+1;

		if(dateMonth<10){
			dateMonth = "0"+dateMonth;
		}
		if(dateDay<10){
			dateDay = "0"+dateDay;
		}

		let dateYear = date.getFullYear();
		console.log(city, dateDay, dateMonth, dateYear);

		let currentTemperature = data.main.temp;
		let humidity = data.main.humidity;
		let windSpeed = data.wind.speed;
		let pressure = data.main.pressure;

		let weatherDescription = data.weather[0].description;

		let icon =  "http://openweathermap.org/img/wn/"+data.weather[0].icon+".png"
		console.log(currentTemperature, humidity, windSpeed, weatherDescription)

		//start draw vidget
		let weatherVidgetBlock = document.createElement('div');
		weatherVidgetBlock.classList.add('weather-block');
		document.body.append(weatherVidgetBlock)

		let header = document.createElement('div');
		header.classList.add('header');
		let headerH2 = document.createElement('h2');
		headerH2.textContent = "ПОГОДА";
		let headerBtn = document.createElement('a');
		headerBtn.textContent = "свернуть";
		headerBtn.href = "#"; 
		weatherVidgetBlock.append(header);
		header.append(headerH2);
		header.append(headerBtn);	

		let main = document.createElement('div');
		main.classList.add('main')
		let dateBlock = document.createElement('h3');
		dateBlock.textContent = dateDay+":"+dateMonth+":"+dateYear;
		weatherVidgetBlock.append(main);
		main.append(dateBlock);	



		let mainInfo = document.createElement('div')
		mainInfo.classList.add('main-info');
		main.append(mainInfo)
		let cityBlock = document.createElement('h2');
		cityBlock.textContent = city;
		mainInfo.append(cityBlock);

		let tempBlock = document.createElement('div');
		let tempProperty = document.createElement('h2');
		tempProperty.textContent = currentTemperature + ' °C';
		let tempDescription = document.createElement('h3');
		tempDescription.innerHTML = `<h3>${weatherDescription} <img width='25px' height='25px' src="${icon}"></h3>`;
		mainInfo.append(tempBlock);
		tempBlock.append(tempProperty);
		tempBlock.append(tempDescription);

		let descriptionBlock = document.createElement('div');
		main.append(descriptionBlock);

		let descriptionBlockHumidity = document.createElement('p');
		descriptionBlockHumidity.textContent = `Влажность воздуха ${humidity} %`;
		descriptionBlock.append(descriptionBlockHumidity);	
		let descriptionBlocWindSpeed = document.createElement('p');
		descriptionBlocWindSpeed.textContent = `Скорость ветра ${windSpeed} метров в секунду`;
		descriptionBlock.append(descriptionBlocWindSpeed);
		let descriptionBlocPressure = document.createElement('p');
		descriptionBlocPressure.textContent = `Атмосферное давление ${pressure} гПа`;
		descriptionBlock.append(descriptionBlocPressure);	


		let btn = document.createElement('button');
		btn.textContent = "Погода на три дня";
		main.append(btn)


		btn.addEventListener('click', this.addThreeDaysRequest);
		headerBtn.addEventListener('click', showHide)

		let newDayItems = document.createElement('div');
		newDayItems.classList.add('newDayItems');
		main.append(newDayItems)

		let hide = false
		function showHide(){
			let mainBlock = document.querySelector('.main');
			console.log(mainBlock)
			if(hide){
				mainBlock.style.display= "block";
				hide = false;
				headerBtn.textContent = "свернуть"
				header.style.borderRadius = "25px 25px 0 0"


			} else {
				mainBlock.style.display= "none";
				hide = true;
				headerBtn.textContent = "развернуть";
				header.style.borderRadius = "25px";

			}
			
		}

	}
	
	}


	//draw three days block

	function drawWeatherThreeDays (data) {

			for(let i = 1; i<4; i++){
			let date = new Date(data.daily[i].dt*1000);
			let dateDay = date.getDate();
			let dateMonth = date.getMonth()+1;
			let dateYear = date.getFullYear();

			let currentTemperature = data.daily[i].temp.day;
			let weatherDescription = data.daily[i].weather[0].description;
			let icon =  "http://openweathermap.org/img/wn/"+data.daily[i].weather[0].icon+".png"

			if(dateMonth<10){
				dateMonth = "0"+dateMonth;
			}
			if(dateDay<10){
				dateDay = "0"+dateDay;
			}

			
			document.querySelector('.newDayItems')

			let newDayItem = document.createElement('div');
			newDayItem.classList.add('newDayItem');

			let dateBlock = document.createElement('h3');
			dateBlock.textContent = dateDay+":"+dateMonth+":"+dateYear;
			newDayItem.append(dateBlock);

			let cityBlock = document.createElement('h2');
			cityBlock.textContent = 'Минск';
			newDayItem.append(cityBlock);

			let tempBlock = document.createElement('div');
			let tempProperty = document.createElement('h2');
			tempProperty.textContent = currentTemperature + ' °C';
			let tempDescription = document.createElement('h3');
			tempDescription.innerHTML = `<h3>${weatherDescription} <img width='25px' height='25px' src="${icon}"></h3>`;
			newDayItem.append(tempBlock);
			tempBlock.append(tempProperty);
			tempBlock.append(tempDescription);

			document.querySelector('.newDayItems').append(newDayItem);
		}



			document.querySelector('.main').style.opacity = '1'
			floatingBarsG.style.display = "none";
			document.querySelector('button').disabled = true;

	}
}



