var WeatherWidget = function() {
        //var popup = document.createElement('div');
        //popup.setAttribute('id', 'popup');
        //body.appendChild(popup);








        var forecast = document.getElementById('forecast');
        forecast.style.display = "none";
        let image = document.getElementById('image');
        image.innerHTML = '<img src="spinner.gif"></img>';
        var section = document.getElementById('section');


        this.getWeather = function() {
            forecast.style.display="none";
            section.style.display="block";
            let cityID = 625144,
                apiUrl = "https://api.openweathermap.org/data/2.5/",
                apiKey = "bdcb6183108ed3f3e6d230300e66ca2f", //ваш apikey с сервиса
                apiQuery = apiUrl+"/weather?id=" + cityID + "&units=metric&lang=ru&appid="+apiKey;

            fetch(apiQuery, { method: 'get' })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                image.style.display="none";
                showWeather(data);
            })
            .catch(error => console.error("Ошибка получение погоды. Причина: " + error));
        }









        this.getWeatherForThreeDays = function() {
            forecast.style.display = "flex";
            section.style.display = "none";

            forecast.classList.add('spinner');
            forecast.innerHTML = '<img id="spinner" src="spinner.gif"></img>';
            let cityID = 625144,
                apiUrl = "https://api.openweathermap.org/data/2.5/",
                apiKey = "bdcb6183108ed3f3e6d230300e66ca2f", //ваш apikey с сервиса
                apiQuery = apiUrl+"/forecast?id=" + cityID + "&units=metric&lang=ru&appid="+apiKey;

            fetch(apiQuery, { method: 'get' })
            .then(response => response.json())
            .then(dataForThreeDays => {
                console.log(dataForThreeDays);
                //forecast.style.display = "block";
                showWeatherForThreeDays(dataForThreeDays);
                //forecast.innerHTML = "Прогноз погоды на 12 часов дня:" + "<br>" + "Сегодня: " + dataForThreeDays.list[0].main.temp + "°C <br> Завтра: " + dataForThreeDays.list[8].main.temp + "°C <br> Послезавтра: " + dataForThreeDays.list[16].main.temp + '°C';
                
            })
            .catch(error => console.error("Ошибка получение погоды. Причина: " + error));
        }
        //const PLACES = [625144, 627907, 629634, 627904, 620127, 625665];
        //getWeather(PLACES[0]);

        showWeather = function(data) {
            
            var loc = document.getElementById('location');
            loc.innerHTML = 'Сейчас в ' + '<strong>' + data.name + '</strong> ' + data.main.temp + '°C';
            var icon = document.getElementById('temp-with-icon');
            let sign = `${data.weather[0]["icon"]}`;
            icon.innerHTML = `<img src="http://openweathermap.org/img/w/${sign}.png"></img>`;
            var descr = document.getElementById('descr');
            descr.innerHTML = data.weather[0]['description'];
            var wind = document.getElementById('wind');
            wind.innerHTML = 'Ветер ' + data.wind.speed + ' м/с';
            
        };

        showWeatherForThreeDays = function(dataForThreeDays) {
            forecast.innerHTML='';
            let today = document.createElement('div');
            forecast.appendChild(today);
            let tomorrow = document.createElement('div');
            forecast.appendChild(tomorrow);
            let afterTomorrow = document.createElement('div');
            forecast.appendChild(afterTomorrow);

            let iconOne = `${dataForThreeDays.list[0].weather[0]["icon"]}`;
            let iconTwo = `${dataForThreeDays.list[8].weather[0]["icon"]}`;
            let iconThree = `${dataForThreeDays.list[16].weather[0]["icon"]}`;
            today.innerHTML = "Сегодня: " + dataForThreeDays.list[0].main.temp + "°C <br> " + `<img src="http://openweathermap.org/img/w/${iconOne}.png"></img>` + " <br>" + dataForThreeDays.list[0].weather[0]["description"] + " <br> Скорость ветра: <br>" + dataForThreeDays.list[0].wind.speed + "м/с";
            tomorrow.innerHTML = "Завтра: " + dataForThreeDays.list[8].main.temp + "°C <br> " + `<img src="http://openweathermap.org/img/w/${iconTwo}.png"></img>` + " <br>" + dataForThreeDays.list[8].weather[0]["description"] + " <br> Скорость ветра: <br>" + dataForThreeDays.list[8].wind.speed + "м/с";
            afterTomorrow.innerHTML = "Послезавтра: " + dataForThreeDays.list[16].main.temp + "°C <br> " + `<img src="http://openweathermap.org/img/w/${iconThree}.png"></img>` + " <br>" + dataForThreeDays.list[16].weather[0]["description"] + " <br> Скорость ветра: <br>" + dataForThreeDays.list[16].wind.speed + "м/с";
                        
        }
            
        var threeDays = document.getElementById('threeDays');
        threeDays.addEventListener('click', this.getWeatherForThreeDays);

        var oneDay = document.getElementById('oneDay');
        oneDay.addEventListener('click', this.getWeather);
        
        var delay_popup = setTimeout( function() {
            document.getElementById('popup').style.display='block';
        }, 1000);
    }
       /* function checkState() {
            console.log(1);
            if (forecast.style.display = "none") {
                this.getWeatherForThreeDays();
                console.log(2);
            } else if(forecast.style.display = "block") {
               forecast.style.display = "none"; 
               console.log(3);
            }
        } */


        