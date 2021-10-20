function WeatherWidget() {

    let cityID = null;
    let field = null;
    let forecastNow = null;
    let forecast3day = null;
    let loader = null;
    let that = this;


    this.createWrapWidget = function() {

        field = document.createElement('div');
        field.setAttribute('id', 'weather-widget');

        const innerWrap = `
            <div id="more-info">
                <a href="#" class="now-weather">Сейчас</a>
                <a href="#" class="day3-weather">Прогноз на 3 дня</a>
            </div>
    
            <h1>Погода</h1>
            
            <div id="forecast-3-days">
               <div class="today"></div>       
               <div class="tomorrow"></div>       
               <div class="afterTomorrow"></div>       
            </div>
            
            <div id="forecast-now">
                <div class="icon-weather"></div>
                <h2 class="location"></h2>
                <h1 class="temperature"></h1>
                <div class="description"></div>
                <div class="wind"></div>
             
            </div>
            
            <div id="loader"></div>
    
            <a href="#" class="modal__close" title="Закрыть"></a>`;

        field.innerHTML = innerWrap;
        document.body.append(field);

        forecastNow = document.getElementById('forecast-now');
        forecast3day = document.getElementById('forecast-3-days');

        loader = document.getElementById('loader');
        loader.innerHTML = '<img src="spinner.gif">';
    };



    this.getNowWeather = function() {

        forecastNow.style.display = "none";
        loader.style.display = "";


        let apiUrl = "https://api.openweathermap.org/data/2.5/";
        let apiKey = "bdcb6183108ed3f3e6d230300e66ca2f";
        let apiQuery = apiUrl+"/weather?id=" + cityID + "&units=metric&lang=ru&appid="+apiKey;


        fetch(apiQuery, {method: 'get'})
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                loader.style.display = "none";
                this.showNowWeather(data)
            })
            .catch((error) => console.error("Ошибка получение погоды. Причина: " + error));

    };



    this.get3dayWeather = function() {


        let apiUrl = "https://api.openweathermap.org/data/2.5/";
        let apiKey = "bdcb6183108ed3f3e6d230300e66ca2f";
        let apiQuery = apiUrl+"/forecast?id=" + cityID + "&units=metric&lang=ru&appid="+apiKey;


        fetch(apiQuery, {method: 'get'})
            .then(response => response.json())
            .then(data3day => {
                // console.log(data3day);
                //forecast.style.display = "block";
                this.show3dayWeather(data3day);
                //forecast.innerHTML = "Прогноз погоды на 12 часов дня:" + "<br>" + "Сегодня: " + dataForThreeDays.list[0].main.temp + "°C <br> Завтра: " + dataForThreeDays.list[8].main.temp + "°C <br> Послезавтра: " + dataForThreeDays.list[16].main.temp + '°C';

            })
            .catch(error => console.error("Ошибка получение погоды. Причина: " + error));
    }



    this.showNowWeather = function(data) {

        forecast3day.style.display = "none";
        forecastNow.style.display = "block";

        let icon = forecastNow.querySelector('.icon-weather');
        icon.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">`;

        let location = forecastNow.querySelector('.location');
        location.innerHTML = `<strong>${data.name}</strong>`;

        let temperature = forecastNow.querySelector('.temperature');
        temperature.innerHTML = `${Math.round(data.main.temp)}°C`;

        let description = forecastNow.querySelector('.description');
        description.innerHTML = data.weather[0].description;

        let wind = forecastNow.querySelector('.wind');
        wind.innerHTML = `Ветер ${data.wind.speed} м/с`;

    };



    this.show3dayWeather = function(data3day) {

        // console.log(data3day.list[0].main.temp)

        forecast3day.style.display = "flex";
        forecastNow.style.display = "none";

        let today = forecast3day.querySelector('.today');
        today.innerHTML = `
        Сегодня: ${data3day.list[1].main.temp} °C <br> 
        <img src="http://openweathermap.org/img/w/${data3day.list[0].weather[0]["icon"]}.png"> <br>
        ${dataForThreeDays.list[0].weather[0]["description"]} <br>
        Ветер: <br>" + dataForThreeDays.list[0].wind.speed + "м/с"`;

        // let tomorrow = document.createElement('div');
        // forecast3day.append(tomorrow);
        //
        // let afterTomorrow = document.createElement('div');
        // forecast3day.append(afterTomorrow);




        // let iconOne = `${data3day.list[0].weather[0]["icon"]}`;
        // let iconTwo = `${data3day.list[8].weather[0]["icon"]}`;
        // let iconThree = `${data3day.list[16].weather[0]["icon"]}`;
        // today.innerHTML = "Сегодня: " + data3day.list[0].main.temp + "°C <br> " + `<img src="http://openweathermap.org/img/w/${iconOne}.png"></img>` + " <br>" + data3day.list[0].weather[0]["description"] + " <br> Скорость ветра: <br>" + data3day.list[0].wind.speed + "м/с";
        // tomorrow.innerHTML = "Завтра: " + data3day.list[8].main.temp + "°C <br> " + `<img src="http://openweathermap.org/img/w/${iconTwo}.png"></img>` + " <br>" + data3day.list[8].weather[0]["description"] + " <br> Скорость ветра: <br>" + data3day.list[8].wind.speed + "м/с";
        // afterTomorrow.innerHTML = "Послезавтра: " + data3day.list[16].main.temp + "°C <br> " + `<img src="http://openweathermap.org/img/w/${iconThree}.png"></img>` + " <br>" + data3day.list[16].weather[0]["description"] + " <br> Скорость ветра: <br>" + data3day.list[16].wind.speed + "м/с";


    };








    this.controller = function() {

        const btnClose = field.querySelector('.modal__close');
        btnClose.addEventListener('click', function(e) {

            e.preventDefault();
            field.style.display = "none";
        });


        const btnNowWeather = field.querySelector('.now-weather');
        btnNowWeather.addEventListener('click', function(e) {

            e.preventDefault();
            that.getNowWeather();
        });


        const btnDay3Weather = field.querySelector('.day3-weather');
        btnDay3Weather.addEventListener('click', function(e) {

            e.preventDefault();
            that.get3dayWeather();
        });


        // const btnNowWeather = field.querySelector('.now-weather');
        // btnNowWeather.addEventListener('click', that.getNowWeather);


    };













    this.getWeather = function(_cityID) {

        cityID = _cityID;

        this.createWrapWidget();

        this.controller();

        this.getNowWeather();

        // this.getThreeDaysWheather(625144);
    };


}
